using System;
using System.Collections.Generic;
using System.Data.Entity;
using System.Data.Entity.Core.Metadata.Edm;
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
                if (UserId == null)
                {
                    throw new EntryPointNotFoundException("ololo");
                }
                var res = db.UserSchedule.
                    Where(x => x.UserId == UserId).ToList();
                return res;
            }
        }

        public List<UserScheduleMobile> GetUserScheduleMobilesByUserId(string UserId)
        {
            var noMobile = GetUserScheduleByUserId(UserId);
            var res = noMobile.Select(t => new UserScheduleMobile()
            {
                EndDate = t.EndDate,
                Id = t.Id ?? 0,
                Location = t.Location,
                Notes = t.Notes,
                StartDate = t.StartDate,
                Title = t.Title,
                Type = GetTypeNameById(t.CalendarId)
            });
            return res.ToList();

        }


        /// <summary>
        /// Сохранение/Добавление списка расписаний
        /// </summary>
        /// <param name="schedules"></param>
        /// <returns></returns>
        public string SaveListUserSchedule(List<UserSchedule> schedules, string UserId)
        {
            using (var db = new AppDbContext())
            {
                try
                {
                    foreach (var schedule in schedules)
                    {
                        schedule.UserId = UserId;
                        if (schedule.Id == null || schedule.Id == 0)
                        {
                            db.UserSchedule.Add(schedule);
                        }
                        else
                        {
                            db.Entry(schedule).State = EntityState.Modified;
                        }
                    }
                    db.SaveChanges();
                    return "Данные успешно сохранены!";
                }
                catch (Exception ex)
                {
                    return "Ошибка при сохранении данных!";
                }
            }
        }

        //todo переделать на табличку
        public string GetTypeNameById(long CalendarId)
        {
            switch (CalendarId)
            {
                case 1: return "Дом";
                case 2: return "Работа";
                case 3: return "Школа";
                case 4: return "Университет";
            }
            return "Тип неопределен";
        }

}
}
