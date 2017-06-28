/*!
 * vue-notifyjs v0.1.0
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
    icon: String,
    verticalAlign: {
      type: String,
      default: 'top'
    },
    horizontalAlign: {
      type: String,
      default: 'center'
    },
    type: {
      type: String,
      default: 'info'
    },
    timeout: {
      type: Number,
      default: 5000
    },
    timestamp: {
      type: Date,
      default: function _default() {
        return new Date();
      }
    }
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
        return alert.horizontalAlign === _this.horizontalAlign && alert.verticalAlign === _this.verticalAlign && alert.timestamp < _this.timestamp;
      }).length;
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
      this.$emit('close');
    }
  },
  mounted: function mounted() {
    this.elmHeight = this.$el.clientHeight;
    if (this.timeout) {
      setTimeout(this.close, this.timeout);
    }
  },
  render: function render() {
    var h = arguments[0];

    return h(
      'div',
      {
        attrs: {
          'data-notify': 'container',

          role: 'alert',

          'data-notify-position': 'top-center' },
        'class': ['col-xs-11 col-sm-4 alert open ', { 'alert-with-icon': this.icon }, this.verticalAlign, this.horizontalAlign, this.alertType], style: this.customPosition },
      [h(
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
        [this.message]
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
    }
  },
  data: function data() {
    return {
      notifications: this.$notifications.state
    };
  },

  methods: {
    removeNotification: function removeNotification(index) {
      this.$notifications.removeNotification(index);
    }
  },
  render: function render() {
    var _this = this;

    var h = arguments[0];

    console.log("rendering");
    var renderedNotifications = this.$notifications.state.map(function (notification, index) {
      return h(
        Notification,
        {
          attrs: { horizontalAlign: notification.horizontalAlign,
            verticalAlign: notification.verticalAlign,
            icon: notification.icon,
            message: notification.message,
            timeout: notification.timeout
          },
          key: notification, on: {
            'close': function close() {
              return _this.removeNotification(index);
            }
          }
        },
        []
      );
    });
    return h(
      'div',
      { 'class': 'notifications' },
      [h(
        'transition-group',
        {
          attrs: { name: this.transitionName, mode: this.transitionMode }
        },
        [renderedNotifications]
      )]
    );
  }
};

var NotificationStore = {
  state: [], // here the notifications will be added

  removeNotification: function removeNotification(index) {
    this.state.splice(index, 1);
  },
  notify: function notify(notification) {
    notification.timestamp = new Date();
    this.state.push(notification);
  }
};

var NotificationsPlugin = {
  install: function install(Vue) {
    Vue.mixin({
      data: function data() {
        return {
          notificationStore: NotificationStore
        };
      }
    });
    Object.defineProperty(Vue.prototype, '$notifications', {
      get: function get() {
        return this.$root.notificationStore;
      }
    });
    Vue.component('Notifications', Notifications);
  }
};

return NotificationsPlugin;

})));
