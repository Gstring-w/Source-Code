
// ajax（Asynchronous Javascript and Xml）  以前操作的是xml 现在是json

function ajax(method,url,data,callback,flag){

    //是否异步 默认异步
    if(flag == undefined) {

        flag = true;

    }
    var xhr = null;

    // 兼容ie
    if (window.XMLHttpRequest){

        xhr = new XMLHttpRequest();

    }else {
        xhr = new ActiveXObject('Microsoft.XMLhttp');
    }

    // 先绑定事件
    xhr.onreadystatechange = function (){  

        if(xhr.readyState == 4){

            if(xhr.status == 200){

                callback(JSON.parse(xhr.responseText));
            }
        }
    }


    method = method.toUpperCase();
    if(method == 'GET'){

        xhr.open('GET', url + '?' + data, flag);
        xhr.send();

    }else if(method == 'POST'){

        xhr.open('POST',url,flag);
        xhr.setRequestHeader('Content-type','application/x-www-form-urlencoded');
        xhr.send(data);

    }
    
}