using System;
using System.Collections.Generic;
using System.Data.Entity;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Scheduler.Models.Autorization
{
    public class UserSchedule
    {
        /// <summary>
        /// Идентификатор пользователя
        /// </summary>
        public virtual ApplicationUser UserId { get; set; }
        /// <summary>
        /// Идентификатор записи
        /// </summary>
        public virtual long? Id { get; set; }
        /// <summary>
        /// Идентификатор типа расписания
        /// </summary>
        public virtual long CalendarId { get; set; }
        /// <summary>
        /// Дата начала
        /// </summary>
        public virtual DateTime StartDate { get; set; }
        /// <summary>
        /// Дата окончания
        /// </summary>
        public virtual DateTime EndDate { get; set; }
        /// <summary>
        /// Признак действия - весь день
        /// </summary>
        public virtual bool IsAllDay { get; set; }
        /// <summary>
        /// Место встречи и т.п.
        /// </summary>
        public virtual string Location { get; set; }
        /// <summary>
        /// Комментарий
        /// </summary>
        public virtual string Notes { get; set; }
        /// <summary>
        /// Хз что за поле и нафиг оно нужно
        /// </summary>
        public virtual string RecurRule { get; set; }
        /// <summary>
        /// Напоминание
        /// </summary>
        public virtual string Reminder { get; set; }
        /// <summary>
        /// Заголовок события
        /// </summary>
        public virtual string Title { get; set; }
        /// <summary>
        /// Ссылка 
        /// </summary>
        public virtual string Url { get; set; }
    }

}
