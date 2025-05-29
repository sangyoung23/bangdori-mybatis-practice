package bangdori.api_mybatis.domain.product.vo;

import lombok.Getter;
import lombok.Setter;

import java.time.LocalDateTime;

@Getter @Setter
public class ProductImageVO {

    private Long seqNo;
    private Long prodNo;
    private String managementFileName;
    private String realFileName;
    private String useYn;
    private LocalDateTime regDtm;
}
