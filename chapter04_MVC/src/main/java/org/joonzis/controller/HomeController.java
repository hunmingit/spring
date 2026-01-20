package org.joonzis.controller;

import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;

/**
 * Handles requests for the application home page. 기본 화면 이동하기
 */
@Controller
public class HomeController {


	@RequestMapping(value = "/", method = RequestMethod.GET)
	public String home() {
	
		return "index";
	}
	
}
