// 登录验证
var password1=document.getElementById("password1");
function checkPassword1(event){
    var tippassword1=document.getElementById("tip-password1");
    if(/[^0-9a-zA-Z]/.exec(password1.value)){       
        tippassword1.innerHTML="请输入正确形式的密码（密码只包括字母和数字，且区分大小写）";
        event.preventDefault();
    }
    else{
        tippassword1.innerHTML="";
    }
}
password1.addEventListener("blur",checkPassword1,false);
// function checkPassword1(){
//     if(/[^0-9a-zA-Z]/.exec($("#password1").val())){
//         console.log(1)
//         $("#tip-password1").html("请输入正确形式的密码（密码只包括字母和数字，且区分大小写）");
//     }
//     else{
//         $("#tip-password1").html("");
//     }
// }
// $("#password1").blur(checkPassword1());
// $("#submit1").click(checkPassword1());
var submit1=document.getElementById("submit1");
function check1(event){
    checkPassword1(event);
}
submit1.addEventListener("click",check1,false);
// 登录交互
// window.onload = function(){
//     var submit = document.getElementById("submit");
//     submit.onclick = function(){
//         var username = document.getElementById("username").value;
//         var password = document.getElementById("password").value;
//         var xhr = new XMLHttpRequest();
//         xhr.open("post", "http://rothbart.natapp1.cc/loginServlet");
//         xhr.setRequestHeader("Content-Type", "application/json");
//         xhr.withCredentials=true;
//         xhr.send(JSON.stringify({
//             username: username,
//             password: password
//         }));
//         xhr.onreadystatechange = function(){
//             if(xhr.readyState === 4 && xhr.status === 200){
//                 var res = JSON.parse(xhr.responseText)
//                 console.log(res.msg);
//                 console.log(res.status);
//                 console.log(res.data);
//                 localStorage.setItem("userid", res.data.ID);
//                 var fk=document.getElementById("fk");
//                 if(res.status==1){
//                     fk.innerHTML="恭喜！登录成功！";
//                     setTimeout(function(){
//                         location.href="../html/home.html";
//                     },3000);
//                 }
//                 if(res.status==0){
//                     fk.innerHTML="抱歉！登录失败！";
//                 }
//             }
//         }
//     }
// }
$(document).ready(function(){
    $("#submit1").click(function(){
        var username=$("#username1").val();
        var password=$("#password1").val();
        var postDate={
            "username":username,
            "password":password
        }
        $.ajax({
            type: 'POST',
            url:"../test.json",
            data:postDate,
            error: function() {
                alert('请求失败 ');
            },
            success: function(data) {
                ajaxobj=eval("("+data+")");
                alert(ajaxobj.msg);
            }
        });
    });
});
// 注册验证
var username2=document.getElementById("username2");
function checkName2(event){
    var tipname2=document.getElementById("tip-name2");
    if(/^[^A-Z]/.exec(username2.value)){
        tipname2.innerHTML="用户名请以大写字母开头";
        event.preventDefault();
    }
    else{
        tipname2.innerHTML="";
    }
}
username2.addEventListener("blur",checkName2,false);
var password2=document.getElementById("password2");
function checkPassword2(event){
    var tippassword2=document.getElementById("tip-password2");
    if(/[^0-9a-zA-Z]/.exec(password2.value)){
        tippassword2.innerHTML="请输入正确形式的密码（密码只包括字母和数字，且区分大小写）";
        event.preventDefault();
    }
    else{
        tippassword2.innerHTML="";
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
var tel=document.getElementById("tel");
function checkTel(){
    tel.value=tel.value.replace(/(\d{3})(\d{4})(\d{4})/g,'+86 $1 $2 $3');
}
tel.addEventListener("blur",checkTel,false);
var submit2=document.getElementById("submit2");
function check2(event){
    checkName2(event);
    checkPassword2(event);
    checkPass(event);
    checkTel();
}
submit2.addEventListener("click",check2,false);
// // 注册交互
// window.onload = function(){
//     var submit = document.getElementById("submit");
//     submit.onclick = function(){
//         var username = document.getElementById("username").value;
//         var password = document.getElementById("password").value;
//         var xhr = new XMLHttpRequest();
//         xhr.open("post", "http://rothbart.natapp1.cc/indexServlet");
//         xhr.setRequestHeader("Content-Type", "application/json");
//         xhr.send(JSON.stringify({
//             username: username,
//             password: password
//         }));
//         xhr.onreadystatechange = function(){
//             if(xhr.readyState === 4 && xhr.status === 200){
//                 var res = JSON.parse(xhr.responseText)
//                 console.log(res.msg);
//                 console.log(res.status);
//                 var fk=document.getElementById("fk");
//                 if(res.status==1){
//                     fk.innerHTML="恭喜！注册成功！";
//                     setTimeout(function(){
//                         location.href="../html/home.html";
//                     },3000);
//                 }
//                 else{
//                     fk.innerHTML="抱歉！注册失败！";
//                 }
//             }
//         }
//     }
// }