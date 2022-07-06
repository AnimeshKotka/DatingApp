using DatingApp.Api.Entities;

namespace DatingApp.Api.Interfaces
{
    public interface ITokenServiceInterface
    {
        string CreateToken(AppUser appUser);
    }
}
