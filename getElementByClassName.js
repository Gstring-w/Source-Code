
//getElementsByClassName 在ie中兼容不好所以自己封装一个方法
Document.prototype.getClassName = function(className){
    var allDomArr = Array.prototype.slice.call(document.getElementsByTagName('*'),0);
    var dom = [];
    function dealClass(dom){
        var reg = /\s+/g;
        var arrClassName = dom.className.replace(reg,' ').trim();
        return arrClassName
    }
    allDomArr.forEach(function (ele,index){
        var itemClassArr = dealClass(ele).split(' ');
        // console.log(itemClassArr)
        for(var i = 0; i < itemClassArr.length; i++){
            if(itemClassArr[i] == className){
                dom.push(ele);
                break;
            }
        }
    })
 return dom;
}