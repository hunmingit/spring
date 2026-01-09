package org.joonzis.service;

import java.util.List;

import org.joonzis.domain.ReplyVO;

public interface ReplyService {
	//댓글 삽입
	public int insert(ReplyVO vo);
	//댓글 목록
	public List<ReplyVO> getList(int bno);
	//댓글 읽기
	public ReplyVO read(int rno);
	//댓글 삭제
	public boolean delete(int rno);
	//댓글 수정
	public boolean update(ReplyVO vo);
	//특정 게시물의 댓글 삭제
	public void deleteByBno(int bno);
}
