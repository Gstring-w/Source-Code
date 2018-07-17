// $.extend(obj1);

// $.extend(true,obj1);

// $.extend(obj1,obj2);

// $.extend(true,obj1,obj2);
// 在哪循环开始  合并到哪个元素
$.extend = $.fn.extend = function (){

    var target,
        i,
        len,
        deep;
    target = arguments[ 0 ];
    i = 1;
    len = arguments.length;
    deep = false;

    if(typeof target == 'boolean'){
        deep = target;
        target = arguments[1];
        i++
    }
    if( i === len ){
        i --;
        target = this;
    }
    if(deep){
        for (i; i < len; i++) {
            deepClone( target, arguments[i]);
        }
    }else {
        for (i; i < len; i++) {
            for(var prop in arguments[i]){
                target[prop] = arguments[i][prop];
            }
        }
    }
}