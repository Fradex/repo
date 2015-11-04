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


//Ext.define('Main.view.main.Main', {
//    extend: 'Ext.window.Window',
//    alias: 'widget.Main',
//    width: 400,
//    height: 400,
//    title: 'Main',
//    layout: 'fit',
//    constrain: true,
//    hidden: true,
//    initComponent: function () {
//        var me = this;
//        var calendarStore = Ext.create('Ext.calendar.data.MemoryCalendarStore', {
//            data: Ext.calendar.data.Calendars.getData()
//        });
//        var eventStore = Ext.create('Ext.calendar.data.MemoryEventStore', {
//            //data: Ext.calendar.data.Events.getData()
//        });
//        var cp = Ext.create('Ext.calendar.CalendarPanel', {
//            id: 'calendar-remote',
//            region: 'center',
//            eventStore: eventStore,
//            calendarStore: calendarStore,
//            title: 'Remote Calendar'
//        });

//        var win = Ext.apply(me, {
//            items: {
//                xtype: 'window',
//                layout: {
//                    type: 'fit'
//                },
//                title: 'Расписание',
//                closable: true,
//                bodyPadding: 0,
//                items: [
//                cp
//                ]
//            }
//        }).show();
//        me.callParent();
//    }
    
//});
