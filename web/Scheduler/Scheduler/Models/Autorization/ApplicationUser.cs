using Microsoft.AspNet.Identity.EntityFramework;

namespace Scheduler.Models.Autorization
{
    public class ApplicationUser : IdentityUser
    {
    }

    public class ApplicationDbContext : IdentityDbContext<ApplicationUser>
    {
        public ApplicationDbContext()
           : base("DefaultConnection")
        {
        }
    }
}
