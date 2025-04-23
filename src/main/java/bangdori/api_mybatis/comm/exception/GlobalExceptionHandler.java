package bangdori.api_mybatis.comm.exception;

import bangdori.api_mybatis.comm.response.ApiResponse;
import org.springframework.http.converter.HttpMessageNotReadableException;
import org.springframework.web.bind.MethodArgumentNotValidException;
import org.springframework.web.bind.annotation.ExceptionHandler;
import org.springframework.web.bind.annotation.RestControllerAdvice;

import static bangdori.api_mybatis.comm.response.ApiResponse.VALUE_STATUS_INVALID;
import static bangdori.api_mybatis.comm.response.ApiResponse.VALUE_STATUS_RUNTIME_ERROR;

@RestControllerAdvice
public class GlobalExceptionHandler {

    // 모든 예외 공통 처리
    @ExceptionHandler(Exception.class)
    public ApiResponse handleAllExceptions(Exception e) {
        // 서버 로그
        e.printStackTrace();

        // 사용자에게는 노출되지 않는 TRACE 메세지 포함
        return new ApiResponse()
                .fail(VALUE_STATUS_RUNTIME_ERROR, "서버 처리 중 오류가 발생했습니다.")
                .setTrace(e.getMessage());
    }

    // 잘못된 요청 JSON 처리
    @ExceptionHandler(HttpMessageNotReadableException.class)
    public ApiResponse handleInvalidJson(HttpMessageNotReadableException e) {
        return new ApiResponse()
                .fail(VALUE_STATUS_INVALID, "요청 형식이 잘못되었습니다.")
                .setTrace(e.getMessage());
    }

    // @Valid 같은 파라미터 오류 처리
    @ExceptionHandler(MethodArgumentNotValidException.class)
    public ApiResponse handleValidationError(MethodArgumentNotValidException e) {
        String errorMessage = e.getBindingResult().getAllErrors().get(0).getDefaultMessage();
        return new ApiResponse()
                .fail(VALUE_STATUS_INVALID, "요청 데이터 오류: " + errorMessage)
                .setTrace(e.getMessage());
    }


    // 필요하면 사용자 정의 예외도 따로 처리 가능
//    @ExceptionHandler(CustomException.class)
//    public ApiResponse handleCustomException(CustomException e) {
//        return new ApiResponse()
//                .fail(e.getCode(), e.getMessage());
//    }
}
