package com.example.domain;

import com.fasterxml.jackson.annotation.JsonIgnore;
import lombok.Data;

import java.util.Date;
@Data
public class UserInfo {
    private Long id;
    private String nickname;
    private String phone;
    private String email;
    @JsonIgnore
    private String password;
    private Integer gender;
    private Integer level;
    private String city;
    private String headImgUrl;
    private String info;
    private Integer state;
    private String registerIp;
    private Date registerTime;
    private Date birthday;

    private String token;
}
