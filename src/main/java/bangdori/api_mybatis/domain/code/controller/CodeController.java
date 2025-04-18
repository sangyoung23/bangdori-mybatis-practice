package bangdori.api_mybatis.domain.code.controller;

import bangdori.api_mybatis.comm.response.ApiResponse;
import bangdori.api_mybatis.domain.code.dto.CodeResponseDto;
import bangdori.api_mybatis.domain.code.service.CodeService;
import lombok.RequiredArgsConstructor;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import java.util.List;
import java.util.Map;

@RestController
@RequiredArgsConstructor
@RequestMapping("/comm/code")
public class CodeController {

    private final ApiResponse apiResponse;
    private final CodeService codeService;

    @GetMapping("/commCodes")
    public ApiResponse getCommCodes() throws Exception {
        Map<String, List<CodeResponseDto>> commCodes = codeService.getCommCodes();
        return apiResponse.addResult("LIST", commCodes);
    }
}
