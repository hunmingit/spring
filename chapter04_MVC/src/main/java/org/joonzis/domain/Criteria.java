package org.joonzis.domain;

public class Criteria {
	private int pageNum; //현재 페이지 번호
	private int amount; //한 페이지당 출력되는 데이터 수 페이지가 몇 개 인지
	
	public Criteria() {	}

	public Criteria(int pageNum, int amount) {
		super();
		this.pageNum = pageNum;
		this.amount = amount;
	}

	public int getPageNum() {
		return pageNum;
	}

	public void setPageNum(int pageNum) {
		this.pageNum = pageNum;
	}

	public int getAmount() {
		return amount;
	}

	public void setAmount(int amount) {
		this.amount = amount;
	}
	
	
}
