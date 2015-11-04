Ext.define('Main.view.main.MainDesktop', {
    extend: 'Ext.panel.Panel',
    alias: 'widget.main.MainDesktop',
    id: 'MainDesktop',

    layout: {
        type: 'column'
    },

    initComponent: function () {
        var me = this;
        // Minor workaround for OSX Lion scrollbars
        this.checkScrollOffset();

        // This is an example calendar store that enables event color-coding
        this.calendarStore = Ext.create('Ext.calendar.data.MemoryCalendarStore', {
            data: Ext.calendar.data.Calendars.getData()
        });
        var height = Ext.getBody().getViewSize().height / 1.4,
            width = Ext.getBody().getViewSize().width / 1.8;
        // A sample event store that loads static JSON from a local file. Obviously a real
        // implementation would likely be loading remote data via an HttpProxy, but the
        // underlying store functionality is the same.
        this.eventStore = Ext.create('Ext.calendar.data.MemoryEventStore', {
            //data: Ext.calendar.data.Events.getData()
        });
        this.eventStore.loadData(Ext.calendar.data.Events.getData(), false);
        this.eventStore.initRecs();
        Ext.Ajax.request({
            url: '/Main/GetUserScheduleByUserId',
            method: 'GET',
            failure: function () {
                el.unmask();
                Ext.MessageBox.show({ title: 'Ошибка', msg: 'Не удалось выполнить запрос', buttons: Ext.MessageBox.OK }); return;
            },
            success: function (response) {
                var result = Ext.decode(response.responseText);
                me.eventStore.removeAll();
                Ext.each(result.data, function (item) {
                    item.EndDate = new Date(item.EndDate.match(/\d+/)[0] * 1);
                    item.StartDate = new Date(item.StartDate.match(/\d+/)[0] * 1);
                    me.eventStore.add(item);
                });
                me.eventStore.load();
            }
        });
        var config = {

        };
        Ext.applyIf(me, {
            //layout: 'relative',
            layout: 'absolute',
            headers: { 'Content-Type': 'multipart/form-data; charset=UTF-8' },
            items: [
                {
                    xtype: 'container',
                    name: 'buttons',
                    height: 180,
                    layout: {
                        align: 'stretch',
                        type: 'hbox'
                    },
                    columnWidth: .80
                },
                {
                    xtype: 'panel',
                    id: 'calendar',
                    dock: 'right',
                    title: "Календарь",
                    width: width,
                    height: height,
                    maxHeight: 600,
                    maxWidth: 1024,
                    resizable: true,
                    animCollapse: true,
                    closeAction: 'hide',
                    collapsible: true,
                    border: true,
                    constrain: true,
                    constrainHeader: true,
                    layout: 'fit',
                    items: [
                        {
                            id: 'app-center',
                            title: '...', // will be updated to the current view's date range
                            region: 'center',
                            layout: 'border',
                            listeners: {
                                'afterrender': function () {
                                    Ext.getCmp('app-center').header.addCls('app-center-header');
                                }
                            },
                            items: [
                                 {
                                     xtype: 'container',
                                     id: 'app-west',
                                     region: 'west',
                                     width: 214,
                                     items: [
                                         {
                                             xtype: 'datepicker',
                                             id: 'app-nav-picker',
                                             cls: 'ext-cal-nav-picker',
                                             listeners: {
                                                 'select': {
                                                     fn: function (dp, dt) {
                                                         Ext.getCmp('app-calendar').setStartDate(dt);
                                                     },
                                                     scope: this
                                                 }
                                             }
                                         },
                                         {
                                             margin: 15,
                                             xtype: 'button',
                                             text: 'Синхронизировать',
                                             style: {
                                                 background: 'green'
                                             },
                                             listeners: {
                                                 'click': {
                                                     fn: function (dp, dt) {
                                                         var schedules = Ext.JSON.encode(me.eventStore.getRange().map(function (item) {
                                                             return {
                                                                 CalendarId: item.data.CalendarId,
                                                                 EndDate: item.data.EndDate,
                                                                 IsAllDay: item.data.IsAllDay,
                                                                 Location: item.data.Location,
                                                                 Notes: item.data.Notes,
                                                                 Reminder: item.data.Reminder,
                                                                 StartDate: item.data.StartDate,
                                                                 Title: item.data.Title,
                                                                 Url: item.data.Url,
                                                                 Id: item.data.Id
                                                             };
                                                         }));

                                                         var el = Ext.getCmp('calendar').getEl();
                                                         el.mask('Синхронизация');

                                                         Ext.Ajax.request({
                                                             url: '/Main/SaveListUserSchedule',
                                                             method: 'POST',
                                                             jsonData: schedules,
                                                             failure: function () {
                                                                 el.unmask();
                                                                 Ext.MessageBox.show({ title: 'Ошибка', msg: 'Не удалось выполнить запрос', buttons: Ext.MessageBox.OK }); return;
                                                             },
                                                             success: function (response) {
                                                                 Ext.Ajax.request({
                                                                     url: '/Main/GetUserScheduleByUserId',
                                                                     method: 'GET',
                                                                     failure: function () {
                                                                         el.unmask();
                                                                         Ext.MessageBox.show({ title: 'Ошибка', msg: 'Не удалось выполнить запрос', buttons: Ext.MessageBox.OK }); return;
                                                                     },
                                                                     success: function (response) {
                                                                         var result = Ext.decode(response.responseText);
                                                                         me.eventStore.removeAll();
                                                                         Ext.each(result.data, function (item) {
                                                                             item.EndDate = new Date(item.EndDate.match(/\d+/)[0] * 1);
                                                                             item.StartDate = new Date(item.StartDate.match(/\d+/)[0] * 1);
                                                                             me.eventStore.add(item);
                                                                         });
                                                                         el.unmask();
                                                                         Ext.MessageBox.show({ title: 'Оповещение', msg: 'Данные успешно синхронизированны', buttons: Ext.MessageBox.OK });
                                                                     }
                                                                 });
                                                             }
                                                         });

                                                     },
                                                     scope: this
                                                 }
                                             }
                                         }]
                                 },
                                {
                                    border: false,
                                    id: 'app-calendar',
                                    region: 'center',
                                    xtype: 'calendarpanel',
                                    dayText: 'День',
                                    weekText: 'Неделя',
                                    monthText: 'Месяц',
                                    //eventStore: Ext.create('Ext.calendar.data.MemoryEventStore', {
                                    //    // ######## This following line causes the error.
                                    //    data: Ext.create('Ext.calendar.data.Events')
                                    //}),
                                    eventStore: this.eventStore,
                                    calendarStore: this.calendarStore,
                                    activeItem: 3, // month view

                                    monthViewCfg: {
                                        showHeader: true,
                                        showWeekLinks: true,
                                        showWeekNumbers: true
                                    },

                                    listeners: {
                                        'eventclick': {
                                            fn: function (vw, rec, el) {
                                                this.showEditWindow(rec, el);
                                                this.clearMsg();
                                            },
                                            scope: this
                                        },
                                        'eventover': function (vw, rec, el) {
                                            //console.log('Entered evt rec='+rec.data.Title+', view='+ vw.id +', el='+el.id);
                                        },
                                        'eventout': function (vw, rec, el) {
                                            //console.log('Leaving evt rec='+rec.data.Title+', view='+ vw.id +', el='+el.id);
                                        },
                                        'eventadd': {
                                            fn: function (cp, rec) {
                                                this.showMsg('Событие ' + rec.data.Title + ' было добавлено');
                                            },
                                            scope: this
                                        },
                                        'eventupdate': {
                                            fn: function (cp, rec) {
                                                this.showMsg('Событие ' + rec.data.Title + ' было изменено');
                                            },
                                            scope: this
                                        },
                                        'eventcancel': {
                                            fn: function (cp, rec) {
                                                // edit canceled
                                            },
                                            scope: this
                                        },
                                        'viewchange': {
                                            fn: function (p, vw, dateInfo) {
                                                if (this.editWin) {
                                                    this.editWin.hide();
                                                }
                                                if (dateInfo) {
                                                    // will be null when switching to the event edit form so ignore
                                                    Ext.getCmp('app-nav-picker').setValue(dateInfo.activeDate);
                                                    this.updateTitle(dateInfo.viewStart, dateInfo.viewEnd);
                                                }
                                            },
                                            scope: this
                                        },
                                        'dayclick': {
                                            fn: function (vw, dt, ad, el) {
                                                this.showEditWindow({
                                                    StartDate: dt,
                                                    IsAllDay: ad
                                                }, el);
                                                this.clearMsg();
                                            },
                                            scope: this
                                        },
                                        'rangeselect': {
                                            fn: function (win, dates, onComplete) {
                                                this.showEditWindow(dates);
                                                this.editWin.on('hide', onComplete, this, { single: true });
                                                this.clearMsg();
                                            },
                                            scope: this
                                        },
                                        'eventmove': {
                                            fn: function (vw, rec) {
                                                var mappings = Ext.calendar.data.EventMappings,
                                                    time = rec.data[mappings.IsAllDay.name] ? '' : ' \\a\\t g:i a';

                                                rec.commit();

                                                this.showMsg('Event ' + rec.data[mappings.Title.name] + ' was moved to ' +
                                                    Ext.Date.format(rec.data[mappings.StartDate.name], ('F jS' + time)));
                                            },
                                            scope: this
                                        },
                                        'eventresize': {
                                            fn: function (vw, rec) {
                                                rec.commit();
                                                this.showMsg('Event ' + rec.data.Title + ' was updated');
                                            },
                                            scope: this
                                        },
                                        'eventdelete': {
                                            fn: function (win, rec) {
                                                this.eventStore.remove(rec);
                                                this.showMsg('Event ' + rec.data.Title + ' was deleted');
                                            },
                                            scope: this
                                        },
                                        'initdrag': {
                                            fn: function (vw) {
                                                if (this.editWin && this.editWin.isVisible()) {
                                                    this.editWin.hide();
                                                }
                                            },
                                            scope: this
                                        }
                                    }

                                }]
                        }]
                }
            ]
        });

        me.callParent(arguments);
    },
    // The edit popup window is not part of the CalendarPanel itself -- it is a separate component.
    // This makes it very easy to swap it out with a different type of window or custom view, or omit
    // it altogether. Because of this, it's up to the application code to tie the pieces together.
    // Note that this function is called from various event handlers in the CalendarPanel above.
    showEditWindow: function (rec, animateTarget) {
        if (!this.editWin) {
            this.editWin = Ext.create('Ext.calendar.form.EventWindow', {
                title: 'Событие',
                titleTextAdd: 'Добавить событие',
                titleTextEdit: 'Редактировать событие',
                overrideWhen: 'Когда',
                overrideTitle: 'Наименование',
                overridetitleField: 'Наименование события',
                overrideReminder: 'Напоминание',
                overrideNotes: 'Комментарий',
                overideLocation: 'Место',
                overrideWebLink: 'Ссылка',
                modal: true,
                EditDetails: 'Редактировать...',
                calendarStore: this.calendarStore,
                DeleteEvent: 'Удалить событие',
                Save: 'Сохранить',
                Cancel: 'Закрыть',
                listeners: {
                    'eventadd': {
                        fn: function (win, rec) {
                            win.hide();
                            rec.data.IsNew = false;
                            this.eventStore.add(rec);
                            this.eventStore.sync();
                            this.showMsg('Event ' + rec.data.Title + ' was added');
                        },
                        scope: this
                    },
                    'eventupdate': {
                        fn: function (win, rec) {
                            win.hide();
                            rec.commit();
                            this.eventStore.sync();
                            this.showMsg('Event ' + rec.data.Title + ' was updated');
                        },
                        scope: this
                    },
                    'eventdelete': {
                        fn: function (win, rec) {
                            this.eventStore.remove(rec);
                            this.eventStore.sync();
                            win.hide();
                            this.showMsg('Event ' + rec.data.Title + ' was deleted');
                        },
                        scope: this
                    },
                    'editdetails': {
                        fn: function (win, rec) {
                            win.hide();
                            Ext.getCmp('app-calendar').showEditForm(rec);
                        }
                    }
                }
            });
        }
        this.editWin.show(rec, animateTarget);
    },

    // The CalendarPanel itself supports the standard Panel title config, but that title
    // only spans the calendar views.  For a title that spans the entire width of the app
    // we added a title to the layout's outer center region that is app-specific. This code
    // updates that outer title based on the currently-selected view range anytime the view changes.
    updateTitle: function (startDt, endDt) {
        var p = Ext.getCmp('app-center'),
            fmt = Ext.Date.format;

        if (Ext.Date.clearTime(startDt).getTime() == Ext.Date.clearTime(endDt).getTime()) {
            p.setTitle(fmt(startDt, 'F j, Y'));
        }
        else if (startDt.getFullYear() == endDt.getFullYear()) {
            if (startDt.getMonth() == endDt.getMonth()) {
                p.setTitle(fmt(startDt, 'F j') + ' - ' + fmt(endDt, 'j, Y'));
            }
            else {
                p.setTitle(fmt(startDt, 'F j') + ' - ' + fmt(endDt, 'F j, Y'));
            }
        }
        else {
            p.setTitle(fmt(startDt, 'F j, Y') + ' - ' + fmt(endDt, 'F j, Y'));
        }
    },

    // This is an application-specific way to communicate CalendarPanel event messages back to the user.
    // This could be replaced with a function to do "toast" style messages, growl messages, etc. This will
    // vary based on application requirements, which is why it's not baked into the CalendarPanel.
    showMsg: function (msg) {
        //Ext.fly('app-msg').update(msg).removeCls('x-hidden');
    },
    clearMsg: function () {
        //Ext.fly('app-msg').update('').addCls('x-hidden');
    },

    // OSX Lion introduced dynamic scrollbars that do not take up space in the
    // body. Since certain aspects of the layout are calculated and rely on
    // scrollbar width, we add a special class if needed so that we can apply
    // static style rules rather than recalculate sizes on each resize.
    checkScrollOffset: function () {
        var scrollbarWidth = Ext.getScrollbarSize ? Ext.getScrollbarSize().width : Ext.getScrollBarWidth();

        // We check for less than 3 because the Ext scrollbar measurement gets
        // slightly padded (not sure the reason), so it's never returned as 0.
        if (scrollbarWidth < 3) {
            Ext.getBody().addCls('x-no-scrollbar');
        }
        if (Ext.isWindows) {
            Ext.getBody().addCls('x-win');
        }
    }
},
function () {
    /*
     * A few Ext overrides needed to work around issues in the calendar
     */

    Ext.form.Basic.override({
        reset: function () {
            var me = this;
            // This causes field events to be ignored. This is a problem for the
            // DateTimeField since it relies on handling the all-day checkbox state
            // changes to refresh its layout. In general, this batching is really not
            // needed -- it was an artifact of pre-4.0 performance issues and can be removed.
            //me.batchLayouts(function() {
            me.getFields().each(function (f) {
                f.reset();
            });
            //});
            return me;
        }
    });

    // Currently MemoryProxy really only functions for read-only data. Since we want
    // to simulate CRUD transactions we have to at the very least allow them to be
    // marked as completed and successful, otherwise they will never filter back to the
    // UI components correctly.
    Ext.data.MemoryProxy.override({
        updateOperation: function (operation, callback, scope) {
            operation.setCompleted();
            operation.setSuccessful();
            Ext.callback(callback, scope || this, [operation]);
        },
        create: function () {
            this.updateOperation.apply(this, arguments);
        },
        update: function () {
            this.updateOperation.apply(this, arguments);
        },
        destroy: function () {
            this.updateOperation.apply(this, arguments);
        }
    });
});