using System;
using System.Collections.Generic;
using System.IO;
using MobileScheduler.Entities;
using Newtonsoft.Json;

namespace MobileScheduler.Classes
{
    public static class FileHelper
    {
        public static List<EventInfo> GetUserEventList(string userId)
        {
            var filePath = Path.Combine(Environment.GetFolderPath(Environment.SpecialFolder.Personal), $"{userId}.txt");
            List<EventInfo> eventsList = null;

            using (var reader = new StreamReader(filePath))
            using (var jsonTextReader = new JsonTextReader(reader))
            {
                var serializer = new JsonSerializer();
                eventsList = serializer.Deserialize<List<EventInfo>>(jsonTextReader);
            }

            return eventsList;
        }
    }
}