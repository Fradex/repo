using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using System.Web;
using System.Web.Mvc;
using Microsoft.AspNet.Identity;
using Microsoft.AspNet.Identity.EntityFramework;
using Microsoft.Owin.Security;
using Scheduler.Models.Autorization;

namespace Scheduler.Controllers
{
    public class LoginController : Controller
    {
        private IAuthenticationManager AuthenticationManager => HttpContext.GetOwinContext().Authentication;

        public enum ManageMessageId
        {
            ChangePasswordSuccess,
            SetPasswordSuccess,
            RemoveLoginSuccess,
            Error
        }

        public LoginController()
            : this(new UserManager<ApplicationUser>(new UserStore<ApplicationUser>(new ApplicationDbContext())))
        {
        }

        public LoginController(UserManager<ApplicationUser> userManager)
        {
            UserManager = userManager;
        }

        public UserManager<ApplicationUser> UserManager { get; }
        // GET: Login
        public ActionResult Index()
        {
            ViewData["Title"] = "Scheduler";
            //return RedirectToAction("Ext", "Main");
            return View();
        }

        public RedirectResult Redirect()
        {
            return Redirect("/Main/Ext");
        }
        [AllowAnonymous]
        public ActionResult Index(string returnUrl)
        {
            ViewBag.ReturnUrl = returnUrl;
            return View();
        }
        //
        // POST: /Account/Login
        [HttpPost]
        [AllowAnonymous]
        [ValidateAntiForgeryToken]
        public async Task<ActionResult> Index(LoginViewModel model, string returnUrl)
        {
            if (ModelState.IsValid)
            {
                var user = await UserManager.FindAsync(model.UserName, model.Password);
                if (user != null)
                {
                    await SignInAsync(user, model.RememberMe);
                    return RedirectToLocal(returnUrl);
                }
                else
                {
                    ModelState.AddModelError("", "Invalid username or password.");
                }
            }

            // If we got this far, something failed, redisplay form
            return View(model);
        }

        private ActionResult RedirectToLocal(string returnUrl)
        {
            if (this.Url.IsLocalUrl(returnUrl))
            {
                return this.Redirect(returnUrl);
            }
            else
            {
                return this.RedirectToAction("Ext", "Main");
            }
        }

        //public ActionResult Manage(ManageMessageId? message)
        //{
        //    this.ViewBag.StatusMessage =
        //        message == ManageMessageId.ChangePasswordSuccess ? "Ваш пароль был изменен."
        //        : message == ManageMessageId.SetPasswordSuccess ? "Ваш пароль установлен."
        //        : message == ManageMessageId.RemoveLoginSuccess ? "Ваш пароль удален."
        //        : message == ManageMessageId.Error ? "Произошла ошибка."
        //        : "";
        //    this.ViewBag.HasLocalPassword = this.HasPassword();
        //    this.ViewBag.ReturnUrl = this.Url.Action("Manage");
        //    return this.View();
        //}

        private async Task SignInAsync(ApplicationUser user, bool isPersistent)
        {
            AuthenticationManager.SignOut(DefaultAuthenticationTypes.ExternalCookie);
            var identity = await UserManager.CreateIdentityAsync(user, DefaultAuthenticationTypes.ApplicationCookie);
            AuthenticationManager.SignIn(new AuthenticationProperties() { IsPersistent = isPersistent }, identity);
        }
    }
}