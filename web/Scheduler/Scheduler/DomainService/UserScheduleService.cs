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
    public class UserScheduleService
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
        /// Получение расписаний по идентификатору пользователя
        /// </summary>
        /// <param name="Id"></param>
        /// <returns></returns>
        public List<UserSchedule> GetUserScheduleByUserId(string UserId)
        {
            using (var db = new AppDbContext())
            {
                return db.UserSchedule.
                    Where(x => x.UserId== UserId).ToList();
            }
        }

        public List<UserScheduleMobile> GetUserScheduleMobilesByUserId(string UserId)
        {
            var res = from t in GetUserScheduleByUserId(UserId)
                select
                    new UserScheduleMobile()
                    {
                        EndDate = t.EndDate,
                        Id = t.Id.Value,
                        Location = t.Location,
                        Notes = t.Notes,
                        StartDate = t.StartDate,
                        Title = t.Title,
                        Type = string.Empty
                    };
            return res.ToList();

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
