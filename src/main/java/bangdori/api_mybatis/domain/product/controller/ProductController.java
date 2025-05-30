package bangdori.api_mybatis.domain.product.controller;


import bangdori.api_mybatis.comm.response.ApiResponse;
import bangdori.api_mybatis.domain.product.dto.ProductDeleteRequestDto;
import bangdori.api_mybatis.domain.product.dto.ProductRequestDto;
import bangdori.api_mybatis.domain.product.dto.ProductResponseDto;
import bangdori.api_mybatis.domain.product.dto.ProductUpdateRequestDto;
import bangdori.api_mybatis.domain.product.service.impl.ProductService;
import bangdori.api_mybatis.domain.user.dto.UserResponseDto;
import lombok.RequiredArgsConstructor;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.multipart.MultipartFile;

import java.util.List;

@RestController
@RequiredArgsConstructor
@RequestMapping("/product")
public class ProductController {

    private final ProductService productService;

    @GetMapping
    public ApiResponse getProducts(@RequestParam("corpNo") Long corpNo) {
            List<ProductResponseDto> products = productService.getProducts(corpNo);
            return new ApiResponse()
                    .success()
                    .addResult("LIST", products);
    }

    @GetMapping("/users")
    public ApiResponse getUserList(@RequestParam("userNo") Long userNo) {
        List<UserResponseDto> userList = productService.getUserList(userNo);
        return new ApiResponse()
                .success()
                .addResult("LIST", userList);
    }

    @PatchMapping("/{prodNo}/refresh")
    public ApiResponse updateNewDtmAndUser(@RequestBody ProductUpdateRequestDto request) {
            productService.updateNewDtmAndUser(request.getProdNo(), request.getUserNo());
            return new ApiResponse().success();
    }

    @DeleteMapping("/{prodNo}")
    public ApiResponse deleteProduct(@RequestBody ProductDeleteRequestDto request) {
            productService.deleteProduct(request.getProdNo());
            return new ApiResponse().success();
    }

    @PostMapping
    public ApiResponse createProduct(@RequestPart("productDto") ProductRequestDto productDto,
                                  @RequestPart(value = "remarkCds", required = false) List<String> remarkCds,
                                  @RequestPart(value = "images", required = false) List<MultipartFile> images) {
            productService.createProduct(productDto, remarkCds, images);
            return new ApiResponse().success();
    }
}
