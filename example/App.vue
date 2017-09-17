<template>
    <div>
        <notifications></notifications>
        <button @click="addNotification('top','right')">Add Top right</button>
        <button @click="addNotification('top','left')">Add Top left</button>
        <button @click="addNotification('buttom','right')">Add Bottom right</button>
        <button @click="addNotification('buttom','left')">Add Bottom left</button>
    </div>
</template>
<script>
    let msg = {
        functional: true,
        render () {
            return (< span > Welcometo < b > Paper Dashboard < /b> - a beautiful freebie for every web developer</span >)
        }
    }
    import Vue from 'vue'
    import Notifications from '../src/index'

    Vue.use(Notifications, {type: 'danger'})
    export default {
        methods: {
            addNotification (verticalAlign = 'top', horizontalAlign = 'right') {
                /*var notifications =[ {
                    horizontalAlign: 'right',
                    verticalAlign: 'top',
                    type: "info",
                    component: msg
                },{
                    horizontalAlign: 'right',
                    verticalAlign: 'top',
                    type: "info",
                    component: msg
                  }]
              this.$notify(notifications)*/

                this.$notify({title: 'Hi', message: 'Some message'})
            }
        }
    }
</script>
<style lang="scss">
    .vue-notifyjs {
        .list-move {
            transition: transform 0.3s, opacity 0.4s;
        }
        .list-item {
            display: inline-block;
            margin-right: 10px;

        }
        .list-enter-active, .list-leave-active {
            transition: opacity 0.4s;
        }
        .list-enter, .list-leave-to /* .list-leave-active for <2.1.8 */
        {
            opacity: 0;
        }
    }
</style>
