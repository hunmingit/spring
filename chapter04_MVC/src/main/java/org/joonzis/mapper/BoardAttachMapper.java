package org.joonzis.mapper;

import java.util.List;

import org.joonzis.domain.BoardAttachVO;

public interface BoardAttachMapper {
	public int insert(BoardAttachVO vo);

	public List<BoardAttachVO> findByBno(int bno);
	
	public BoardAttachVO findByUuid(String uuid);

	public int deleteByUuid(String uuid);
}
