/**
 * author kyf
 * data 2018.07.09
 * desc 迭代器模式解决针对不同浏览器实现不同上传方式
 */

 var getActiveUploadObj = function() {
    try {
        return new ActiveXObject("TXFTNActiveX.FTNUpload"); // IE 上传控件
    } catch (error) {
        return false
    }
 }

 var getFlashUploadObj = function() {
    if ( false ) {
        var str = '<object type="application/x-shockwave-flash"></object>'
        return document.getElementsByTagName('body')[0].innerHTML = str
    }
    return false
 }

 var getFormUploadObj = function() {
    var str = '<input name="file" type="file"/>' // 表单上传
    document.getElementsByTagName('body')[0].innerHTML = str
    return document.getElementsByTagName('body')[0]
 }

 // 迭代器
 var iteratorUploadObj = function() {
    for ( var i = 0, fn; fn = arguments[ i++ ]; ) {
        var uploadObj = fn()
        if (uploadObj !== false) {
            return uploadObj
        }
    }
 }

 // 符合开闭原则，以后有新的上传方式，新写一个函数，用迭代器调用即可。
 var uploadObj = iteratorUploadObj( getActiveUploadObj, getFlashUploadObj, getFormUploadObj )
 console.log(uploadObj)