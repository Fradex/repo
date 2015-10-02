Ext.application({
    requires: ['Ext.container.Viewport'],
    name: 'Main',

    appFolder: 'Scripts/app',
    controllers: [
       'Main'
    ],

    launch: function() {
        Ext.create('Ext.container.Viewport', {
            layout: 'fit',
            items: {
                xtype: 'mainview'
            }
        });
    }
});