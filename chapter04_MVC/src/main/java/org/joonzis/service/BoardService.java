package org.joonzis.service;

import java.util.List;

import org.joonzis.domain.BoardAttachVO;
import org.joonzis.domain.BoardVO;
import org.joonzis.domain.Criteria;
//매퍼와 다르게 서비스는 사용자가 이용하는 위주로 작성하므로 비즈니스 기준으로 설계한다.
//삭제된 행 수 가 아닌 성공 or 실패 로 알기위해 boolean을 사용한다.
//왜 register는 void로 받을까? 사용자 입장에선 등록 만 하면 되기 떄문
public interface BoardService {
	//전체 리스트 
	public List<BoardVO> getList(Criteria cri);
	
	//전체 게시글 수
	public int getTotal();
	
	//데이터 삽입
	public void register(BoardVO vo);
	
	//단일 데이터
	public BoardVO get(int bno);
	
	//데이터 삭제
	public boolean remove(int bno);
	
	//데이터 수정
	public boolean modify(BoardVO vo);
	
	//댓글 개수 변경
	public void updateReplyCnt(int bno, int amount);
	
	//첨부파일 리스트
	public List<BoardAttachVO> getAttachList(int bno);
	
    // 수정 + 첨부파일 삭제를 한 번에
    void modify(BoardVO vo, List<String> deleteFiles);
    
    // 첨부파일 삭제 (uuid 기준)
    void removeAttach(String uuid);
}
