import Notification from './Notification.js'
export default {
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
    data () {
        return {
            notifications: this.$notifications.state
        }
    },
    methods: {
        removeNotification (timestamp) {
            this.$notifications.removeNotification(timestamp)
        }
    },
    created(){
        this.$notifications.settings.overlap = this.overlap
    },
    render(){
        const renderedNotifications = this.$notifications.state.map((notification, index) => {
                return <Notification
                    horizontalAlign={notification.horizontalAlign}
                    verticalAlign={notification.verticalAlign}
                    icon={notification.icon}
                    message={notification.message}
                    title={notification.title}
                    timeout={notification.timeout}
                    type={notification.type}
                    component={notification.component}
                    timestamp={notification.timestamp}
                    closeOnClick={notification.closeOnClick}
                    clickHandler={notification.onClick}
                    showClose={notification.showClose}
                    key={notification.timestamp.getTime()} onClose={this.removeNotification}/>
            }
        )
        return (
            <div class="notifications vue-notifyjs">
                <transition-group name={this.transitionName} mode={this.transitionMode}>
                    {renderedNotifications}
                </transition-group>
            </div>
        )
    },
    watch: {
        overlap: function (newVal) {
            this.$notifications.settings.overlap = newVal
        }
    }
}
