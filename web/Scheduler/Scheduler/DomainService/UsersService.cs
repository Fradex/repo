﻿using System;
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
            using (var db = new OwnerDbContext())
            {
                return db.Users.ToList();
            }
        }

        /// <summary>
        /// Получение данных
        /// </summary>
        /// <param name="Id"></param>
        /// <returns></returns>
        public ApplicationUser GetUserDataById(string Id)
        {
            using (var db = new OwnerDbContext())
            {
                var res = db.Users.FirstOrDefault(x => x.Id == Id);
                res.PasswordHash = null;
                return res;
            }
        }
    }
}