package bangdori.api_mybatis.domain.product.vo;

import bangdori.api_mybatis.domain.product.dto.ProductRequestDto;
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
    public static ProductVO fromDto(ProductRequestDto dto) {
        ProductVO vo = new ProductVO();
        vo.setCorpNo(dto.getCorpNo());
        vo.setTradeType(dto.getTradeType());
        vo.setTitle(dto.getTitle());
        vo.setType(dto.getType());
        vo.setStatusCd(dto.getStatusCd());
        vo.setEntrancePwd(dto.getEntrancePwd());
        vo.setUnitPwd(dto.getUnitPwd());
        vo.setPhoneNo1(dto.getPhoneNo1());
        vo.setPhoneNo2(dto.getPhoneNo2());
        vo.setUnitNo(dto.getUnitNo());
        vo.setEtc(dto.getEtc());
        vo.setDeposit(dto.getDeposit());
        vo.setMonthlyRent(dto.getMonthlyRent());
        vo.setDepositAndMonthlyRent(dto.getDepositAndMonthlyRent());
        vo.setSalePricdAndDepoAndRent(dto.getSalePricdAndDepoAndRent());
        vo.setDepositAndMonthlyRentAndPreFee(dto.getDepositAndMonthlyRentAndPreFee());
        vo.setSalePrice(dto.getSalePrice());
        vo.setDepositTotal(dto.getDepositTotal());
        vo.setRentTotal(dto.getRentTotal());
        vo.setPremiumFee(dto.getPremiumFee());
        vo.setPremiumYn(dto.getPremiumYn());
        vo.setDirectionCd(dto.getDirectionCd());
        vo.setRcmCd(dto.getRcmCd());
        vo.setRoomCd(dto.getRoomCd());
        vo.setBathCd(dto.getBathCd());
        vo.setMoveInCd(dto.getMoveInCd());
        vo.setProdAddr(dto.getProdAddr());
        vo.setPropertyX(dto.getPropertyX());
        vo.setPropertyY(dto.getPropertyY());
        vo.setProdRoadAddr(dto.getProdRoadAddr());
        vo.setProdDtlAddr(dto.getProdDtlAddr());
        vo.setProdMngUser(dto.getProdMngUser());
        vo.setRegUserId(dto.getRegUserId());
        vo.setChgUserId(dto.getChgUserId());
        vo.setRemarkCd(dto.getRemarkCd());
        return vo;
    }

}
