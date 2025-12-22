package org.joonzis.dto;

import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;
//기본 생성자
@NoArgsConstructor
//풀 생성자
@AllArgsConstructor
//@Date -> getter, setter 말고 toString까지 가져올수 있다
@Getter
@Setter
//자동완성 안하고  lombok쓰는 이유 필드 명 바뀌면 다 수정하기 힘들기 때문
public class StudentDTO {
	private String name, dept;
	private int gradeNo, classNo;
}
