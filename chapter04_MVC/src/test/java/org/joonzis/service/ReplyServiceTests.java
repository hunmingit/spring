package org.joonzis.service;

import java.util.List;

import org.joonzis.domain.ReplyVO;
import org.junit.Test;
import org.junit.runner.RunWith;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.test.context.ContextConfiguration;
import org.springframework.test.context.junit4.SpringJUnit4ClassRunner;


import lombok.extern.log4j.Log4j;

@Log4j
@RunWith(SpringJUnit4ClassRunner.class)
@ContextConfiguration("file:src/main/webapp/WEB-INF/spring/root-context.xml")
public class ReplyServiceTests {
	
	@Autowired
	private ReplyService service;
	
//	@Test
//	public void testGetList() {		
//		int bno = 1;
//		service.getList(bno).forEach(vo -> log.info(vo)); //이런식으로 화살표 함수로도 가능하다.
//		List<ReplyVO> list = service.getList(bno);
//		for(ReplyVO vo : list) {
//			log.info("테스트 결과 : "+vo);
//		}
//	}
//	
//	
//	@Test
//	public void testRegister() {
//		ReplyVO vo = new ReplyVO();
//		String reply = "서비스 댓글 내용";
//		String replyer = "서비스 댓글 작성자";
//		int bno = 1;
//		vo.setReplyer(replyer);
//		vo.setReply(reply);
//		vo.setBno(bno);
//		
//		service.insert(vo);
//		log.info("테스트 결과 : "+vo);
//				
//	}
//	@Test
//	public void testGet() {
//		ReplyVO vo = new ReplyVO();
//		int rno = 3;
//		vo = service.read(rno);
//		log.info("테스트 결과 : "+vo);
//	}
//	
//	@Test
//	public void testRemove() {
//		int rno = 6;
//		boolean result = service.delete(rno);
//
//		log.info("테스트 결과 : "+result);
//	}
//	
	@Test
	public void testModify() {
		ReplyVO vo = new ReplyVO();

		String reply = "서비스  수정 내용";
		int rno = 4;
		vo.setReply(reply);
		vo.setRno(rno);

		String result = null;
		if(service.update(vo)==true) {
			result = "수정 했습니다.";
		}else {
			result = "실패 했습니다.";
		}
		
		log.info("테스트 결과 : "+result);
		
	}
	
//	
}
