package com.example.service.impl;

import com.example.domain.UserInfo;
import com.example.mapper.UserMapper;
import com.example.qo.User;
import com.example.service.UserService;
import com.example.util.PasswordUtil;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.util.StringUtils;
import reactor.core.publisher.Mono;

import java.util.UUID;

@Service
public class UserServiceImpl implements UserService {
    @Autowired
    private UserMapper userMapper;

    @Override
    public Mono<UserInfo> login(User user) {
        //1 根据手机号查询
        UserInfo userInfo = userMapper.findByPhone(user.getPhone());
        System.out.println(userInfo);
        if(StringUtils.isEmpty(userInfo)){
            return Mono.empty();
        }
        //2 验证密码
        //对明文进行加密
        String password1 = PasswordUtil.md5(PasswordUtil.md5(user.getPassword()));
        if(!(password1.equals(userInfo.getPassword()))){
            return Mono.empty();
        }
        // 3 创建一个token 32位16进制数
        String token = UUID.randomUUID().toString().replaceAll("-","");
        userInfo.setToken(token);

        // 4 String key=前缀token value=userInfo 30ms

        //5 返回用户信息
        userInfo.setPassword("");
        return Mono.just(userInfo);
    }
}
