Ext.define('Main.view.arm.Administrator', {
    extend: 'Ext.panel.Panel',
    alias: 'widget.arm.Administrator',

    layout: {
        type: 'column'
    },


    initComponent: function () {
        var me = this;

        Ext.applyIf(me, {
            layout: 'hbox',
            dockedItems: [
                {
                    cls: 'btn-toolbar',
                    xtype: 'toolbar',
                    dock: 'bottom',
                    name: 'decktopTBar',
                    height: 50
                }
            ],
            items: [
                {
                    xtype: 'common.ButtonsContainer',
                    Names: ['Пользователи', 'Расписание','Расписания всех</br> пользователей'],
                    Images: ['icon-image-9', 'icon-image-20', 'icon-image-5'],
                    XTypes: ['UserList', 'Schedule', 'UsersSchedules'],
                    columnWidth: .80
                }
            ]
        });

        me.callParent(arguments);
    }
});