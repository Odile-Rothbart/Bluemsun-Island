$("#bright").click(function(){
    if($("header").css("background-color")=="rgba(239, 232, 213, 0.7)"){
        $("button").css("background-color","rgb(140, 199, 181, 0.7)")
        $("#all span").css("background","url(../IMG/bluenav.png) no-repeat")
        $("#all span").css("background-size","480px 450px")
        $("#theme span").css("background","url(../IMG/bluenav.png) no-repeat")
        $("#theme span").css("background-size","480px 450px")
        $("#theme span").css("background-position","-240px -240px")
        $("#all a").css("color","rgb(52, 149, 240)")
        $("#all div #nav1").css("background-position","0 -210px")
        $("#all div #nav2").css("background-position","-420px -210px")
        $("#all div #nav3").css("background-position","-60px -180px")
        $("#all div #nav4").css("background-position","-240px -180px")
        $("#all div #nav5").css("background-position","-270px -180px")
        $("header").css("background-color","rgba(160, 238, 225, 0.7)")
        $("#left").css("background-color","rgba(190, 237, 199, 0.7)")
        $("#right").css("background-color","rgba(190, 237, 199, 0.7)")
        console.log($("header").css("background-color"))
        return true;
    }
    if($("header").css("background-color")=="rgba(160, 238, 225, 0.7)"){
        $("button").css("background-color","rgba(143, 77, 38, 0.7)")
        $("#all span").css("background","url(../IMG/orangenav.png) no-repeat")
        $("#all span").css("background-size","480px 450px")
        $("#theme span").css("background","url(../IMG/orangenav.png) no-repeat")
        $("#theme span").css("background-size","480px 450px")
        $("#theme span").css("background-position","-240px -240px")
        $("#all a").css("color","rgb(143, 77, 38)")
        $("#all div #nav1").css("background-position","0 -210px")
        $("#all div #nav2").css("background-position","-420px -210px")
        $("#all div #nav3").css("background-position","-60px -180px")
        $("#all div #nav4").css("background-position","-240px -180px")
        $("#all div #nav5").css("background-position","-270px -180px")
        $("header").css("background-color","rgba(239, 232, 213, 0.7)")
        $("#left").css("background-color","rgba(245, 222, 179, 0.7)")
        $("#right").css("background-color","rgba(245, 222, 179, 0.7)")
    }
})