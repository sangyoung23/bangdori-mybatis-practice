package bangdori.api_mybatis.comm.config;


import org.mybatis.spring.annotation.MapperScan;
import org.springframework.context.annotation.Configuration;


@Configuration
@MapperScan(basePackages = {
        "bangdori.api_mybatis.domain.user.mapper",
        "bangdori.api_mybatis.domain.product.mapper",
        "bangdori.api_mybatis.domain.code.mapper"
})
public class MybatisConfig {

}
