package bangdori.api_mybatis.domain.product.vo;

import lombok.Getter;
import lombok.Setter;

import java.time.LocalDateTime;
import java.util.List;


@Getter @Setter
public class ProductVO {

    private Long prodNo;
    private Long corpNo;
    private String tradeType;
    private String title;
    private String type;
    private String statusCd;
    private String entrancePwd;
    private String unitPwd;
    private String phoneNo1;
    private String phoneNo2;
    private String unitNo;
    private String etc;
    private String deposit;
    private String monthlyRent;
    private String depositAndMonthlyRent;
    private String salePricdAndDepoAndRent;
    private String depositAndMonthlyRentAndPreFee;
    private String salePrice;
    private String depositTotal;
    private String rentTotal;
    private String premiumFee;
    private String premiumYn;
    private String directionCd;
    private String rcmCd;
    private String roomCd;
    private String bathCd;
    private String moveInCd;
    private String prodAddr;
    private String propertyX;
    private String propertyY;
    private String prodRoadAddr;
    private String prodDtlAddr;
    private Long prodMngUser;
    private LocalDateTime newDtm;
    private Long regUserId;
    private Long chgUserId;

    private List<String> remarkCd;
}
