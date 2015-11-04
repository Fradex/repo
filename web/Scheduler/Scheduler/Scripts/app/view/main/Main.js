Ext.define('Main.view.main.Main', {
    extend: 'Ext.window.Window',
    alias: 'widget.Main',
    width: 400,
    height: 400,
    title: 'Main',
    layout: 'fit',
    constrain: true,
    hidden: true,
    initComponent: function () {
        this.callParent(arguments);
    }
});
