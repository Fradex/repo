Ext.define('Main.view.arm.Administrator', {
    extend: 'Ext.panel.Panel',
    alias: 'widget.arm.Administrator',

    layout: {
        type: 'column'
    },


    initComponent: function () {
        var me = this;

        Ext.applyIf(me, {
            dockedItems: [
                {
                    xtype: 'toolbar',
                    dock: 'bottom',
                    name: 'decktopTBar',
                    height: 35
                }
            ],
            items: [
                {
                    xtype: 'common.ButtonsContainer',
                    Names: ['Пользователи'],
                    Images: ['icon-image-8'],
                    XTypes: ['Main'],
                    columnWidth: .80
                }
            ]
        });

        me.callParent(arguments);
    }


});