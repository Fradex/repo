using System;
using System.Collections.Generic;
using System.IO;
using System.Xml.Serialization;
using Android.App;
using Android.Content;
using Android.Net;
using Android.OS;
using Android.Views;
using Android.Widget;
using MobileScheduler.Classes;
using MobileScheduler.Entities;
using Newtonsoft.Json;
using Environment = System.Environment;

namespace MobileScheduler.Activities
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
            //Проверка наличия соединения
            var connectivityManager = (ConnectivityManager)GetSystemService(ConnectivityService);
            var activeConnection = connectivityManager.ActiveNetworkInfo;
            var isOnline = (activeConnection != null) && activeConnection.IsConnected;
            var wifiInfo = connectivityManager.GetNetworkInfo(ConnectivityType.Wifi);
            var isWiFi = wifiInfo.IsConnected;
            if (!isOnline && !isWiFi)
            {
                MessageHelper.ShowMessage(this, Resource.String.Attention, Resource.String.NoConnection);
                return;
            }

            //Пустышка логинки
            //var userid = "123asd";
            //var mainMenuAciviy = new Intent(this, typeof(MainMenuActivity));
            //mainMenuAciviy.PutExtra("UserId", userid);
            //StartActivity(mainMenuAciviy);

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
                    //Обновляем данные
                    UpdateEventsData(userId);
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

        private void UpdateEventsData(string userId)
        {
            var filePath = Path.Combine(Environment.GetFolderPath(Environment.SpecialFolder.Personal), $"{userId}.txt");

            //Загрузка данных
            var data = WebRequestHelper.FetchWebResult<string>($"/Login/ApiLogin?");
            var eventsList = JsonConvert.DeserializeObject<List<EventInfo>>(data.Result);

            //List<EventInfo> eventsList = new List<EventInfo>
            //    {
            //        new EventInfo
            //        {
            //            Id = 1,
            //            Title = "Title",
            //            StartDate = new DateTime(2015, 1, 1, 12, 0, 0),
            //            EndDate = new DateTime(2015, 1, 1, 16, 0, 0)
            //        }
            //    };

            //Сохранение данных
            using (var writer = new StreamWriter(File.Create(filePath)))
            {
                writer.Write(JsonConvert.SerializeObject(eventsList));
            }
        }
    }
}