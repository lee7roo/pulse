package com.ali.moc.controller;

import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.servlet.ModelAndView;

@Controller
public class IndexController {

	
	@RequestMapping(value = "/", method = RequestMethod.GET)
	public String toIndex() {
		return "redirect:/welcome";
	}
	
	@RequestMapping(value = "/welcome", method = RequestMethod.GET)
	public ModelAndView welcome() {
		
		ModelAndView mv = new ModelAndView();
		mv.setViewName("default");
		return mv;
	}
}
