package org.joonzis.DI_5_component;

import org.springframework.stereotype.Component;
/*
 * @Component와 @Comfiguration/@Bean 은 기능이 비슷
 * @Component는 클래스 단위
 * @Comfiguration/@Bean은 메소드 단위
 * */
@Component("tv")
public class LgTV implements TV{
	public LgTV() {
		System.out.println("==> LgTV 객체 생성");
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
