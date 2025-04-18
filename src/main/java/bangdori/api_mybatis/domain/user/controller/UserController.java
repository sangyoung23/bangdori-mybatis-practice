package bangdori.api_mybatis.domain.user.controller;

import bangdori.api_mybatis.comm.response.ApiResponse;
import bangdori.api_mybatis.comm.jwt.JwtUtil;
import bangdori.api_mybatis.domain.user.service.impl.UserDetails;
import bangdori.api_mybatis.domain.user.dto.LoginRequestDto;
import lombok.RequiredArgsConstructor;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.Authentication;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import java.util.Map;

@RestController
@RequiredArgsConstructor
@RequestMapping("/user")
public class UserController {

    private final ApiResponse apiResponse;
    private final AuthenticationManager authenticationManager;
    private final JwtUtil jwtUtil;

    @PostMapping("/login")
    public ApiResponse login(@RequestBody LoginRequestDto request) {
        Authentication auth = authenticationManager.authenticate(
                new UsernamePasswordAuthenticationToken(request.getId(), request.getPassword())
        );

        // getPrincipal()는 구현체 즉 UserInfoVO 값들이 들어있음
        UserDetails userInfo = (UserDetails) auth.getPrincipal();
        String token = jwtUtil.generateToken(request.getId());

        return apiResponse.addResult(Map.of(
                "token", token,
                "userNo", userInfo.getUser().getUserNo(),
                "userId", userInfo.getUser().getId(),
                "username", userInfo.getUser().getName(),
                "corpNo", userInfo.getUser().getCorpNo(),
                "corpNm", userInfo.getUser().getCorpNm()
        ));
    }
}
