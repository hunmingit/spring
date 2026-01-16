package org.joonzis.service;

import org.joonzis.domain.AuthVO;
import org.joonzis.domain.MemberVO;
import org.joonzis.mapper.MemberMapper;
import org.joonzis.service.MemberService;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import lombok.RequiredArgsConstructor;

@Service
@RequiredArgsConstructor
public class MemberServiceImpl implements MemberService {

    private final MemberMapper mapper;
    private final PasswordEncoder pwEncoder;

    @Transactional
    @Override
    public void register(MemberVO vo) {

        // 1. 비밀번호 암호화
        vo.setUserPw(pwEncoder.encode(vo.getUserPw()));

        // 2. 회원 저장
        mapper.insertMember(vo);

        // 3. 기본 권한 부여
        AuthVO auth = new AuthVO();
        auth.setUserId(vo.getUserId());
        auth.setAuth("ROLE_USER");

        mapper.insertAuth(auth);
    }
    
    @Override
    public MemberVO read(String userId) {
    	return mapper.read(userId);
    }
}
