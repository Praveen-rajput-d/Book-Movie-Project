package com.cinebook.cinebook.security;

import com.cinebook.cinebook.entity.User;
import io.jsonwebtoken.Jwts;
import io.jsonwebtoken.security.Keys;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.stereotype.Service;

import javax.crypto.SecretKey;
import java.nio.charset.StandardCharsets;
import java.security.Key;
import java.util.Date;

@Service
public class JwtService {
    @Value("${jwt.secret}")
    private String secretKey;
    @Value("${jwt.expiration}")
    private long jwtExpiration;

    private Key getSignInKey(){
        return Keys.hmacShaKeyFor(secretKey.getBytes(StandardCharsets.UTF_8));

    }
 //generate the jwt token
    public String generateToken(User user){
        return Jwts.builder()
                .subject(user.getEmail())
                .claim("role",user.getRole().getName())
                .issuedAt(new Date()).expiration(new Date(System.currentTimeMillis()+jwtExpiration))
                .signWith(getSignInKey())
                .compact();
    }

    //extract email from token
    public String extractUsername(String token){
        return Jwts.parser()
                .verifyWith((SecretKey) getSignInKey())
                .build().parseSignedClaims(token)
                .getPayload()
                .getSubject();
    }

    //validate token
    public boolean isTokenValid(String token,String email){
        String username=extractUsername(token);
        return username.equals(email)&& !isTokenExpired(token);
    }


    //check the token is expired or not
    private boolean isTokenExpired(String token){
        Date expiration=Jwts.parser()
                .verifyWith((SecretKey)getSignInKey())
                .build().parseSignedClaims(token)
                .getPayload()
                .getExpiration();
        return expiration.before(new Date());
    }
}
