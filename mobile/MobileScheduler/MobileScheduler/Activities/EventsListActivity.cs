using System;
using System.Collections.Generic;
using System.Linq;
using Android.App;
using Android.Content;
using Android.OS;
using Android.Views;
using Android.Widget;
using MobileScheduler.Adapters;
using MobileScheduler.Classes;
using MobileScheduler.Entities;

namespace MobileScheduler.Activities
{
    [Activity]
    public class EventsListActivity : ListActivity
    {
        protected string UserId;
        private List<EventInfo> ListData;

        protected override void OnCreate(Bundle bundle)
        {
            SetTitle(Resource.String.Events);

            base.OnCreate(bundle);

            UserId = Intent.GetStringExtra("UserId");
            var date = DateTime.Parse(Intent.GetStringExtra("Date"));
            ListData = GetData(UserId, date);

            ListAdapter = new EventsAdapter(ListData, this);
        }

        private List<EventInfo> GetData(string userId, DateTime date)
        {
            return FileHelper
                .GetUserEventList(userId)
                .Where(x => x.StartDate.ToShortDateString() == date.ToShortDateString())
                .OrderBy(x=>x.StartDate)
                .ToList();
        }

        protected override void OnListItemClick(ListView l, View v, int position, long id)
        {
            var activity = new Intent(this, typeof(EventInfoActivity));
            activity.PutExtra("RecordId", ListData[position].Id);
            activity.PutExtra("UserId", UserId);
            StartActivity(activity);
        }
    }
}