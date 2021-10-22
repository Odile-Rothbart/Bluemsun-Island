// 弹窗
$( function() {
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
 
  } );
// 登录验证
var password1=document.getElementById("password1");
function checkPassword1(event){
    var tippassword1=document.getElementById("tip-password1");
    if(/[^0-9a-zA-Z]/.exec(password1.value)){       
        tippassword1.style.color="rgb(214, 72, 72)"
        event.preventDefault();
    }
    else{
        tippassword1.style.color="#908a78"
    }
}
password1.addEventListener("blur",checkPassword1,false);
var submit1=document.getElementById("submit1");
function check1(event){
    checkPassword1(event);
}
submit1.addEventListener("click",check1,false);
// 背景转换
function setbody1(){
    console.log(1)
    $("body").css("background","url(../IMG/岛.png)");
}
function setbody2(){
    console.log(2)
    $("body").css("background","url(../IMG/GB.jpg)");
}
// 登录交互
$(document).ready(function(){
    $("#submit1").click(function(){
        var phoneNumber=$("#phonenum").val();
        var password=$("#password1").val();
        var postDate={
            "password":password,
            "phoneNumber":phoneNumber
        }
        console.log(postDate)
        $.ajax({
            type: 'POST',
            url:"http://jojo.vipgz1.idcfengye.com/bluemsun_island/users/token",
            contentType: "application/json",
            data:JSON.stringify(postDate),
            error: function() {
                $("#dialog p").html("登录失败！请重新登录")
                $( "#dialog" ).dialog( "open" );
                setTimeout(function(){
                    $( "#dialog" ).dialog( "close" );
                },2000);
            },
            success: function(data) {
                if(data.status==1){
                    console.log(data)
                    localStorage.setItem("token",data.Authorization);
                    // var token= localStorage.getItem("token");
                    // console.log(token)
                    $("#dialog p").html("登录成功！三秒后跳转首页")
                    $( "#dialog" ).dialog( "open" );
                    setTimeout(function(){
                        location.href="../HTML/home.html";
                     },3000);
                }
                else{
                    console.log(data)
                    $("#dialog p").html("登录失败！请重新登录")
                    $( "#dialog" ).dialog( "open" );
                    setTimeout(function(){
                        $( "#dialog" ).dialog( "close" );
                    },2000);
                }
            }
        });
    });
});
// 注册验证
var username2=document.getElementById("username2");
function checkName2(event){
    var tipname2=document.getElementById("tip-name2");
    if(/^[^A-Z]/.exec(username2.value)){
        tipname2.style.color="rgb(214, 72, 72)"
        event.preventDefault();
    }
    else{
        tipname2.style.color="#908a78"
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
        tippassword2.style.color="#908a78"
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
// 注册交互

$(document).ready(function(){
    $("#submit2").click(function(){
        var username=$("#username2").val();
        var password=$("#password2").val();
        var tel=$("#tel").val();
        console.log(tel)
        var postDate={
            "username":username,
            "password":password,
            "phoneNumber":tel
        }
        console.log(postDate)
        $.ajax({
            type: 'POST',
            url:"http://jojo.vipgz1.idcfengye.com/bluemsun_island/users",
            contentType: "application/json",
            data:JSON.stringify(postDate),
            error: function() {
                $("#dialog p").html("注册失败！请重新注册")
                $( "#dialog" ).dialog( "open" );
                setTimeout(function(){
                    $( "#dialog" ).dialog( "close" );
                },2000);
            },
            success: function(data) {
                if(data.status==1){
                    console.log(data)
                    $("#dialog p").html("注册成功！")
                    $( "#dialog" ).dialog( "open" );
                    setTimeout(function(){
                        location.href="../HTML/login.html";
                     },3000);
                }
                else{
                    console.log(data)
                    $("#dialog p").html("注册失败！请重新注册")
                    $( "#dialog" ).dialog( "open" );
                    setTimeout(function(){
                        $( "#dialog" ).dialog( "close" );
                    },2000);
                }
            }
        });
    });
});