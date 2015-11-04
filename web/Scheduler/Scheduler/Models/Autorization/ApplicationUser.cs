using System;
using System.Collections.Generic;
using Microsoft.AspNet.Identity.EntityFramework;
using System.Data.Entity;

namespace Scheduler.Models.Autorization
{

    public class AppDbContext : DbContext
    {
        public DbSet<UserSchedule> UserSchedule { get; set; }

        public AppDbContext() : base("db")
        {
        }
    }

    public class ApplicationUser : IdentityUser
    {
        public virtual UserRole Role { get; set; }
        public virtual DateTime? RegisterDate { get; set; }
    }

    public class ApplicationDbContext : IdentityDbContext<ApplicationUser>
    {
        public ApplicationDbContext()
           : base("db")
        {
            Database.SetInitializer<ApplicationDbContext>(null);
        }
    }

    public class UserRoleDbContext : IdentityDbContext<ApplicationUser>
    {
        public UserRoleDbContext()
            : base("db")
        {
        }
    }

    public class UserRole
    {
        public virtual int Id { get; set; }
        public virtual string Role { get; set; }
        // public virtual int UserId { get; set; }
        //public virtual ICollection<ApplicationUser> ApplicationUsers { get; set; }
    }

    public class User
    {
        public string UserName { get; set; }
        public DateTime? DateRegister { get; set; }
        public string UserRole { get; set; }
    }
}
