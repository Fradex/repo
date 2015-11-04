using System.Linq;
using Android.App;
using Android.OS;
using Android.Widget;
using MobileScheduler.Classes;

namespace MobileScheduler.Activities
{
    [Activity(Icon = "@drawable/icon")]
    public class EventInfoActivity : Activity
    {
        protected override void OnCreate(Bundle bundle)
        {
            SetTitle(Resource.String.EventInfo);
            base.OnCreate(bundle);
            SetContentView(Resource.Layout.EventInfo);

            var recordId = Intent.GetLongExtra("RecordId", 0);
            var userId = Intent.GetStringExtra("UserId");

            var eventInfo = FileHelper
                .GetUserEventList(userId)
                .First(x => x.Id == recordId);

            FindViewById<TextView>(Resource.Id.textViewEventText).Text = eventInfo.Title ?? Resources.GetString(Resource.String.NotSpecified);
            FindViewById<TextView>(Resource.Id.textViewTypeText).Text = eventInfo.Type ?? Resources.GetString(Resource.String.NotSpecified);
            FindViewById<TextView>(Resource.Id.textViewStartText).Text = eventInfo.StartDate.ToString();
            FindViewById<TextView>(Resource.Id.textViewEndText).Text = eventInfo.EndDate.ToString();
            FindViewById<TextView>(Resource.Id.textViewNoteText).Text = eventInfo.Notes ?? Resources.GetString(Resource.String.NotSpecified);
        }
    }
}