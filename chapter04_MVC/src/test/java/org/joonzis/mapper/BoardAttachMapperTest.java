package org.joonzis.mapper;

import java.util.List;

import org.joonzis.domain.BoardAttachVO;
import org.junit.Test;
import org.junit.runner.RunWith;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.test.context.ContextConfiguration;
import org.springframework.test.context.junit4.SpringJUnit4ClassRunner;

import lombok.extern.log4j.Log4j;

@Log4j
@RunWith(SpringJUnit4ClassRunner.class)
@ContextConfiguration("file:src/main/webapp/WEB-INF/spring/root-context.xml")
public class BoardAttachMapperTest {

	@Autowired
	private BoardAttachMapper mapper;
	//파일 등록 테스트
//	@Test
//	public void testInsert() {
//		int a;
//		String uuid = "qwer";
//		String uploadPath = "/";
//		String fileName = "파일";				
//		int bno = 1;
//		BoardAttachVO vo = new BoardAttachVO();
//		vo.setUuid(uuid);
//		vo.setUploadPath(uploadPath);
//		vo.setBno(bno);
//		vo.setFileName(fileName);
//		
//		a = mapper.insert(vo); {
//			log.info(a);
//		}
//	}	
//	//등록 파일 찾기
//	@Test 
//	public void testRead() {
//		int bno = 1;
//		List<BoardAttachVO> vo = mapper.findByBno(bno);
//		log.info(vo);
//
//	}
//	//등록 파일 삭제
//	@Test
//	public void testDelete() {
//		String uuid = "qwer";
//		int result = mapper.delete(uuid);
//		log.info("delete count : " + result);
//	}

	
	
}
