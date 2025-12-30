package org.joonzis.domain;

import java.sql.Date;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@NoArgsConstructor
@AllArgsConstructor
@Data
public class ReplyVO {
	private int rno, bno;
	private String reply, replyer;
	private Date replydate, updatedate;
	
}
