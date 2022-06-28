# vue-awesome-console，一个舒适的 vue3 打印变量的工具
### 它可以帮助你在 ```console.log(某些响应变量)``` 的时候，从一大堆的 ```Proxy  computed  ref``` 对象及其方法中摆脱出来，专心打印你想看到的原始值

### 用法：
```
// 在src/app.js等根文件下

import vlog from 'vue-awesome-console'
// 你可以选择将 vlog 方法挂在 console 对象上，然后像使用 console.log 一样，使用 console.vlog
window.console.vlog = vlog

```

# 注：当前仅适用于 ```vue3```