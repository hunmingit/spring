package org.joonzis.DI_2;

public class TVUser {
	public static void main(String[] args) {
		TV ltv = new LgTV();
		ltv.powerOn();
		ltv.powerOff();
		ltv.volumUp();
		ltv.volumDown();
		
		System.out.println("------------------");
		
		TV stv = new SamsungTV();		
		stv.powerOn();
		stv.powerOff();
		stv.volumUp();
		stv.volumDown();		
		
	}

}
