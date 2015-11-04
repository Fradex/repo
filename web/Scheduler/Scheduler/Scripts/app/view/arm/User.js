Ext.define('Main.view.arm.User', {
    extend: 'Ext.panel.Panel',
    alias: 'widget.arm.User',

    layout: {
        type: 'column'
    },


    initComponent: function () {
        var me = this;

        Ext.applyIf(me, {
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
                    Names: ['Расписание'],
                    Images: ['icon-image-20'],
                    XTypes: ['Schedule'],
                    columnWidth: .80
                }
            ]
        });

        me.callParent(arguments);
    }


});