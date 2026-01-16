package org.joonzis.controller;

import org.joonzis.domain.MemberVO;
import org.joonzis.service.MemberService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.stereotype.Controller;
import org.springframework.ui.Model;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.ResponseBody;

import lombok.extern.log4j.Log4j;

@Log4j
@Controller
public class CommonController {
	
	@Autowired
	private MemberService service;

    @GetMapping("/accessError")
    public String accessDenied(Authentication auth, Model model) {
        log.info("Access Denied : " + auth);
        model.addAttribute("msg", "Access Denied");
        return "/accessError";
    }

    @GetMapping("/customLogin")
    public String loginInput(String error, String logout, Model model) {
        log.info("error : " + error);
        log.info("logout : " + logout);

        if (error != null) {
            model.addAttribute("error", "Login Error Check");
        }
        if (logout != null) {
            model.addAttribute("logout", "logout!!");
        }
        return "/customLogin";
    }

    @GetMapping("/customLogout")
    public String logoutGET() {
        log.info("custom logout");
        return "/customLogout";
    }
    @GetMapping("/join")
    public String joinForm() {
        return "/join";
    }

    @PostMapping("/join")
    public String join(MemberVO vo) {
        service.register(vo);
        return "redirect:/customLogin";
    }


    @ResponseBody
    @GetMapping("/api/currentUser.json")
    public Authentication getCurrentUser() {
        return SecurityContextHolder
                .getContext()
                .getAuthentication();
    }
}
