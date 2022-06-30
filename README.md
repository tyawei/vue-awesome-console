## vue-awesome-console，一个舒适的 vue3 打印变量的工具
### 它可以帮助你在 ```console.log(某些响应变量)``` 的时候，从一大堆的 ```Proxy  computed  ref``` 对象及其方法中摆脱出来，专心打印你想看到的原始值。当然，它也完全可以像```console.log```一样，打印普通的js数据类型、窗口节点对象等

### 用法：
```
// 在src/app.js等根文件下

import vlog from 'vue-awesome-console'
// 你可以选择将 vlog 方法挂在 console 对象上，然后像使用 console.log 一样使用 console.vlog
// 同时你也可以根据项目中的开发/生产模式，进行不同的使用方式
if ( process.env.NODE_ENV === 'development' ) {
    window.console.vlog = vlog
} else {
    window.console.vlog = () => {}
}
```

### 情景
#### 一般的 console.log 打印
比如在某组件中，打印 ```vue-router``` ， ```const route = useRoute() ```中的 ```route```，其结果是：
```
Proxy {path: ComputedRefImpl, name: ComputedRefImpl, params: ComputedRefImpl, query: ComputedRefImpl, hash: ComputedRefImpl, …}
// 展开后
Proxy {path: ComputedRefImpl, name: ComputedRefImpl, params: ComputedRefImpl, query: ComputedRefImpl, hash: ComputedRefImpl, …}
[[Handler]]: Object
[[Target]]: Object
fullPath: ComputedRefImpl {dep: undefined, __v_isRef: true, _dirty: false, effect: ReactiveEffect, _setter: ƒ, …}
hash: ComputedRefImpl {dep: undefined, __v_isRef: true, _dirty: false, effect: ReactiveEffect, _setter: ƒ, …}
matched: ComputedRefImpl {dep: Set(2), __v_isRef: true, _dirty: false, effect: ReactiveEffect, _setter: ƒ, …}
meta: ComputedRefImpl {dep: undefined, __v_isRef: true, _dirty: false, effect: ReactiveEffect, _setter: ƒ, …}
name: ComputedRefImpl {dep: undefined, __v_isRef: true, _dirty: false, effect: ReactiveEffect, _setter: ƒ, …}
params: ComputedRefImpl {dep: Set(1), __v_isRef: true, _dirty: false, effect: ReactiveEffect, _setter: ƒ, …}
path: ComputedRefImpl {dep: undefined, __v_isRef: true, _dirty: false, effect: ReactiveEffect, _setter: ƒ, …}
query: ComputedRefImpl {dep: undefined, __v_isRef: true, _dirty: false, effect: ReactiveEffect, _setter: ƒ, …}
redirectedFrom: ComputedRefImpl {dep: undefined, __v_isRef: true, _dirty: false, effect: ReactiveEffect, _setter: ƒ, …}
[[Prototype]]: Object
[[IsRevoked]]: false
```
#### console.vlog 打印以上的``` route``` 变量
```
path: '/home/welcome', name: 'welcome', params: {…}, query: {…}, fullPath: '/home/welcome', …}
// 展开后
fullPath: "/home/welcome"
matched: (2) [{…}, {…}]
meta: {}
name: "welcome"
params: {}
path: "/home/welcome"
query: {}
redirectedFrom: {fullPath: '/home/welcome', path: '/home/welcome', query: {…}, hash: '', name: 'welcome', …}
[[Prototype]]: Object
```
#### 也许你认为 ```JSON.parse(JSON.stringify(obj))``` 可以起相同的作用，当然，你得容忍某些情形下，某些变量在这个貌似深拷贝的方法下报错

## 注：当前仅适用于 ```vue3```