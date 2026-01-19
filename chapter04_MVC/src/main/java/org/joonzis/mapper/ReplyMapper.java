package org.joonzis.mapper;

import java.util.List;

import org.joonzis.domain.ReplyVO;
//dao 역할
public interface ReplyMapper {
	//댓글 삽입
	public int insert(ReplyVO vo);
	//댓글 목록
	public List<ReplyVO> getList(int bno);
	//댓글 읽기
	public ReplyVO read(int rno);
	//댓글 삭제
	public int delete(int rno);
	//댓글 수정하기
	public int update(ReplyVO vo);
	//특정 게시물의 댓글 삭제
	public int deleteByBno(int bno);
}