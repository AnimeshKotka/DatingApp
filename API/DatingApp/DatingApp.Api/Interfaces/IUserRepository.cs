using DatingApp.Api.DTOs;
using DatingApp.Api.Entities;

namespace DatingApp.Api.Interfaces
{
    public interface IUserRepository
    {
        void UpdateUser(AppUser user);

        Task<bool> SaveAllAsync();

        Task<IEnumerable<AppUser>> getAllUsersAsync();

        Task<AppUser> getUserByIdAsync(int Id);

        Task<AppUser> getUserByNameAsync(string Name);

        Task<IEnumerable<MemberDto>> getMembersAsync();

        Task<MemberDto> getMembersAsync(string userName);
    }
}
