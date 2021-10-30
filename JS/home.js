// var res;

// (function(window){
//     var defaultPager = {
//         currentPage: 1,     //现在页数
//         limit: 6,           //每页的数据个数
//         divNumber: 5,       //页码块的个数
//         total: 0,           //数据总数
//         pageNumber: 0 ,      //总页数
//         search:''
//     };
//     function createPager(pager){
//         pager = Object.assign(defaultPager, pager);
//         request(pager);
//         bindEvent(pager);
//     }

//     var search=document.getElementById("search");
//     function searchall(){
//         defaultPager.search=document.getElementById("searchtext").value;
//         window.createPager();
//     }
//     search.addEventListener("click",searchall,false);
    
//     function request(pager){
//         var xhr = new XMLHttpRequest();
//         xhr.open("post", ``);
//         xhr.withCredentials=true;
//         xhr.send(JSON.stringify({
//             curPage:pager.currentPage,
//             pageSize:pager.limit,
//             search:pager.search
//         }));
//         xhr.onreadystatechange = function(){
//             if(xhr.readyState === 4 && xhr.status === 200){
//                  res = JSON.parse(xhr.responseText);
//                 console.log(res.msg);
//                 console.log(res.status);
//                 pager.total = res.productDate.totalRecord;
//                 pager.pageNumber = Math.ceil(pager.total/ pager.limit);
//                 adddata(res);
//                 show(pager);
//             }
//         }
//     }

//     // 渲染当前页面数据
//     function adddata(res){
//         var dataHtml = "";
//         for(var item=0;item< res.productDate.list.length;item++){
//             dataHtml += `<div class="user">
//                             <span><img src="../IMG/岛.png" alt="" width="40px" height="40px"></span>
//                             <p>用户名</p>
//                             <a href="#" class="plate"><p>田地</p></a>
//                         </div>
//                         <div>
//                             <p>主要内容：巴拉巴拉巴拉巴拉巴拉</p>
//                         </div>
//                         <div class="time">
//                             <p>时间</p>
//                         </div>
//                         <div class="point">
//                             <div><span class="p1"></span><p>100</p></div>
//                             <div><span class="p2"></span><p>20</p></div>
//                             <div><span class="p3"></span><p>50</p></div>
//                         </div>`
//         }
//         document.getElementById("data").innerHTML = dataHtml;
//     }
//     // 展示页码框
//     function show(pager){
//         var min,max;
//         min = pager.currentPage - Math.floor(pager.divNumber / 2);
//         if(min < 1){
//             min = 1
//         }
//         max = min + pager.divNumber -1;
//         if(max > pager.pageNumber){
//             max = pager.pageNumber
//             min = max - pager.pageNumber + 1
//         }
//         if(pager.divNumber >= pager.pageNumber){
//             min = 1
//             max = pager.pageNumber
//         }
//         var item = "";
//         if(pager.currentPage != 1){
//             item += `<div class="first">首页</div>
//             <div class="prev">上一页</div>`
//         }
//         if(min != 1){
//             item += `<div class="omit">...</div>`
//         }
//         for(var i = min; i <= max; i++){
//             var flag = ''
//             if(i == pager.currentPage){
//                 flag = 'selected'
//             }
//             item += `<div class="number ${flag}">${i}</div>`
//         }
//         if(max != pager.pageNumber){
//             item += `<div class="omit">...</div>`
//         }
//         if(pager.currentPage != pager.pageNumber){
//             item += `<div class="next">下一页</div>
//             <div class="last">尾页</div>`
//         }
//         item += `<div>共${pager.pageNumber}页</div>`;
//         document.getElementById("pager").innerHTML = item;
//     }
//     // 绑定事件
//     function bindEvent(pager){
//         document.getElementById("pager").addEventListener("click", function(e){
//             var classlist = e.target.getAttribute('class');
//             if(classlist.search("first") !== -1){
//                 toPage(1, pager);
//             }else if(classlist.search("prev") !== -1){
//                 toPage(pager.currentPage - 1, pager);
//             }else if(classlist.search("next") !== -1){
//                 toPage(pager.currentPage + 1, pager);
//             }else if(classlist.search("last") !== -1){
//                 toPage(pager.pageNumber, pager);
//             }else if(classlist.search("number") !== -1){
//                 var targetPage = Number(e.target.innerText);
//                 toPage(targetPage, pager);
//             }
//         }, false)
//     }
//     // 跳转页面
//     function toPage(page, pager){
//         if(page < 1){
//             page = 1;
//         }
//         if(page > pager.pageNumber){
//             page = pager.pageNumber;
//         }
//         if(page === pager.currentPage){
//             return;
//         }
//         pager.currentPage = page;
//         request(pager);
//     }


//     window.createPager = createPager;
// })(window)

// 热门田地
window.onload = function(){
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
    // var postDate={
    //     "token":token
    // }
    $.ajax({
        type: 'GET',
        url:"http://jojo.vipgz1.idcfengye.com/bluemsun_island/hotsections?cur="+1+"&size="+5,
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
                for(var item=0;item< data.page.list.length;item++){
                    dataHtml += `<div><a href="../HTML/plate.html?plateid=${data.page.list[item].sectionId}" >
                    <span id="l${item+1}"></span>
                    <p>${data.page.list[item].sectionName}</p>
                    </a></div>`
                }
                document.getElementById("hotplate").innerHTML = dataHtml;
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
// 热门帖子
    $.ajax({
        type: 'GET',
        url:"http://jojo.vipgz1.idcfengye.com/bluemsun_island/hotposts?cur="+1+"&size="+10,
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
                for(var item=0;item< data.page.list.length;item++){
                    dataHtml += `<div><a href="../HTML/post.html?postid=${data.page.list[item].postId}">
                    <span id="r${item+1}"></span>
                    <p>${data.page.list[item].title}</p></a></div>`
                }
                document.getElementById("hotpost").innerHTML = dataHtml;
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

// // 跳转详情
// var data =document.getElementById("data");
// data.addEventListener("click",function(e){
//     // console.log(res.productDate.list)
//     var button=e.target;
//     var id =button.id;
//     setTimeout(function(){
//         location.href=`../html/plate.html`;
//     },1000)
// },false);