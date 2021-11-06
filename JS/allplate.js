(function(window){
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
    var defaultPager = {
        currentPage: 1,     //现在页数
        limit: 8,           //每页的数据个数
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

    var search=document.getElementById("search");
    function searchall(){
        defaultPager.search=document.getElementById("searchtext").value;
        window.createPager();
    }
    search.addEventListener("click",searchall,false);
    
    function request(pager){
        var token= localStorage.getItem("token");
        console.log(token)
        // var postDate={
        //     "cur":pager.currentPage,
        //     "size":pager.limit
        // }
        $.ajax({
            type: 'GET',
            url:"http://windlinxy.top:8080/bluemsun_island/sections/"+pager.search+"?cur="+Number(pager.currentPage)+"&size="+Number(pager.limit),
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
                        var status
                        // if(data.page.list[item].identifyId==0){
                        //     data.page.list[item].identifyId="普通用户"
                        // }
                        // if(data.page.list[item].identifyId==1){
                        //     data.page.list[item].identifyId="版主"
                        // }
                        // if(data.page.list[item].identifyId==-1){
                        //     data.page.list[item].identifyId="管理员"
                        // }
                        if(data.page.list[item].sectionStatus==-1){
                            status="解冻"
                        }
                        if(data.page.list[item].sectionStatus==0){
                            console.log(0)
                            status="冻结"
                        }
                        dataHtml += `<div class="data">
                                        <div class="user">
                                            <span><img src="${data.page.list[item].imageUrl}" alt="" width="40px" height="40px"></span>
                                            <p>${data.page.list[item].sectionName}</p>
                                        </div>
                                        <div class="platemsg">
                                            <p>${data.page.list[item].description}</p>
                                        </div>
                                        <div class="point">
                                            <input type="button" value="${status}" id="frozen${data.page.list[item].sectionId}" onclick="frozenplate(${data.page.list[item].sectionId},${data.page.list[item].sectionStatus})"> 
                                        </div>
                                    </div>`
                    }
                    document.getElementById("data").innerHTML = dataHtml;
                    show(pager);
                }
                if(data.status==2){
                    console.log(data)
                    $("#dialog p").html("未登录，请先登录")
                    $( "#dialog" ).dialog( "open" );
                    setTimeout(function(){
                        location.href="../HTML/login.html";
                    },3000);
                }
                else{
                    console.log(data)
                    $("#dialog p").html("信息加载失败")
                    $( "#dialog" ).dialog( "open" );
                    setTimeout(function(){
                        $( "#dialog" ).dialog( "close" );
                    },2000);
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
// 板块删除
// function deleteuser(data){
//     var token= localStorage.getItem("token");
//     console.log(token)
//     $.ajax({
//         type: 'DELETE',
//         url:"http://jojo.vipgz1.idcfengye.com/bluemsun_island/users/:"+data,
//         headers:{
//             "Authorization":token
//         },
//         contentType: "application/json",
//         error: function() {
//             $("#dialog p").html("删除失败，请重试")
//             $( "#dialog" ).dialog( "open" );
//             setTimeout(function(){
//                 $( "#dialog" ).dialog( "close" );
//             },2000);
//         },
//         success: function(data) {
//             if(data.status==1){
//                 $("#dialog p").html("删除成功")
//                 $( "#dialog" ).dialog( "open" );
//                 setTimeout(function(){
//                     $( "#dialog" ).dialog( "close" );
//                     history.go(0)
//                  },2000);
//             }
//             else{
//                 console.log(data)
//                 $("#dialog p").html("删除失败，请重试")
//                 $( "#dialog" ).dialog( "open" );
//                 setTimeout(function(){
//                     $( "#dialog" ).dialog( "close" );
//                 },2000);
//             }
//         }
//     });
// }
// 板块冻结
function frozenplate(data1,data2){
    var token= localStorage.getItem("token");
    console.log(token)
    if(data2==-1){
        data2=0
    }
    else{
        data2=-1
    }
    $.ajax({
        type: 'PATCH',
        url:"http://windlinxy.top:8080/bluemsun_island/sections/:"+data1+"/:"+data2,
        headers:{
            "Authorization":token
        },
        contentType: "application/json",
        error: function() {
            $("#dialog p").html("失败，请重试")
            $( "#dialog" ).dialog( "open" );
            setTimeout(function(){
                $( "#dialog" ).dialog( "close" );
            },2000);
        },
        success: function(data) {
            console.log(data)
            if(data.status==1&&data.sectionStatus==0){
                $("#ban"+data1).val("冻结")
                $("#dialog p").html("解冻成功")
                $( "#dialog" ).dialog( "open" );
                setTimeout(function(){
                    $( "#dialog" ).dialog( "close" );
                    history.go(0)
                 },2000);
            }
            if(data.status==1&&data.sectionStatus==-1){
                $("#ban"+data1).val("解冻")
                $("#dialog p").html("冻结成功")
                $( "#dialog" ).dialog( "open" );
                setTimeout(function(){
                    $( "#dialog" ).dialog( "close" );
                    history.go(0)
                 },2000);
            }
            if(data.status==0){
                console.log(data)
                $("#dialog p").html("失败，请重试")
                $( "#dialog" ).dialog( "open" );
                setTimeout(function(){
                    $( "#dialog" ).dialog( "close" );
                },2000);
            }
        }
    });
}