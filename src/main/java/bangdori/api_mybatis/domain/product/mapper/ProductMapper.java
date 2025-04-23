package bangdori.api_mybatis.domain.product.mapper;

import bangdori.api_mybatis.domain.product.vo.ProductVO;
import org.apache.ibatis.annotations.Mapper;
import org.apache.ibatis.annotations.Param;

import java.util.List;

@Mapper
public interface ProductMapper {

    List<ProductVO> selectProducts(@Param("corpNo") Long corpNo);

    void updateNewDtmAndUser(@Param("prodNo") Long prodNo, @Param("userNo") Long userNo);

    void deleteProduct(@Param("prodNo") Long prodNo);
}
