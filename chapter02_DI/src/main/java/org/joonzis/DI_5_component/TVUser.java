package org.joonzis.DI_5_component;

import org.springframework.context.support.AbstractApplicationContext;
import org.springframework.context.support.GenericXmlApplicationContext;

public class TVUser {
	public static void main(String[] args) {
		
		//1. Spring 컨테이너 구동
		AbstractApplicationContext ctx = new GenericXmlApplicationContext("applicationContext5.xml");

		TV tv = (TV)ctx.getBean("tv");
		tv.powerOn();
		tv.powerOff();
		tv.volumUp();
		tv.volumDown();
		
		ctx.close();

		
	}

}
