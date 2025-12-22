package org.joonzis.DI_4_annoConfig;

import org.joonzis.DI_3_scope.LgTV;
import org.springframework.context.annotation.AnnotationConfigApplicationContext;

public class PersonInfoMain {
	public static void main(String[] args) {
		
		AnnotationConfigApplicationContext ctx = new AnnotationConfigApplicationContext(AnnoConfig.class);
		
		Person person1 = ctx.getBean("human1", Person.class); // Person 타입으로 가져옴 (LgTV)ctx.getBean("ltv"); 이런식으로 형 변환도 가능
		System.out.println("이름 : " + person1.getName());
		System.out.println("이름 : " + person1.getAge());
		System.out.println("이름 : " + person1.getHobbies());
		System.out.println("---------------------------------");
		Person person2 = ctx.getBean("human2", Person.class);
		System.out.println("이름 : " + person2.getName());
		System.out.println("이름 : " + person2.getAge());
		System.out.println("이름 : " + person2.getHobbies());
		
		PersonInfo personInfo = ctx.getBean("pInfo", PersonInfo.class);
		personInfo.info();
	}
}
