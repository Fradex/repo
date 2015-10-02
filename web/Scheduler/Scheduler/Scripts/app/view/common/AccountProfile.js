Ext.define('Main.view.common.AccountProfile', {
    extend: 'Ext.panel.Panel',
    alias: 'widget.common.AccountProfile',
    layout: {
        type: 'absolute'
    },
    border: false,

    bodyCls: 'main_header',
    height: 55,
    fio: '',

    initComponent: function () {
        var me = this;

        Ext.applyIf(me, {
            html:
                '<header>' +
                    '<div class="info">' +
                    '<div class="controls">' +
                    '<span class="control-logout">' +
                    '<input type="button" value="Выйти" class="close" href="#" onclick="' +
                    'Ext.ComponentQuery.query(\'[xtype=main.MainViewport]\')[0].fireEvent(\'programExit\')' +
                    '"></input>' +
                    '</span>' +
                    '</div>' +
                    '<div class="user">' +
                    '<span class="userlink">' +
                    '<a href="#">' + this.fio + '</a>  | ' +
                    '</span>' +
                    '</div>' +
                    '</div>' +
                    '<div class="left"></div>' +
                    '<div class="right"></div>' +
                    '<div class="container-wrapper"></div>' +
                    '</header>',
            items: [
                {
                    xtype: 'panel',
                    border: false,
                    html: '<header><span class="back"><input type="button" value="Назад на главную" class="close" href="#" onclick="' +
                        'Ext.ComponentQuery.query(\'[xtype=main.MainViewport]\')[0].fireEvent(\'showMainDesktop\')' +
                        '"></input></span></header>',
                    name: 'backLinkPanel'
                },
                {
                    xtype: 'panel',
                    border: false,
                    name: 'subsystem'
                },
                {
                    xtype: 'panel',
                    border: false,
                    html: '<header><a href="#" onclick="' +
                        'Ext.ComponentQuery.query(\'[xtype=main.MainViewport]\')[0].fireEvent(\'showMainDesktop\')' +
                        '"></a></header>',
                    name: 'mainImagePanel'
                }
            ]
        });
        me.callParent(arguments);
    }

});