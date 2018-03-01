package com.spring_rest.sponsors.repository.queries;

import com.spring_rest.sponsors.domain.LanguageTemplate;

public class LanguageTemplateQueryBuilder extends CrudQueryBuilder<LanguageTemplate> {

  private static final String TABLE_NAME = "languagetemplate";

  @Override
  public String getTableName() {
    return TABLE_NAME;
  }
}
