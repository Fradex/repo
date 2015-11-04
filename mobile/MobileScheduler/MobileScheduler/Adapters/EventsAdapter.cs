using System.Collections.Generic;
using Android.App;
using Android.Graphics;
using Android.Util;
using Android.Views;
using Android.Widget;
using MobileScheduler.Entities;

namespace MobileScheduler.Adapters
{
    public class EventsAdapter : BaseAdapter<EventInfo>
    {
        protected List<EventInfo> List;
        protected Activity Context;

        public EventsAdapter(List<EventInfo> list, Activity context)
        {
            List = list;
            Context = context;
        }

        public override long GetItemId(int position)
        {
            return List[position].Id;
        }

        public override View GetView(int position, View convertView, ViewGroup parent)
        {
            TextView view = new TextView(Context);
            view.SetLines(2);
            view.SetTextColor(Color.Black);
            view.SetTextSize(ComplexUnitType.Pt, 8);
            view.SetPadding(40, 40, 40, 40);
            var eventInfo = List[position];

            view.Text = $"{eventInfo.Title}\n{eventInfo.StartDate} - {eventInfo.EndDate}";

            return view;
        }

        public override int Count => List.Count;

        public override EventInfo this[int position] => List[position];
    }
}