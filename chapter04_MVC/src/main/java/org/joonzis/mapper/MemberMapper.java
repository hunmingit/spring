package org.joonzis.mapper;

import org.joonzis.domain.AuthVO;
import org.joonzis.domain.MemberVO;

public interface MemberMapper {
	//로그인 
	public MemberVO read(String userId);
	
    // 회원 정보 저장
    void insertMember(MemberVO vo);

    // 권한 저장
    void insertAuth(AuthVO vo);
	
	
	
	
	
}
