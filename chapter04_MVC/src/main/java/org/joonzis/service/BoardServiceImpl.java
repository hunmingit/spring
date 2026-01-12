package org.joonzis.service;

import java.io.File;

import java.util.List;

import org.joonzis.domain.BoardAttachVO;
import org.joonzis.domain.BoardVO;
import org.joonzis.domain.Criteria;
import org.joonzis.mapper.BoardAttachMapper;
import org.joonzis.mapper.BoardMapper;
import org.joonzis.mapper.ReplyMapper;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import lombok.extern.log4j.Log4j;



@Log4j
@Service
public class BoardServiceImpl implements  BoardService {
   
   @Autowired
   private BoardMapper mapper;
   @Autowired
	private ReplyMapper replyMapper;
   @Autowired
   private BoardAttachMapper attachMapper;

   //전체 리스트
   @Override
   public List<BoardVO> getList(Criteria cri) {
      log.info("getList...");
      return mapper.getList(cri);
   }
   
   @Override
	public int getTotal()  {
	   log.info("total..." );
	   return mapper.getTotal();
	}
   //게시글 등록
   @Transactional
   @Override
   public void register(BoardVO vo) {
      log.info("register..." + vo);

      
      //1. 게시글 등록을 하개 되면 시컨스값이 증가한다
      //currval 값을 가져오려면 insert 실행 후에 가져와야 한다
      //nextval 값을 미리 가져오려면 insert 실행 전에 가져와야 한다
      //현재 코드는 insert 실행 전에 NEXTVAL 선조회
      mapper.insert(vo);
      log.info("생성된 bno = " + vo.getBno());
      //2. 등록 된 게시글의 번호 가져온다.
      int bno = vo.getBno();
      vo.setBno(bno);
      //3.  해당 게시글 번호로 첨부파일도 등록해야함
      if(vo.getAttachList() != null && vo.getAttachList().size() > 0) {
         //반복해서 아래 메소드가 실행되도록
         //왜 반복하냐? vo.getAttachList()가 list이므로
         //attachMapper.insert(vo);
         //insert 메소드에 전달하는 vo는 BoardAttachVO 타입이어야 함
         //BoardAttachVO 구조를 잘보고 잘 전달 잘 입력 합시다.
         vo.getAttachList().forEach(attach -> {
            attach.setBno(bno);
            attachMapper.insert(attach);
         });
      }
   }

   @Override
   public BoardVO get(int bno) {
      log.info("get..." + bno);
      return mapper.read(bno);
   }
   //게시글 삭제 시 댓글도 같이 삭제되도록 처리
   //댓글 삭제 + 게시글 삭제 = 하나의 작업
   @Transactional
   @Override
   public boolean remove(int bno) {
      log.info("remove..." + bno);
      //왜 ReplyService를 안 쓰고 ReplyMapper를 직접 쓰나 해도 되지만 지금 구조에서는 충분(귀찬ㄶ)
      replyMapper.deleteByBno(bno); //댓글 먼저 삭제(bno)에 달린 모든 댓글 삭제, 게시글만 삭제되면  고아 댓글 발생
      return mapper.delete(bno) == 1;
   }

   @Override
   public boolean modify(BoardVO vo) {
      log.info("modify..." + vo);
      return mapper.update(vo) == 1;
   }
   
   @Override
   public void updateReplyCnt(int bno, int amount) {
	   
      log.info("updateReplyCnt..." + bno + ", " + amount);
      mapper.updateReplyCnt(bno, amount);            
   }
   @Override
	public List<BoardAttachVO> getAttachList(int bno) {
	   log.info("getAttachList..." + bno);
		return attachMapper.findByBno(bno);
	}
   @Transactional
   @Override
   public void modify(BoardVO vo, List<String> deleteFiles) {

       log.info("modify with files...");

       // 1️. 게시글 수정 (기존 로직 재사용)
       boolean updated = modify(vo);

       if (!updated) {
           throw new RuntimeException("게시글 수정 실패");
       }
       int bno = vo.getBno();
       // 2️. 첨부파일 삭제
       if (deleteFiles != null && !deleteFiles.isEmpty()) {
           deleteFiles.forEach(this::removeAttach);
       }
       
       //3. 새로 추가된 첨부파일 insert
       if (vo.getAttachList() != null && !vo.getAttachList().isEmpty()) {
           vo.getAttachList().forEach(attach -> {
               attach.setBno(bno);
               attachMapper.insert(attach);
           });
       }
   }
   
   @Override
   public void removeAttach(String uuid) {
       log.info("removeAttach uuid = " + uuid);

       // 1️. DB에서 첨부파일 정보 조회
       BoardAttachVO attach = attachMapper.findByUuid(uuid);

       if (attach == null) {
           return;
       }

       // 2️. 실제 파일 삭제
       try {
           File file = new File(
               "C:/upload/" + attach.getUploadPath() + "/" +
               attach.getUuid() + "_" + attach.getFileName()
           );
           file.delete();

       } catch (Exception e) {
           throw new RuntimeException(e);
       }

       // 3️. DB 삭제
       attachMapper.deleteByUuid(uuid);
   }
      
}
