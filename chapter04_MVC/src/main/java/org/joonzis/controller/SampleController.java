package org.joonzis.controller;

import org.springframework.security.access.annotation.Secured;
import org.springframework.security.access.prepost.PreAuthorize;
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
	
	//어노테이션을 이용한 시큐리티 설정
	//preAuthorize : 메서드 실행 전 권한 체크
	@PreAuthorize("hasAnyRole('ROLE_MEMBER','ROLE_ADMIN')")
	@GetMapping("/annoMember")
	public void doMember2() {
		log.info("로그인 멤버 어노테이션");
	}
	
	@Secured({"ROLE_ADMIN"})
	@GetMapping("/annoAdmin")
	public void doAdmin2() {
		log.info("로그인 어드민 어노테이션");
	}	
	
	
}
