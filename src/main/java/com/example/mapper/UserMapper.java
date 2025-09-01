package com.example.mapper;

import com.example.domain.UserInfo;
import org.apache.ibatis.annotations.Result;
import org.apache.ibatis.annotations.Results;
import org.apache.ibatis.annotations.Select;

public interface UserMapper {
    @Select("select * from ta_user_info where phone=#{phone}")
    @Results({
            @Result(property = "id", column = "id"),
            @Result(property = "nickname", column = "nickname"),
            @Result(property = "phone", column = "phone"),
            @Result(property = "email", column = "email"),
            @Result(property = "password", column = "password"),
            @Result(property = "gender", column = "gender"),
            @Result(property = "level", column = "level"),
            @Result(property = "city", column = "city"),
            @Result(property = "headImgUrl", column = "head_img_url"),
            @Result(property = "info", column = "info"),
            @Result(property = "state", column = "state"),
            @Result(property = "registerIp", column = "register_ip"),
            @Result(property = "registerTime", column = "register_time"),
            @Result(property = "birthday", column = "birthday")
    })
    UserInfo findByPhone(String phone);

}
