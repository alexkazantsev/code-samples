package com.spring_rest.sponsors.repository;

import com.spring_rest.sponsors.domain.AccountDurationTemplate;
import com.spring_rest.sponsors.repository.queries.AccountDurationTemplateQueryBuilder;
import java.util.List;

import org.apache.ibatis.annotations.Mapper;
import org.apache.ibatis.annotations.SelectProvider;

@Mapper
public interface AccountDurationTemplateRepository {

  @SelectProvider(type = AccountDurationTemplateQueryBuilder.class, method = "findAll")
  List<AccountDurationTemplate> findAll();

}
