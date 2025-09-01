package com.example.util;

import java.security.MessageDigest;
import java.util.UUID;

public class PasswordUtil {
	
	//md5加密  s表示要加密的明文  返回密文
	public static String md5(String s) {
	    try {
	        MessageDigest md = MessageDigest.getInstance("MD5");//用md5加密
	        byte[] bytes = md.digest(s.getBytes("utf-8"));//进行加密处理
	        //把密文进行16进制数据处理
	         return toHex(bytes);
	    }
	    catch (Exception e) {
	        throw new RuntimeException(e);
	    }
	}
	//密码转换为16机制数  0~f
	private static String toHex(byte[] bytes) {

	    final char[] HEX_DIGITS = "0123456789ABCDEF".toCharArray();
	    StringBuilder ret = new StringBuilder(bytes.length * 2);
	    for (int i=0; i<bytes.length; i++) {
	        ret.append(HEX_DIGITS[(bytes[i] >> 4) & 0x0f]);
	        ret.append(HEX_DIGITS[bytes[i] & 0x0f]);
	    }
	    return ret.toString();
	}
	//随机一个盐
	//
	public static String salt(){
		//UUID 通常是生成主键用的, 32个字符 有4个-构成 唯一
		UUID uuid = UUID.randomUUID();
		String[] arr = uuid.toString().split("-");
		return arr[0];
	}
	
	
	public static void main(String[] args) {
		//System.out.println(salt());
		// 202CB962AC59075B964B07152D234B70
		//System.out.println(md5("123"));
//		System.out.println(md5("1234567890"));
//		UUID uuid = UUID.randomUUID();
//		//105a670c-8dc8-4d8d-95e6-20ed65975c9e   4a819b95-cc33-477b-ad26-d088925d3f43
//		System.out.println(uuid);
		//0703832d    52973ca2
		//System.out.println(salt());
//		202CB962AC59075B964B07152D234B70
//		759916ED080C06C0C806A9B9F54FA6C5
		String s=salt();
		System.out.println(s);
		System.out.println(md5(md5("123456")+s));
	}
	
}
