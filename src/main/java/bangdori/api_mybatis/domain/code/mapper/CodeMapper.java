package bangdori.api_mybatis.domain.code.mapper;

import bangdori.api_mybatis.domain.code.vo.CodeVO;
import org.apache.ibatis.annotations.Mapper;

import java.util.List;

@Mapper
public interface CodeMapper {

    List<CodeVO> selectCommCodes();
}
