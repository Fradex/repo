Ext.define('Main.controller.Main', {
    extend: 'Ext.app.Controller',
    views: [
        'main.Main'
    ],
    init: function () {
        this.control({
            'viewport > panel': {
                render: this.onPanelRendered
            }
        });
    },

    onPanelRendered: function () {
        alert('Готово');
    }
});