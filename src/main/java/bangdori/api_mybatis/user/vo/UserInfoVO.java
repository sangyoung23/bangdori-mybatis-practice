package bangdori.api_mybatis.user.vo;

import lombok.Getter;
import lombok.Setter;

@Getter @Setter
public class UserInfoVO {

    private Long USER_NO;
    private Long CORP_NO;
    private String ROLE_CD;
    private String STATUS_CD;
    private String ID;
    private String PWD;
    private String NAME;
    private String PHONE_NO;
}
