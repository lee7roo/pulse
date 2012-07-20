/**
 * Alibaba.com Inc. Copyright (c) 1999-2012 All Rights Reserved. 文件名：CustomSSOCallback.java
 **/
package com.ali.moc.common.util;

import java.io.IOException;
import java.security.InvalidKeyException;

import javax.crypto.BadPaddingException;
import javax.crypto.IllegalBlockSizeException;
import javax.servlet.ServletException;
import javax.servlet.http.Cookie;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;

import org.apache.commons.lang.StringUtils;
import org.codehaus.jackson.map.ObjectMapper;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;

import com.alibaba.buc.sso.client.handler.SSOCallback;
import com.alibaba.buc.sso.client.util.BucSSOClientUtil;
import com.alibaba.platform.buc.sso.common.constants.BucSSOConstants;
import com.alibaba.platform.buc.sso.common.dto.User;
import com.alibaba.platform.buc.sso.common.tool.CookieUtil;
import com.alibaba.platform.buc.sso.common.tool.SSOEncodeUtil;

/**
 * @概要说明：
 * @创建人：lee7roo
 * @创建时间：2012-3-2
 * @修改人：
 * @修改时间：
 * @修改备注：
 * @version：
 */

public class CustomSSOCallback extends SSOCallback {

    public final static String  USER_COOKIE = "USER_COOKIE";
    private static final Logger log         = LoggerFactory.getLogger(CustomSSOCallback.class);
    
    @Override
    public void beforeLogin(HttpServletRequest request, HttpServletResponse response) throws IOException,
                                                                                     ServletException {

    }

    @Override
    public boolean isRequestIgnored(HttpServletRequest request, HttpServletResponse response) throws IOException,
                                                                                             ServletException {
        return false;
    }

    /**
     * 自定义Cookie名称
     * 
     * @return
     */
    public String getCookieName() {
        return USER_COOKIE;
    }

    /**
     * 用户登录后，保存用户信息
     * 
     * @param user
     * @param request
     * @param response
     */
    @Override
    public void addUser(User user, HttpServletRequest request, HttpServletResponse response) throws IOException,
                                                                                            ServletException {
        if (user != null) {
            try {
                ObjectMapper om = new ObjectMapper();
                String value = SSOEncodeUtil.encodeCookieText(om.writeValueAsString(user));

                CookieUtil.addCookie(getCookieName(), value, BucSSOConstants.TOKEN_MAX_AGE, BucSSOConstants.SLASH,
                                     BucSSOClientUtil.getSsoCookieDomain(), response);
            } catch (InvalidKeyException e) {
                log.error(e.getMessage(), e);
            } catch (IllegalBlockSizeException e) {
                log.error(e.getMessage(), e);
            } catch (BadPaddingException e) {
                log.error(e.getMessage(), e);
            }
        }
    }
    

    /**
     * 返回当前用户是否已经登录
     * 
     * @param request
     * @param response
     * @return
     */
    @Override
    public boolean checkUser(HttpServletRequest request, HttpServletResponse response) throws IOException,
                                                                                      ServletException {
        Cookie cookie = CookieUtil.getCookie(getCookieName(), request);
        String userJsonStr = null;
        if (cookie == null) return false;
        try {
            userJsonStr = SSOEncodeUtil.decodeCookieText(cookie.getValue());
        } catch (InvalidKeyException e) {
            log.error(e.getMessage(), e);
        } catch (IllegalBlockSizeException e) {
            log.error(e.getMessage(), e);
        } catch (BadPaddingException e) {
            log.error(e.getMessage(), e);
            cookie.setPath(BucSSOConstants.SLASH);
            cookie.setMaxAge(0);
            response.addCookie(cookie);
        }
        return StringUtils.isNotBlank(userJsonStr);
    }

    /**
     * 用户登出后，清理用户信息
     * 
     * @param request
     * @param response
     */
    @Override
    public void removeUser(HttpServletRequest request, HttpServletResponse response) throws IOException,
                                                                                    ServletException {
        CookieUtil.removeCookie(getCookieName(), BucSSOConstants.SLASH, BucSSOClientUtil.getSsoCookieDomain(), response);
    }
}
