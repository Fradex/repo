Ext.Loader.setConfig({
    enabled: true
});

Ext.application({
    requires: ['Ext.container.Viewport'],
    name: 'Main',

    appFolder: 'Scripts/app',
    controllers: [
       'main.MainViewport',
       'main.MainDesktop'
    ],

    launch: function () {
        Main.utils.ControllerLoader.app = this;
        Ext.create('Ext.container.Viewport', {
            layout: 'fit',
            items: [
                {
                    xtype: 'main.MainViewport'
                }
            ]
        });
    }
});