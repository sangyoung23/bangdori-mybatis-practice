package bangdori.api_mybatis.user.service.impl;

import bangdori.api_mybatis.user.vo.UserInfoVO;
import lombok.RequiredArgsConstructor;
import org.springframework.security.core.GrantedAuthority;
import org.springframework.security.core.authority.SimpleGrantedAuthority;

import java.util.Collection;
import java.util.List;

@RequiredArgsConstructor
public class UserDetails implements org.springframework.security.core.userdetails.UserDetails {

    private final UserInfoVO user;

    @Override
    public Collection<? extends GrantedAuthority> getAuthorities() {
        return List.of(new SimpleGrantedAuthority(user.getROLE_CD()));
    }

    @Override
    public String getPassword() {
        return user.getPWD();
    }

    @Override
    public String getUsername() {
        return user.getNAME();
    }

    @Override
    public boolean isAccountNonExpired() {
        return true;
    }

    @Override
    public boolean isAccountNonLocked() {
        return !user.getSTATUS_CD().equals("LOCKED");
    }

    @Override
    public boolean isCredentialsNonExpired() {
        return true;
    }

    @Override
    public boolean isEnabled() {
        return user.getSTATUS_CD().equals("ACTIVE");
    }
}

