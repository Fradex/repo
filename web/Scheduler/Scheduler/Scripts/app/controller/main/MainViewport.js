Ext.define('Main.controller.main.MainViewport', {
    extend: 'Ext.app.Controller',

    requires: ['Main.utils.ControllerLoader'],
    controllers: ['common.AccountProfile', 'common.ButtonsContainer'],
    views: ['main.MainViewport'],

    openDesktops: undefined, // коллекция открытых рабочих столов (армов)
    currentDesktop: undefined, // текущий рабочий стол
    lastActivateWindow: undefined, // последнее активное окно

    init: function () {
        var _this = this;

        this.openDesktops = new Ext.util.MixedCollection();

        // контектное меню для кнопок тулбара на рабочем столе
        this.contextMenu = new Ext.menu.Menu({
            cls: 'btn-group',
            items: [
                {
                    cls: "btn btn-default btn-xs dropdown-toggle",
                    text: 'Закрыть все окна',
                    handler: function (btn) {
                        var tbar = _this.currentDesktop.down('toolbar[name=decktopTBar]');
                        var button;
                        while (button = tbar.down('button')) {
                            button.win.close();
                        }
                    }
                },
                {
                    cls: "btn btn-default btn-xs dropdown-toggle",
                    text: 'Закрыть окно',
                    handler: function (btn) {
                        btn.up().win.close();
                    }
                }
            ]
        });

        this.control({
            '[xtype=main.MainViewport]': {
                loadArms: this.onLoad,
                showMainDesktop: function () {
                    debugger;
                    this.onShowMainDesktop(this.currentDesktop.up('[xtype=main.MainViewport]'));
                },
                programExit: this.on_ProgramExit,
                afterrender: function (view) {
                    debugger;
                    view.fireEvent('loadArms', view);
                }
            },
            '[xtype=main.MainDesktop] button': {
                click: this.onSubsystemSelect
            },
            // общие методы
            // для всех окон
            'window': {
                close: this.onDelFromOpenedWindows,
                show: function (win) {
                    if (win.tbut) win.tbut.toggle(true, true);
                },
                hide: function (win) {
                    if (win.tbut) win.tbut.toggle(false, true);
                },
                activate: function (win) {
                    if (!win.tbut) return;
                    if (this.lastActivateWindow) {
                        this.lastActivateWindow.tbut.setBorder(1);
                        this.lastActivateWindow.tbut.setText(this.lastActivateWindow.text_minimize);
                    }
                    this.lastActivateWindow = win;
                    win.tbut.setBorder(2);
                    win.tbut.setText('<b>' + win.text_minimize + '</b>');
                }
            },
            // для всех кнопок
            'button[action=closeWindow]': {
                click: function (button) {
                    button.up('window').close();
                }
            },
            'button[action=closePanel]': {
                click: function (button) {
                    button.up('panel').close();
                }
            }
        });
    },

    onLoad: function (main) {
        this.onShowMainDesktop(main);
    },

    onShowMainDesktop: function (main) {
        this.onOpenDesktop(main, 'main.MainDesktop');
    },

    onOpenDesktop: function (main, xtype, arm_id, arm_name) {
        if (!xtype || xtype == "") return;

        if (this.currentDesktop) {
            if (this.currentDesktop.xtype == xtype) {
                return this.currentDesktop;
            } else {
                this.currentDesktop.hide();
            }
        }

        //main.setLoading();

        var panel = this.openDesktops.get(xtype);

        if (arm_id) {
            main.down('panel[name=subsystem]').update('<header><span class="subsystem">Подсистема: <b>' + arm_name + '</b></span></header>');
        } else {
            main.down('panel[name=subsystem]').update('<header><span class="subsystem"></span></header>');
        }

        if (!panel) {

            Main.utils.ControllerLoader.load(xtype);

            var style = '';
            if (arm_id) style = 'style=\"bottom:58px;color:red\"';
            panel = Ext.widget(xtype, {
                anchor: '0 -50',
                bodyCls: ['html_body_1', 'html_body_2'],
                html: '<div ' + style + ' class="btn-group" role="group"></div>' +
                '<div ' + style + ' class="background-image background-image-right-bottom"></div>' +
                '<a class="background-image-sakha main_bgicon_right"></a><div class="long-logo main_bgicon_right"></div>',
                border: false,
                arm_id: arm_id
            });
            main.add(panel);
            this.openDesktops.add(xtype, panel);
        }

        panel.show();
        this.currentDesktop = panel;
        //if (main.accountLoaded)
        main.setLoading(false);
        return this.currentDesktop;
    },

    onSubsystemSelect: function (button) {
        this.onOpenDesktop(button.up('[xtype=main.MainViewport]'), button.nameXtype, button.arm_id, button.arm_name);
    },

    on_ProgramExit: function () {
        var _this = this;
        Ext.create('Ext.window.MessageBox', {
            buttonText: {
                yes: 'Да',
                no: 'Нет'
            },
            border: true
        }).confirm('Завершение работы', 'Завершить работу и выйти системы?', function (button) {
            if (button !== 'yes') return;

            _this.closeAll();
        });
    },

    closeAll: function (alreadyLogOff) {
        var _this = this;
        var mainPanel = _this.currentDesktop.up('[xtype=main.MainViewport]');
        var view = mainPanel.up('viewport');
        view.getEl().mask('Выход...');

        if (!alreadyLogOff) Ext.Ajax.request({ url: 'Account/LogOff' });

        if (_this.openDesktops) {
            _this.openDesktops.each(
                            function (item) {
                                if (item.openWindows) {
                                    item.openWindows.each(
                                        function (item2) {
                                            item2.close();
                                        }
                                    )
                                    item.openWindows.clear();
                                }
                                item.close();
                            }
                        )
            _this.openDesktops.clear();
        }

        _this.currentDesktop = null;

        mainPanel.close();
        if (!alreadyLogOff) window.location.href = 'Login';
        view.getEl().unmask(true);
    },

    onOpenWindow: function (desktop, xtype, options) {
        debugger;
        var _this = this;
        desktop.setLoading();
        Main.utils.ControllerLoader.load(xtype);
        var wins = new Array();
        if (!desktop.openWindows) desktop.openWindows = new Ext.util.MixedCollection();

        desktop.openWindows.each(
            function (item) {
                if (item.xtype == xtype) wins.push(item);
            }
        );

        if ((wins.length > 0) && (wins[0].single || wins[0].modal)) {
            wins[0].show();
            wins[0].toFront();
            desktop.setLoading(false);
            return wins[0];
        }

        desktop.openWindows.each(
            function (item) {
                item.setDisabled(true);
            }
        );

        var win = Ext.widget(xtype);

        if (!win.modal) {
            var index = 0;
            if (wins && (wins.length > 0)) {
                for (var i = 0; i < wins.length; i++) {
                    if (wins[i].index > index) index = wins[i].index;
                }
                index++;
            }

            if (index > 0) {
                win.index = index;
                win.title = win.title + ' (' + win.index + ')';
            }

            if (win.noMaximize) {
                win.tools = [
                    {
                        type: 'minimize',
                        tooltip: 'Свернуть',
                        handler: function () {
                            win.hide();
                        }

                    }
                ]
            } else {
                win.tools = [
                    {
                        type: 'minimize',
                        tooltip: 'Свернуть',
                        handler: function () {
                            win.hide();
                        }

                    },
                    {
                        type: 'maximize',
                        tooltip: 'Развернуть',
                        handler: function () {
                            this.up('window').toggleMaximize();
                            this.hide();
                            this.up('window').down('tool[type=restore]').show();
                        }
                    },
                    {
                        type: 'restore',
                        tooltip: 'Свернуть в окно',
                        hidden: true,
                        handler: function () {
                            this.up('window').toggleMaximize();
                            this.hide();
                            this.up('window').down('tool[type=maximize]').show();
                        }
                    }
                ]
            }

            //проверка на заголовок в свернутом виде(если нет, то по умолчанию заголовок окна)
            if (!win.text_minimize) win.text_minimize = win.title;

            //добавляем кнопку предст. окно
            var b = Ext.create('Ext.button.Button', {
                text: win.text_minimize,
                border: 1,
                enableToggle: true,
                pressed: true,
                win: win,
                style: {
                    //borderColor: '#98C8FF',
                    //borderStyle: 'solid',
                    //backgroundColor: '#D5EAFF'//'#D7E8F0'//'#B0C4DE'
                },
                cls: 'btn btn-default',
                handler: function () {
                    if (b.pressed) win.show();
                    else if (_this.lastActivateWindow.id === win.id) win.hide();
                    else {
                        win.toFront();
                        b.toggle(true, true);
                    }
                }
            });

            win.tbut = b;

            //получаем тулбар со свернутыми окнами
            var tbar = desktop.down('toolbar[name=decktopTBar]');
            tbar.add(b);

            desktop.openWindows.add(win.id, win);
        }

        //установка дополнительных свойств
        if (options) {
            for (var prop in options) {
                win[prop] = options[prop];
            }
        }

        //отображение
        desktop.add(win);
        win.show();

        if (win.index > 0) {
            var XY = win.getPosition(true);
            var add = parseInt(win.index % 8) * 20;
            win.setPosition(XY[0] + add, XY[1] + add);
        }

        desktop.openWindows.each(
            function (item) {
                item.setDisabled(false);
            }
        );

        desktop.setLoading(false);

        try {
            if (!win.modal) {
                // добавление контекстного меню для кнопки тулбара
                b.getEl().on('contextmenu', function (e, t) {
                    e.preventDefault();
                    _this.contextMenu.win = win;
                    _this.contextMenu.showBy(t);
                });
            }
        } catch (ex) { }

        return win;
    },

    //----------------------------------------------------------
    //Удаляет окно из коллекции открытых окон
    //----------------------------------------------------------
    onDelFromOpenedWindows: function (win) {
        if (!win.tbut) return;
        var tbar = win.tbut.up('toolbar[name=decktopTBar]');
        tbar.remove(win.tbut);
        win.up().openWindows.removeAtKey(win.id);
    }
});