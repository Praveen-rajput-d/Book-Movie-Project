package com.cinebook.cinebook;

import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.scheduling.annotation.EnableScheduling;

@SpringBootApplication
@EnableScheduling
public class CinebookBackendApplication {

	public static void main(String[] args) {
		SpringApplication.run(CinebookBackendApplication.class, args);
	}

}
