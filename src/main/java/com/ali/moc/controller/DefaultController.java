package com.ali.moc.controller;

import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.RequestMapping;

/**
 * 默认的控制器 
 * @author lee spring
 *
 */
@Controller
public class DefaultController {

	private static final String NOT_FOUND = "404";

	@RequestMapping
	public String handleDefault() {
		return NOT_FOUND;
	}

}
