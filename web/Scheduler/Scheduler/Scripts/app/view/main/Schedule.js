Ext.define('Main.view.main.Schedule', {
    extend: 'Ext.window.Window',
    alias: 'widget.Schedule',
    width: 800,
    requires: ['Ext.toolbar.Paging'],
    height: 500,
    title: 'Расписания',
    layout: 'fit',
    constrain: true,
    hidden: true,
    initComponent: function () {
        var me = this;
        var store = Ext.create('Ext.data.Store', {
            autoLoad: true,
            fields: ['EndDate' , 'Id', 'Location', 'Notes',  'StartDate', 'Title', 'Type'],
            pageSize: 25, // items per page
            proxy: {
                type: 'ajax',
                url: 'Main/GetUserScheduleMobilesByUser',  // url that will load data with respect to start and limit params
                reader: {
                    type: 'json',
                    root: 'data',
                    totalProperty: 'total'
                }
            }
        });
        Ext.applyIf(me, {
            dockedItems: [
                {
                    xtype: 'pagingtoolbar',
                    store: store,   // same store GridPanel is using
                    dock: 'bottom',
                    displayInfo: true
                }
            ],
            items: [
                {
                    xtype: 'gridpanel',
                    width: 650,
                    store: store,
                    height: 300,
                    //store: 'ModelCars',
                    columns: [
                         {
                             xtype: 'gridcolumn',
                             text: 'Наименование',
                             dataIndex: 'Title',
                             flex: 3
                         },
                         {
                             xtype: 'datecolumn',
                             text: 'Дата начала события',
                             dataIndex: 'StartDate',
                             flex: 2,
                             format: 'd.m.Y'
                         },
                          {
                              xtype: 'gridcolumn',
                              text: 'Дата окончания события',
                              dataIndex: 'EndDate',
                              flex: 2,
                              format: 'd.m.Y'
                          },
                         {
                             text: 'Тип',
                             dataIndex: 'Type',
                             flex: 2
                         },
                         {
                             text: 'Комментарий',
                             dataIndex: 'Notes',
                             flex: 2
                         },
                         {
                             text: 'Место положения',
                             dataIndex: 'Location',
                             flex: 2
                         }
                    ]
                }
            ]
        });

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
