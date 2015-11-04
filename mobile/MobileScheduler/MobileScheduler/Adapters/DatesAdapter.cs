using System.Collections.Generic;
using Android.App;
using Android.Graphics;
using Android.Util;
using Android.Views;
using Android.Widget;
using MobileScheduler.Entities;

namespace MobileScheduler.Adapters
{
    public class DatesAdapter : BaseAdapter<DateInfo>
    {
        protected List<DateInfo> List;
        protected Activity Context;

        public DatesAdapter(List<DateInfo> list, Activity context)
        {
            List = list;
            Context = context;
        }

        public override long GetItemId(int position)
        {
            return position;
        }

        public override View GetView(int position, View convertView, ViewGroup parent)
        {
            TextView view = new TextView(Context);
            view.SetLines(2);
            view.SetTextColor(Color.Black);
            view.SetTextSize(ComplexUnitType.Pt, 8);
            view.SetPadding(40, 40, 40, 40);

            var eventInfo = List[position];

            view.Text = $"{eventInfo.Date.ToShortDateString()}\n{Context.Resources.GetString(Resource.String.Events)}: {eventInfo.EventsCount}";

            return view;
        }

        public override int Count => List.Count;

        public override DateInfo this[int position] => List[position];
    }
}