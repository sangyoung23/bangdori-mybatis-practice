package bangdori.api_mybatis.user.dto;

import lombok.Getter;
import lombok.Setter;

@Getter @Setter
public class LoginRequestDto {

    private String id;
    private String password;
}
