package com.ali.moc.common.service;

import org.aspectj.lang.JoinPoint;
import org.aspectj.lang.ProceedingJoinPoint;
import org.aspectj.lang.annotation.Around;
import org.aspectj.lang.annotation.Aspect;
import org.aspectj.lang.annotation.Pointcut;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.stereotype.Component;

import com.ali.moc.common.exception.DaoException;
import com.ali.moc.common.exception.IssueException;
import com.ali.moc.common.exception.ServiceException;


@Component("serviceInterceptor")
@Aspect
public class Interceptor {

    // 系统LOGGER
    private static final Logger LOGGER = LoggerFactory
            .getLogger(Interceptor.class);

    private final String POINCUT_EL = "@within(org.springframework.stereotype.Service) || target(com.ali.moc.common.service.BaseService)";

    // POINTCUT名称
    @SuppressWarnings("unused")
    private final String POINCUT = "serviceMethod()";

    @SuppressWarnings("unused")
    @Pointcut(POINCUT_EL)
    private void serviceMethod() {
    }

    /**
     * 
     * @概要説明: 拦截Service中方法的执行
     * @param pjp
     * @return
     * @throws Throwable
     *             Throwable
     * 
     */
    @Around(POINCUT_EL)
    public Object doAround(ProceedingJoinPoint pjp) throws Throwable {
        try {
            return pjp.proceed();
        } catch (Exception ex) {
            // 捕获Service层发生的异常，并转化为统一的Service层异常向上抛出
            throw transServiceException(ex, pjp);
        }
    }

    private Exception transServiceException(Exception ex, JoinPoint pjp) {

        Exception transedException = ex;

        if (!(ex instanceof DaoException) && !(ex instanceof ServiceException)
                && !(ex instanceof IssueException)) {
            transedException = new ServiceException(ex);
            LOGGER.error(ex.getMessage(), ex);
        }
        return transedException;

    }
}
