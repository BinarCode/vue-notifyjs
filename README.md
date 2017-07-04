# vue-notifyjs
Minimalist 3kb Notification component for Vue

- [jsFiddle demo](https://jsfiddle.net/z11fe07p/2248/)
- [Overlaping notifications](https://jsfiddle.net/z11fe07p/2284/)
- [Custom html content via components](https://jsfiddle.net/z11fe07p/2297/)

### 2 themes supported
#### [Default theme](https://jsfiddle.net/z11fe07p/2248/)
#### [Material design theme](https://jsfiddle.net/z11fe07p/2286/)
#### [Now-ui theme](https://jsfiddle.net/z11fe07p/2288/)

## Install

```bash
yarn add vue-notifyjs
```

### CDN: [JS](https://unpkg.com/vue-notifyjs/dist/vue-notifyjs.min.js)

### CDN CSS: 
* [Default theme](https://unpkg.com/vue-notifyjs/themes/default.css)
* [Material theme](https://unpkg.com/vue-notifyjs/themes/material.css)
* [Now UI theme](https://unpkg.com/vue-notifyjs/themes/now-ui.css)

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
    },
    component: {  //is rendered instead of notification message
      type: [Object, Function]
    }
  },
```
## Contributing

1. Fork it!
2. Create your feature branch: `git checkout -b my-new-feature`
3. Commit your changes: `git commit -am 'Add some feature'`
4. Push to the branch: `git push origin my-new-feature`
5. Submit a pull request :D

