package com.example.controller;

import com.example.domain.UserInfo;
import com.example.qo.User;
import com.example.service.UserService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RestController;
import reactor.core.publisher.Mono;
@RestController
public class UserController {
    @Autowired
    private UserService userService;
    @PostMapping("/login")
    public Mono<ResponseEntity<UserInfo>> login(@RequestBody User user) {
        // 1 处理业务逻辑
        Mono<UserInfo> userInfoMono = userService.login(user);
        // 2 添加统一返回值类型
        Mono<ResponseEntity<UserInfo>> ret = userInfoMono.map(userInfo -> ResponseEntity.ok(userInfo));
        // 3 添加错误的处理
        ret.defaultIfEmpty(ResponseEntity.status(401).build());
        System.out.println(userInfoMono);
        return ret;
    }
}
