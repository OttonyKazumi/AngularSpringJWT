package com.security.jwt.service.jwt;

import org.springframework.security.core.Authentication;
import org.springframework.security.core.GrantedAuthority;
import org.springframework.security.oauth2.jwt.Jwt;
import org.springframework.security.oauth2.jwt.JwtClaimsSet;
import org.springframework.security.oauth2.jwt.JwtDecoder;
import org.springframework.security.oauth2.jwt.JwtEncoder;
import org.springframework.security.oauth2.jwt.JwtEncoderParameters;
import org.springframework.stereotype.Service;

import java.time.Instant;

@Service
public class JwtService {

    private final JwtEncoder encoder;
    private final JwtDecoder decoder; // Adicionado JwtDecoder

    public JwtService(JwtEncoder encoder, JwtDecoder decoder) {
        this.encoder = encoder;
        this.decoder = decoder;
    }

    public String generateToken(Authentication authentication) {
        Instant now = Instant.now();
        long expiry = 36000L;

        var roles = authentication
                .getAuthorities().stream()
                .map(GrantedAuthority::getAuthority)
                .toList();

        var claims = JwtClaimsSet.builder()
                .issuer("jwt")
                .issuedAt(now)
                .expiresAt(now.plusSeconds(expiry))
                .subject(authentication.getName())
                .claim("roles", roles)
                .build();

        return encoder.encode(JwtEncoderParameters.from(claims)).getTokenValue();
    }

    public Jwt decodeToken(String token) {
        return decoder.decode(token); // Decodifica e valida o token
    }
}
