package org.joonzis.domain;

import java.sql.Date;
import java.util.List;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@NoArgsConstructor //기본 생성자 자동 생성 public BoardVO() {}
@AllArgsConstructor //모든 필드를 받는 생성자 생성
@Data //getter setter 자동 생성
public class MemberVO {
	private String userId, userPw, userName;
	private Date regDate, updateDate;
	private boolean enabled;
	//리스트로 받는 이유 admin인 경우 여러개의 권한을 받을 수 있으므로 현재는  하나씩 권한을 가지고 있음
	private List<AuthVO> authList;
}
