using Android.App;
using Android.OS;
using Android.Widget;

namespace MobileScheduler
{
    [Activity]
    public class ScheduleActivity : ListActivity
    {
        protected override void OnCreate(Bundle bundle)
        {
            SetTitle(Resource.String.MainMenu);
            base.OnCreate(bundle);

            var array = Resources.GetStringArray(Resource.Array.ScheduleArray);

            ListAdapter = new ArrayAdapter(this, Android.Resource.Layout.SimpleListItem1, array);
        }
    }
}