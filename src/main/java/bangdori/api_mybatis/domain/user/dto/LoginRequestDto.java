package bangdori.api_mybatis.domain.user.dto;

import lombok.Getter;
import lombok.Setter;

@Getter @Setter
public class LoginRequestDto {

    private String id;
    private String password;
}
