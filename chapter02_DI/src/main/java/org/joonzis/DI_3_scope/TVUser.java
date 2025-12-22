package org.joonzis.DI_3_scope;

import org.springframework.context.support.AbstractApplicationContext;
import org.springframework.context.support.GenericXmlApplicationContext;

public class TVUser {
	public static void main(String[] args) {
		
		//1. Spring 컨테이너 구동
		AbstractApplicationContext ctx = new GenericXmlApplicationContext("applicationContext3.xml");
		
		//2. Spring 컨테이너로부터 필요한 객체 요청
		TV ltv = (LgTV)ctx.getBean("ltv");
		TV ltv2 = (LgTV)ctx.getBean("ltv");
		ltv.powerOn();
		ltv.powerOff();
		ltv.volumUp();
		ltv.volumDown();
		
		System.out.println("-----------------------");
		//
		TV stv = (SamsungTV)ctx.getBean("stv"); 
		TV stv2 = (SamsungTV)ctx.getBean("stv");
		stv.powerOn();
		stv.powerOff();
		stv.volumUp();
		stv.volumDown();		
		
		System.out.println(ltv == ltv2 ? "같은 객체" : "다른 객체"); //prototype은 매 번 호출 할 때마다 객체를 생성 하기 때문에 다른 객체로 출력(비효율)
		System.out.println(stv == stv2 ? "같은 객체" : "다른 객체"); //삼성은 싱글톤이라 한 번 생성해두고 호출 할 때 마다 같은 걸 호출함 그래서 같은 객체로 출력
		
		ctx.close();
		

		
	}

}
