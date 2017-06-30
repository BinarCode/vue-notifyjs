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
        removeNotification (index) {
            this.$notifications.removeNotification(index)
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
                    timeout={notification.timeout}
                    type={notification.type}
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
    },
    watch: {
        overlap: function (newVal) {
            this.$notifications.settings.overlap = newVal
        }
    }
}
