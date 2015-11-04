using System;

namespace MobileScheduler.Entities
{
    public class EventInfo
    {
        public long Id { get; set; }

        public string Title { get; set; }

        public string Type { get; set; }

        public DateTime StartDate { get; set; }

        public DateTime EndDate { get; set; }

        public string Location { get; set; }

        public string Notes { get; set; }
    }
}