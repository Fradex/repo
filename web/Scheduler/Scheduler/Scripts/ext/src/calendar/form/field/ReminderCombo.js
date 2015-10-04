/**
 * @class Ext.calendar.form.field.ReminderCombo
 * @extends Ext.form.ComboBox
 * <p>A custom combo used for choosing a reminder setting for an event.</p>
 * <p>This is pretty much a standard combo that is simply pre-configured for the options needed by the
 * calendar components. The default configs are as follows:<pre><code>
    width: 200,
    fieldLabel: 'Reminder',
    queryMode: 'local',
    triggerAction: 'all',
    forceSelection: true,
    displayField: 'desc',
    valueField: 'value'
</code></pre>
 * @constructor
 * @param {Object} config The config object
 */
Ext.define('Ext.calendar.form.field.ReminderCombo', {
    extend: 'Ext.form.field.ComboBox',
    alias: 'widget.reminderfield',

    fieldLabel: 'Напоминание',
    queryMode: 'local',
    triggerAction: 'all',
    forceSelection: true,
    displayField: 'desc',
    valueField: 'value',

    // private
    initComponent: function () {
        this.store = this.store || new Ext.data.ArrayStore({
            fields: ['value', 'desc'],
            idIndex: 0,
            data: [
            ['', 'Нет'],
            ['0', 'Сразу'],
            ['5', 'Через 5 минут после старта'],
            ['15', 'Через 15 минут после старта'],
            ['30', 'Через 30 минут после старта'],
            ['60', 'Через 1 час после старта'],
            ['90', 'Через 1.5 часа после старта'],
            ['120', 'Через 2 часа после старта'],
            ['180', 'Через 3 часа после старта'],
            ['360', 'Через 6 часов после старта'],
            ['720', 'Через 12 часов после старта'],
            ['1440', 'Через 1 день после старта'],
            ['2880', 'Через 2 дня после старта'],
            ['4320', 'Через 3 дня после старта'],
            ['5760', 'Через 4 дня после старта'],
            ['7200', 'Через 5 дней после старта'],
            ['10080', 'Через 1 неделю после старта'],
            ['20160', 'Через 2 недели после старта']
            ]
        });

        this.callParent();
    },

    // inherited docs
    initValue: function () {
        if (this.value !== undefined) {
            this.setValue(this.value);
        }
        else {
            this.setValue('');
        }
        this.originalValue = this.getValue();
    }
});
