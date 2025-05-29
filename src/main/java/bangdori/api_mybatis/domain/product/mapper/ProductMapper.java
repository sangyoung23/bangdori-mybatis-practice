package bangdori.api_mybatis.domain.product.mapper;

import bangdori.api_mybatis.domain.product.dto.ProductRequestDto;
import bangdori.api_mybatis.domain.product.vo.ProductImageVO;
import bangdori.api_mybatis.domain.product.vo.ProductRemarkVO;
import bangdori.api_mybatis.domain.product.vo.ProductVO;
import org.apache.ibatis.annotations.Mapper;
import org.apache.ibatis.annotations.Param;
import org.springframework.web.multipart.MultipartFile;

import java.util.List;

@Mapper
public interface ProductMapper {

    List<ProductVO> selectProducts(@Param("corpNo") Long corpNo);

    void updateNewDtmAndUser(@Param("prodNo") Long prodNo, @Param("userNo") Long userNo);

    void deleteProduct(@Param("prodNo") Long prodNo);

    void insertProduct(ProductVO product);

    void insertRemarks(@Param("remarkList") List<ProductRemarkVO> remarkList);

    void insertImages(@Param("imageList") List<ProductImageVO> imageList);
}
