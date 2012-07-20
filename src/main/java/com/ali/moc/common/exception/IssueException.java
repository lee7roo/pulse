/** 
 * 文件名：IssueException.java 
 *
 */
package com.ali.moc.common.exception;

/**
 * 
 * @概要说明：IssueException 为系统自动生成的异常。一般出现此异常的时候，表明代码存在缺陷。
 * @创建人：jingjun.lou
 * @创建时间：2010-8-17
 * 
 * @修改人：
 * @修改时间：
 * @修改备注：
 * @version：
 * 
 */
public class IssueException extends RuntimeException {

	private static final long serialVersionUID = -8208430948983198371L;

	/**
	 * 
	 * @概要説明: 构造方法
	 * 
	 */
	public IssueException() {
	}

	/**
	 * 
	 * @概要説明: 构造方法
	 * @param message
	 *            异常信息
	 * 
	 */
	public IssueException(String message) {
		super(message);
	}

	/**
	 * 
	 * @概要説明: 构造方法
	 * @param message
	 *            异常信息
	 * @param cause
	 *            cause
	 * 
	 */
	public IssueException(String message, Throwable cause) {
		super(message, cause);
	}

	/**
	 * 
	 * @概要説明: 构造方法
	 * @param cause
	 *            cause
	 * 
	 */
	public IssueException(Throwable cause) {
		super(cause);
	}
}
