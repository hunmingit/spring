package org.joonzis.controller;

import java.util.List;

import org.joonzis.domain.ReplyVO;
import org.joonzis.service.ReplyService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.MediaType;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import lombok.extern.log4j.Log4j;

@RestController //만약 @RestController가 없으면 "success"를 뷰 이름으로 인식해서 에러 남
@Log4j
@RequestMapping("/reply/*")//선행되어지는  * 없어도 충분
public class ReplyController {
	
	@Autowired // 의존성 주입 : 객체를 내가 만들지 않고, 스프링이 대신 만들어서 넣어주는 것
	///ReplyController는 댓글을 DB에 저장하는 기능이 필요 ReplyService가 필요하긴 한데 어떤 구현체인지는 몰라도 됨
	private ReplyService service;
	//비동기로 진행 fetch 사용
	//1. 등록 : /reply/new - POST
	@PostMapping(value = "/new",
/*수신 데이터 포맷
 *application/json은 HTTP 요청/응답에서 
 *JSON 형식의 데이터를 주고받는다는 표준 MIME 타입이며
 *Spring에서는 @RequestBody와 함께 사용된다*/	
				consumes = "application/json",
/*송신 데이터 포맷*/	produces = MediaType.TEXT_PLAIN_VALUE
				)
										//@RequestBody JSON → Java 객체 자동 변환
	public ResponseEntity<String> create(@RequestBody ReplyVO vo) {
		log.info("ReplyVO : " + vo);
		
		int insertCount = service.insert(vo);
		
		log.info("reply insert count : " + insertCount);
		
		return insertCount == 1 ?
/*성공 → 200 OK + success*/				new ResponseEntity<String>("success", HttpStatus.OK) :
/*실패 -> 500 Internal Server Error*/		new ResponseEntity<String>(HttpStatus.INTERNAL_SERVER_ERROR);

	}
	//2. 조회	: /reply/:rno(URL 자체가 자원(Resource)을 식별), get방식, 댓글 단 건 조회
	@GetMapping(
			//url 예시 /reply/10
			value = "/{rno}",
			//서버가 어떤 형식으로 응답할 수 있는지 선언 클라이언트가 요청 헤더에 Accept: application/json 이면 → JSON 응답
			produces = {
					MediaType.APPLICATION_JSON_VALUE,
					MediaType.APPLICATION_XML_VALUE
			}
	)//URL의 {rno} 값을 꺼냄.
	public ResponseEntity<ReplyVO> read(@PathVariable("rno") int rno) {

	    log.info("get reply rno : " + rno);

	    ReplyVO vo = service.read(rno);
//댓글 존재할 때 HTTP 상태: 200 OK 댓글 없을 때 HTTP 상태: 404 NOT FOUND 오류
	    return vo != null ?
	            new ResponseEntity<>(vo, HttpStatus.OK) :
	            new ResponseEntity<>(HttpStatus.NOT_FOUND);
	}
	
	//3. 삭제: /reply/:rno, delete 방식
    @DeleteMapping(
            value = "/{rno}",
            produces = MediaType.TEXT_PLAIN_VALUE
    )
    public ResponseEntity<String> delete(@PathVariable int rno) {

        log.info("delete reply : " + rno);

        return service.delete(rno)
                ? new ResponseEntity<String>("success", HttpStatus.OK)
                : new ResponseEntity<String>(HttpStatus.INTERNAL_SERVER_ERROR);
    }
	//4. 수정: /reply/:rno, PUT or PATCH 방식
    /*
     * put방식도 patch방식도 가능한 코드 
     * @RequestMapping(method = {RequestMethod.put, RequestMethod.PATCH})
     * */
    @PutMapping(
    		value = "/{rno}",
			consumes = "application/json",
    		produces = MediaType.TEXT_PLAIN_VALUE
	)/*수정 할 때는 rno(어떤 댓글)는 경로, vo(수정할 내용)는 json으로 */
    public ResponseEntity<String> update(@PathVariable("rno") int rno, @RequestBody ReplyVO vo){
		log.info("ReplyVO : " + vo);
		log.info("rno : " + rno);
		/*vo를 던져줘야 하는데 rno는 담기지 않았으므로*/
		vo.setRno(rno);
		
        return service.update(vo)
                ? new ResponseEntity<>("success", HttpStatus.OK)
                : new ResponseEntity<>(HttpStatus.INTERNAL_SERVER_ERROR);  	   	
    }
    
	//5. 전체 댓글 : /reply/pages/:bno, get 방식
    @GetMapping(
    		//url 예시 /reply/10
    		value = "/pages/{bno}",
    		//서버가 어떤 형식으로 응답할 수 있는지 선언 클라이언트가 요청 헤더에 Accept: application/json 이면 → JSON 응답
    		produces = {
    				MediaType.APPLICATION_JSON_VALUE,
    				MediaType.APPLICATION_XML_VALUE

    		}
    )//URL의 {bno} 값을 꺼냄
    public ResponseEntity<List<ReplyVO>> getList(@PathVariable("bno") int bno) {

        log.info("getList bno : " + bno);

        List<ReplyVO> list = service.getList(bno);
        //댓글 존재할 때 HTTP 상태: 200 OK
        return new ResponseEntity<>(list, HttpStatus.OK);

    }
}
