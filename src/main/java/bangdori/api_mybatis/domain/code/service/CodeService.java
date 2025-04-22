package bangdori.api_mybatis.domain.code.service;

import bangdori.api_mybatis.domain.code.dto.CodeResponseDto;

import java.util.List;
import java.util.Map;

public interface CodeService {

    Map<String, List<CodeResponseDto>> getCommCodes() throws Exception;
}


