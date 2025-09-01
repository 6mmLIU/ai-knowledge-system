let uploadFiles = new Map();
//1  获取html中需要js控制的对象
// 退拽区域对象
let uploadSection = document.getElementById("uploadSection");
// 隐藏的文件上传按钮
let fileInput = document.getElementById("fileInput");
// 漂亮的选择文件按钮
let selectFileBtn = document.getElementById("selectFileBtn");
// 文件预览列表
let fileList = document.getElementById("fileList");
// 清除所有预览信息的按钮
let clearAllBtn = document.getElementById("clearAllBtn");
// 上传所有文件按钮
let uploadAllBtn = document.getElementById("uploadAllBtn");
//2 给html元素,增加相关事件

uploadAllBtn.addEventListener("click", uploadFunc);

async function uploadFunc() {
    //1 验证
    if (uploadFiles.size <= 0) {
        alert("请选择要上传的文件");
        return;
    }
    uploadAllBtn.disabled = true;
    uploadAllBtn.innerHTML = '<span class="spinner-border spinner-border-sm" role="status" ></span> 上传中...';
    //2 准备表单数据  post, 表单提交
    let formData = new FormData();
    for (let file of uploadFiles.values()) {
        formData.append("files", file);//files  是表单项名称
    }
    //3 发送请求
    try {
        const token = localStorage.getItem('token');
        let response = await fetch("/document/upload", {
            method: "POST",
            body: formData,
            headers: {
                'Authorization': `Bearer ${token}`
            }
        });
        if (!response.ok) {
            //window.location.href = '/';
            return;
        }
        const result = await response.text(); //文件1 上传成功 \n 文件2 上传成功 \n
        const messages = result.split('\n');
        for (let message of messages) {
            if (message.trim()) {
                let msgs = message.split(' ');
                let fileName = msgs[0];
                // 修改显示内容的状态信息
                updateFileStatus(fileName, 'success', msgs[1].trim());
            }
        }
    } catch (e) {
        for (const [fileName] of uploadFiles) {
            updateFileStatus(fileName, 'error', '上传失败');
        }
    } finally {
        uploadAllBtn.disabled = false;
        uploadAllBtn.innerHTML = '<i class="bi bi-cloud-upload"></i> 开始上传';
    }
}

function updateFileStatus(fileName, status, message) {
    const fileItem = Array.from(fileList.children).find(item =>
        item.querySelector('.file-name').textContent === fileName
    );
    if (fileItem) {
        const statusDiv = fileItem.querySelector('.file-status');
        statusDiv.className = `file-status status-${status}`;
        statusDiv.textContent = message;
    }
}


selectFileBtn.addEventListener("click", function () {
    fileInput.click();
});
// 拖拽文件进入
uploadSection.addEventListener("dragover", function (e) {
    e.preventDefault();
    //增加一个样式
    uploadSection.classList.add('dragover');
});
// 拖拽文件离开
uploadSection.addEventListener("dragleave", function (e) {
    e.preventDefault();
    //删除一个样式
    uploadSection.classList.remove('dragover');
});
// 退拽文件松手
uploadSection.addEventListener("drop", function (e) {
    e.preventDefault();
    uploadSection.classList.remove('dragover');
    const files = event.dataTransfer.files;
    handleFiles(files);
});

clearAllBtn.addEventListener("click", function () {
    if (confirm('确定要清除所有文件吗？')) {
        //1 map清除
        uploadFiles.clear();
        //2 文件列表情况
        fileList.innerHTML = '';
        //3 清除按钮隐藏
        clearAllBtn.style.display = 'none';
    }
});

//3 定义相关方法
function handleFileSelect(input) {
    if (input.files.length > 0) {
        handleFiles(input.files);
    }
}

//文件预上传
function handleFiles(files) {
    for (let file of files) {
        //1 验证文件类型
        const allowedTypes = ['application/pdf', 'application/msword', 'application/vnd.openxmlformats-officedocument.wordprocessingml.document', 'text/plain'];
        if (!allowedTypes.includes(file.type)) {
            alert(`文件 ${file.name} 类型不支持，请上传PDF、Word或TXT文件`);
            return;
        }
        //2 验证文件的大小
        if (file.size > 10 * 1024 * 1024) {
            alert(`文件 ${file.name} 大小超过10MB，请上传小于10MB的文件`);
            return;
        }
        //3 验证文件是否已经存在
        if (uploadFiles.has(file.name)) {
            alert(`文件 ${file.name} 已经存在，请勿重复上传`);
            continue;
        }
        //3 将文件添加到Map中
        uploadFiles.set(file.name, file);
        //4 map数据,展示到预览列表中
        addFileToList(file);

    }
    //5 把隐藏清除全部的按钮,显示出来
    clearAllBtn.style.display = 'block';
}

function addFileToList(file) {
    const fileItem = document.createElement('div');
    fileItem.classList.add('file-item');
    fileItem.innerHTML = `
       <div class="file-name">${file.name}</div>
       <div class="file-size">${formatFileSize(file.size)}</div>
       <div class="file-status status-pending">待上传</div>
       <div class="remove-file" onclick="removeFile('${file.name}')">
           <i class="bi bi-x-circle"></i>
       </div>
       <div class="upload-progress">
           <div class="progress-bar" id="progress-${file.name}"></div>
       </div>       
        `;
    fileList.appendChild(fileItem);
}

function formatFileSize(byteSize) {
    if (byteSize < 1024) {
        return byteSize + "B";
    } else if (byteSize < 1024 * 1024) {
        return (byteSize / 1024).toFixed(2) + "KB";
    } else {
        return (byteSize / (1024 * 1024)).toFixed(2) + "MB";
    }
}

function removeFile(filename) {
    //1 map中删除数据
    uploadFiles.delete(filename);
    //2 显示列表删除
    const deleteDiv = Array.from(fileList.children)
        .find(item => item.querySelector('.file-name').textContent === filename);
    if (deleteDiv) {
        deleteDiv.remove();
    }
    //3 如果map.size==0, 清除按钮要隐藏
    if (uploadFiles.size === 0) {
        clearAllBtn.style.display = 'none';
    }
}
