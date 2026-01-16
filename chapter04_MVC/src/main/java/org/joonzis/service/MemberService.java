package org.joonzis.service;


import org.joonzis.domain.MemberVO;
//매퍼와 다르게 서비스는 사용자가 이용하는 위주로 작성하므로 비즈니스 기준으로 설계한다.
//삭제된 행 수 가 아닌 성공 or 실패 로 알기위해 boolean을 사용한다.
//왜 register는 void로 받을까? 사용자 입장에선 등록 만 하면 되기 떄문
public interface MemberService {
	//로그인 
	public MemberVO read(String userId);
	
	//회원가입
	void register(MemberVO vo);
}
