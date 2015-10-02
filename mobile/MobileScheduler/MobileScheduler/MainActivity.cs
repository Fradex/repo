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
            var name = FindViewById<EditText>(Resource.Id.EtName).Text;
            var password = FindViewById<EditText>(Resource.Id.EtPassword).Text;

            if (string.IsNullOrEmpty(name) || string.IsNullOrEmpty(password))
            {
                MessageHelper.ShowMessage(this, Resource.String.Warning, Resource.String.WrongInput);
                return;
            }

            var progressDialog = new ProgressDialog(this);
            progressDialog.SetProgressStyle(ProgressDialogStyle.Spinner);
            progressDialog.SetMessage(Resources.GetString(Resource.String.SigningIn));
            progressDialog.SetCancelable(false);
            progressDialog.Show();
            try
            {
                var userId = await WebRequestHelper.FetchWebResult<string>($"/Login/ApiLogin?userName={name}&password={password}");
                progressDialog.Hide();

                if (userId != null)
                {
                    StartActivity(typeof(MainMenuActivity));
                }
                else
                {
                    MessageHelper.ShowMessage(this, Resource.String.Warning, Resource.String.WrongInput);
                }
            }
            catch (Exception e)
            {
                progressDialog.Hide();
                MessageHelper.ShowMessage(this, Resource.String.Warning, Resource.String.ServerUnavailable);
            }
        }
    }
}