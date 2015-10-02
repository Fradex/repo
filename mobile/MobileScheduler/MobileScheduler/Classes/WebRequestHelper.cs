using System;
using System.IO;
using System.Net;
using System.Threading.Tasks;
using Newtonsoft.Json;

namespace MobileScheduler.Classes
{
    public static class WebRequestHelper
    {
        public async static Task<T> FetchWebResult<T>(string url)
        {
            HttpWebRequest request = (HttpWebRequest)WebRequest.Create(new Uri(url));
            request.ContentType = "application/json";
            request.Method = "GET";

            using (WebResponse response = await Task.Run(() => request.GetResponse()))
            using (Stream stream = response.GetResponseStream())
            using (StreamReader reader = new StreamReader(stream))
            {
                var responseString = reader.ReadToEnd();
                var responseObject = JsonConvert.DeserializeObject<T>(responseString);
                return responseObject;
            }
        }
    }
}