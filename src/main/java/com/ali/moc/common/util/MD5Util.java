package com.ali.moc.common.util;

import java.security.MessageDigest;
import java.security.NoSuchAlgorithmException;

/**
 * 使用java.security.MessageDigest类写的一个工具类用来获取MD5码
 * @see java.security.MessageDigest
 */
public class MD5Util {
        /** */
        /**
             * 向getMD5方法传入一个你需要转换的原始字符串，将返回字符串的MD5码
             * @param code 原始字符串
             * @return 返回字符串的MD5码
             */
        public static String getMD5(String code){
                MessageDigest messageDigest;
                byte[] bytes = code.getBytes();
                byte[] results = null;
				try {
					messageDigest = MessageDigest.getInstance("MD5");
					results = messageDigest.digest(bytes);
				} catch (NoSuchAlgorithmException e) {
					e.printStackTrace();
				}
                StringBuilder stringBuilder = new StringBuilder();

                for (byte result : results) {
                        //将byte数组转化为16进制字符存入stringbuilder中
                        stringBuilder.append(String.format("%02x", result));
                }

                return stringBuilder.toString();
        }

}