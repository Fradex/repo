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
                {
                    xtype: 'toolbar',
                    dock: 'bottom',
                    cls: 'main_bottom_body',
                    height: 23,
                    items: [
                        '<div class="btn-toolbar" role="toolbar">Что-то можно написать:</span>',
                        {
                            xtype: 'tbtext',
                            text: 'Какой-то техт',
                            name: 'curPeriod',
                            cls: 'btn-group',
                            width: 300
                        },
                        {
                            xtype: 'container',
                            flex: 1
                        },
                        {
                            xtype: 'tbtext',
                            text: '[Версия программы]',
                            name: 'curVersion',
                            cls: 'btn-group',
                            width: 150
                        }
                    ]
                }
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