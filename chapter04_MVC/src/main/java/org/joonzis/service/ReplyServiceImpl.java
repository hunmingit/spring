package org.joonzis.service;

import java.util.List;

import org.joonzis.domain.ReplyVO;
import org.joonzis.mapper.ReplyMapper;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import lombok.extern.log4j.Log4j;

@Log4j
@Service
public class ReplyServiceImpl implements ReplyService{
	@Autowired
	private ReplyMapper mapper;
	
	@Override
	public int insert(ReplyVO vo) {
		log.info("insert..." + vo);
		return mapper.insert(vo);
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
	
	@Override
	public boolean delete(int rno) {
	      log.info("delete..." + rno);
	      return mapper.delete(rno) == 1;
	}
	@Override
	public boolean update(ReplyVO vo) {
	      log.info("update..." + vo);
	      return mapper.update(vo) == 1;
	}
	
}
