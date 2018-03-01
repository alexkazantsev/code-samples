package com.spring_rest.sponsors.repository;

import com.spring_rest.sponsors.domain.LanguageTemplate;
import com.spring_rest.sponsors.repository.queries.LanguageTemplateQueryBuilder;
import java.util.List;

import org.apache.ibatis.annotations.Mapper;
import org.apache.ibatis.annotations.SelectProvider;

@Mapper
public interface LanguageTemplateRepository {

  @SelectProvider(type = LanguageTemplateQueryBuilder.class, method = "findAll")
  List<LanguageTemplate> findAll();

}
