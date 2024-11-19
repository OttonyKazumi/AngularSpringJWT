package com.security.jwt;

import io.swagger.v3.oas.annotations.OpenAPIDefinition;
import org.springframework.boot.ApplicationRunner;
import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.context.annotation.Bean;
import org.springframework.security.crypto.password.PasswordEncoder;

@OpenAPIDefinition(info = @io.swagger.v3.oas.annotations.info.Info(title = "${info.build.name}", version = "${info.build.version}", description = "${info.app.description}",
        contact = @io.swagger.v3.oas.annotations.info.Contact(name = "Time Arquitetura e APIs", email = "jonatas.edo@gmail.com")))
@SpringBootApplication
public class JwtApplication {

    public static void main(String[] args) {
        SpringApplication.run(JwtApplication.class, args);
    }

    // Encripted password for user using BCrypt encoder
    @Bean
    ApplicationRunner runner(PasswordEncoder passwordEncoder) {
        return args -> System.out.println(passwordEncoder.encode("password"));
    }
}
