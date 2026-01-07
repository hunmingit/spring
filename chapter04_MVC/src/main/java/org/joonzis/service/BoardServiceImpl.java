package org.joonzis.service;

import java.util.List;

import org.joonzis.domain.BoardVO;
import org.joonzis.domain.Criteria;
import org.joonzis.mapper.BoardMapper;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import lombok.extern.log4j.Log4j;


@Log4j
@Service
public class BoardServiceImpl implements  BoardService {
   
   @Autowired
   private BoardMapper mapper;
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

   @Override
   public void register(BoardVO vo) {
      log.info("register..." + vo);
      mapper.insert(vo);
   }

   @Override
   public BoardVO get(int bno) {
      log.info("get..." + bno);
      return mapper.read(bno);
   }

   @Override
   public boolean remove(int bno) {
      log.info("remove..." + bno);
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
      
}
