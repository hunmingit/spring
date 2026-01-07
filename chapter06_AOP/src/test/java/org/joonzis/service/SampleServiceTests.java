package org.joonzis.service;

import org.junit.Test;
import org.junit.runner.RunWith;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.test.context.ContextConfiguration;
import org.springframework.test.context.junit4.SpringJUnit4ClassRunner;

import lombok.extern.log4j.Log4j;

@Log4j
@RunWith(SpringJUnit4ClassRunner.class)//JUnit 실행 전에 Spring 컨테이너를 먼저 띄움 root-context.xml을 읽어서 빈 생성
@ContextConfiguration("file:src/main/webapp/WEB-INF/spring/root-context.xml")
public class SampleServiceTests {
	@Autowired
	private SampleService service;
	
	//service.doAdd() 호출 -> 프록시 객체가 먼저 받음
	// @Test
	// public void testAdd() throws Exception {
	// 	//실제 메서드 실행 SampleServiceImple에서 return Integer.parseInt(str1)+Integer.parseInt(str2);
	// 	log.info(service.doAdd("123", "456"));
		
	// }
	//에러 발생하게 설정 
	@Test
	public void testAddError() throws Exception {
		log.info(service.doAdd("123", "ABC"));
		
	}
}
