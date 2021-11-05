// 热门田地
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
    var token= localStorage.getItem("token");
    console.log(token)
    // var postDate={
    //     "token":token
    // }
    $.ajax({
        type: 'GET',
        url:"http://windlinxy.top:8080/bluemsun_island/hotsections?cur="+1+"&size="+5,
        contentType: "application/json",
        headers:{
            "Authorization":token
        },
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
                // 渲染当前页面数据

                var dataHtml = "";
                for(var item=0;item< data.page.list.length;item++){
                    dataHtml += `<div><a href="../HTML/plate.html?plateid=${data.page.list[item].sectionId}" >
                    <span id="l${item+1}"></span>
                    <nobr>${data.page.list[item].sectionName}</nobr>
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
        url:"http://windlinxy.top:8080/bluemsun_island/hotposts?cur="+1+"&size="+10,
        contentType: "application/json",
        headers:{
            "Authorization":token
        },
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
                // 渲染当前页面数据

                var dataHtml = "";
                for(var item=0;item< data.page.list.length;item++){
                    dataHtml += `<div><a href="../HTML/post.html?postid=${data.page.list[item].postId}">
                    <span id="r${item+1}"></span>
                    <nobr>${data.page.list[item].title}</nobr></a></div>`
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
})(window)