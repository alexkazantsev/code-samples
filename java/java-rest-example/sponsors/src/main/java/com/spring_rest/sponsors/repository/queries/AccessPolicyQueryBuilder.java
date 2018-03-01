package com.spring_rest.sponsors.repository.queries;

import com.spring_rest.sponsors.domain.AccessPolicy;

public class AccessPolicyQueryBuilder extends CrudQueryBuilder<AccessPolicy> {

  private static final String TABLE_NAME = "accesspolicy";


  @Override
  public String getTableName() {
    return TABLE_NAME;
  }
}
