package org.joonzis.security;

import java.io.IOException;
import java.util.ArrayList;
import java.util.List;

import javax.servlet.ServletException;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;

import org.springframework.security.core.Authentication;
import org.springframework.security.web.authentication.AuthenticationSuccessHandler;

import lombok.extern.log4j.Log4j;

@Log4j									/*Spring Security 제공 인터페이스*/
public class CustomLoginSuccessHandler implements AuthenticationSuccessHandler{
	//로그인 성공했을 때 실행될 로직을 직접 정의하기 위해 구현 ,,로그인 성공 = onAuthenticationSuccess() 메서드가 자동 실행됨
	@Override
		public void onAuthenticationSuccess(HttpServletRequest request, HttpServletResponse response,
				Authentication authentication) throws IOException, ServletException {
			//Authentication 으로 
			log.warn("Login Success");
			
			List<String> roleNames = new ArrayList<String>();
			
			authentication.getAuthorities().forEach(auth ->{
				roleNames.add(auth.getAuthority());
			});
			log.warn("ROLE NAMES : " + roleNames);
			//계급을 여러가지 가질수 있어 list로 보관하고 그중 높은 권한부터 확인하기 위한 if문 return을 넣어준다.
			if(roleNames.contains("ROLE_ADMIN")) {
				response.sendRedirect("/sample/admin");
				return;
			}
			if(roleNames.contains("ROLE_MEMBER")) {
				response.sendRedirect("/sample/member");
				return;
			}
			response.sendRedirect("/");
		}
}
