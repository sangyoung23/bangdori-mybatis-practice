package bangdori.api_mybatis.domain.user.service.impl;

import bangdori.api_mybatis.domain.user.mapper.UserMapper;
import bangdori.api_mybatis.domain.user.vo.UserInfoVO;
import lombok.RequiredArgsConstructor;
import org.springframework.security.core.userdetails.UserDetailsService;
import org.springframework.security.core.userdetails.UsernameNotFoundException;
import org.springframework.stereotype.Service;

@Service
@RequiredArgsConstructor
public class UserDetailService implements UserDetailsService {

    private final UserMapper userMapper;

    @Override
    public UserDetails loadUserByUsername(String username) {
        UserInfoVO userInfo = userMapper.selectUserInfo(username);

        if (userInfo == null) {
            throw new UsernameNotFoundException("User not found with username" + username);
        }

        return new UserDetails(userInfo);
    }
}
