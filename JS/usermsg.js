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
                $("#username").attr('value',data.user.username);
                $("#tel").attr('value',data.user.phoneNumber);
                $(`input[name='sex'][value=${data.user.sex}]`).attr("checked",true); 
                $("#birthday").attr('value',data.user.birthday);
                $("#signature").val(data.user.signature);
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
    $(".show").click(function(){
        $( "#dialogWrite" ).dialog( "open" );
    })
    $("#cancel").click(function(){
        history.go(0)
    })
    $("#file").change(function(){
        var file = document.getElementById("file").files[0];
        console.log(file)
        var reader = new FileReader();   //将图片格式转化成base64
        reader.addEventListener("load", function () {
            $(".show").html(`<img src="${reader.result}" width="150px" height="150px">`)
        }, false);
        if(file){
            reader.readAsDataURL(file);
        }
        $("#submit1").click(function(){
            console.log(1)
            var file =$("#file")[0].files[0];
            console.log(file)
            var formdata = new FormData();
            formdata.append('portrait', file);
            console.log(formdata.get("portrait"))
            $.ajax({
                type: 'POST',
                url:"http://windlinxy.top:8080/bluemsun_island/user/portraits",
                headers:{
                    "Authorization":token
                },
                contentType:false,
                processData:false,
                data:formdata,
                error: function() {
                    $("#dialog p").html("图片上传失败，请重新上传")
                    $( "#dialog" ).dialog( "open" );
                    setTimeout(function(){
                        $( "#dialog" ).dialog( "close" );
                    },2000);
                },
                success: function(data) {
                    if(data.status==1){
                        console.log(data)
                        $("#dialog p").html("图片上传成功！")
                        $( "#dialog" ).dialog( "open" );
                        setTimeout(function(){
                            $( "#dialog" ).dialog( "close" );
                            history.go(0)
                        },2000);
                    }
                    else{
                        console.log(data)
                        $("#dialog p").html("图片上传失败，请重新上传")
                    $( "#dialog" ).dialog( "open" );
                    setTimeout(function(){
                        $( "#dialog" ).dialog( "close" );
                    },2000);
                    }
                }
            });
        })
    })
    $("#submit2").click(function(){
        var username=$("#username").val();
        var tel=$("#tel").val();
        var sex=$('.sex input:radio[name="sex"]:checked').val(); 
        var birthday=$("#birthday").val()
        console.log(birthday)
        var signature=$("#signature").val()
        console.log(signature)
        var postDate={
            "username":username,
            "phoneNumber":tel,
            "sex":Number(sex),
            "birthday":birthday,
            "signature":signature
        }
        console.log(postDate)
        $.ajax({
            type: 'PATCH',
            url:"http://windlinxy.top:8080/bluemsun_island/users",
            headers:{
                "Authorization":token
            },
            contentType: "application/json",
            data:JSON.stringify(postDate),
            error: function() {
                $("#dialog p").html("抱歉，信息修改失败")
                $( "#dialog" ).dialog( "open" );
                setTimeout(function(){
                    $( "#dialog" ).dialog( "close" );
                },2000);
            },
            success: function(data) {
                if(data.status==1){
                    console.log(data)
                    $("#dialog p").html("信息修改成功！")
                    $( "#dialog" ).dialog( "open" );
                    setTimeout(function(){
                        $( "#dialog" ).dialog( "close" );
                    },2000);
                }
                else{
                    console.log(data)
                    $("#dialog p").html("抱歉，信息修改失败")
                    $( "#dialog" ).dialog( "open" );
                    setTimeout(function(){
                        $( "#dialog" ).dialog( "close" );
                    },2000);
                }
            }
        });
    });
}
// 搜索跳转
$("#search").click(function(){
    var searchtext=$("#searchtext").val()
    location.href=`../HTML/search.html?searchtext=`+searchtext;
})