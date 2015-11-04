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

        [HttpGet]
        public ActionResult GetUsers()
        {
            var service = new UsersService();
            return Json(service.GetAllUsers());
        }

        public ActionResult GetCurrentUser()
        {
            var service = new UsersService();
            return Json(service.GetUserDataById(Session["currentUserID"].ToString()));
        }

        [HttpGet]
        public ActionResult GetAllUserSchedules()
        {
            var service = new UserScheduleService();
            return Json(service.GetAllUserSchedules());
        }

        [HttpGet]
        public ActionResult GetUserScheduleByUserId()
        {
            var service = new UserScheduleService();
            return Json(service.GetUserScheduleByUserId(Session["currentUserID"].ToString()));
        }

        [HttpGet]
        public ActionResult GetUserScheduleMobilesByUserId(string UserId)
        {
            var service = new UserScheduleService();
            return Json(service.GetUserScheduleMobilesByUserId(UserId));
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
            return Json(service.SaveListUserSchedule(schedules));
        }

    }
}