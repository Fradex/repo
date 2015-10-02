Ext.define('Main.controller.arm.Administrator', {
    extend: 'Ext.app.Controller',

    views: ['arm.Administrator'],

    init: function () {
        this.control({
            '[xtype=arm.Administrator]': {
                show: this.onLoad,
                beforerender: this.onLoad
            }
        });
    },

    onLoad: function (win) {
    }
});