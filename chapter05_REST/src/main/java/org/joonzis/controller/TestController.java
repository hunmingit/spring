package org.joonzis.controller;

import org.joonzis.domain.TestVO;
import org.joonzis.domain.Ticket;
import org.springframework.http.HttpStatus;
import org.springframework.http.MediaType;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

import com.google.gson.Gson;
import com.google.gson.JsonArray;
import com.google.gson.JsonObject;

import lombok.extern.log4j.Log4j;

@Log4j
@RestController
@RequestMapping("/test/*")
public class TestController {
    //데이터를 리턴할 때 타입 선언 
	@GetMapping(value = "/getText",
			produces = "text/plain; charset=utf-8")
	public String getText() {
		log.info("Mime type : "+ MediaType.TEXT_PLAIN_VALUE);
		
		//기존 jsp의 파일이름이 아닌 순수 데이터를 전달
		return "안녕하세요";
	}
	//이 응답이 어떤 형식의 데이터인지 알려주는 HTTP
	@GetMapping(value = "/getObject",produces = {
			//.json 붙이면 json 형식으로 넘어온다 
			MediaType.APPLICATION_JSON_UTF8_VALUE, 
			MediaType.APPLICATION_XML_VALUE})
	public TestVO getObject() {
		return new TestVO(100, "kim");
	}

	/*
	 * 메소드를 만들고 URL에 맞게 요청해서 결과를 확인하시오(xml, json)
	 * 1. 요청 URL : /test/check
	 * 2. 파라미터 : 실수형 age
	 * 3. 리턴타입 : TestVO
	 * 		- vo 객체 생성
	 * 		- no 필드는 0으로 고정
	 * 		- 전달 받은 age를 문자열로 name 필드에 저장
	 * */
	@GetMapping(value = "/check", produces = {
			MediaType.APPLICATION_JSON_UTF8_VALUE, 
			MediaType.APPLICATION_XML_VALUE
	})
	//http://localhost:8089/test/check?age=10
	public ResponseEntity<TestVO> test(Double age) {
		TestVO vo =new TestVO();
		vo.setNo(0);
		vo.setName(""+age);
		//서버에서 json 리턴 -> 클라에 전달 -> json으로 응답 하지만 문자열이라 객체로 변환 -> 바꿔서 보내면 객체 내부 확인해야함 
		ResponseEntity<TestVO> result = null;
		if(age>150) {
			result = ResponseEntity.status(HttpStatus.BAD_GATEWAY)
									.body(vo);
		}else {
			result = ResponseEntity.status(HttpStatus.OK)/*ok는 200*/
									.body(vo);
		}
		
		return result;
	}
	//경로에다 데이터를 담아 전달 @PathVariable("cat")을 String cat 에 저장
	//http://localhost:8089/test/product/food/2.json (json 붙이고 싶으면 .json)
	//요즘 트렌든 비동기로 처리한다 지금 하는 방식은 MPA 파일을 다 나눈다 (.jsp ,~.jsp등) ㄴSPA는 나누지 않고 화면 변경 없이 비동기 통신 이용
	@GetMapping("/product/{cat}/{pid}")
	public String[] getPath(
				@PathVariable("cat") String cat,
				@PathVariable("pid") int pid
			) {
		return new String[] {
				"category :" + cat + ","+ "productId :" + pid
		};
	}
	@PostMapping("/ticket")
	//비동기로 통신을 해야 하기 때문에 
	//동기 방식에서는 porm submit사용 파라미터 던지기만 했었음 (vo)를 받거나 param(bno)를 받거나
	//js객체를 json으로 바꿔서 java에 전달 java는 string으로 받고 java객체로 변환
	//@RequestBody 그래서 이걸 사용 js객체를 java에 맞게 바꿔줌
	public Ticket convert(@RequestBody Ticket t) {
		log.info("convert... ticket :"+t);
		
		String result = new Gson().toJson(t);
		log.info(result);
		
		return t;
	}
	@GetMapping("/info")
	public String makeJson() {
		//gson 사용
		JsonObject json = new JsonObject();
		
		json.addProperty("name", "kim");
		json.addProperty("age", 10);
		json.addProperty("job", "student");
		
		JsonArray ja = new JsonArray();
		for (int i = 0; i < 5; i++) {
			JsonObject j = new JsonObject();
			j.addProperty("user" + i, i);
			ja.add(j);
		}
		json.add("user", ja);
		return json.toString();
	}
	
	
	
}