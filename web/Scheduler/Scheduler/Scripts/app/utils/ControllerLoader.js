Ext.define('Main.utils.ControllerLoader', {
    singleton: true,
    load: function (controller) {
        var me = this;
        var loadedController;
        // Ext.require(me.app.getModuleClassName(controller, 'controller'), function () {
      
        //if (controller.indexOf('Main.controller.') < 0) controller = 'Main.controller.' + controller;
        Ext.each(me.app.controllers.items, function (item) {
            if (item.id == controller) {
                loadedController = item;
            }
        });

        if (!loadedController) {
            if (controller.indexOf('Main.controller.') < 0) controller = 'Main.controller.' + controller;
            loadedController = me.app.getController(controller);
        }

        return loadedController;
    },

    getCnt: function (controller) {
        var me = this;
        Ext.each(me.app.controllers.items, function (item) {
            var contr = item;
            if (contr.id == controller) {
                return contr;
            }
        });
    }
});