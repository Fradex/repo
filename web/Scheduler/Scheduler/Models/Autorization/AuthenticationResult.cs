using System.ComponentModel.DataAnnotations;
using System.Dynamic;

namespace Scheduler.Models.Autorization
{
    /// <summary>
    /// Результат аутентификации
    /// 
    /// </summary>
    public class AuthenticationResult
    {
        /// <summary>
        /// Соощение об ошибке
        /// 
        /// </summary>
        public string Error { get; set; }
        /// <summary>
        /// Флаг успешной аутентификации
        /// 
        /// </summary>
        public bool Success { get; set; }
        /// <summary>
        /// Идентификатор пользователя
        /// 
        /// </summary>
        public long UserId { get; set; }
        /// <summary>
        /// Имя пользователя
        /// 
        /// </summary>
        public string UserName { get; set; }
        /// <summary>
        /// Данные учетной записи пользователя
        /// 
        /// </summary>
        public ExpandoObject UserData { get; set; }
    }


    public class ExternalLoginConfirmationViewModel
    {
        [Required]
        [Display(Name = "Имя пользователя")]
        public string UserName { get; set; }
    }

    public class ManageUserViewModel
    {
        [Required]
        [DataType(DataType.Password)]
        [Display(Name = "Текущий пароль")]
        public string OldPassword { get; set; }

        [Required]
        [StringLength(100, ErrorMessage = "Пароль {0} не должен быть меньше {2} символов", MinimumLength = 6)]
        [DataType(DataType.Password)]
        [Display(Name = "Новый пароль")]
        public string NewPassword { get; set; }

        [DataType(DataType.Password)]
        [Display(Name = "Подтвердите пароль")]
        [Compare("NewPassword", ErrorMessage = "Пароли не совпадают")]
        public string ConfirmPassword { get; set; }
    }

    public class LoginViewModel
    {
        [Required]
        [Display(Name = "Логин")]
        public string UserName { get; set; }

        [Required]
        [DataType(DataType.Password)]
        [Display(Name = "Пароль")]
        public string Password { get; set; }

        [Display(Name = "Запомнить?")]
        public bool RememberMe { get; set; }
    }

    public class RegisterViewModel
    {
        [Required]
        [Display(Name = "Логин")]
        public string UserName { get; set; }

        [Required]
        [StringLength(100, ErrorMessage = "Пароль {0} не должен быть меньше {2} символов", MinimumLength = 6)]
        [DataType(DataType.Password)]
        [Display(Name = "Пароль")]
        public string Password { get; set; }

        [DataType(DataType.Password)]
        [Display(Name = "Подтвердите пароль")]
        [Compare("Password", ErrorMessage = "Пароли не совпадают")]
        public string ConfirmPassword { get; set; }
    }
}
