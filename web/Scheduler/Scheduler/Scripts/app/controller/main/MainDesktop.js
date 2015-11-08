Ext.define('Main.controller.main.MainDesktop', {
    extend: 'Ext.app.Controller',
    views: ['main.MainDesktop'],
    requires: [
     'Ext.grid.*',
    'Ext.data.*',
    'Ext.util.*',
    'Ext.toolbar.Paging',
    'Ext.tip.QuickTipManager',
    'Ext.tab.Panel',

    'Ext.calendar.data.MemoryEventStore',
    'Ext.calendar.data.MemoryCalendarStore',
    'Ext.calendar.CalendarPanel',
    'Ext.calendar.data.CalendarMappings',
    'Ext.calendar.data.EventMappings',
    //data
    'Ext.calendar.data.Calendars',
    'Ext.calendar.data.Events'
    ],
    init: function () {
        var me = this;
        this.control({
            '[xtype=main.MainDesktop]': {
                beforerender: this.onLoad
            }
        });
    },

    onLoad: function (panel) {
        var me = this,
            main = panel.up('[xtype=desktop.MainViewport]'),
            btnCont = panel.down('container[name=buttons]');
        Ext.Ajax.request({
            url: 'Main/GetUserRole',
            method: 'GET',
            failure: function () {
                el.unmask();
                Ext.MessageBox.show({ title: 'Ошибка', msg: 'Не удалось выполнить запрос', buttons: Ext.MessageBox.OK }); return;
            },
            success: function (response) {
                debugger;
                var arms = Ext.decode(response.responseText).data;
                var but = Ext.create('Ext.button.Button', {
                    xtype: 'button',
                    text: '<span class="icon-caption" style="bottom: 8px; color:"red" position: absolute; text-align: center; white-space: normal; width: 100%; left: 0">' + arms.ArmName + '</span>',
                    iconAlign: 'top',
                    iconCls: 'icon-image ' + arms.ImageUrl + ' main_buttons_icons',
                    cls: ['icons', 'main_buttons'],
                    nameXtype: arms.Controller,
                    margin: '20 0 0 20',
                    border: false,
                    arm_id: arms.Id,
                    arm_name: arms.ArmName,
                    height: 180
                });
                btnCont.add(but);
            }
        });
    }
});