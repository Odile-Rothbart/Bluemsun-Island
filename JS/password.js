// 验证
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
var submit=document.getElementById("submit");
function check2(event){
    checkPassword2(event);
    checkPass(event);
}
submit.addEventListener("click",check2,false);
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
    $("#submit").click(function(){
        var password1=$("#password1").val();
        var password2=$("#password2").val();
        var postDate={
            "password1":password1,
            "password2":password2
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
                $("#dialog p").html("抱歉，密码修改失败")
                $( "#dialog" ).dialog( "open" );
                setTimeout(function(){
                    $( "#dialog" ).dialog( "close" );
                },2000);
            },
            success: function(data) {
                if(data.status==1){
                    console.log(data)
                    $("#dialog p").html("密码修改成功！")
                    $( "#dialog" ).dialog( "open" );
                    setTimeout(function(){
                        $( "#dialog" ).dialog( "close" );
                    },2000);
                }
                else{
                    console.log(data)
                    $("#dialog p").html("抱歉，密码修改失败")
                    $( "#dialog" ).dialog( "open" );
                    setTimeout(function(){
                        $( "#dialog" ).dialog( "close" );
                    },2000);
                }
            }
        });
    });
}