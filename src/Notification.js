export default {
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
    timestamp:{
      type: Date,
      default: ()=>new Date()
    }
  },
  data () {
    return {
      elmHeight: 0
    }
  },
  computed: {
    hasIcon () {
      return this.icon && this.icon.length > 0
    },
    alertType () {
      return `alert-${this.type}`
    },
    customPosition () {
      let initialMargin = 20
      let alertHeight = this.elmHeight + 10;
      let sameAlertsCount = this.$notifications.state.filter((alert) => {
        return alert.horizontalAlign === this.horizontalAlign && alert.verticalAlign === this.verticalAlign && alert.timestamp <= this.timestamp
      }).length
      if(this.$notifications.settings.overlap){
        sameAlertsCount = 1
      }
      let pixels = (sameAlertsCount - 1) * alertHeight + initialMargin
      let styles = {}
      if (this.verticalAlign === 'top') {
        styles.top = `${pixels}px`
      } else {
        styles.bottom = `${pixels}px`
      }
      return styles
    }
  },
  methods: {
    close () {
      this.$emit('close')
    }
  },
  mounted () {
    this.elmHeight = this.$el.clientHeight
    if (this.timeout) {
      setTimeout(this.close, this.timeout)
    }
  },
  render(){
    return (
      <div
        data-notify="container"
        class={['col-xs-11 col-sm-4 alert open ',{'alert-with-icon':this.icon}, this.verticalAlign, this.horizontalAlign, this.alertType]}
        role="alert"
        style={this.customPosition}
        data-notify-position="top-center">
        <button
          type="button"
          aria-hidden="true"
          class="close col-xs-1"
          data-notify="dismiss"
          onClick={this.close}>×
        </button>
        {
          this.icon &&  <span data-notify="icon" class={['alert-icon', this.icon]}></span>
        }
        <span data-notify="message">
              {this.message}
            </span>
      </div>
    )
  }
}
