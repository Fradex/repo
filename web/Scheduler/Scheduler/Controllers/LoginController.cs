using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using System.Web.Mvc;

namespace Scheduler.Controllers
{
    public class LoginController : Controller
    {
        // GET: Login
        public ActionResult Index()
        {
            ViewData["Title"] = "Scheduler";
            return RedirectToAction("Ext", "Main");
            return View();
        }

        public RedirectResult Redirect()
        {
            return Redirect("/Main/Ext");
        }
    }
}