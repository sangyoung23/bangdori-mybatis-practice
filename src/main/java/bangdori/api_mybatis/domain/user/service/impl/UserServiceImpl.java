package bangdori.api_mybatis.domain.user.service.impl;

import bangdori.api_mybatis.domain.user.dto.UserUpdateRequestDto;
import bangdori.api_mybatis.domain.user.mapper.UserMapper;
import bangdori.api_mybatis.domain.user.service.UserService;
import lombok.RequiredArgsConstructor;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;

@Service
@RequiredArgsConstructor
public class UserServiceImpl implements UserService {

    private final UserMapper userMapper;
    private final PasswordEncoder passwordEncoder;

    @Override
    public void updateUserInfo(UserUpdateRequestDto requestDto) {
        if (requestDto.getPwd() != null && !requestDto.getPwd().isBlank()) {
            String encodedPwd = passwordEncoder.encode(requestDto.getPwd());
            requestDto.setPwd(encodedPwd);
        }
        userMapper.updateUserInfo(requestDto);
    }
}
