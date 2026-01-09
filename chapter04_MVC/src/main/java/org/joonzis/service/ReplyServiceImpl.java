package org.joonzis.service;

import java.util.List;

import org.joonzis.domain.ReplyVO;
import org.joonzis.mapper.ReplyMapper;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import lombok.extern.log4j.Log4j;

@Log4j
@Service
public class ReplyServiceImpl implements ReplyService{
	@Autowired
	private ReplyMapper mapper;
	@Autowired
	private BoardService boardService;

	//트랜잭션 @Transactional 이 붙은 메서드는 그 안의 모든 DB 작업을 하나의 트랜잭션으로 묶는다
	//전부 성공 → COMMIT , 하나라도 실패 → ROLLBACK
	
	//댓글 등록과 댓글 수 증가 가 같이 실행되고 같이 commit됨(정상 종료시)
	@Transactional
	@Override
	//댓글 insert
	public int insert(ReplyVO vo) {
		int insertCount = mapper.insert(vo);
		//댓글 등록 시 BoardMapper의 updateReplyCnt 에 amount를 +1로 하여 실행
		if (insertCount == 1) {
			boardService.updateReplyCnt(vo.getBno(), 1);
		}
		return insertCount;
	}
	
	@Override
	public List<ReplyVO> getList(int bno) {
		  log.info("getList...");
		  return mapper.getList(bno);
	}

	@Override
	public ReplyVO read(int rno) {
	      log.info("read..." + rno);
	      return mapper.read(rno);
	}
	//delete호출 순간 이 메서드 안의 db 작업은 모두 같은 트랜잭션에 묶임
	//댓글 조회(bno확보) 조회는 select이므로 commit 필요 없어 @Transactional 없어도 상관없음, 댓글 삭제, 댓글 수 감소가 같이 실행 /정상 종료 → COMMIT
	@Transactional
	@Override
	public boolean delete(int rno) {
		//rno(댓번) 이거 삭제할거
	      log.info("delete..." + rno);
	      //댓글 삭제 전에 해당 댓글의 bno를 알아내야 함
	      //tbl_reply 테이블에서 rno 에 해당하는 댓글 SELECT 삭제하면 데이터 없어지기 때문에 미리 알아내기
	      //댓글 정보 전체를 ReplyVO 객체로 받음(그럼 여기서 bno꺼내 먹음 되겠다)
	      ReplyVO vo = mapper.read(rno);
	      //조회한 댓글 객체에서 어떤 게시글에 달린 댓글인지 꺼냄
	      int bno = vo.getBno();
	      
	      boolean removed = mapper.delete(rno) == 1;
	      //댓글 삭제 시 BoardMapper의 updateReplyCnt 에 amount를 -1로 하여 실행
	      if (removed) {
	    	  boardService.updateReplyCnt(bno, -1);
	      }
	      
	      return removed;
	}
	@Override
	public boolean update(ReplyVO vo) {
	      log.info("update..." + vo);
	      return mapper.update(vo) == 1;
	}
	//특정 게시물의 댓글 삭제
	@Override
	public void deleteByBno(int bno) {
		log.info("deleteByBno..." + bno);
		mapper.deleteByBno(bno);
	}
}
