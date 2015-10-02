Ext.define('Main.controller.main.MainDesktop', {
    extend: 'Ext.app.Controller',
    views: ['main.MainDesktop'],
    init: function () {
        var me = this;
        this.control({
            '[xtype=main.MainDesktop]': {
                beforerender: this.onLoad
            }
        });
    },

    onLoad: function (panel) {
        debugger;
        var main = panel.up('[xtype=desktop.MainViewport]');
        var btnCont = panel.down('container[name=buttons]');
        console.log(1);
        var arms = [{ image_url: 'icon-image-8', controller: 'arm.Administrator', id: 1, arm_name: 'Администратор' }];
        for (var i in arms) {
            var but = Ext.create('Ext.button.Button', {
                xtype: 'button',
                border: true,
                text: '<span class="icon-caption" style="bottom: 8px; position: absolute; text-align: center; white-space: normal; width: 100%; left: 0">' + arms[i].arm_name + '</span>',
                iconAlign: 'top',
                iconCls: 'icon-image ' + arms[i].image_url + ' main_buttons_icons',
                cls: ['icons', 'main_buttons'],
                nameXtype: arms[i].controller,
                margin: '20 0 0 20',
                border: false,
                arm_id: arms[i].id,
                arm_name: arms[i].arm_name,
                height: 180
            });
            btnCont.add(but);
        }

    }
});