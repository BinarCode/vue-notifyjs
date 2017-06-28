import Notification from './Notification.js'
export default {
  props:{
    transitionName: {
      type:String,
      default:'list'
    },
    transitionMode: {
      type:String,
      default:'in-out'
    }
  },
  data () {
    return {
      notifications: this.$notifications.state
    }
  },
  methods: {
    removeNotification (index) {
      this.$notifications.removeNotification(index)
    }
  },
  render(){
    console.log("rendering")
    const renderedNotifications = this.$notifications.state.map((notification, index)=>{
        return  <Notification horizontalAlign={notification.horizontalAlign}
         verticalAlign={notification.verticalAlign}
         icon={notification.icon}
         message={notification.message}
         timeout={notification.timeout}
         key={notification} onClose={() => this.removeNotification(index)}/>
    }
    )
    return (
      <div class="notifications">
        <transition-group name={this.transitionName} mode={this.transitionMode}>
          {renderedNotifications}
        </transition-group>

      </div>
    )
  }
}
