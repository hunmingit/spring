package org.joonzis.domain;

import java.sql.Date;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@NoArgsConstructor //기본 생성자 자동 생성 public BoardVO() {}
@AllArgsConstructor //모든 필드를 받는 생성자 생성
@Data //getter setter 자동 생성
//
public class BoardVO {
	private int bno;
	private String title, content, writer;
	private Date regdate, updatedate;
	
	
}
