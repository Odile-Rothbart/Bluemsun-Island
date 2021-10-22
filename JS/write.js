// 交互
var E = window.wangEditor;
var editor = new E('#editor');
editor.config.menus = [
    'head',  // 标题
    'bold',  // 粗体
    'fontSize',  // 字号
    'fontName',  // 字体
    'italic',  // 斜体
    'underline',  // 下划线
    'strikeThrough',  // 删除线
    'foreColor',  // 文字颜色
    'backColor',  // 背景颜色
    'link',  // 插入链接
    'list',  // 列表
    'justify',  // 对齐方式
    'quote',  // 引用
    'emoticon',  // 表情
    'image',  // 插入图片
    'table',  // 表格
    'video',  // 插入视频
    'code',  // 插入代码
    'undo',  // 撤销
    'redo'  // 重复
];

editor.config.uploadImgServer = '/upload'
// editor.config.showLinkImg = false
// 3M
editor.config.uploadImgMaxSize = 100 * 1024 * 1024
// 限制一次最多上传 5 张图片
editor.config.uploadImgMaxLength = 3
// 自定义文件名
editor.config.uploadFileName = 'editor_img';
// 将 timeout 时间改为 3s
editor.config.uploadImgTimeout = 5000;

editor.config.uploadImgHooks = {
    before: function (xhr, editor, files) {
        // 图片上传之前触发
        // xhr 是 XMLHttpRequst 对象，editor 是编辑器对象，files 是选择的图片文件

        // 如果返回的结果是 {prevent: true, msg: 'xxxx'} 则表示用户放弃上传
        // return {
        //     prevent: true,
        //     msg: '放弃上传'
        // }
        // alert("前奏");
    },
    success: function (xhr, editor, result) {
        // 图片上传并返回结果，图片插入成功之后触发
        // xhr 是 XMLHttpRequst 对象，editor 是编辑器对象，result 是服务器端返回的结果
        // var url = result.data.url;
        // alert(JSON.stringify(url));
        // editor.txt.append(url);
        // alert("成功");
    },
    fail: function (xhr, editor, result) {
        // 图片上传并返回结果，但图片插入错误时触发
        // xhr 是 XMLHttpRequst 对象，editor 是编辑器对象，result 是服务器端返回的结果
        alert("失败");
    },
    error: function (xhr, editor) {
        // 图片上传出错时触发
        // xhr 是 XMLHttpRequst 对象，editor 是编辑器对象
        // alert("错误");
    },
    // 如果服务器端返回的不是 {errno:0, data: [...]} 这种格式，可使用该配置
    // （但是，服务器端返回的必须是一个 JSON 格式字符串！！！否则会报错）
    customInsert: function (insertImg, result, editor) {
        // 图片上传并返回结果，自定义插入图片的事件（而不是编辑器自动插入图片！！！）
        // insertImg 是插入图片的函数，editor 是编辑器对象，result 是服务器端返回的结果
        // 举例：假如上传图片成功后，服务器端返回的是 {url:'....'} 这种格式，即可这样插入图片：
        var url = result.data[0];
        insertImg(url);
        // result 必须是一个 JSON 格式字符串！！！否则报错
    }
}


//获取文本输入的内容
document.getElementById('submit').addEventListener('click', function () {
      editor.txt.html(content);
      var content = editor.txt.html();
      var title=$("#title").val();
      console.log(title)
      console.log(content);
      // 读取 text
        var announcement_mag = editor.txt.text();
        alert(announcement_mag)    
      $.ajax({
      url : "http://localhost:8080/User/inserAnnouncements?announcement_mag="+announcement_mag+"&title"+title,
      type : "post",
      dataType : "json",
      success : function(data) {
          alert(data.result);
          
      },
       error : function(msg) {
              alert("ajax连接异常：" + msg);
          }
  });
     
}, false)
// // 设置内容
// editor.txt.html(content);
// // 获取内容
// var content = editor.txt.html();

editor.create();