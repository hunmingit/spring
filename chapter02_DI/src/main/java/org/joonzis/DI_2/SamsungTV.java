package org.joonzis.DI_2;

public class SamsungTV implements TV{
	public SamsungTV() {
		System.out.println("==> SamsungTV 객세 생성");
	}
	@Override
	public void powerOn() {
		System.out.println("SamsungTV -- 전원 켠다.");
	}
	@Override
	public void powerOff() {
		System.out.println("SamsungTV -- 전원끝다.");
	}
	@Override
	public void volumUp() {
		System.out.println("SamsungTV -- 소리 올린다.");
	}
	@Override
	public void volumDown() {
		System.out.println("SamsungTV -- 소리 내린다.");
	}

}
