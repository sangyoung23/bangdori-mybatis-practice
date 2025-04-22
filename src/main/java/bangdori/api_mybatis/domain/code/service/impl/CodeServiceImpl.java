package bangdori.api_mybatis.domain.code.service.impl;

import bangdori.api_mybatis.domain.code.dto.CodeResponseDto;
import bangdori.api_mybatis.domain.code.mapper.CodeMapper;
import bangdori.api_mybatis.domain.code.service.CodeService;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Map;
import java.util.TreeMap;
import java.util.stream.Collectors;

@Service
@RequiredArgsConstructor
public class CodeServiceImpl implements CodeService {

    private final CodeMapper codeMapper;

    @Override
    public Map<String, List<CodeResponseDto>> getCommCodes() throws Exception {
        return codeMapper.selectCommCodes().stream()
                .map(CodeResponseDto::from)
                .collect(Collectors.groupingBy(
                        CodeResponseDto::getCommCd, // commCd를 key로 잡고 정렬
                        TreeMap::new, // Key를 기준으로 정렬된 Map 반환
                        Collectors.toList() // List형식으로 변환
                ));
    }
}
