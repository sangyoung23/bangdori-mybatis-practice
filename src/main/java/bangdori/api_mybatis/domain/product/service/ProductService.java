package bangdori.api_mybatis.domain.product.service;

import bangdori.api_mybatis.domain.product.dto.ProductRequestDto;
import bangdori.api_mybatis.domain.product.dto.ProductResponseDto;
import bangdori.api_mybatis.domain.user.dto.UserResponseDto;
import org.springframework.web.multipart.MultipartFile;

import java.util.List;

public interface ProductService {

    List<ProductResponseDto> getProducts(Long corpNo);

    List<UserResponseDto> getUserList(Long userNo);

    void updateNewDtmAndUser(Long prodNo, Long userNo);

    void deleteProduct(Long prodNo);

    void createProduct(ProductRequestDto productRequestDto, List<String> remarkCds, List<MultipartFile> images);
}
