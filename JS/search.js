$( function() {
    $( "#tabs" ).tabs();
  } );

(function(window){
        var defaultPager = {
            currentPage: 1,     //现在页数
            limit: 6,           //每页的数据个数
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
        function createPager2(pager){
            pager = Object.assign(defaultPager, pager);
            request(pager);
            bindEvent2(pager);
        }
        var url=location.search;
        var search=new Object();
        var str=url.split("?");
        var strs=str[1].split("&");
        for (var i=0;i<strs.length;i++){
            search[i]=decodeURI(strs[i].split("=")[1]);
        }
        var searchtext=search[0];
        console.log(searchtext)
        defaultPager.search=searchtext;
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
        
    
        var search=document.getElementById("search");
        function searchall(){
            defaultPager.search=document.getElementById("searchtext").value;
            window.createPager();
            window.createPager2();
        }
        search.addEventListener("click",searchall,false);
        
        
        
    function request(pager){
        var token= localStorage.getItem("token");
        console.log(token)
        // var postDate={
        //     "cur":pager.currentPage,
        //     "size":pager.limit
        // }
        if(item==1){
            console.log(1)
            $.ajax({
                type: 'GET',
                url:"http://windlinxy.top:8080/bluemsun_island/posts/title/:"+pager.search+"?cur="+Number(pager.currentPage)+"&size="+Number(pager.limit),
                headers:{
                    "Authorization":token
                },
                contentType: "application/json",
                // data:JSON.stringify(postDate),
                error: function() {
                    $("#dialog p").html("信息加载失败")
                    $( "#dialog" ).dialog( "open" );
                    // setTimeout(function(){
                    //     location.href="../HTML/login.html";
                    // },3000);
                },
                success: function(data) {
                    if(data.status==1){
                        console.log(data)
                        pager.total = data.page.totalRecord;
                        pager.pageNumber = Math.ceil(pager.total/ pager.limit);
                        // 渲染当前页面数据
        
                        var dataHtml = "";
                        for(var item=0;item< data.page.list.length;item++){
                            if(data.page.list[item].status!=-1){
                            dataHtml += `<div class="searchdata" onclick="jump(${data.page.list[item].postId})">
                                            <div class="user">
                                                <span><img src="${data.page.list[item].imageUrl}" alt="" width="40px" height="40px"></span>
                                                <p>${data.page.list[item].username}</p>
                                                <a href="../HTML/plate.html?plateid=${data.page.list[item].sectionId}" class="plate"><p>${data.page.list[item].sectionName}</p></a>
                                            </div>
                                            <h4>${data.page.list[item].title}</h4>
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
                        }
                        $(".data").html(dataHtml)
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
        else{
            console.log(2)
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
                            if(data.page.list[item].sectionStatus!=-1){
                            dataHtml += `<div class="searchdata">
                                            <div class="user">
                                                <span><img src="${data.page.list[item].imageUrl}" alt="" width="40px" height="40px"></span>
                                                <p>${data.page.list[item].sectionName}</p>
                                            </div>
                                            <div class="platemsg">
                                                <p>${data.page.list[item].description}</p>
                                            </div>
                                    
                                        </div>`
                                    }
                        }
                        $(".data").html(dataHtml)
                        show2(pager);
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
            document.getElementById("pager1").innerHTML = item;
        }
        function show2(pager){
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
            document.getElementById("pager2").innerHTML = item;
        }
        // 绑定事件
        function bindEvent(pager){
            document.getElementById("pager1").addEventListener("click", function(e){
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
        function bindEvent2(pager){
            document.getElementById("pager2").addEventListener("click", function(e){
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
        
    
    var item=1;
    $("#tab1").click(function(){
        item=1;
        window.createPager();
    })
    $("#tab2").click(function(){
        item=2;
        window.createPager2();
    })
    window.createPager = createPager;
    window.createPager2 = createPager2;
})(window)
     

// 跳转
function jump(data){
    location.href=`../HTML/post.html?postid=`+data;
}