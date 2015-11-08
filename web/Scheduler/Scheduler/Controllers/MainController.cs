using System;
using System.Collections.Generic;
using System.Dynamic;
using System.Linq;
using System.Web;
using System.Web.Mvc;
using Scheduler.DomainService;
using Scheduler.Models.Autorization;

namespace Scheduler.Controllers
{
    public class MainController : Controller
    {
        // GET: Main
        public ActionResult Index()
        {
            return PartialView();
        }

        [AllowJsonGet]
        public ActionResult GetUsers(int start, int limit)
        {
            var service = new UsersService();
            var list = service.GetAllUsers();
            var items = new List<User>();
            foreach (var user in list.Skip(start).Take(limit))
            {
                items.Add(new User
                {
                    UserRole = user.Role.Name,
                    UserName = user.UserName,
                    DateRegister = user.RegisterDate?.ToShortDateString() ?? DateTime.MinValue.ToShortDateString()
                });
            }
            return Json(new { success = true, data = items, total = list.Count });
        }

        [AllowJsonGet]
        public ActionResult GetCurrentUser()
        {
            var service = new UsersService();
            return Json(new { success = true, data = service.GetUserDataById(Session["currentUserID"].ToString()) });
        }

        [AllowJsonGet]
        public ActionResult GetAllUserSchedules()
        {
            var service = new UserScheduleService();
            return Json(new { success = true, data = service.GetAllUserSchedules() });
        }

        [AllowJsonGet]
        public ActionResult GetUserScheduleByUserId()
        {
            var service = new UserScheduleService();
            return Json(new { success = true, data = service.GetUserScheduleByUserId(Session["currentUserID"].ToString()) });
        }

        [AllowJsonGet]
        public ActionResult GetUserScheduleMobilesByUserId(string UserId)
        {
            var service = new UserScheduleService();
            return Json(service.GetUserScheduleMobilesByUserId(UserId));
        }

        [AllowJsonGet]
        public ActionResult GetUserScheduleMobilesByUser(int start, int limit)
        {
            var service = new UserScheduleService();
            var list = service.GetUserScheduleMobilesByUserId(Session["currentUserID"].ToString());
            return Json(new
            {
                success = true,
                data = list.Skip(start).Take(limit).Select(x => new
                {
                    x.Id,
                    x.Location,
                    x.Notes,
                    x.Title,
                    x.Type,
                    EndDate = x.EndDate.ToShortDateString(),
                    StartDate = x.StartDate.ToShortDateString()
                }).ToList(),
                total = list.Count
            });
        }

        /// <summary>
        /// Сохранение расписаний
        /// </summary>
        /// <param name="schedules"></param>
        /// <returns></returns>
        [HttpPost]
        public ActionResult SaveListUserSchedule(List<UserSchedule> schedules)
        {
            var service = new UserScheduleService();
            return Json(new { success = true, data = service.SaveListUserSchedule(schedules, Session["currentUserID"].ToString()) });
        }

        [AllowJsonGet]
        public ActionResult GetUserRole()
        {
            var service = new UsersService();
            var res = service.GetUserRole(Session["currentUserID"].ToString());
            return Json(new { success = true, data = res });
        }



        [AllowJsonGet]
        public ActionResult GetCurrentSmallUser()
        {
            var service = new UsersService();
            var res = service.GetUserDataById(Session["currentUserID"].ToString());
            var small = new User
            {
                DateRegister = res.RegisterDate?.ToShortDateString() ?? DateTime.MinValue.ToShortDateString(),
                UserName = res.UserName,
                UserRole = res.Role.Name
            };
            var resStr =
                $"Пользователь:{small.UserName}  </br>" +
                $"Дата регистрации:{small.DateRegister}  </br>Роль:{small.UserRole}";
            return Json(new { success = true, data = resStr });
        }

    }
}