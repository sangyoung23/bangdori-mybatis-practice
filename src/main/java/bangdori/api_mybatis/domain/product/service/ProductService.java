package bangdori.api_mybatis.domain.product.service;

import bangdori.api_mybatis.domain.product.dto.ProductResponseDto;

import java.util.List;

public interface ProductService {

    List<ProductResponseDto> getProducts(Long corpNo);

    void updateNewDtmAndUser(Long prodNo, Long userNo);

    void deleteProduct(Long prodNo);
}
