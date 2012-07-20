package com.ali.moc.common.exception;

public class ServiceException extends AppException {
	private static final long serialVersionUID = -5557395969477228009L;

	/**
	 * 
	 * @概要説明: 构造方法
	 * 
	 */
	public ServiceException() {
	}

	/**
	 * 
	 * @概要説明: 构造方法
	 * @param message
	 *            异常信息
	 * 
	 */
	public ServiceException(String message) {
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
	public ServiceException(String message, Throwable cause) {
		super(message, cause);
	}

	/**
	 * 
	 * @概要説明: 构造方法
	 * @param cause
	 *            cause
	 * 
	 */
	public ServiceException(Throwable cause) {
		super(cause);
	}

}
