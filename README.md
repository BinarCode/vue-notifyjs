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
- [jsFiddle demo](https://jsfiddle.net/z11fe07p/2248/)
- [Overlaping notifications](https://jsfiddle.net/z11fe07p/2284/)
- [Custom html content via components](https://jsfiddle.net/z11fe07p/2297/)
- [Custom animations](https://jsfiddle.net/z11fe07p/2517/)

### 3 themes supported
#### [Default theme](https://jsfiddle.net/z11fe07p/2248/)
#### [Material design theme](https://jsfiddle.net/z11fe07p/2286/)
#### [Now-ui theme](https://jsfiddle.net/z11fe07p/2288/)

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

