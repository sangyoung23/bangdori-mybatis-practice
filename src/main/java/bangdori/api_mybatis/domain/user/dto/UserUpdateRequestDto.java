package bangdori.api_mybatis.domain.user.dto;


import lombok.Getter;
import lombok.Setter;

@Getter @Setter
public class UserUpdateRequestDto {

    private Long userNo;
    private String name;
    private String phoneNo;
    private String pwd;
}
