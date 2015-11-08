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
        Ext.applyIf(me, {
            html:
            '<nav class="navbar navbar-inverse navbar-fixed-top">' +
            '  <div class="container-fluid">' +
                '<ul class="nav navbar-nav navbar-left">' +
                    '<li><a href="#" onclick="' +
                  'Ext.ComponentQuery.query(\'[xtype=main.MainViewport]\')[0].fireEvent(\'showMainDesktop\')">' +
                  '<span class="glyphicon glyphicon-home"></span> Назад на главную </a></li>' +
                  '</ul>' +
                 '<ul class="nav navbar-nav navbar-right">' +
                    '<li><a href="#"onclick="Ext.ComponentQuery.query(\'[xtype=main.MainViewport]\')[0].fireEvent(\'OpenUser\')"' +
                    '><span class="glyphicon glyphicon-user"></span> Пользователь </a></li>' +
                    '<li><a href="#" onclick="' +
                    'Ext.ComponentQuery.query(\'[xtype=main.MainViewport]\')[0].fireEvent(\'programExit\')' +
                    '"></input>' + '<span class="glyphicon glyphicon-log-in"></span> Выйти </a></li>' +
                  '</ul>' +
            '</nav>',
            items: [
                {
                    xtype: 'panel',
                    border: false,
                    name: 'subsystem'
                }
            ]
        });
        me.callParent(arguments);
    }

});