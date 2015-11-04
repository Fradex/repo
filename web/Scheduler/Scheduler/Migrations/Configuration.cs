using Microsoft.AspNet.Identity.EntityFramework;
using Scheduler.Models.Autorization;

namespace Scheduler.Migrations
{
    using System;
    using System.Data.Entity;
    using System.Data.Entity.Migrations;
    using System.Linq;


    internal sealed class Configuration : DbMigrationsConfiguration<ApplicationDbContext>
    {
        public Configuration()
        {
            AutomaticMigrationsEnabled = true;
        }

        protected override void Seed(ApplicationDbContext context)
        {
            //context.UserRole.AddOrUpdate(r => r.Id,
            //    new UserRole { Id = 1, Role = "�������������" },
            //    new UserRole { Id = 2, Role = "������������" });
        }
    }

}
