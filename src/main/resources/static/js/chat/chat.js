
//1 获取页面元素对象
let chatContainer=document.getElementById("chatContainer");
let userInput=document.getElementById("userInput");
let sendButton=document.getElementById("sendButton");

//2 绑定事件
// 绑定按钮的事件
sendButton.addEventListener("click",sendMsg);
// 绑定input,回车事件
userInput.addEventListener("keypress",function(event){
    if(event.keyCode===13 && !event.shiftKey){
        event.preventDefault();
        sendMsg();
    }
});

function sendMsg(){
    //1 获取localstorage中的数据
    const token = localStorage.getItem('token');
    const userInfo = localStorage.getItem('userInfo');
    //2 获取用户输入的内容
    const msg = userInput.value.trim();
    if(!msg){
        console.log("不能发送空消息");
        return;
    }
    //4 写入用户的提问信息
    addMessage(msg, 'user', '用户');
    // 清空输入框
    userInput.value = '';
    // 等待AI回答的动画
    showTypingIndicator();
    //5 发送消息给后台
    let contextDiv='';

    const eventSource = new EventSource(`/chat/chat?userId=${JSON.parse(userInfo).id}&message=${msg}`,
        {});

    eventSource.onmessage = function (event) {
        removeTypingIndicator();

        contextDiv.innerHTML += event.data;
        window.scrollTo({
            top: document.body.scrollHeight,
            behavior: 'smooth'
        });
    }
    eventSource.onerror = function (event) {
        eventSource.close();
        event.preventDefault();
        console.log("有错误!")
    }
    eventSource.onopen= function (event) {
        console.log("连接完成!")
        contextDiv=addMessage('', 'ai', '小狼');
    }



    // try {
    //     const response = await fetch('/chat/chat', {
    //         method: 'POST',
    //         headers: {
    //             'Content-Type': 'application/json',
    //             'Authorization': `Bearer ${token}`
    //         },
    //         body: JSON.stringify({message: msg, userId: JSON.parse(userInfo).id})
    //     });
    //     if (!response.ok) {
    //         // 处理错误
    //         console.error('Error:', response.statusText);
    //         addMessage('抱歉，您的问题没听清楚，请稍后重试。', 'ai', '小狼');
    //         window.scrollTo({
    //             top: document.body.scrollHeight,
    //             behavior: 'smooth'
    //         });
    //     } else {
    //         //删除动画
    //         removeTypingIndicator();
    //         // data:你
    //         // datta:好
    //         const reader = await response.body.getReader();
    //         // 增加预制输出结构
    //         let contextDiv=addMessage('', 'ai', '小狼');
    //         contextDiv.innerHTML='';
    //         // 文本内容,解码器
    //         const decoder = new TextDecoder();
    //         // 接收后端传递的数据
    //         let responseText = '';
    //         while (true) {
    //             const {done, value} = await reader.read();
    //             if (done) {
    //                 break;
    //             }
    //             // 解码
    //             let text = decoder.decode(value, {stream: true});
    //             const lines = text.split('\n');
    //             for (let line of lines) {
    //                 if (!line.startsWith("data:")){
    //                     continue;
    //                 }
    //                 // 去掉data:
    //                 line = line.slice(5).trim();
    //                 responseText+=line;
    //             }
    //             // 每次接收到数据就更新一次
    //             contextDiv.innerHTML = responseText;
    //             // 滚动条自动到底部
    //             // 滚动到最新消息
    //             window.scrollTo({
    //                 top: document.body.scrollHeight,
    //                 behavior: 'smooth'
    //             });
    //         }
    //     }
    // } catch (e) {
    //     addMessage('抱歉，发生了一些错误，请稍后重试。', 'ai', '小狼');
    //     window.scrollTo({
    //         top: document.body.scrollHeight,
    //         behavior: 'smooth'
    //     });
    // } finally {
    //     removeTypingIndicator();
    // }
}

function addMessage(message, type, role) {
    // 定义一个div
    const messageContainer = document.createElement('div');
    // 给div增加类样式
    messageContainer.classList.add('message', type);
    // div中的内容
    messageContainer.innerHTML = `
        <div class="message-header">${role}：</div> 
        <div class="message-content">
             <div class="message-text">${message}</div>
        </div>        
    `;
    // 把div追加到消息面板中
    chatContainer.appendChild(messageContainer);
    // 动态改变数据内容
    return messageContainer.querySelector('.message-text');
}

function showTypingIndicator(){
    const indicator = document.createElement('div');
    indicator.className = 'message ai typing-indicator';
    indicator.id = 'typingIndicator';
    indicator.innerHTML = `
        <div class="message-header">小狼</div>
        <div class="typing-dot"></div>
        <div class="typing-dot"></div>
        <div class="typing-dot"></div>    
    `;
    chatContainer.appendChild(indicator);
}

function removeTypingIndicator(){
    let indicator = document.getElementById('typingIndicator');
    if(indicator){
        indicator.remove();
    }
}


