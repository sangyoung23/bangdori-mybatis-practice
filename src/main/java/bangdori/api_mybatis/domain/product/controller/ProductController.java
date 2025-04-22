package bangdori.api_mybatis.domain.product.controller;


import bangdori.api_mybatis.comm.response.ApiResponse;
import bangdori.api_mybatis.domain.product.dto.ProductResponseDto;
import bangdori.api_mybatis.domain.product.dto.ProductUpdateRequestDto;
import bangdori.api_mybatis.domain.product.service.impl.ProductService;
import lombok.RequiredArgsConstructor;
import org.springframework.web.bind.annotation.*;

import java.util.List;

import static bangdori.api_mybatis.comm.response.ApiResponse.VALUE_STATUS_RUNTIME_ERROR;

@RestController
@RequiredArgsConstructor
@RequestMapping("/product")
public class ProductController {

    private final ApiResponse apiResponse;
    private final ProductService productService;

    @GetMapping("/products")
    public ApiResponse getProducts(@RequestParam("corpNo") Long corpNo) throws Exception {
        try {
            List<ProductResponseDto> products = productService.getProducts(corpNo);
            return apiResponse.addResult("LIST", products);
        } catch (Exception e) {
            return apiResponse.fail(VALUE_STATUS_RUNTIME_ERROR, "조회 실패: " + e.getMessage());
        }
    }

    @PostMapping("/updateNewDtm")
    public ApiResponse updateNewDtmAndUser(@RequestBody ProductUpdateRequestDto request) {
        try {
            productService.updateNewDtmAndUser(request.getProdNo(), request.getUserNo());
            return apiResponse.success();
        } catch (Exception e) {
            return apiResponse.fail(VALUE_STATUS_RUNTIME_ERROR, "수정 실패: " + e.getMessage());
        }
    }
}
