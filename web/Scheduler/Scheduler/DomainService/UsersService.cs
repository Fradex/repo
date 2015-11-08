using System;
using System.Collections.Generic;
using System.Data.Entity;
using System.Data.Entity.Migrations;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using Scheduler.Models.Autorization;

namespace Scheduler.DomainService
{
    public class UsersService
    {
        /// <summary>
        /// Получение всех пользователей
        /// </summary>
        /// <returns></returns>
        public List<ApplicationUser> GetAllUsers()
        {
            using (var db = new ApplicationDbContext())
            {
                var res = db.Users.Include(x=>x.Role).ToList();
                return res;
            }
        }

        /// <summary>
        /// Получение данных
        /// </summary>
        /// <param name="Id"></param>
        /// <returns></returns>
        public ApplicationUser GetUserDataById(string Id)
        {
            using (var db = new ApplicationDbContext())
            {
                var res = db.Users.FirstOrDefault(x => x.Id == Id);
                res.PasswordHash = null;
                return res;
            }
        }

        public Role GetUserRole(string UserId)
        {
            using (var db = new ApplicationDbContext())
            {
                var RoleId = db.Users.Include(x => x.Role).FirstOrDefault().Role.Id;
                return db.Roles.FirstOrDefault(x => x.Id == RoleId);
            }
        }
    }
}
