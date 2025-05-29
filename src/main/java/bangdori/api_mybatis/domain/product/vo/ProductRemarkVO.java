package bangdori.api_mybatis.domain.product.vo;

import lombok.Getter;
import lombok.Setter;

import java.time.LocalDateTime;

@Getter @Setter
public class ProductRemarkVO {

    private Long seqNo;
    private Long prodNo;
    private String remarkCd;
    private String useYn;
    private LocalDateTime regDtm;
}
