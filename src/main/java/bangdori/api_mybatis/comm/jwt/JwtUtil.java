package bangdori.api_mybatis.comm.jwt;

import io.jsonwebtoken.*;
import io.jsonwebtoken.security.Keys;
import jakarta.annotation.PostConstruct;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.stereotype.Component;

import java.nio.charset.StandardCharsets;
import java.security.Key;
import java.util.Date;

// JwtUtil 파일은 토큰 생성, 토큰 검증을 해주는 유틸리티 클래스
@Component
public class JwtUtil {

    @Value("${jwt.secret}")
    private String SECRET_KEY;
    @Value("${jwt.expiration}")
    private long EXPIRATION;
    private Key key;


    @PostConstruct // PostConstruct 어노테이션은 의존성이 주입된 직후 실행됨 그렇기 때문에 SECRET_KEY가 null일 걱정 없이 안전하게 초기화 가능
    public void init() {
        this.key = Keys.hmacShaKeyFor(SECRET_KEY.getBytes(StandardCharsets.UTF_8));
    }

    // 전달받은 username으로 jwt 토큰을 생성 해주는 메소드
    public String generateToken(String username) {
        return Jwts.builder() // JWT를 생성하기 위한 빌더 객체를 생성
                .setSubject(username) // 어떤 사용자(username)를 위한 것인지 표시
                .setIssuedAt(new Date()) // JWT가 발급된 시간 표시
                .setExpiration(new Date(System.currentTimeMillis() + EXPIRATION)) // JWT의 만료 시간 설정, 현재 시간에 EXPIRATION를 더한 시점까지 유효
                .signWith(key, SignatureAlgorithm.HS512) // 서명 알고리즘: HS512 (HMAC + SHA-512) 비밀키: SECRET_KEY 이걸로 토큰이 위조되지 않도록 디지털 서명
                .compact(); // 설정된 내용을 기반으로 최종 JWT 문자열 생성
    }

    // 토큰을 기반으로 유저 정보를 가져오는 메소드
    public String getUsername(String token) {
        return Jwts.parserBuilder() // JWT를 파싱할 준비
                .setSigningKey(key) // JWT 서명을 검증하기 위한 비밀 키를 설정
                .build() // 앞서 만든 parserBuilder를 실제로 사용할 수 있는 JWT 파서 객체로 생성
                .parseClaimsJws(token) // 전달받은 token 문자열을 파싱, 토큰을 해석하고 서명을 검정. 오류가 나면 토큰이 조작되었거나 만료된 것일 수 있음.
                .getBody() // 위에서 파싱한 결과 중, 내용부인 Claims만 가져옴. 이 안에 유저 정보, 발급 시간, 만료 시간 등이 담겨 있음.
                .getSubject(); // 토큰 생성할 때 .setSubject(username) 했던 그 값을 가져옴. 보통 이 값은 사용자의 아이디(username) 또는 고유 식별자로 설정

        // 파싱은 이처럼 구조화되지 않은 문자열(JWT)을 → 읽을 수 있는 구조화된 객체로 바꾸는 과정.
        // "eyJhbGciOiJIUzI1NiJ9..." 와 같은 문자열을 Header, Payload, Signature 각각의 JSON 객체로 분해
        // 파서는 파싱 작업을 실제로 샐행해주는 도구. 위 코드에서는 build()로 파서 객체를 생성해서 실제로 파싱 과정을 거침
    }

    // 토큰 검증하는 메소드
    public boolean validateToken(String token) {
        try {
            // JWT 토큰을 최종적으로 검증하는 코드
            Jwts.parserBuilder().setSigningKey(key).build().parseClaimsJws(token);
            return true;
        } catch (SecurityException | MalformedJwtException e) {
            throw new JwtException("잘못된 JWT 서명입니다.", e);
        } catch (ExpiredJwtException e) {
            throw new JwtException("만료된 JWT 토큰입니다.", e);
        } catch (UnsupportedJwtException e) {
            throw new JwtException("지원되지 않는 JWT 토큰입니다.", e);
        } catch (IllegalArgumentException e) {
            throw new JwtException("JWT 클레임이 비어 있습니다.", e);
        }
    }

}
