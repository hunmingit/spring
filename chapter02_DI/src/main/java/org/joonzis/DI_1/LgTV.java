package org.joonzis.DI_1;

public class LgTV {
	public LgTV() {
		System.out.println("==> LgTV 객세 생성");
	}
	public void powerOn() {
		System.out.println("LgTV -- 전원 켠다.");
	}
	public void powerOff() {
		System.out.println("LgTV -- 전원끝다.");
	}
	public void volumUp() {
		System.out.println("LgTV -- 소리 올린다.");
	}
	public void volumDown() {
		System.out.println("LgTV -- 소리 내린다.");
	}


}
