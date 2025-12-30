package org.joonzis.mapper;

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
public class ReplyMapperTests {

	@Autowired
	private ReplyMapper mapper;
//	//한 게시글의 댓글 보기	
//	@Test
//	public void testGetList() {
//		int bno = 1;
//		List<ReplyVO> list = mapper.getList(bno);
//		for(ReplyVO vo : list) {
//			log.info(vo);
//		}
//	}
//	//댓글 등록
//	@Test
//	public void testInsert() {
//		int a;
//		String replyer = "작성자";
//		String reply = "댓글";
//		int bno = 1;
//		ReplyVO vo = new ReplyVO();
//		vo.setReply(reply);
//		vo.setReplyer(replyer);
//		vo.setBno(bno);
//		a = mapper.insert(vo); {
//			log.info(a);
//		}
//	}	
//	//댓글 읽기	
//	@Test 
//	public void testRead() {
//		ReplyVO vo = new ReplyVO();
//		int rno = 3;
//		vo = mapper.read(rno);
//		log.info(vo);
//	}
//	//댓글 삭제
//	@Test
//	public void testDelete() {
//		int rno = 3;
//		int result;
//		result = mapper.delete(rno);
//		log.info("delete count : " + result);
//	}
//	//댓글 수정
//	@Test
//	public void testUpdate() {
//		String reply = "수정댓글입니다";
//		ReplyVO vo = new ReplyVO();
//
//		vo.setReply(reply);
//		vo.setRno(4);
//		
//		int result = mapper.update(vo);
//		log.info("수정 완료 :" +result);;
//	}	
	
	
}
