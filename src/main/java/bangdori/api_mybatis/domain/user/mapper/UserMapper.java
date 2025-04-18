package bangdori.api_mybatis.domain.user.mapper;

import bangdori.api_mybatis.domain.user.vo.UserInfoVO;
import org.apache.ibatis.annotations.Mapper;
import org.apache.ibatis.annotations.Param;

@Mapper
public interface UserMapper {

    UserInfoVO selectUserInfo(@Param("username") String username);
}
