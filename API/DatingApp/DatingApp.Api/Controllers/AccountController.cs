﻿using AutoMapper;
using DatingApp.Api.DTOs;
using DatingApp.Api.Entities;
using DatingApp.Api.Interfaces;
using Microsoft.AspNetCore.Mvc;
using System.Security.Cryptography;
using System.Text;

namespace DatingApp.Api.Controllers
{
    public class AccountController : BaseApiController
    {
        private readonly DataContext _context;
        private readonly ITokenServiceInterface _tokenService;
        private readonly IMapper _mapper;

        public AccountController(DataContext context, ITokenServiceInterface tokenService, IMapper mapper)
        {
            _context = context;
            _tokenService = tokenService;
            _mapper = mapper;
        }

        [HttpPost("register")]
        public async Task<ActionResult<UserDto>> Register(RegisterDto registerDto)
        {

            if (await UsersExists(registerDto.Username))
            {
                return BadRequest("User Name exists");
            }

            using var hmc = new HMACSHA512();
            var user = _mapper.Map<AppUser>(registerDto);

            user.UserName = registerDto.Username;
            user.PasswordHash = hmc.ComputeHash(Encoding.UTF8.GetBytes(registerDto.Password));
            user.PasswordSalt = hmc.Key;
          
            _context.Users.Add(user);
            await _context.SaveChangesAsync();
            return new UserDto
            {
                UserName = user.UserName,
                Token = _tokenService.CreateToken(user)
            };
        }

        [HttpPost("login")]
        public async Task<ActionResult<UserDto>> Login(LoginDto loginDto)
        {
            var user = await _context.Users.SingleOrDefaultAsync(x => x.UserName == loginDto.Username);//to get first one data
            if (user == null)
            {
                return Unauthorized("Invalid User Name ");
            }

            using var hmac = new HMACSHA512(user.PasswordSalt);

            var computedPassword = hmac.ComputeHash(Encoding.UTF8.GetBytes(loginDto.Password));

            if (user.PasswordHash.LongLength != computedPassword.LongLength) return Unauthorized("Invalid Password");

            if (!computedPassword.SequenceEqual(user.PasswordHash))
            {
                return Unauthorized("Invalid Password");
            }


            //for (int i = 0; i < computedPassword.Length; i++)
            //{
            //    if (computedPassword[i] != user.PasswordHash[i])
            //    {

            //    }
            //}

            return new UserDto
            {
                UserName = user.UserName,
                Token = _tokenService.CreateToken(user)
            };
        }

        private async Task<bool> UsersExists(string userName)
        {
            return await _context.Users.AnyAsync(x => x.UserName.ToLower() == userName.ToLower());

        }
    }
}
