package com.shiftbackend.shiftbackend;

import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.context.annotation.Bean;
import org.springframework.web.servlet.config.annotation.CorsRegistry;
import org.springframework.web.servlet.config.annotation.WebMvcConfigurer;

@SpringBootApplication
public class ShiftBackEndApplication {

	public static void main(String[] args) {
		SpringApplication.run(ShiftBackEndApplication.class, args);
	}

	@Bean
	public WebMvcConfigurer corsConfigurer() {
		return new WebMvcConfigurer() {
			@Override
			public void addCorsMappings(CorsRegistry registry) {
				registry.addMapping("/ra").allowedOrigins("*");
				registry.addMapping("/rea").allowedOrigins("*");
				registry.addMapping("/rec").allowedOrigins("*");
			}
		};
	}
}
