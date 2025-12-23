package org.joonzis.mapper;

import java.util.List;

import org.joonzis.domain.BoardVO;

import org.junit.Test;
import org.junit.runner.RunWith;//테스트 실행 시 Spring 컨테이너를 먼저 띄움, @Autowired 사용 가능해짐
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.test.context.ContextConfiguration;
import org.springframework.test.context.junit4.SpringJUnit4ClassRunner;

import lombok.extern.log4j.Log4j;

@Log4j
//////실제 프로젝트에서 사용하는 root-context.xml을 그대로 불러옴
////Spring 컨테이너가 먼저 실행됨
//mapper bean 새성됨
//@Autowired 사용 가능해짐
@RunWith(SpringJUnit4ClassRunner.class)
@ContextConfiguration("file:src/main/webapp/WEB-INF/spring/root-context.xml")
public class BoardMapperTests {
	//BoardMapper를 어떻게 불러올 수 있지? 
	//Spring이 실핼될 때 BoardMapper의 대신 객체를 만들어서 자동으로 넣어주기 때문
	//BoardMapper는 interface이고 interface는 new BoardMapper()가 불가능->MyBatis가 구현체를 대신 만들어 줌
	
	@Autowired
	private BoardMapper mapper;
	//테스트라 해도 실제 데이터는 들어간다.
//	@Test
//	public void testGetList() {
//		List<BoardVO> list = mapper.getList();
//		for(BoardVO vo : list) {
//			log.info(vo);
//		}
//	}
//	@Test
//	public void testInsert() {
//		int a;
//		String title = "제목";
//		String content = "내용";
//		String writer = "user";
//		BoardVO vo = new BoardVO();
//		vo.setTitle(title);
//		vo.setContent(content);
//		vo.setWriter(writer);
//		a = mapper.insert(vo); {
//			log.info(a);
//		}
//	}
//	@Test
//	public void testRead() {
//		BoardVO vo = new BoardVO();
//		int bno = 1;
//		vo = mapper.read(bno);
//		log.info(vo);
//	}
//	
//	@Test
//	public void testDelete() {
//		int bno = 7;
//		int result;
//		result = mapper.delete(bno);
//		log.info("delete count : " + result);
//	}
//	
//	@Test
//	public void testUpdate() {
//		String title = "수정제목입니다";
//		String content = "수정내용입니다";
//		String writer = "userupdate";
//		BoardVO vo = new BoardVO();
//		vo.setBno(6);
//		vo.setTitle(title);
//		vo.setContent(content);
//		vo.setWriter(writer);
//		int result = mapper.update(vo);
//		log.info("수정 완료 :" +result);;
//	}
	
	
	
	
	
}
