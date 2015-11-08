Ext.define('Main.view.common.AccountProfile', {
    extend: 'Ext.panel.Panel',
    alias: 'widget.common.AccountProfile',
    layout: {
        type: 'absolute'
    },
    border: false,
    fio: '',

    initComponent: function () {
        var me = this;
        var ajax = Ext.Ajax.request({
            url: 'Main/GetUserScheduleByUserId',
            method: 'GET',
            failure: function () {
                el.unmask();
                Ext.MessageBox.show({ title: 'Ошибка', msg: 'Не удалось выполнить запрос', buttons: Ext.MessageBox.OK }); return;
            },
            success: function (response) {
                var result = Ext.decode(response.responseText);
             
            }
        });
        Ext.applyIf(me, {
            html:
                //'<nav class="navbar navbar-inverse navbar-fixed-top" style="width:200px;">' +
                //    '<div class="container-fluid">' +
                //     '<span><input type="button" value="Назад на главную" class="btn btn-info" href="Main" onclick="' +
                //        'Ext.ComponentQuery.query(\'[xtype=main.MainViewport]\')[0].fireEvent(\'showMainDesktop\')' +
                //        '"></input></span>' +

                //    '<span>' +
                //    '<input type="button" value="Выйти" class="btn btn-primary" href="Login" onclick="' +
                //    'Ext.ComponentQuery.query(\'[xtype=main.MainViewport]\')[0].fireEvent(\'programExit\')' +
                //    '"></input>' +
                //     '</span>' +
                //      '</div>' +

                //    //'<div class="user">' +
                //    //'<span class="userlink">' +
                //    //'<a href="#">' + this.fio + '</a>  | ' +
                //    //'</span>' +
                //    //'</div>' +
                //    //'</div>' +
                //    //'<div class="left"></div>' +
                //    //'<div class="right"></div>' +
                //    //'<div class="container-wrapper"></div>' +
                //    '</nav>',

            '<nav class="navbar navbar-inverse navbar-fixed-top">' +
            '  <div class="container-fluid">' +
                '<ul class="nav navbar-nav navbar-left">' +
                    '<li><a href="#" onclick="' +
                  'Ext.ComponentQuery.query(\'[xtype=main.MainViewport]\')[0].fireEvent(\'showMainDesktop\')">' +
                  '<span class="glyphicon glyphicon-home"></span> Назад на главную </a></li>' +
                  '</ul>' +
                 '<ul class="nav navbar-nav navbar-right">'+
                    '<li><a href="#"onclick="' +
                    'Ext.ComponentQuery.query(\'[xtype=main.MainViewport]\')[0].fireEvent(\'programExit\')' +
                    '><span class="glyphicon glyphicon-user"></span> Пользователь </a></li>' +
                    '<li><a href="#" onclick="' +
                    'Ext.ComponentQuery.query(\'[xtype=main.MainViewport]\')[0].fireEvent(\'programExit\')' +
                    '"></input>' +'<span class="glyphicon glyphicon-log-in"></span> Выйти </a></li>'+
                  '</ul>'+
            '</nav>',
            items: [
                {
                    xtype: 'panel',
                    border: false,
                    name: 'subsystem'
                },
                //{
                //    xtype: 'panel',
                //    border: false,
                //    html: '<nav class="navbar navbar-inverse navbar-fixed-top"><a href="#" onclick="' +
                //        'Ext.ComponentQuery.query(\'[xtype=main.MainViewport]\')[0].fireEvent(\'showMainDesktop\')' +
                //        '"></a></nav>',
                //    name: 'mainImagePanel'
                //}
            ]
        });
        me.callParent(arguments);
    }

});