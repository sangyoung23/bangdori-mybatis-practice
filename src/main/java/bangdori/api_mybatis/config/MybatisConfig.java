package bangdori.api_mybatis.config;


import org.mybatis.spring.annotation.MapperScan;
import org.springframework.context.annotation.Configuration;

@Configuration
@MapperScan(basePackages = {
        "bangdori.api_mybatis.user.mapper",
        "bangdori.api_mybatis.product.mapper"
})
public class MybatisConfig {

}
