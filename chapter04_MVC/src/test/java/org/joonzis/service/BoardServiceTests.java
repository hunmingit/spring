package org.joonzis.service;

import java.util.List;

import org.joonzis.domain.BoardVO;
import org.junit.Test;
import org.junit.runner.RunWith;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.test.context.ContextConfiguration;
import org.springframework.test.context.junit4.SpringJUnit4ClassRunner;


import lombok.extern.log4j.Log4j;

@Log4j
@RunWith(SpringJUnit4ClassRunner.class)
@ContextConfiguration("file:src/main/webapp/WEB-INF/spring/root-context.xml")
public class BoardServiceTests {
	
	@Autowired
	private BoardService service;
	
//	@Test
//	public void testGetList() {
//	
//		service.getList().forEach(vo -> log.info(vo)); //이런식으로 화살표 함수로도 가능하다.
////		List<BoardVO> list = service.getList();
////		for(BoardVO vo : list) {
////			log.info("테스트 결과 : "+vo);
////		}
//	}
//	
//	
//	@Test
//	public void testRegister() {
//		BoardVO vo = new BoardVO();
//		String title = "서비스 제목";
//		String content = "서비스 내용";
//		String writer = "서비스 글쓴이";
//		vo.setTitle(title);
//		vo.setContent(content);
//		vo.setWriter(writer);
//		
//		service.register(vo);
//		log.info("테스트 결과 : "+vo);
//				
//	}
//	@Test
//	public void testGet() {
//		BoardVO vo = new BoardVO();
//		int bno = 1;
//		vo = service.get(bno);
//		log.info("테스트 결과 : "+vo);
//	}
//	
//	@Test
//	public void testRemove() {
//		int bno = 6;
//		boolean result = service.remove(bno);
//
//		log.info("테스트 결과 : "+result);
//	}
//	
//	@Test
//	public void testModify() {
//		BoardVO vo = new BoardVO();
//		String title = "서비스 수정 제목";
//		String content = "서비스  수정 내용";
//		String writer = "서비스 수정 글쓴이";
//		int bno = 22;
//		vo.setBno(bno);
//		vo.setTitle(title);
//		vo.setContent(content);
//		vo.setWriter(writer);
//		String result = null;
//		if(service.modify(vo)==true) {
//			result = "수정 했습니다.";
//		}else {
//			result = "실패 했습니다.";
//		}
//		
//		log.info("테스트 결과 : "+result);
//		
//	}
//	
//	
}
