Ext.Loader.setConfig({
    enabled: true
});

Ext.application({
    name: 'Main',
    appFolder: 'Scripts/ext/system',

    launch: function () {
        Ext.create('Ext.container.Viewport', {
            layout: 'fit',
            padding: 0,
            items: [
                {
                    xtype: 'panel',
                    border: false,
                    html: '<header class="compact"><div class="left"></div><div class="right"></div><div class="container-wrapper"></div></header><div class="background-image background-image-left-bottom"></div><div class="background-image background-image-right-bottom"></div><footer></footer>',
                    bodyCls: 'html_body_2',
                    margin: 0,
                    name: 'loginPanel'
                }
            ]
        }).show();
        this.getController('Main.controller.login.Login');
    }
});