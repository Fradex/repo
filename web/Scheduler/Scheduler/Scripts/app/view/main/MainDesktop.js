Ext.define('Main.view.main.MainDesktop', {
    extend: 'Ext.panel.Panel',
    alias: 'widget.main.MainDesktop',
    id: 'MainDesktop',

    layout: {
        type: 'column'
    },

    initComponent: function () {
        var me = this;

        Ext.applyIf(me, {
            items: [
                {
                    xtype: 'container',
                    name: 'buttons',
                    height: 180,
                    layout: {
                        align: 'stretch',
                        type: 'hbox'
                    },
                    columnWidth: .80
                }
            ]
        });

        me.callParent(arguments);
    }
});