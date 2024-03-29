﻿using DatingApp.Api.Extentions;

namespace DatingApp.Api.Entities
{
    public class AppUser
    {
        public int Id { get; set; }

        public string UserName { get; set; } =  string.Empty;

        public byte[] PasswordHash { get; set; }

        public byte[] PasswordSalt { get; set; }

        public DateTime DateOfBirth { get; set; }

        public DateTime Created { get; set; } = DateTime.Now;

        public DateTime LastActive { get; set; } = DateTime.Now;

        public string Gender { get; set; }

        public string Introduction { get; set; } = string.Empty;

        public string LookingFor { get; set; } = string.Empty;

        public string Interest { get; set; } = string.Empty;

        public string City { get; set; }

        public string Country { get; set; }

        public ICollection<Photo> Photos { get; set; }

        //public int getAge()
        //{
        //    return DateOfBirth.CalculateAge();
        //}
    }

   
}
