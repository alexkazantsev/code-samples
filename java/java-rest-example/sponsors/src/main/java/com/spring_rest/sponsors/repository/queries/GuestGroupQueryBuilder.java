package com.spring_rest.sponsors.repository.queries;

import com.spring_rest.sponsors.domain.GuestGroup;

public class GuestGroupQueryBuilder extends CrudQueryBuilder<GuestGroup> {

  private static final String TABLE_NAME = "guestgroup";

  @Override
  public String getTableName() {
    return TABLE_NAME;
  }

}
