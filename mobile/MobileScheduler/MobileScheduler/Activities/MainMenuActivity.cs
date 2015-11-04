using Android.App;
using Android.Content;
using Android.OS;
using Android.Views;
using Android.Widget;

namespace MobileScheduler.Activities
{
    [Activity]
    public class MainMenuActivity : ListActivity
    {
        protected string UserId;

        protected override void OnCreate(Bundle bundle)
        {
            SetTitle(Resource.String.MainMenu);
            base.OnCreate(bundle);

            UserId = Intent.GetStringExtra("UserId");

            var array = Resources.GetStringArray(Resource.Array.MainMenuArray);

            ListAdapter = new ArrayAdapter(this, Android.Resource.Layout.SimpleListItem1, array);
        }

        protected override void OnListItemClick(ListView l, View v, int position, long id)
        {
            switch (position)
            {
                case 0:
                    {
                        var datesAciviy = new Intent(this, typeof(DatesListActivity));
                        datesAciviy.PutExtra("UserId", UserId);
                        StartActivity(datesAciviy);
                        break;
                    }
            }
        }
    }
}