package bangdori.api_mybatis.domain.user.service;


import bangdori.api_mybatis.domain.user.dto.UserUpdateRequestDto;

public interface UserService {

    void updateUserInfo(UserUpdateRequestDto userUpdateRequestDto);
}
