package org.joonzis.security;

import java.io.IOException;

import javax.servlet.ServletException;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;

import org.springframework.security.access.AccessDeniedException;
import org.springframework.security.web.access.AccessDeniedHandler;

import lombok.extern.log4j.Log4j;
@Log4j
public class CustomAccessDeniedHandler implements AccessDeniedHandler{
	
		@Override
		public void handle(HttpServletRequest request, HttpServletResponse response,
				AccessDeniedException accessDeniedException) throws IOException, ServletException {
			//리다이렉트로 하는 이유 : 그냥 하면 요청 경로가 그대로 노출됨 
			log.error("Access Denied Handler");
			log.error("Redirect!!");
			
			response.sendRedirect("/accessError");
			
		}
}
