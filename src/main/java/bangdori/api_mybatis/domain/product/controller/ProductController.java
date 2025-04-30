package bangdori.api_mybatis.domain.product.controller;


import bangdori.api_mybatis.comm.response.ApiResponse;
import bangdori.api_mybatis.domain.product.dto.ProductDeleteRequestDto;
import bangdori.api_mybatis.domain.product.dto.ProductRequestDto;
import bangdori.api_mybatis.domain.product.dto.ProductResponseDto;
import bangdori.api_mybatis.domain.product.dto.ProductUpdateRequestDto;
import bangdori.api_mybatis.domain.product.service.impl.ProductService;
import lombok.RequiredArgsConstructor;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.multipart.MultipartFile;

import java.util.List;

@RestController
@RequiredArgsConstructor
@RequestMapping("/product")
public class ProductController {

    private final ProductService productService;

    @GetMapping("/products")
    public ApiResponse getProducts(@RequestParam("corpNo") Long corpNo) {
            List<ProductResponseDto> products = productService.getProducts(corpNo);
            return new ApiResponse().addResult("LIST", products);
    }

    @PostMapping("/updateNewDtm")
    public ApiResponse updateNewDtmAndUser(@RequestBody ProductUpdateRequestDto request) {
            productService.updateNewDtmAndUser(request.getProdNo(), request.getUserNo());
            return new ApiResponse().success();
    }

    @PostMapping("/deleteProduct")
    public ApiResponse deleteProduct(@RequestBody ProductDeleteRequestDto request) {
            productService.deleteProduct(request.getProdNo());
            return new ApiResponse().success();
    }

    @PostMapping("/addProdReg")
    public ApiResponse addProdErg(@RequestPart("productDto") ProductRequestDto productDto,
                                  @RequestPart("remarkCds") List<String> remarkCds,
                                  @RequestPart("imges")List<MultipartFile> imges) {
            productService.addProduct(productDto, remarkCds, imges);
            return new ApiResponse().success();
    }
}
