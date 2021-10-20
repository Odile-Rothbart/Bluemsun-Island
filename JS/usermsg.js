// 验证
var username2=document.getElementById("username2");
function checkName2(event){
    var tipname2=document.getElementById("tip-name2");
    if(/^[^A-Z]/.exec(username2.value)){
        tipname2.style.color="rgb(214, 72, 72)"
        event.preventDefault();
    }
    else{
        tipname2.style.color="rgb(165, 84, 26)"
    }
}
username2.addEventListener("blur",checkName2,false);
var password2=document.getElementById("password2");
function checkPassword2(event){
    var tippassword2=document.getElementById("tip-password2");
    if(/[^0-9a-zA-Z]/.exec(password2.value)){
        tippassword2.style.color="rgb(214, 72, 72)"
        event.preventDefault();
    }
    else{
        tippassword2.style.color="rgb(165, 84, 26)"
    }
}
password2.addEventListener("blur",checkPassword2,false);
var pass=document.getElementById("pass");
function checkPass(event){
    var tippass=document.getElementById("tip-pass");
    if(pass.value!=password2.value){
        tippass.innerHTML="两次输入的密码不同";
        event.preventDefault();
    }
    else{
        tippass.innerHTML="";
    }
}
pass.addEventListener("blur",checkPass,false);
var submit2=document.getElementById("submit2");
function check2(event){
    checkName2(event);
    checkPassword2(event);
    checkPass(event);
}
submit2.addEventListener("click",check2,false);
// 交互
window.onload = function(){
    var token= localStorage.getItem("token");
    var postDate={
        "token":token
    }
    $.ajax({
        type: 'POST',
        url:"",
        contentType: "application/json",
        data:JSON.stringify(postDate),
        error: function() {
            console.log(data)
            $("#dialog p").html("身份认证失败，请先登录")
            $( "#dialog" ).dialog( "open" );
            setTimeout(function(){
                location.href="../HTML/home.html";
             },3000);
        },
        success: function(data) {
            if(data.status==1){
                console.log(data)
                console.log("身份认证成功");
            }
            else{
                console.log(data)
                $("#dialog p").html("身份认证失败，请先登录")
            $( "#dialog" ).dialog( "open" );
            setTimeout(function(){
                location.href="../HTML/home.html";
             },3000);
            }
        }
    });
    $("#file").change(function(){
        var file = document.getElementById("file").files[0];
        console.log(file)
        var reader = new FileReader();   //将图片格式转化成base64
        reader.addEventListener("load", function () {
            document.getElementById("show").innerHTML = `<img src="${reader.result}" width="150px" height="150px">`
        }, false);
        if(file){
            reader.readAsDataURL(file);
        }
        $("submit1").click(function(){
            var file =$("#file").val();
            var formdata = new FormData();
            formdata.append('file', file);
            var postDate={
                "formdata":formdata
            }
            $.ajax({
                type: 'POST',
                url:"",
                contentType: "application/json",
                data:JSON.stringify(postDate),
                error: function() {
                    console.log(data)
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
        var username=$("#username2").val();
        var password=$("#password2").val();
        var tel=$("#tel").val();
        console.log(tel)
        var sex=$('.sex input:radio[name="sex"]:checked').val(); 
        console.log(sex)
        var birthday=$("#birthday").val()
        console.log(birthday)
        var signature=$("#signature").val()
        console.log(signature)
        var postDate={
            "username":username,
            "password":password,
            "phoneNumber":tel,
            "sex":sex,
            "birthday":birthday,
            "signature":signature
        }
        console.log(postDate)
        $.ajax({
            type: 'POST',
            url:"",
            contentType: "application/json",
            data:JSON.stringify(postDate),
            error: function() {
                console.log(data)
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