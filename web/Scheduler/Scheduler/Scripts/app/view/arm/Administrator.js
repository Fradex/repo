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
                    Names: ['Календарь'],
                    Images: ['icon-image-20'],
                    XTypes: ['Main'],
                    columnWidth: .80
                }
            ]
        });

        me.callParent(arguments);
    }


});