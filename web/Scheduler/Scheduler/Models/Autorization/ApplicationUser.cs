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
        public virtual Role Role { get; set; }
        public virtual DateTime? RegisterDate { get; set; }
    }

    public class ApplicationDbContext : IdentityDbContext<ApplicationUser>
    {
        public DbSet<Role> Roles { get; set; }
 
        public ApplicationDbContext()
           : base("db")
        {
            Configuration.LazyLoadingEnabled = false;
            Database.SetInitializer<ApplicationDbContext>(null);
        }
    }


    public class Role
    {
        public virtual int Id { get; set; }
        public virtual string Name { get; set; }
        public virtual string ImageUrl { get; set; }
        public virtual string Controller { get; set; }
        public virtual string ArmName { get; set; }
    }


    public class User
    {
        public string UserName { get; set; }
        public string DateRegister { get; set; }
        public string UserRole { get; set; }
    }
}
