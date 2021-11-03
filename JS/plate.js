var plateid
(function(window){
    var url=location.search;
    var plate=new Object();
    var str=url.split("?");
    var strs=str[1].split("&");
    for (var i=0;i<strs.length;i++){
        plate[i]=decodeURI(strs[i].split("=")[1]);
    }
    plateid=plate[0];
    console.log(plateid)
    $( "#dialog" ).dialog({
        autoOpen: false,
        show: {
            effect: "blind",
            duration: 1000
        },
        hide: {
            effect: "explode",
            duration: 1000
        }
      });
    var token= localStorage.getItem("token");
    console.log(token)
    $.ajax({
        type: 'GET',
        url:"http://jojo.vipgz1.idcfengye.com/bluemsun_island/sections/:"+plateid,
        contentType: "application/json",
        headers:{
            "Authorization":token
        },
        // data:JSON.stringify(postDate),
        error: function() {
            $("#dialog p").html("信息加载失败")
            $( "#dialog" ).dialog( "open" );
            setTimeout(function(){
                location.href="../HTML/login.html";
            },3000);
        },
        success: function(data) {
            if(data.status==1){
                console.log(data)
                // 渲染当前页面数据
                var dataHtml = "";
                    dataHtml += `<div class="platemsg">
                                <div class="user">
                                    <span><img src="${data.section.imageUrl}" alt="" width="100px" height="100px"></span>
                                    <a href="../HTML/plate.html?plateid=${data.section.sectionId}" class="plate"><h2>${data.section.sectionName}</h2></a>
                                </div>
                                <div>
                                    <p>${data.section.description}</p>
                                </div>
                                <div class="time">
                                    <p>${data.section.createTime}</p>
                                </div>
                                </div><div class="point">
                                    <div><span class="p1"></span><p>${data.section.focusNumber}</p></div>
                                    <div><span class="p2"></span><p>${data.section.postNumber}</p></div>
                                    <input type="button" value="关注" id="submit${data.section.sectionId}" class="submit">
                                </div>`
                document.getElementById("platemsg").innerHTML = dataHtml;
            }
            else{
                console.log(data)
                $("#dialog p").html("信息加载失败")
                $( "#dialog" ).dialog( "open" );
                setTimeout(function(){
                    location.href="../HTML/login.html";
                },3000);
            }
        }
    });
    
    var defaultPager = {
        currentPage: 1,     //现在页数
        limit: 9,           //每页的数据个数
        divNumber: 5,       //页码块的个数
        total: 0,           //数据总数
        pageNumber: 0 ,      //总页数
        search:''
    };
    function createPager(pager){
        pager = Object.assign(defaultPager, pager);
        request(pager);
        bindEvent(pager);
    }

    // var search=document.getElementById("search");
    // function searchall(){
    //     defaultPager.search=document.getElementById("searchtext").value;
    //     window.createPager();
    // }
    // search.addEventListener("click",searchall,false);
    
    
function request(pager){
    var token= localStorage.getItem("token");
    console.log(token)
    // var postDate={
    //     "cur":pager.currentPage,
    //     "size":pager.limit
    // }
    $.ajax({
        type: 'GET',
        url:"http://jojo.vipgz1.idcfengye.com/bluemsun_island/sections/:"+plateid+"/posts?cur="+Number(pager.currentPage)+"&size="+Number(pager.limit),
        headers:{
            "Authorization":token
        },
        contentType: "application/json",
        // data:JSON.stringify(postDate),
        error: function() {
            $("#dialog p").html("信息加载失败")
            $( "#dialog" ).dialog( "open" );
            setTimeout(function(){
                location.href="../HTML/login.html";
            },3000);
        },
        success: function(data) {
            if(data.status==1){
                console.log(data)
                pager.total = data.page.totalRecord;
                pager.pageNumber = Math.ceil(pager.total/ pager.limit);
                // 渲染当前页面数据

                var dataHtml = "";
                for(var item=0;item< data.page.list.length;item++){
                    
                    dataHtml += `<div class="data" onclick="jump(${data.page.list[item].postId})">
                                    <div class="user">
                                        <span><img src="${data.page.list[item].imageUrl}" alt="" width="40px" height="40px"></span>
                                        <p>${data.page.list[item].username}</p>
                                        <a href="../HTML/plate.html?plateid=${data.page.list[item].sectionId}" class="plate"><p>${data.page.list[item].sectionName}</p></a>
                                    </div>
                                    <h4>${data.page.list[item].title}</h4>
                                    <div class="content">
                                        <p>${data.page.list[item].content}</p>
                                    </div>
                                    <div class="time">
                                        <p>${data.page.list[item].postDate}</p>
                                    </div>
                                    <div class="point">
                                        <div><span class="p1"></span><p>${data.page.list[item].accessNumber}</p></div>
                                        <div><span class="p2"></span><p>${data.page.list[item].commentNumber}</p></div>
                                        <div><span class="p3"></span><p>${data.page.list[item].likeNumber}</p></div>
                                    </div>
                                </div>`
                }
                document.getElementById("data").innerHTML = dataHtml;
                show(pager);
            }
            else{
                console.log(data)
                $("#dialog p").html("信息加载失败")
                $( "#dialog" ).dialog( "open" );
                setTimeout(function(){
                    location.href="../HTML/login.html";
                },3000);
            }
        }
    });
}
    
    // 展示页码框
    function show(pager){
        var min,max;
        min = pager.currentPage - Math.floor(pager.divNumber / 2);
        if(min < 1){
            min = 1
        }
        max = min + pager.divNumber -1;
        if(max > pager.pageNumber){
            max = pager.pageNumber
            min = max - pager.pageNumber + 1
        }
        if(pager.divNumber >= pager.pageNumber){
            min = 1
            max = pager.pageNumber
        }
        var item = "";
        if(pager.currentPage != 1){
            item += `<div class="first">首页</div>
            <div class="prev">上一页</div>`
        }
        if(min != 1){
            item += `<div class="omit">...</div>`
        }
        for(var i = min; i <= max; i++){
            var flag = ''
            if(i == pager.currentPage){
                flag = 'selected'
            }
            item += `<div class="number ${flag}">${i}</div>`
        }
        if(max != pager.pageNumber){
            item += `<div class="omit">...</div>`
        }
        if(pager.currentPage != pager.pageNumber){
            item += `<div class="next">下一页</div>
            <div class="last">尾页</div>`
        }
        item += `<div>共${pager.pageNumber}页</div>`;
        document.getElementById("pager").innerHTML = item;
    }
    // 绑定事件
    function bindEvent(pager){
        document.getElementById("pager").addEventListener("click", function(e){
            var classlist = e.target.getAttribute('class');
            if(classlist.search("first") !== -1){
                toPage(1, pager);
            }else if(classlist.search("prev") !== -1){
                toPage(pager.currentPage - 1, pager);
            }else if(classlist.search("next") !== -1){
                toPage(pager.currentPage + 1, pager);
            }else if(classlist.search("last") !== -1){
                toPage(pager.pageNumber, pager);
            }else if(classlist.search("number") !== -1){
                var targetPage = Number(e.target.innerText);
                toPage(targetPage, pager);
            }
        }, false)
    }
    // 跳转页面
    function toPage(page, pager){
        if(page < 1){
            page = 1;
        }
        if(page > pager.pageNumber){
            page = pager.pageNumber;
        }
        if(page === pager.currentPage){
            return;
        }
        pager.currentPage = page;
        request(pager);
    }


    window.createPager = createPager;
})(window)
// 写贴
$( function() {
    $( "#dialogWrite" ).dialog({
      autoOpen: false,
      width: "600",
      show: {
        effect: "blind",
        duration: 1000
      },
      hide: {
        effect: "explode",
        duration: 1000
      }
    });
 
    $( "#opener" ).on( "click", function() {
      $( "#dialogWrite" ).dialog( "open" );
    });
  } );
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
editor.config.uploadImgHeaders = {
    Authorization: localStorage.getItem('token') // 设置请求头
}
editor.config.uploadImgServer = 'http://windlinxy.top:8080/bluemsun_island/post/images'
// editor.config.showLinkImg = false
// 3M
editor.config.uploadImgMaxSize = 100 * 1024 * 1024
// 限制一次最多上传 5 张图片
editor.config.uploadImgMaxLength = 3
// 自定义文件名
editor.config.uploadFileName = 'image';
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
        console.log(result)
        console.log(result.imageUrl)
        var url = result.imageUrl;
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
        // alert(announcement_mag)    
        var token= localStorage.getItem("token");
        console.log(token)
        var postDate={
            "content":announcement_mag,
            "title":title
        }
        console.log(postDate)
      $.ajax({
        url : "http://jojo.vipgz1.idcfengye.com/bluemsun_island/:"+plateid+"/posts?",
        type : "post",
        headers:{
            "Authorization":token
            },
        contentType: "application/json",
        data:JSON.stringify(postDate),
        success : function(data) {
            if(data.status==1){
                console.log(data)
                $("#dialog p").html("发布成功！")
                $( "#dialog" ).dialog( "open" );
                setTimeout(function(){
                    $( "#dialog" ).dialog( "close" );
                    $( "#dialogWrite" ).dialog( "close" );
                    history.go(0)
                },2000);
            }
            else{
                console.log(data)
                $("#dialog p").html("抱歉，发布失败")
                $( "#dialog" ).dialog( "open" );
                setTimeout(function(){
                    $( "#dialog" ).dialog( "close" );
                },2000);
            }
        },
        error : function(msg) {
            $("#dialog p").html("抱歉，发布失败")
            $( "#dialog" ).dialog( "open" );
            setTimeout(function(){
                $( "#dialog" ).dialog( "close" );
            },2000);
            }
  });
     
}, false)

editor.create();

// 跳转
function jump(data){
    location.href=`../HTML/post.html?postid=`+data;
}