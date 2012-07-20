/** 
 * 文件名：DaoException.java 
 *
 */
package com.ali.moc.common.exception;

/**
 * 
 * @概要说明：sbtfs Dao层的异常
 * @创建人：jingjun.lou
 * @创建时间：2010-8-17
 * 
 * @修改人：
 * @修改时间：
 * @修改备注：
 * @version：
 * 
 */
public class DaoException extends AppException {

	private static final long serialVersionUID = -7692375930107355552L;

	/**
	 * 
	 * @概要説明: 构造方法
	 * 
	 */
	public DaoException() {
	}

	/**
	 * 
	 * @概要説明: 构造方法
	 * @param message
	 *            异常信息
	 * 
	 */
	public DaoException(String message) {
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
	public DaoException(String message, Throwable cause) {
		super(message, cause);
	}

	/**
	 * 
	 * @概要説明: 构造方法
	 * @param cause
	 *            cause
	 * 
	 */
	public DaoException(Throwable cause) {
		super(cause);
	}
}
