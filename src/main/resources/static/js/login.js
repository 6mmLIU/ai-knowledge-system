
async function handleLogin(e){
    // 抑制事件的默认行为
    e.preventDefault();
    // 获取表单数据 input
   let phone=document.getElementById("phone").value;  //admin
   let password=document.getElementById("password").value;  //123456
    // div  innerHTMl=
    let errorMessage=document.getElementById("errorMessage");  //123456
    // 标案验证
    const reg = /^1[3456789]\d{9}$/;
    if(!reg.test(phone)){
        errorMessage.innerHTML="手机号不正确";
        errorMessage.style.display="block";
        return false;
    }
    if(password.length<6){
        errorMessage.innerHTML="密码的长度不能低于6位";
        errorMessage.style.display="block";
        return false;
    }
    // 发送请求
    let response=await fetch("/login",{
         method:"POST",
         headers: {
             "Content-Type": "application/json"
         },
         body:JSON.stringify({phone:phone,password:password})
     });
    // {"username:"admin","password":"123456"}
    // 处理响应
    if(response.ok){
        // 接收后端传递回来的数据
        let data= await response.json();
        // 登录成功 浏览器中数据存储
        localStorage.setItem("token",data.token);
        localStorage.setItem("userInfo",JSON.stringify(data));
        window.location.href="/chat";
    }else{
        errorMessage.innerHTML="登录失败!";
        errorMessage.style.display="block";
        return false;
    }
    //表单不提交
    return false;
}