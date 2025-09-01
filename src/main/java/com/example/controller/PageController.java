package com.example.controller;

import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.GetMapping;

import java.util.Map;

@Controller
public class PageController {
    @GetMapping("/")
    public String index(Map<String, Object> map) {
        map.put("title","带它游-登录");
        return "login";
    }

    @GetMapping("/chat")
    public String chat(Map<String, Object> map) {
        map.put("pageTitle","小游客服助手");
        map.put("currentPath","/chat");
        map.put("content","/chat/chat");
        return "common/layout";
    }

    @GetMapping("/document")
    public String document(Map<String, Object> map) {
        map.put("pageTitle","知识库管理");
        map.put("currentPath","/document");
        map.put("content","/document/document");
        return "common/layout";
    }
}
