package com.spring_rest.sponsors;

import org.flywaydb.core.Flyway;
import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;

import java.util.Map;
import java.util.Objects;

@SpringBootApplication
public class SponsorsApplication {

  public static void main(String[] args) {

    Map<String, String> env = System.getenv();

    String DB_HOST = env.get("DB_HOST");
    String DB_PORT = env.get("DB_PORT");
    String DB_USERNAME = env.get("DB_USERNAME");
    String DB_PASSWORD = env.get("DB_PASSWORD");
    String DB_NAME = env.get("DB_NAME");
    String DB_ENV = env.get("DB_ENV");

    Flyway flyway = new Flyway();
    flyway.setDataSource(String.format("jdbc:mysql://%s:%s/%s",
        DB_HOST, DB_PORT, DB_NAME), DB_USERNAME, DB_PASSWORD);
    if (Objects.equals(DB_ENV, "develop")) flyway.migrate();

    SpringApplication.run(SponsorsApplication.class, args);
  }
}
