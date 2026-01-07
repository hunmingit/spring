package org.joonzis.mapper;

import java.util.List;

import org.apache.ibatis.annotations.Param;
import org.joonzis.domain.BoardVO;
import org.joonzis.domain.Criteria;

//dao 역할
public interface BoardMapper {
	// 전체 리스트 
	public List<BoardVO> getList(Criteria cri);
	//전체 게시글 수(페이징)
	public int getTotal();
	//데이터 삽입 insert
	public int insert(BoardVO vo);
	//단일 데이터(상세보기) read
	public BoardVO read(int bno);
	//데이터 삭제 delete --기본키로 삭제
	public int delete(int bno);
	//데이터 수정 update --기본키 조건/ 제목, 내용, 작성자, 수정날짜 변경
	public int update(BoardVO vo);
	//댓글 데이터 변경 
	public void updateReplyCnt(@Param("bno") int bno, @Param("amount")int amount);
	
	//1. 위  updateReplyCnt 메소드에 해당하는 쿼리 작성
	//2. 댓글 삽입 / 삭제 시 updateReplyCnt메서드 실행
	//3. 게시글 리스트에서 댓글 개수 변경 확인
	
	
	
}



