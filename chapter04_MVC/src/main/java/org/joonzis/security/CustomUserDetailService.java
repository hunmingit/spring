package org.joonzis.security;

import org.joonzis.domain.MemberVO;
import org.joonzis.mapper.MemberMapper;
import org.joonzis.security.domain.CustomUser;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.core.userdetails.UserDetailsService;
import org.springframework.security.core.userdetails.UsernameNotFoundException;

import lombok.extern.log4j.Log4j;

@Log4j
public class CustomUserDetailService implements UserDetailsService{
	
	@Autowired
	private MemberMapper mapper;
	//로그인 정보를 받아서 
	@Override
	public UserDetails loadUserByUsername(String username) throws UsernameNotFoundException {
		
		log.warn("load user by username : " + username);
		//db에서 가져온다
		MemberVO vo = mapper.read(username);
		
		log.warn("mapper : " + vo);
		//업다면 null을 받고 아니면 정보 가져옴
		return vo == null ? null : new CustomUser(vo);
	
	}
}
