package bangdori.api_mybatis.domain.product.controller;


import bangdori.api_mybatis.comm.response.ApiResponse;
import bangdori.api_mybatis.domain.product.dto.ProductResponseDto;
import bangdori.api_mybatis.domain.product.service.impl.ProductService;
import lombok.RequiredArgsConstructor;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

import java.util.List;

@RestController
@RequiredArgsConstructor
@RequestMapping("/product")
public class ProductController {

    private final ApiResponse apiResponse;
    private final ProductService productService;

    @GetMapping("/products")
    public ApiResponse getProducts(@RequestParam("corpNo") Long corpNo) throws Exception {
        List<ProductResponseDto> products = productService.getProducts(corpNo);
        return apiResponse.addResult("LIST", products);
    }

}
