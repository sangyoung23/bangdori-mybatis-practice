package bangdori.api_mybatis.domain.code.dto;

import bangdori.api_mybatis.domain.code.vo.CodeVO;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Getter;
import lombok.Setter;

@Builder
@Getter @Setter
public class CodeResponseDto {

    private String cdNm;
    private String commCd;
    private String dtlCd;

    public static CodeResponseDto from(CodeVO codeVO) {
        return CodeResponseDto.builder()
                .cdNm(codeVO.getCdNm())
                .commCd(codeVO.getCommCd())
                .dtlCd(codeVO.getDtlCd())
                .build();
    }
}

