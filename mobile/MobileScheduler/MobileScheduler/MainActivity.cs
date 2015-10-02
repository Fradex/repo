using System;
using System.IO;
using System.Net;
using System.Threading.Tasks;
using Android.App;
using Android.Content;
using Android.Runtime;
using Android.Views;
using Android.Widget;
using Android.OS;
using MobileScheduler.Classes;
using MobileScheduler.Entities;
using Newtonsoft.Json;

namespace MobileScheduler
{
    [Activity(MainLauncher = true, Icon = "@drawable/icon")]
    public class MainActivity : Activity
    {
        protected override void OnCreate(Bundle bundle)
        {
            SetTitle(Resource.String.ApplicationName);
            base.OnCreate(bundle);
            SetContentView(Resource.Layout.Main);

            var loginButton = FindViewById<Button>(Resource.Id.BtnLogin);
            loginButton.Click += Login;
        }

        protected async void Login(object obj, EventArgs args)
        {
            var progressDialog = new ProgressDialog(this);
            progressDialog.SetProgressStyle(ProgressDialogStyle.Spinner);
            progressDialog.SetMessage(Resources.GetString(Resource.String.SigningIn));
            progressDialog.Show();

            var response = await WebRequestHelper.FetchWebResult<Login>("http://api.openweathermap.org/data/2.5/weather?q=Kazan");
            progressDialog.Hide();
            StartActivity(typeof(ScheduleActivity));
        }
    }
}