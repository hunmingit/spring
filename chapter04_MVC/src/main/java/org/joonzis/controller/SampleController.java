package org.joonzis.controller;

import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;

import lombok.extern.log4j.Log4j;

@Log4j
@Controller
@RequestMapping("/sample/*")
public class SampleController {
	@GetMapping("/all")
	public void doaAll() {
		log.info("do All....");
	}
	@GetMapping("/member")
	public void doMember() {
		log.info("do member....");
	}
	@GetMapping("/admin")
	public void doAdmin() {
		log.info("do admin....");
	}
}
