Ext.define('Main.view.main.UserList', {
    extend: 'Ext.window.Window',
    alias: 'widget.UserList',
    width: 700,
    requires: ['Ext.toolbar.Paging'],
    height: 500,
    title: 'Пользователи',
    layout: 'fit',
    constrain: true,
    hidden: true,
    initComponent: function () {
        var me = this;
        var store = Ext.create('Ext.data.Store', {
            autoLoad: true,
            fields: ['UserName', 'Id', 'DateRegister', 'UserRole'],
            pageSize: 25, // items per page
            proxy: {
                type: 'ajax',
                url: 'Main/GetUsers',  // url that will load data with respect to start and limit params
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
                             text: 'Имя',
                             sortable: true,
                             dataIndex: 'UserName',
                             flex: 3
                         },
                         {
                             xtype: 'datecolumn',
                             text: 'Дата регистрации',
                             sortable: true,
                             dataIndex: 'DateRegister',
                             flex: 2
                         },
                         {
                             text: 'Роль',
                             sortable: true,
                             dataIndex: 'UserRole',
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
