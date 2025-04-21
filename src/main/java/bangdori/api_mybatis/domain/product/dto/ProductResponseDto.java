package bangdori.api_mybatis.domain.product.dto;


import bangdori.api_mybatis.domain.product.vo.ProductVO;
import lombok.Builder;
import lombok.Getter;
import lombok.Setter;

import java.time.LocalDateTime;
import java.util.List;

@Builder
@Getter @Setter
public class ProductResponseDto {

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

    public static ProductResponseDto from(ProductVO productVO) {
        String deposit = productVO.getDeposit() != null ? productVO.getDeposit() : "0";
        String monthlyRent = productVO.getMonthlyRent() != null ? productVO.getMonthlyRent() : "0";
        String salePrice = productVO.getSalePrice() != null ? productVO.getSalePrice() : "0";
        String depositTotal = productVO.getDepositTotal() != null ? productVO.getDepositTotal() : "0";
        String rentTotal = productVO.getRentTotal() != null ? productVO.getRentTotal() : "0";
        String premiumFee = productVO.getPremiumFee() != null ? productVO.getPremiumFee() : "0";
        String depositAndMonthlyRent = "보증" + deposit + "만" + " / " +  "월" + monthlyRent + "만";
        String salePricdAndDepoAndRent = "매매" + salePrice + "만" + " / " + "보증" + depositTotal + "만" + " / " + "임대" + rentTotal + "만";
        String depositAndMonthlyRentAndPreFee = "보증" + deposit + "만" + " / " +  "월" + monthlyRent + "만" + " / " + "권리" + premiumFee + "만";

        return ProductResponseDto.builder()
                .prodNo(productVO.getProdNo())
                .corpNo(productVO.getCorpNo())
                .tradeType(productVO.getTradeType())
                .title(productVO.getTitle())
                .type(productVO.getType())
                .statusCd(productVO.getStatusCd())
                .entrancePwd(productVO.getEntrancePwd())
                .unitPwd(productVO.getUnitPwd())
                .phoneNo1(productVO.getPhoneNo1())
                .phoneNo2(productVO.getPhoneNo2())
                .unitNo(productVO.getUnitNo())
                .etc(productVO.getEtc())
                .deposit(deposit)
                .monthlyRent(monthlyRent)
                .depositAndMonthlyRent(depositAndMonthlyRent)
                .salePricdAndDepoAndRent(salePricdAndDepoAndRent)
                .depositAndMonthlyRentAndPreFee(depositAndMonthlyRentAndPreFee)
                .salePrice(salePrice)
                .depositTotal(depositTotal)
                .rentTotal(rentTotal)
                .premiumFee(premiumFee)
                .premiumYn(productVO.getPremiumYn())
                .directionCd(productVO.getDirectionCd())
                .rcmCd(productVO.getRcmCd())
                .roomCd(productVO.getRoomCd())
                .bathCd(productVO.getBathCd())
                .moveInCd(productVO.getMoveInCd())
                .prodAddr(productVO.getProdAddr())
                .propertyX(productVO.getPropertyX())
                .propertyY(productVO.getPropertyY())
                .prodRoadAddr(productVO.getProdRoadAddr())
                .prodDtlAddr(productVO.getProdDtlAddr())
                .prodMngUser(productVO.getProdMngUser())
                .newDtm(productVO.getNewDtm())
                .regUserId(productVO.getRegUserId())
                .chgUserId(productVO.getChgUserId())
//                .remarkCd()
                .build();
    }

}
