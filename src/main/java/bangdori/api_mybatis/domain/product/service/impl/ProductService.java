package bangdori.api_mybatis.domain.product.service.impl;

import bangdori.api_mybatis.domain.product.dto.ProductResponseDto;
import bangdori.api_mybatis.domain.product.mapper.ProductMapper;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.stream.Collectors;

@Service
@RequiredArgsConstructor
public class ProductService implements bangdori.api_mybatis.domain.product.service.ProductService {

    private final ProductMapper productMapper;

    @Override
    public List<ProductResponseDto> getProducts(Long corpNo) {
        return productMapper.selectProducts(corpNo).stream()
                .map(ProductResponseDto::from)
                .collect(Collectors.toList());
    }

    @Override
    public void updateNewDtmAndUser(Long prodNo, Long userNo) {
        productMapper.updateNewDtmAndUser(prodNo, userNo);
    }

    @Override
    public void deleteProduct(Long prodNo) {
        productMapper.deleteProduct(prodNo);
    }
}
