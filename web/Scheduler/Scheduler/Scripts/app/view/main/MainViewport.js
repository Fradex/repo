Ext.define('Main.view.main.MainViewport', {
    extend: 'Ext.panel.Panel',
    alias: 'widget.main.MainViewport',

    layout: {
        type: 'anchor'
    },

    initComponent: function () {
        var me = this;

        Ext.applyIf(me, {
            dockedItems: [
                //{
                //    xtype: 'toolbar',
                //    dock: 'bottom',
                //    height: 23,
                //    items: [
                //        '<div class="navbar-fixed-bottom row-fluid"></div>',
                //        {
                //            xtype: 'tbtext',
                //            text: 'Какой-то техт',
                //            name: 'curPeriod',
                //            cls: '',
                //            width: 300
                //        },
                //        {
                //            xtype: 'container',
                //            flex: 1
                //        },
                //        {
                //            xtype: 'tbtext',
                //            text: '[Версия программы]',
                //            name: 'curVersion',
                //            cls: '',
                //            width: 150
                //        }
                //    ]
                //}
            ],
            items: [
                {
                    xtype: 'common.AccountProfile'
                }
            ]
        });

        me.callParent(arguments);
    }
});