package org.joonzis.mapper;


import org.joonzis.domain.MemberVO;

import org.junit.Test;
import org.junit.runner.RunWith;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.test.context.ContextConfiguration;
import org.springframework.test.context.junit4.SpringJUnit4ClassRunner;

import lombok.extern.log4j.Log4j;

@Log4j
@RunWith(SpringJUnit4ClassRunner.class)
@ContextConfiguration("file:src/main/webapp/WEB-INF/spring/root-context.xml")
public class MemberMapperTests {

	@Autowired
	private MemberMapper mapper;
	//한 게시글의 댓글 보기	
	@Test
	public void testRead() {
		String userId = "user0";
		MemberVO vo = mapper.read(userId);
		log.info("testRead..." +vo);
		
	}

}
