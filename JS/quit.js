// 交互
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
        url:"http://windlinxy.top:8080/bluemsun_island/user",
        contentType: "application/json",
        headers:{
            "Authorization":token
        },
        // data:JSON.stringify(postDate),
        error: function() {
            $("#dialog p").html("身份认证失败，请先登录")
            $( "#dialog" ).dialog( "open" );
            setTimeout(function(){
                location.href="../HTML/login.html";
             },3000);
        },
        success: function(data) {
            if(data.status==1){
                console.log(data)
                console.log("身份认证成功");
                console.log(data.user.sex)
                console.log(data.user.signature)
                $("#username").html(data.user.username);
                $("#tel").html(data.user.phoneNumber); 
                if(data.user.sex==0){
                    $("#sex").html("女");
                }
                if(data.user.sex==1){
                    $("#sex").html("男");
                }
                if(data.user.sex==-1){
                    $("#sex").html("其他");
                }
                $("#birthday").html(data.user.birthday);
                $("#signature").html(data.user.signature);
                $(".show").html(`<img src="${data.user.imageUrl}" width="150px" height="150px">`)
            }
            else{
                console.log(data)
                $("#dialog p").html("身份认证失败，请先登录")
                $( "#dialog" ).dialog( "open" );
                setTimeout(function(){
                    location.href="../HTML/login.html";
                },3000);
            }
        }
    });
    $("#submit").click(function(){
        localStorage.setItem("token","");
        $("#dialog p").html("退出成功")
        $( "#dialog" ).dialog( "open" );
        setTimeout(function(){
            location.href="../HTML/login.html";
        },3000);
    })
}
// 搜索跳转
$("#search").click(function(){
    var searchtext=$("#searchtext").val()
    location.href=`../HTML/search.html?searchtext=`+searchtext;
})