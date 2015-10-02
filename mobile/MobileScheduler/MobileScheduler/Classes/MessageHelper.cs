using Android.App;

namespace MobileScheduler.Classes
{
    public static class MessageHelper
    {
        public static void ShowMessage(Activity context, int title, int message)
        {
            var builder = new AlertDialog.Builder(context)
                .SetTitle(title)
                .SetMessage(message)
                .SetPositiveButton("Ok", (a, b) => { })
                .SetCancelable(true);

            var dialog = builder.Create();
            dialog.Show();
        }
    }
}