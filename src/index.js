import Notifications from './Notifications.js'

const NotificationStore = {
  state: [], // here the notifications will be added

  removeNotification (index) {
    this.state.splice(index, 1)
  },
  notify (notification) {
    notification.timestamp = new Date()
    this.state.push(notification)
  }
}

var NotificationsPlugin = {
  install (Vue) {
    Vue.mixin({
      data(){
        return {
          notificationStore: NotificationStore
        }
      }
    })
    Object.defineProperty(Vue.prototype, '$notify', {
      get () {
        return this.$root.notificationStore.notify
      }
    })
    Object.defineProperty(Vue.prototype, '$notifications', {
      get () {
        return this.$root.notificationStore
      }
    })
    Vue.component('Notifications', Notifications)
  }
}

export default NotificationsPlugin
