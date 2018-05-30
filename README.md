# vue-notifyjs
<p align="center">
  <a href="https://www.npmjs.com/package/vue-notifyjs"><img src="https://img.shields.io/npm/v/vue-notifyjs.svg"></a>
  <a href="https://www.npmjs.com/package/vue-notifyjs"><img src="https://img.shields.io/npm/dt/vue-notifyjs.svg"></a>
  <a href="https://www.npmjs.com/package/vue-notifyjs"><img src="https://img.shields.io/badge/license-MIT-blue.svg"></a>
  <a href="https://twitter.com/intent/tweet?text=Wow:&url=%5Bobject%20Object%5D"><img src="https://img.shields.io/twitter/url/https/github.com/cristijora/vue-notifyjs.svg?style=social"></a>
  <a href="http://img.badgesize.io/cristijora/vue-notifyjs/master/dist/vue-notifyjs.min.js.svg?compression=gzip&style=flat-square"><img src="http://img.badgesize.io/cristijora/vue-notifyjs/master/dist/vue-notifyjs.min.js.svg?compression=gzip&style=flat-square"></a>
</p>
Minimalist notification component for Vue 2.x

Why use it?
- Small: 1.5kb (minified & gzipped), 4kb (minified)
- Simple `this.$notify({message:'My message'})`
- Has multiple themes 
- The animations can be customized through Vue transitions
- Can be used both through npm and as a script tag

### Demos: 
- [jsFiddle demo](https://jsfiddle.net/z11fe07p/2879/)
- [Overlaping notifications](https://jsfiddle.net/z11fe07p/2878/)
- [Custom html content via components](https://jsfiddle.net/z11fe07p/2880/)
- [Custom animations](https://jsfiddle.net/z11fe07p/2882/)
- [Clears all current notifications](https://jsfiddle.net/z11fe07p/2883/)

### 3 themes supported
#### [Default theme](https://jsfiddle.net/z11fe07p/2879/)
#### [Material design theme](https://jsfiddle.net/z11fe07p/2884/)
#### [Now-ui theme](https://jsfiddle.net/z11fe07p/2886/)

## Install

```bash
yarn add vue-notifyjs
```

### CDN JS: 
* https://unpkg.com/vue-notifyjs/dist/vue-notifyjs.min.js
* https://unpkg.com/vue-notifyjs/dist/vue-notifyjs.js

### CDN CSS: 
* https://unpkg.com/vue-notifyjs/themes/default.css
* https://unpkg.com/vue-notifyjs/themes/material.css
* https://unpkg.com/vue-notifyjs/themes/now-ui.css

## Usage

```vue
<template>
  <notifications></notifications>
</template>

<script>
import Notify from 'vue-notifyjs'
Vue.use(Notify)

export default {
   methods: {
    addNotification() {
      this.$notify({
        message: 'Welcome',
        type: 'success'
      })
    }
  }
}
</script>
<!-- import styles -->
<style src="vue-notifyjs/themes/default.css"></style>

```

## With Vuex
```javascript
import Vue from 'vue'
import App from './App'
import Notify from 'vue-notifyjs';
import Vuex from "vuex"

Vue.use(Notify)
Vue.use(Vuex)

let notifier = new Vue()

const store = new Vuex.Store({
  state:{},
  actions:{
    notify(context, payload){
      notifier.$notify(payload)
    }
  }
})

new Vue({
  el: '#app',
  store,
  template: '<App/>',
  components: { App }
})

```
Now you can dispatch an action like so
```javascript
this.$store.dispatch('notify', {
            message: 'Welcome!',
            type: 'success',
          });
```
**Note:** `<notifications></notifications>` can be declared only once anywhere in your app,
preferably in your root component so the notification component is alive inside any other components.

## Notification options
You can set notification options in 3 ways

1. Upon plugin initialization

```js
import Notify from 'vue-notifyjs'
Vue.use(Notify, {type: 'primary', timeout: 2000})
```
2. Dynamically via `setOptions` method

```js
this.$notifications.setOptions({
  type: 'primary', 
  timeout: 2000,
  horizontalAlign: 'right',
  verticalAlign: 'top'
})
```

3. When using `$notify`

```js
this.$notify({
  message: 'Welcome',
  type: 'success'
})
```

**Note:** Options sent through `this.$notify` will override default options and will have higher priority than default options.

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

## Notification (passed through the object sent to $notify method)
```js
props: {
  message: String,
  title: String,
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
    default: 'info' // info | warning | danger | success | primary
  },
  timeout: {
    type: Number,
    default: 5000
  },
  timestamp: {
    type: Date,
    default: () => new Date()
  },
  component: {  //is rendered instead of notification message
    type: [Object, Function]
  },
  showClose: {
      type: Boolean,
      default: true
  },
  closeOnClick: {
      type: Boolean,
      default: true
  },
  clickHandler: Function,
},
```
## Methods

clear() - Clears all current notifications
```js
this.$notifications.clear();
```

## Contributing

1. Fork it!
2. Create your feature branch: `git checkout -b my-new-feature`
3. Commit your changes: `git commit -am 'Add some feature'`
4. Push to the branch: `git push origin my-new-feature`
5. Submit a pull request :D

