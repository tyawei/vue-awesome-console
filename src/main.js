import { isRef, isReactive, toRaw } from 'vue'

function getObjType(data) {
    var toString = Object.prototype.toString;
    var dataType = toString
            .call(data)
            .replace(/\[object\s(.+)\]/, "$1")
            .toLowerCase();
    return dataType
};

function deepCopy(obj) {
  if ( !obj ) return;

  let newObj = obj.constructor === Array ? [] : {}  

  for (let i in obj) {
      // 对象类型包括普通数组、reactive的proxy代理对象、ref包装对象、computed计算结果的ref包装对象
      if (typeof obj[i] === 'object') {
         // reactive的proxy代理对象

        if ( isReactive(obj[i]) ) {   
          newObj[i] = deepCopy( toRaw(obj[i]) ) 
        } 
        else if ( isRef(obj[i]) ) {   
          // ref包装对象，包括ref()方法和 computed计算
          let val = obj[i].value

          if ( val && isReactive(val) ) {  
             // ref()方法包装对象，其value是响应式
            newObj[i] = deepCopy( toRaw(val) )
          } 
          else if ( val && !isReactive(val) ) {  
            // computed 计算属性，如果此处value不是响应式的，说明取到了最底层的基础数据类型，直接赋值
            newObj[i] = val
          } 
        } 
        else {
          newObj[i] = deepCopy( toRaw(obj[i]) )
        }
      }
      else {
        // js基础数据类型
        newObj[i] = obj[i]
      }
  }
  return newObj
}

const vlog = function() {
  // 获取参数的数组形式
  let args = Array.prototype.slice.call(arguments)
  // 除了 object 之外的数据类型；此处的object 指json类型和vue3中的代理或者包装对象（Proxy、ComputedRefImpl、RefImpl）
  let basicTypes = ['number', 'string', 'boolean', 'undefined', 'symbol', 'array', 'date', 'regexp', 'null', 'function', 'undefined']
  // 保存从 object 里面获得的原始值
  let arr = []
  // 窗口节点类型。通过 getObjType获取的包括 window html.+ 两类
  // 后者包括 HTMLCollection(如getElementsByTagName获取)、HTMLDocument或者HTML.+Element类型
  let winTypes = ['window', 'html']

  args.forEach(item => {
    if ( basicTypes.indexOf(getObjType(item)) >= 0 ) {
      if ( getObjType(item) === 'array' ) {
        // 虽然此处是指非object类型的数组，其中可能含有object类型的元素
        let newArr = deepCopy(item) 
        arr.push(newArr)
      } 
      else {
        // 除了 object和array以外其他类型
        arr.push(item) 
      }
    }
    else {
      // object 类型
        let rawValue = ''
        let isWinType = false
        winTypes.forEach(type => {
          if ( getObjType(item).indexOf(type) >= 0 ) {
            isWinType = true
          }
        })
        if ( isWinType ) {
          rawValue = item
        }
        else if ( isReactive(item) ) { 
          // 通过reactive 包装的，是 Proxy代理对象
          rawValue = toRaw(item)
        } 
        else if ( isRef(item) ) {
          let val = item.value
          if ( val && isReactive(val) ) {   
            // Ref包装对象，其value是响应式
            rawValue = toRaw(val)
          } 
          else if ( val && !isReactive(val) ) {  
            // computed 计算属性，其value不是响应式的
            rawValue = val
          } 
        }
        else {
          // 非vue3 中的、普通的 json类型
          rawValue = item
        }
        // 打印非节点类型
        if ( !isWinType ) {
          rawValue = deepCopy(rawValue)
        }
        arr.push( rawValue )
    }
  })
  arr.length && console.log(...arr)
}

export default vlog