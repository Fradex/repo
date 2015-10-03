Ext.define('Main.controller.common.ButtonsContainer', {
    extend: 'Ext.app.Controller',

    views: ['common.ButtonsContainer'],

    init: function () {
        this.control({
            '[xtype=common.ButtonsContainer]': {
                beforerender: this.onLoad
            },
            '[xtype=common.ButtonsContainer] button': {
                click: this.onOpen
            }
        });
    },

    onLoad: function (cont) {
        if ((!cont.Names) || (!cont.Images) || (!cont.XTypes)) return;

        cont.up('panel').setLoading();
        for (var i = 0; i < cont.Names.length; i++) {
            var but = Ext.create('Ext.button.Button', {
                border: true,
                text: '<span class="icon-caption" style="bottom: 8px; position: absolute; text-align: center; width: 100%; left: 0">' + cont.Names[i] + '</span>',
                iconAlign: 'top',
                iconCls: 'icon-image ' + cont.Images[i] + ' main_buttons_icons',
                cls: ['icons', 'main_buttons'],
                nameXtype: cont.XTypes[i],
                margin: '20 0 0 20',
                border: false
            });
            cont.add(but);
        }
        cont.up('panel').setLoading(false);
    },

    onOpen: function (button) {
        if (!button.nameXtype) return;
        debugger;
        var mv = Main.utils.ControllerLoader.load('main.MainViewport');
        mv.onOpenWindow(button.up().up(), button.nameXtype, {
            mainCall: true
        });
    }
});