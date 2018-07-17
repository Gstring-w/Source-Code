

Array.prototype.myforEach = function (fn){
    for(var i,len = this.length; i < len; i++){
        fn.call(this,this[i],i)
    }
}
// 不能退出循环

function deepClone(tar, opt) {
    var src, copy;
    if (opt !== null) {
        for (var prop in opt) {
            src = tar[prop];
            copy = opt[prop];
            if (copy && typeof copy == 'object') {
                if (Object.prototype.toString.call(copy) == '[object][Array]') {
                    src = src ? src : [];
                } else {
                    src = src ? src : {};
                }
                tar[prop] = deepClone(src, copy);
            } else {
                tar[prop] = copy;
            }
        }
        return tar
    }
}


Array.prototype.myFilter = function (fn){
    var arr = []
    for (var i, len = this.length; i < len; i++) {
       if(fn(this[i],i)){
           if(typeof this[i] == 'object'){
                var opt = {};
                deepClone(opt,this[i]);
                arr.push(opt);
           }else {
               arr.push(this[i])
           }
            // 浅拷贝 如果元素是引用值
       }
    }
}

Array.prototype.myMap = function (fn){
    var arr = [];
    for(var i = 0,len = this.length; i < len;i++ ){
        if(typeof fn(this[i],i) == 'object'){
            var opt = {};
            deepClone(opt, fn(this[i], i));
            arr.push(opt);
        }else {
            arr.push(fn(this[i], i))
        }
    }
    return arr;
}


Array.prototype.myReduce = function (fn,init){
    var previous = init;
    var i = 0;
    if(init === undefined){
        previous = this[0];
        i = 1;
    }
    for(var len = this.length;i < len; i++ ){
        previous = fn(previous,this[i],i);
    }
}

//reduceRight