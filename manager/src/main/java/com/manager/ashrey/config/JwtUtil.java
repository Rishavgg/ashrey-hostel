package com.manager.ashrey.config;

import io.jsonwebtoken.Claims;
import io.jsonwebtoken.Jwts;
import io.jsonwebtoken.SignatureAlgorithm;
import org.springframework.stereotype.Service;

import javax.crypto.spec.SecretKeySpec;
import java.security.Key;
import java.util.Date;
import java.util.HashMap;
import java.util.Map;
import java.util.function.Function;

@Service
public class JwtUtil {

    public String extractUsername(String token) {
        return extractClaim(token, Claims::getSubject);
    }

    public <T> T extractClaim(String token, Function<Claims, T> claimsResolver) {
        final Claims claims = extractAllClaims(token);
        return claimsResolver.apply(claims);
    }

    // Extracts all claims from the JWT token
//    private Claims extractAllClaims(String token) {
//        try {
//            return Jwts.parserBuilder()
//                    .setSigningKey(getSigningKey())  // Using getSigningKey() instead of JwtConstant.SECURITY_KEY.getBytes()
//                    .build()
//                    .parseClaimsJws(token)
//                    .getBody();
//        } catch (Exception e) {
//            throw new RuntimeException("Invalid or expired token", e);
//        }
//    }
    private Claims extractAllClaims(String token) {
        try {
            return Jwts.parserBuilder()
                    .setSigningKey(getSigningKey())
                    .build()
                    .parseClaimsJws(token)
                    .getBody();
        } catch (Exception e) {
            // Log the exception for debugging purposes
            System.err.println("Error parsing JWT token: " + e.getMessage());
            throw new RuntimeException("Invalid or expired token", e);
        }
    }


    // Generates a token with username (subject) and other claims
    public String generateToken(String username) {
        Map<String, Object> claims = new HashMap<>();
        return createToken(claims, username);
    }

    private Key getSigningKey() {
        byte[] keyBytes = JwtConstant.SECURITY_KEY.getBytes();
        return new SecretKeySpec(keyBytes, SignatureAlgorithm.HS256.getJcaName());
    }

    private String createToken(Map<String, Object> claims, String subject) {
        return Jwts.builder()
                .setClaims(claims)
                .setSubject(subject)
                .setIssuedAt(new Date(System.currentTimeMillis()))
                .setExpiration(new Date(System.currentTimeMillis() + 1000 * 60 * 60 * 10))
                .signWith(getSigningKey(), SignatureAlgorithm.HS256)
                .compact();
    }

    public Boolean validateToken(String token, String username) {
        final String extractedUsername = extractUsername(token);
        return (extractedUsername.equals(username) && !isTokenExpired(token));
    }


    private Boolean isTokenExpired(String token) {
        return extractExpiration(token).before(new Date());
    }

    private Date extractExpiration(String token) {
        return extractClaim(token, Claims::getExpiration);
    }
}
