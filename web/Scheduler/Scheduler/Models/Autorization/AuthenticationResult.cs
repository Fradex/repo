
using System.Dynamic;

namespace Scheduler.Models
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
}
