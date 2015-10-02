Ext.application({
    requires: ['Ext.container.Viewport'],
    name: 'Main',

    appFolder: 'Scripts/app',
    controllers: [
       'Main'
    ],

    launch: function() {
        Ext.create('Main.viewport.Portal');
    }
});