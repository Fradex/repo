Ext.define('Main.controller.common.AccountProfile', {
    extend: 'Ext.app.Controller',

    views: ['common.AccountProfile'],

    init: function () {
        this.control({
            '[xtype=common.AccountProfile]': {
                beforerender: this.onLoad
            }
        });
    },

    onLoad: function (panel) {
        var main = panel.up('[xtype=main.MainViewport]');;
        //main.setLoading();
        //sucFunc = function (jsonResp) {
        //    loadUser(panel, jsonResp.resultData);
        //    main.login = jsonResp.resultData.users.login;
        //    if (main.accountLoaded) main.setLoading(false);
        //    else main.accountLoaded = true;
        //}
        //failFunc = function () {
        //    if (main.accountLoaded) main.setLoading(false);
        //    else main.accountLoaded = true;
        //}
        //Ext.execAjaxRequest('Account/GetUserInfo', 'GET', null, sucFunc, failFunc, 'Получение данных пользователя');
    }
});

function loadUser(panel, person) {
    //if (!person.appointments) person.appointments = new Object();
    //if (!person.contractors) person.contractors = new Object();
    //if (person.appointments.appointment) person.appointments.appointment = ' | ' + person.appointments.appointment;
    //else (person.appointments.appointment = '');
    //if (person.contractors.short_name) person.contractors.short_name = ' | ' + person.contractors.short_name;
    //else (person.contractors.short_name = '');
    //var user = person.users.login + ' (' + person.fam;
    //if (person.ima) user += ' ' + person.ima;
    //if (person.otch) user += ' ' + person.otch;
    //user += ')';
    var user = 'Здесь должен быть пользователь';
    var html =
        '<header>' +
            '<div class="info">' +
            '<div class="controls">' +
            '<span class="control-logout">' +
            '<a href="#" onclick="' +
            'Ext.ComponentQuery.query(\'[xtype=desktop.MainViewport]\')[0].fireEvent(\'programExit\')' +
            '">выйти</a>' +
            '</span>' +
            '</div>' +
            '<div class="user">' +
            '<span class="userlink">' +
            '<a href="#">' + user + '</a>' + //person.appointments.appointment + person.contractors.short_name +
            '</span>' +
            '</div>' +
            '</div>' +
            '<div class="left"></div>' +
            '<div class="right"></div>' +
            '<div class="container-wrapper"></div>' +
            '</header>';
    panel.update(html);
}