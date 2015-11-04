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
    public class SystemService
    {
        /// <summary>
        /// Получение всех расписаний
        /// </summary>
        /// <returns></returns>
        public List<UserSchedule> GetAllUserSchedules()
        {
            using (var db = new AppDbContext())
            {
                return db.UserSchedule.ToList();
            }
        }
        /// <summary>
        /// Получение расписания по идентификатору
        /// </summary>
        /// <param name="Id"></param>
        /// <returns></returns>
        public UserSchedule GetUserScheduleByUserId(int UserId)
        {
            using (var db = new AppDbContext())
            {
                return db.UserSchedule.
                    FirstOrDefault(x => x.UserId.Id == UserId.ToString());
            }
        }

        /// <summary>
        /// Сохранение/Добавление списка расписаний
        /// </summary>
        /// <param name="schedules"></param>
        /// <returns></returns>
        public string SaveListUserSchedule(List<UserSchedule> schedules)
        {
            using (var db = new AppDbContext())
            {
                try
                {
                    foreach (var schedule in schedules)
                    {
                        db.UserSchedule.AddOrUpdate(x => x.Id, schedule);
                    }
                    db.SaveChanges();
                    return "Данные успешно сохранены!";
                }
                catch (Exception)
                {
                    return "Ошибка при сохранении данных!";
                }
            }
        }
    }
}
