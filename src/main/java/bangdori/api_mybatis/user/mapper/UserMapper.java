package bangdori.api_mybatis.user.mapper;

import bangdori.api_mybatis.user.vo.UserInfoVO;
import org.apache.ibatis.annotations.Mapper;
import org.apache.ibatis.annotations.Param;

@Mapper
public interface UserMapper {

    UserInfoVO selectUserInfo(@Param("username") String username);
}
