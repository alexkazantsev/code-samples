package com.spring_rest.sponsors.repository.queries;

import com.spring_rest.sponsors.domain.AccountDurationTemplate;
import org.apache.ibatis.jdbc.SQL;

public class AccountDurationTemplateQueryBuilder extends CrudQueryBuilder<AccountDurationTemplate> {

  public static final String TABLE_NAME = "accountdurationtemplate";

  public String findAll() {
    return new SQL() {{
      SELECT("*");
      FROM(getTableName());
    }}.toString();
  }

  @Override
  public String getTableName() {
    return TABLE_NAME;
  }
}
