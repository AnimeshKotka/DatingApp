namespace DatingApp.Api.Entities
{
    public class AppUser
    {
        public int Id { get; set; }

        public string UserName { get; set; } =  string.Empty;

        public byte[] PasswordHash { get; set; }

        public byte[] PasswordSalt { get; set; }
    }
}
