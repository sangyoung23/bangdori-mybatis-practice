package bangdori.api_mybatis.domain.user.controller;

import bangdori.api_mybatis.comm.response.ApiResponse;
import bangdori.api_mybatis.comm.jwt.JwtUtil;
import bangdori.api_mybatis.domain.user.dto.UserUpdateRequestDto;
import bangdori.api_mybatis.domain.user.service.UserService;
import bangdori.api_mybatis.domain.user.service.impl.UserDetails;
import bangdori.api_mybatis.domain.user.dto.LoginRequestDto;
import lombok.RequiredArgsConstructor;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.Authentication;
import org.springframework.web.bind.annotation.*;

import java.util.Map;

@RestController
@RequiredArgsConstructor
@RequestMapping("/users")
public class UserController {

    private final UserService userService;
    private final AuthenticationManager authenticationManager;
    private final JwtUtil jwtUtil;

    @PostMapping("/auth/login")
    public ApiResponse login(@RequestBody LoginRequestDto request) {
        Authentication auth = authenticationManager.authenticate(
                new UsernamePasswordAuthenticationToken(request.getId(), request.getPassword())
        );

        // getPrincipal()는 구현체 즉 UserInfoVO 값들이 들어있음
        UserDetails userInfo = (UserDetails) auth.getPrincipal();
        String token = jwtUtil.generateToken(request.getId());

        return new ApiResponse()
                .success()
                .addResult(Map.of(
                "token", token,
                "userNo", userInfo.getUser().getUserNo(),
                "userId", userInfo.getUser().getId(),
                "username", userInfo.getUser().getName(),
                "corpNo", userInfo.getUser().getCorpNo(),
                "corpNm", userInfo.getUser().getCorpNm()
        ));
    }

    @PutMapping("/{userNo}")
    public ApiResponse updateUserInfo(@PathVariable Long userNo ,@RequestBody UserUpdateRequestDto request) {
        request.setUserNo(userNo);
        userService.updateUserInfo(request);
        return new ApiResponse().success();
    }
}
