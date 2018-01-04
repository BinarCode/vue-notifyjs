<template>
    <div>
        <notifications></notifications>
        <button class="btn btn-default btn-block" @click="addNotification('top', 'left')">Top Left</button>
        <button class="btn btn-default btn-block" @click="addNotification('top', 'center')">Top Center</button>
        <button class="btn btn-default btn-block" @click="addNotification('top', 'right')">Top Right</button>
        <button class="btn btn-default btn-block" @click="addNotification('bottom', 'left')">Bottom Left</button>
        <button class="btn btn-default btn-block" @click="addNotification('bottom', 'center')">Bottom Center</button>
        <button class="btn btn-default btn-block" @click="addNotification('bottom', 'right')">Bottom Right</button>
        <button class="btn btn-default btn-block" @click="addNotificationNoTimeout()">No timeout</button>
        <button class="btn btn-default btn-block" @click="addNotificationNoCloseOnClick()">No close on click</button>
        <button class="btn btn-default btn-block" @click="addNotificationNoCloseIcon()">No close icon</button>
        <button class="btn btn-default btn-block" @click="addNotificationWithClickHandler()">With click handler</button>
    </div>
</template>
<script>
    import Vue from 'vue'
    import Notifications from '../src/index'

    Vue.use(Notifications, {type: 'danger', closeOnClick: false})

    export default {
        data() {
            return {
                type: ['', 'info', 'success', 'warning', 'danger'],
                notifications: {
                    topCenter: false
                }
            };
        },
        methods: {
            addNotification (verticalAlign = 'top', horizontalAlign = 'right') {
                const color = Math.floor(Math.random() * 4 + 1);
                this.$notify({
                    message: 'Sample message',
                    horizontalAlign: horizontalAlign,
                    verticalAlign: verticalAlign,
                    type: this.type[color],
                    closeOnClick: true
                });
            },
            addNotificationNoTimeout (verticalAlign = 'top', horizontalAlign = 'right') {
                const color = Math.floor(Math.random() * 4 + 1);
                this.$notify({
                    message: 'No timeout',
                    horizontalAlign: horizontalAlign,
                    verticalAlign: verticalAlign,
                    type: this.type[color],
                    timeout: 0
                });
            },
            addNotificationNoCloseOnClick (verticalAlign = 'top', horizontalAlign = 'right') {
                const color = Math.floor(Math.random() * 4 + 1);
                this.$notify({
                    message: 'No close on click',
                    horizontalAlign: horizontalAlign,
                    verticalAlign: verticalAlign,
                    type: this.type[color],
                    closeOnClick: false
                });
            },
            addNotificationNoCloseIcon (verticalAlign = 'top', horizontalAlign = 'right') {
                const color = Math.floor(Math.random() * 4 + 1);
                this.$notify({
                    message: 'No close icon',
                    horizontalAlign: horizontalAlign,
                    verticalAlign: verticalAlign,
                    type: this.type[color],
                    showClose: false
                });
            },
            addNotificationWithClickHandler (verticalAlign = 'top', horizontalAlign = 'right') {
                const color = Math.floor(Math.random() * 4 + 1);
                this.$notify({
                    message: 'With click handler',
                    horizontalAlign: horizontalAlign,
                    verticalAlign: verticalAlign,
                    type: this.type[color],
                    timeout: 0,
                    showClose: false,
                    closeOnClick: true,
                    onClick: (event) => {
                        alert('You clicked a notification');
                    }
                });
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
