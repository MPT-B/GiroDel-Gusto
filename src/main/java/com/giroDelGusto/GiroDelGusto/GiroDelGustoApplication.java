package com.giroDelGusto.GiroDelGusto;

import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;

@SpringBootApplication
public class GiroDelGustoApplication {
	public static void main(String[] args) {
		System.setProperty("spring.amqp.deserialization.trust.all", "true");
		SpringApplication.run(GiroDelGustoApplication.class, args);
	}

}
