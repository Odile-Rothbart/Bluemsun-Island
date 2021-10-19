window.onload = function(){
    var res;
    document.getElementById("file").onchange = function(){
        var file = document.getElementById("file").files[0];
        var reader = new FileReader();   //将图片格式转化成base64
        reader.addEventListener("load", function () {
            document.getElementById("show").innerHTML = `<img src="${reader.result}" width="150px" height="150px">`
        }, false);
        if(file){
            reader.readAsDataURL(file);
        }
        document.getElementById("submit1").onclick = function(e){
            var file = document.getElementById("file").files[0];
            var formdata = new FormData();
            formdata.append('file', file);
            var xhr = new XMLHttpRequest();
            xhr.open('post', ' http://rothbart.natapp1.cc/productUpload1');
            xhr.send(formdata);
            xhr.onreadystatechange = function(){
                if(xhr.readyState === 4 && xhr.status === 200){
                    res = JSON.parse(xhr.responseText)
                    console.log(res.address);
                }
            }
        }
    }
    var submit = document.getElementById("submit2");
    submit.onclick = function(){
        var productname = document.getElementById("productname").value;
        var productprice = document.getElementById("productprice").value;
        var productnum = document.getElementById("productnum").value;
        var productmsg = document.getElementById("productmsg").value;
        var xhr = new XMLHttpRequest();
        xhr.open("post", " http://rothbart.natapp1.cc/productUpload2");
        xhr.setRequestHeader("Content-Type", "application/json");
        xhr.send(JSON.stringify({
            product_name: productname,
            product_price: productprice,
            product_num:productnum,
            product_msg:productmsg,
            product_photo:res.address
        }));
        xhr.onreadystatechange = function(){
            if(xhr.readyState === 4 && xhr.status === 200){
                var res = JSON.parse(xhr.responseText)
                console.log(res.msg);
                console.log(res.status);
                var fk=document.getElementById("fk");
                if(res.status==1){
                    fk.innerHTML="上传成功！";
                    setTimeout(function(){
                        location.href="../html/updata.html";
                    },3000);
                }
                else{
                    fk.innerHTML="上传失败！";
                }
            }
        }
    }
}