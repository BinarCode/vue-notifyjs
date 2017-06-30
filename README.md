# vue-notifyjs
Minimalist 3kb Notification component for Vue

[jsFiddle demo](https://jsfiddle.net/z11fe07p/2248/)

### 2 themes supported
#### Bootstrap theme
#### Material design theme

## Install

```bash
yarn add vue-notifyjs
```

CDN: [UNPKG](https://unpkg.com/vue-notifyjs/dist/)

## Usage

```vue
<template>
  <notifications></notifications>
</template>

<script>
import Notify from 'vue-slim-tabs'
Vue.use(Notify)

export default {
   methods: {
    addNotification(verticalAlign = 'top', horizontalAlign = 'right') {
      this.$notify({
        message: 'Welcome',
        horizontalAlign: horizontalAlign,
        verticalAlign: verticalAlign,
        type: "success"
      })
    }
  }
}
</script>

<!-- import styles -->
<style src="vue-notifyjs/themes/default.css"></style>

```
## Props

## Notifications 

```js
transitionName: {
 type:String,
 default:'list'
},
transitionMode: {
 type:String,
 default:'in-out'
},
overlap: {
 type: Boolean,
 default: false
}
```

## Notification (passed through the object sent to $notify method
```js
props: {
    message: String,
    icon: String,
    verticalAlign: {
      type: String,
      default: 'top' // top | bottom
    },
    horizontalAlign: {
      type: String,
      default: 'center' // right | center | left
    },
    type: {
      type: String,
      default: 'info' // info | warning | danger | success
    },
    timeout: {
      type: Number,
      default: 5000
    }
  },
```
## Contributing

1. Fork it!
2. Create your feature branch: `git checkout -b my-new-feature`
3. Commit your changes: `git commit -am 'Add some feature'`
4. Push to the branch: `git push origin my-new-feature`
5. Submit a pull request :D

