package bangdori.api_mybatis.domain.product.service.impl;

import bangdori.api_mybatis.domain.product.dto.ProductRequestDto;
import bangdori.api_mybatis.domain.product.dto.ProductResponseDto;
import bangdori.api_mybatis.domain.product.mapper.ProductMapper;
import bangdori.api_mybatis.domain.product.vo.ProductImageVO;
import bangdori.api_mybatis.domain.product.vo.ProductRemarkVO;
import bangdori.api_mybatis.domain.product.vo.ProductVO;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;
import org.springframework.web.multipart.MultipartFile;

import java.time.LocalDateTime;
import java.util.Collections;
import java.util.List;
import java.util.Optional;
import java.util.stream.Collectors;

@Service
@RequiredArgsConstructor
public class ProductService implements bangdori.api_mybatis.domain.product.service.ProductService {

    private final ProductMapper productMapper;
    private final FileStorageService fileStorageService;

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

    @Override
    public void createProduct(ProductRequestDto productRequestDto, List<String> remarkCds, List<MultipartFile> images) {
        // 1. 매물 등록
        ProductVO productVO = ProductVO.fromDto(productRequestDto);
        productMapper.insertProduct(productVO);

        Long prodNo = productVO.getProdNo();

        // 2. 특이사항 등록
        List<ProductRemarkVO> remarkList = Optional.ofNullable(remarkCds)
                .orElse(Collections.emptyList())
                .stream()
                .map(remarkCd -> {
                    ProductRemarkVO remark = new ProductRemarkVO();
                    remark.setProdNo(prodNo);
                    remark.setRemarkCd(remarkCd);
                    remark.setUseYn("Y");
                    remark.setRegDtm(LocalDateTime.now());
                    return remark;
                }).toList();


        // 3. 매물 이미지 등록
        List<ProductImageVO> imageList = Optional.ofNullable(images)
                .orElse(Collections.emptyList())
                .stream()
                .map(image -> {
                    String fileName = fileStorageService.saveFile(image);
                    ProductImageVO imageVO = new ProductImageVO();
                    imageVO.setProdNo(prodNo);
                    imageVO.setManagementFileName(fileName);
                    imageVO.setRealFileName(image.getOriginalFilename());
                    imageVO.setUseYn("Y");
                    imageVO.setRegDtm(LocalDateTime.now());
                    return imageVO;
                }).toList();

        if (!remarkList.isEmpty()) {
            productMapper.insertRemarks(remarkList);
        }
        if (!imageList.isEmpty()) {
            productMapper.insertImages(imageList);
        }
    }
}
