package org.joonzis.security.domain;

import java.util.Collection;
import java.util.stream.Collectors;

import org.joonzis.domain.MemberVO;
import org.springframework.security.core.GrantedAuthority;
import org.springframework.security.core.authority.SimpleGrantedAuthority;
import org.springframework.security.core.userdetails.User;

import lombok.Getter;

@Getter
public class CustomUser extends User{
	/**
	 *고유 id 
	 */
	private static final long serialVersionUID = 1L;
	private MemberVO member;

	public CustomUser(
			String username, 
			String password, 
			Collection<? extends GrantedAuthority> authorities) {
		super(username, password, authorities);
	}
	
	public CustomUser(MemberVO vo) {
		super(
				vo.getUserId(),
				vo.getUserPw(),
				/*getAuthList 를 stream으로 변환/풀어서 map으로 반복문 돌려준다.*/
				vo.getAuthList().stream().map(auth->
					new SimpleGrantedAuthority(auth.getAuth())
				)
				.collect(Collectors.toList())
				);
		this.member = vo;
	}
	
}
