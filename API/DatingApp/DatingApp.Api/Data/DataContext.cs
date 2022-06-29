using DatingApp.Api.Entities;
using Microsoft.EntityFrameworkCore;

namespace DatingApp.Api.Data
{
    public class DataContext: DbContext
    {
        private readonly DbContextOptions _options;

        public DataContext(DbContextOptions options):base(options)
        {
            _options = options;
        }

        public DbSet<AppUser> Users { get; set; }
    }
}
