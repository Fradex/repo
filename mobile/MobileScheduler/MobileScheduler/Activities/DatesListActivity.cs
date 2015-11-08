using System;
using System.Collections.Generic;
using System.IO;
using System.Linq;
using Android.App;
using Android.Content;
using Android.OS;
using Android.Views;
using Android.Widget;
using MobileScheduler.Adapters;
using MobileScheduler.Classes;
using MobileScheduler.Entities;
using Newtonsoft.Json;

namespace MobileScheduler.Activities
{
    [Activity]
    public class DatesListActivity : ListActivity
    {
        protected string UserId;
        protected List<DateInfo> ListData;

        protected override void OnCreate(Bundle bundle)
        {
            SetTitle(Resource.String.Dates);
            base.OnCreate(bundle);

            UserId = Intent.GetStringExtra("UserId");
            ListData = GetData(UserId);

            ListAdapter = new DatesAdapter(ListData, this);
        }

        private List<DateInfo> GetData(string userId)
        {
            var eventsList = FileHelper.GetUserEventList(userId);
            return eventsList
                .GroupBy(x => x.StartDate)
                .OrderBy(x=>x.Key)
                .Select(x => new DateInfo
                {
                    Date = x.Key,
                    EventsCount = x.Count()
                }).ToList();
        }

        protected override void OnListItemClick(ListView l, View v, int position, long id)
        {
            var activity = new Intent(this, typeof(EventsListActivity));
            activity.PutExtra("Date", ListData[position].Date.ToShortDateString());
            activity.PutExtra("UserId", UserId);
            StartActivity(activity);
        }
    }
}