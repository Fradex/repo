Ext.define('Main.controller.arm.User', {
    extend: 'Ext.app.Controller',

    views: ['arm.User'],

    init: function () {
        this.control({
            '[xtype=arm.User]': {
                show: this.onLoad,
                beforerender: this.onLoad
            }
        });
    },

    onLoad: function (win) {
    }
});