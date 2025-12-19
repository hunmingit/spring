package org.joonzis.DI_2;

public class LgTV implements TV{
	public LgTV() {
		System.out.println("==> LgTV 객세 생성");
	}
	@Override
	public void powerOn() {
		System.out.println("LgTV -- 전원 켠다.");
	}
	@Override
	public void powerOff() {
		System.out.println("LgTV -- 전원끝다.");
	}
	@Override
	public void volumUp() {
		System.out.println("LgTV -- 소리 올린다.");
	}
	@Override
	public void volumDown() {
		System.out.println("LgTV -- 소리 내린다.");
	}


}
