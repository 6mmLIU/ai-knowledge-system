package com.example.service;

import com.example.domain.UserInfo;
import com.example.qo.User;
import reactor.core.publisher.Mono;

public interface UserService {
    /**
     * 根据手机号和密码进行登录
     * @param user
     * @return
     */
    Mono<UserInfo> login(User user);
}
