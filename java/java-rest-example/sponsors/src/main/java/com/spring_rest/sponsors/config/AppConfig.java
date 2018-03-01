package com.spring_rest.sponsors.config;

import com.spring_rest.sponsors.service.export.ImportProcessor;
import org.mybatis.spring.annotation.MapperScan;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;


@Configuration
@MapperScan({
    "com.spring_rest.sponsors.repository",
    "com.spring_rest.sponsors.repository.queries"
})
public class AppConfig {
  @Bean
  public ImportProcessor guestAccountImportProcessor() {
    return new ImportProcessor();
  }
}
