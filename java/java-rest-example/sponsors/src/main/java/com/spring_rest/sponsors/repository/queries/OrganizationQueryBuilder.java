package com.spring_rest.sponsors.repository.queries;

import com.spring_rest.sponsors.domain.Organization;

public class OrganizationQueryBuilder extends CrudQueryBuilder<Organization> {

  public static final String TABLE_NAME = "organization";

  @Override
  public String getTableName() {
    return TABLE_NAME;
  }
}
