package com.ali.moc.common.exception;

public class AppException extends RuntimeException {

	private static final long serialVersionUID = -7103543646035620631L;

	/**
	 * 
	 * @概要説明: 构造方法
	 * 
	 */
	public AppException() {
	}

	/**
	 * 
	 * @概要説明: 构造方法
	 * @param message
	 *            异常信息
	 * 
	 */
	public AppException(String message) {
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
	public AppException(String message, Throwable cause) {
		super(message, cause);
	}

	/**
	 * 
	 * @概要説明: 构造方法
	 * @param cause
	 *            cause
	 * 
	 */
	public AppException(Throwable cause) {
		super(cause);
	}

}
