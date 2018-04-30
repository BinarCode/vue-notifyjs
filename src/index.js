import Notifications from './Notifications.js'
import Vue from 'vue';

const NotificationStore = {
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
    setOptions(options) {
        this.settings = {...this.settings, ...options}
    },
    removeNotification(timestamp) {
        const indexToDelete = this.state.findIndex(n => n.timestamp === timestamp)
        if (indexToDelete !== -1) {
            this.state.splice(indexToDelete, 1)
        }
    },
    addNotification(notification) {
        if (typeof notification === 'string' || notification instanceof String) {
            notification = {message: notification}
        }
        notification.timestamp = new Date()
        notification.timestamp.setMilliseconds(notification.timestamp.getMilliseconds() + this.state.length)
        notification = {...this.settings, ...notification}
        this.state.push(notification)
    },
    notify(notification) {
        if (Array.isArray(notification)) {
            notification.forEach((notificationInstance) => {
                this.addNotification(notificationInstance)
            })
        } else {
            this.addNotification(notification)
        }

    },
    clear() {
      this.state = []
    }
};

function initStore(Vue){
  return new Vue({
    data(){
      return {
        notificationStore: NotificationStore
      }
    },
    methods: {
      notify(notification) {
        this.notificationStore.notify(notification);
      }
    }
  });
}

export const Notification = new class {
  constructor(){
    this.store = initStore(Vue);
  }

  notify(...params){
    this.store.notify(params)
  }

  notifications(){
    return this.store.notificationStore;
  }
};

export default {
  install (Vue, options) {
    let store = initStore(Vue);
    Vue.prototype.$notify = store.notify;
    Vue.prototype.$notifications = store.notificationStore;
    Vue.component('Notifications', Notifications);
    if(options){
      NotificationStore.setOptions(options)
    }
  }
}
