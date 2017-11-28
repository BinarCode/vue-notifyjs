/*!
 * vue-notifyjs v0.3.0
 * (c) 2017-present cristij <joracristi@gmail.com>
 * Released under the MIT License.
 */
(function (global, factory) {
    typeof exports === 'object' && typeof module !== 'undefined' ? module.exports = factory() :
    typeof define === 'function' && define.amd ? define(factory) :
    (global.vueNotifyjs = factory());
}(this, (function () { 'use strict';

var Notification = {
    name: 'notification',
    props: {
        message: String,
        title: String,
        icon: String,
        verticalAlign: {
            type: String,
            default: 'top',
            validator: function validator(value) {
                var acceptedValues = ['top', 'bottom'];
                return acceptedValues.indexOf(value) !== -1;
            }
        },
        horizontalAlign: {
            type: String,
            default: 'right',
            validator: function validator(value) {
                var acceptedValues = ['left', 'center', 'right'];
                return acceptedValues.indexOf(value) !== -1;
            }
        },
        type: {
            type: String,
            default: 'info',
            validator: function validator(value) {
                var acceptedValues = ['info', 'primary', 'danger', 'warning', 'success'];
                return acceptedValues.indexOf(value) !== -1;
            }
        },
        timeout: {
            type: Number,
            default: 5000,
            validator: function validator(value) {
                return value > 0;
            }
        },
        timestamp: {
            type: Date,
            default: function _default() {
                return new Date();
            }
        },
        component: {
            type: [Object, Function]
        },
        showClose: {
            type: Boolean,
            default: true
        },
        closeOnClick: {
            type: Boolean,
            default: true
        },
        clickHandler: Function
    },
    data: function data() {
        return {
            elmHeight: 0
        };
    },

    computed: {
        hasIcon: function hasIcon() {
            return this.icon && this.icon.length > 0;
        },
        alertType: function alertType() {
            return 'alert-' + this.type;
        },
        customPosition: function customPosition() {
            var _this = this;

            var initialMargin = 20;
            var alertHeight = this.elmHeight + 10;
            var sameAlertsCount = this.$notifications.state.filter(function (alert) {
                return alert.horizontalAlign === _this.horizontalAlign && alert.verticalAlign === _this.verticalAlign && alert.timestamp <= _this.timestamp;
            }).length;
            if (this.$notifications.settings.overlap) {
                sameAlertsCount = 1;
            }
            var pixels = (sameAlertsCount - 1) * alertHeight + initialMargin;
            var styles = {};
            if (this.verticalAlign === 'top') {
                styles.top = pixels + 'px';
            } else {
                styles.bottom = pixels + 'px';
            }
            return styles;
        }
    },
    methods: {
        close: function close() {

            this.$emit('close', this.timestamp);
        },
        tryClose: function tryClose(evt) {
            if (this.clickHandler) {
                this.clickHandler(evt);
            }
            if (this.closeOnClick) {
                this.close();
            }
        }
    },
    mounted: function mounted() {
        this.elmHeight = this.$el.clientHeight;
        if (this.timeout) {
            setTimeout(this.close, this.timeout);
        }
    },
    render: function render(h) {
        var componentName = this.component;
        return h(
            'div',
            {
                on: {
                    'click': this.tryClose
                },
                attrs: {
                    'data-notify': 'container',

                    role: 'alert',

                    'data-notify-position': 'top-center' },
                'class': ['alert open ', { 'alert-with-icon': this.icon }, this.verticalAlign, this.horizontalAlign, this.alertType], style: this.customPosition },
            [this.showClose && h(
                'button',
                {
                    attrs: {
                        type: 'button',
                        'aria-hidden': 'true',

                        'data-notify': 'dismiss'
                    },
                    'class': 'close col-xs-1', on: {
                        'click': this.close
                    }
                },
                ['\xD7']
            ), this.icon && h(
                'span',
                {
                    attrs: { 'data-notify': 'icon' },
                    'class': ['alert-icon', this.icon] },
                []
            ), h(
                'span',
                {
                    attrs: { 'data-notify': 'message' }
                },
                [this.title !== undefined && h(
                    'span',
                    { 'class': 'title' },
                    [h(
                        'b',
                        null,
                        [this.title, h(
                            'br',
                            null,
                            []
                        )]
                    )]
                ), this.message !== undefined && this.message, this.component !== undefined && h(
                    this.component,
                    null,
                    []
                )]
            )]
        );
    }
};

var Notifications = {
    props: {
        transitionName: {
            type: String,
            default: 'list'
        },
        transitionMode: {
            type: String,
            default: 'in-out'
        },
        overlap: {
            type: Boolean,
            default: false
        }
    },
    data: function data() {
        return {
            notifications: this.$notifications.state
        };
    },

    methods: {
        removeNotification: function removeNotification(timestamp) {
            this.$notifications.removeNotification(timestamp);
        }
    },
    created: function created() {
        this.$notifications.settings.overlap = this.overlap;
    },
    render: function render() {
        var _this = this;

        var h = arguments[0];

        var renderedNotifications = this.$notifications.state.map(function (notification, index) {
            return h(
                Notification,
                {
                    attrs: {
                        horizontalAlign: notification.horizontalAlign,
                        verticalAlign: notification.verticalAlign,
                        icon: notification.icon,
                        message: notification.message,
                        title: notification.title,
                        timeout: notification.timeout,
                        type: notification.type,
                        component: notification.component,
                        timestamp: notification.timestamp,
                        closeOnClick: notification.closeOnClick,
                        clickHandler: notification.onClick,
                        showClose: notification.showClose
                    },
                    key: notification.timestamp.getTime(), on: {
                        'close': _this.removeNotification
                    }
                },
                []
            );
        });
        return h(
            'div',
            { 'class': 'notifications vue-notifyjs' },
            [h(
                'transition-group',
                {
                    attrs: { name: this.transitionName, mode: this.transitionMode }
                },
                [renderedNotifications]
            )]
        );
    },

    watch: {
        overlap: function overlap(newVal) {
            this.$notifications.settings.overlap = newVal;
        }
    }
};

var NotificationStore = {
    state: [], // here the notifications will be added
    settings: {
        overlap: false,
        verticalAlign: 'top',
        horizontalAlign: 'right',
        type: 'info',
        timeout: 5000,
        closeOnClick: true,
        showClose: true
    },
    setOptions: function setOptions(options) {
        this.settings = Object.assign({}, this.settings, options);
    },
    removeNotification: function removeNotification(timestamp) {
        var indexToDelete = this.state.findIndex(function (n) {
            return n.timestamp === timestamp;
        });
        if (indexToDelete !== -1) {
            this.state.splice(indexToDelete, 1);
        }
    },
    addNotification: function addNotification(notification) {
        if (typeof notification === 'string' || notification instanceof String) {
            notification = { message: notification };
        }
        notification.timestamp = new Date();
        notification.timestamp.setMilliseconds(notification.timestamp.getMilliseconds() + this.state.length);
        notification = Object.assign({}, this.settings, notification);
        this.state.push(notification);
    },
    notify: function notify(notification) {
        var _this = this;

        if (Array.isArray(notification)) {
            notification.forEach(function (notificationInstance) {
                _this.addNotification(notificationInstance);
            });
        } else {
            this.addNotification(notification);
        }
    }
};

var NotificationsPlugin = {
    install: function install(Vue, options) {
        Vue.mixin({
            data: function data() {
                return {
                    notificationStore: NotificationStore
                };
            },

            methods: {
                notify: function notify(notification) {
                    this.notificationStore.notify(notification);
                }
            }
        });
        Object.defineProperty(Vue.prototype, '$notify', {
            get: function get() {
                return this.$root.notify;
            }
        });
        Object.defineProperty(Vue.prototype, '$notifications', {
            get: function get() {
                return this.$root.notificationStore;
            }
        });
        Vue.component('Notifications', Notifications);
        if (options) {
            NotificationStore.setOptions(options);
        }
    }
};

return NotificationsPlugin;

})));
