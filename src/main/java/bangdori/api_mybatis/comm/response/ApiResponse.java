package bangdori.api_mybatis.comm.response;

import lombok.Getter;
import lombok.Setter;
import org.springframework.stereotype.Component;

import java.util.HashMap;
import java.util.Map;

@Component
@Getter @Setter
public class ApiResponse extends HashMap<String, Object> {

    // Key Constants
    public static final String KEY_STATUS = "STATUS";
    public static final String KEY_MESSAGE = "MESSAGE";
    public static final String KEY_MESSAGE_CODE = "CODE";
    public static final String KEY_MESSAGE_REASON = "REASON";
    public static final String KEY_MESSAGE_TRACE = "TRACE";
    public static final String KEY_RESULT = "RESULT";

    // Value Constants (HTTP Status-like)
    public static final String VALUE_STATUS_SUCCESS = "200";
    public static final String VALUE_STATUS_INVALID = "400";
    public static final String VALUE_STATUS_AUTH_TOKEN_ERROR = "401";
    public static final String VALUE_STATUS_FORBIDDEN = "403";
    public static final String VALUE_STATUS_NOT_FOUND = "404";
    public static final String VALUE_STATUS_METHOD_NOT_ALLOWED = "405";
    public static final String VALUE_STATUS_RUNTIME_ERROR = "500";

    private final Map<String, Object> result = new HashMap<>();
    private final Map<String, Object> message = new HashMap<>();

    public ApiResponse() {
        this.put(KEY_RESULT, result);
        this.put(KEY_MESSAGE, message);
    }

    public ApiResponse success() {
        this.put(KEY_STATUS, VALUE_STATUS_SUCCESS);
        this.setMessage("요청이 성공적으로 처리되었습니다.");
        return this;
    }


    // 실패시 apiResponse.fail()
    public ApiResponse fail(String code, String reason) {
        this.put(KEY_STATUS, code);
        this.setMessage(reason);
        return this;
    }

    public ApiResponse setMessage(String reason) {
        message.put(KEY_MESSAGE_REASON, reason);
        return this;
    }

    public ApiResponse setMessage(String code, String reason) {
        message.put(KEY_MESSAGE_CODE, code);
        message.put(KEY_MESSAGE_REASON, reason);
        return this;
    }

    public ApiResponse addResult(Map<String, Object> map) {
        result.putAll(map);
        return this;
    }

    public ApiResponse addResult(String key, Object value) {
        result.put(key, value);
        return this;
    }

    public ApiResponse setTrace(String traceMessage) {
        message.put(KEY_MESSAGE_TRACE, traceMessage);
        return this;
    }
}
