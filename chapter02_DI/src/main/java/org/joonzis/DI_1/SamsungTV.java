package org.joonzis.DI_1;

public class SamsungTV {
	public SamsungTV() {
		System.out.println("==> SamsungTV 객세 생성");
	}
	public void powerOn() {
		System.out.println("SamsungTV -- 전원 켠다.");
	}
	public void powerOff() {
		System.out.println("SamsungTV -- 전원끝다.");
	}
	public void volumUp() {
		System.out.println("SamsungTV -- 소리 올린다.");
	}
	public void volumDown() {
		System.out.println("SamsungTV -- 소리 내린다.");
	}

}
