package bangdori.api_mybatis.domain.user.dto;

import bangdori.api_mybatis.domain.user.vo.UserInfoVO;
import lombok.Builder;
import lombok.Getter;

@Builder
@Getter
public class UserResponseDto {

    private Long userNo;
    private String name;

    public static UserResponseDto from(UserInfoVO userInfoVO) {
        return UserResponseDto.builder()
                .userNo(userInfoVO.getUserNo())
                .name(userInfoVO.getName())
                .build();
    }
}
