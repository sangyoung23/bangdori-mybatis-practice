package bangdori.api_mybatis.user.vo;

import lombok.Getter;
import lombok.Setter;

@Getter @Setter
public class UserInfoVO {

    private Long userNo;
    private Long corpNo;
    private String corpNm;
    private String roleCd;
    private String statusCd;
    private String id;
    private String pwd;
    private String name;
    private String phoneNo;
}
