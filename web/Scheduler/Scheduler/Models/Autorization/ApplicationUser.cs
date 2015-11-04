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

    public class OwnerDbContext : IdentityDbContext<ApplicationUser>
    {
        public DbSet<UserRole> UserRole { get; set; }

        public OwnerDbContext()
           : base("db")
        {
            
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
}
