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
  import Vue from 'vue'
  import Notifications from '../src/index'
  import Notification from "../src/Notification";
  Vue.use(Notifications)
  export default{
      methods:{
          addNotification(verticalAlign='top', horizontalAlign='right'){
            this.$notify(
              {
                message: 'Welcome ',
                horizontalAlign: horizontalAlign,
                verticalAlign: verticalAlign,
                type: "info",
                timeout: 30000
              })
          }
      }
  }
</script>
<style>
@keyframes lightSpeedIn {
  from {
    transform: translate3d(100%, 10, 0) skewX(-30deg);
    opacity: 0;
  }

  60% {
    transform: skewX(20deg);
    opacity: 1;
  }

  80% {
    transform: skewX(-5deg);
    opacity: 1;
  }

  to {
    transform: none;
    opacity: 1;
  }
}


@keyframes lightSpeedOut {
  from {
    opacity: 1;
  }

  to {
    transform: translate3d(100%, 0, 0) skewX(30deg);
    opacity: 0;
  }
}


.bounceIn-enter-active,
.bounceIn-leave-active {
  animation: lightSpeedIn 0.4s ease-out;
}

.bounceIn-enter,
.bounceIn-leave-to
{
  animation: lightSpeedOut 0.4s ease-in;
}
</style>
