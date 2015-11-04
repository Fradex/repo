using System;
using System.Collections.Generic;
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
        public ActionResult GetUsers()
        {
            var service = new UsersService();

            return Json(new {success = true, data = service.GetAllUsers()});
        }

        [AllowJsonGet]
        public ActionResult GetCurrentUser()
        {
            var service = new UsersService();
            return Json(new { success = true, data = service.GetUserDataById(Session["currentUserID"].ToString())});
        }

        [AllowJsonGet]
        public ActionResult GetAllUserSchedules()
        {
            var service = new UserScheduleService();
            return Json(new { success = true, data = service.GetAllUserSchedules()});
        }

        [AllowJsonGet]
        public ActionResult GetUserScheduleByUserId()
        {
            var service = new UserScheduleService();
            return Json(new { success = true, data = service.GetUserScheduleByUserId(Session["currentUserID"].ToString())});
        }

        [AllowJsonGet]
        public ActionResult GetUserScheduleMobilesByUserId(string UserId)
        {
            var service = new UserScheduleService();
            return Json(
                new { success = true, data = service.GetUserScheduleMobilesByUserId(UserId)});
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
            return Json(new { success = true, data = service.SaveListUserSchedule(schedules, Session["currentUserID"].ToString())});
        }

    }
}