package com.security.jwt.controller;

import com.security.jwt.model.AuthenticationRequest;
import com.security.jwt.model.User;
import com.security.jwt.service.AuthenticationService;
import com.security.jwt.service.UserService;
import com.security.jwt.service.jwt.JwtService;
import com.security.jwt.service.jwt.UserAuthenticated;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.security.oauth2.jwt.Jwt;
import org.springframework.web.bind.annotation.*;

import java.security.Principal;

@RestController
public class AuthenticationController {

    @Autowired
    private AuthenticationService authenticationService;

    private final JwtService jwtService;
    private final UserService userService; // Serviço para buscar usuários no banco

    public AuthenticationController(JwtService jwtService, UserService userService) {
        this.jwtService = jwtService;
        this.userService = userService;
    }

    @PostMapping("/authenticate")
    public ResponseEntity<String> authenticate(@RequestBody AuthenticationRequest authRequest) {
        try {
            // Gera o token JWT
            String token = authenticationService.authenticate(authRequest);

            // Retorna o token
            return ResponseEntity.ok(token);
        } catch (Exception e) {
            // Retorna erro de autenticação
            return ResponseEntity.status(401).body("Usuário ou senha inválidos");
        }
    }

    @GetMapping("/user/profile")
    public ResponseEntity<UserAuthenticated> getUserProfile(@RequestHeader("Authorization") String authHeader) {
        if (authHeader == null || !authHeader.startsWith("Bearer ")) {
            return ResponseEntity.status(401).build(); // Token ausente ou inválido
        }

        String token = authHeader.substring(7); // Remove "Bearer " do token
        Jwt decodedToken = jwtService.decodeToken(token); // Decodifica o token

        String username = decodedToken.getSubject(); // Obtém o nome do usuário
        User user = userService.findByUsername(username); // Busca no banco

        return ResponseEntity.ok(new UserAuthenticated(user)); // Retorna os dados do usuário autenticado
    }
}
