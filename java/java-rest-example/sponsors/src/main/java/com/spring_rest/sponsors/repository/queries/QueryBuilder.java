package com.spring_rest.sponsors.repository.queries;

import java.util.List;
import org.apache.ibatis.jdbc.SQL;

public interface QueryBuilder<T> {

  default String findAll() {
    return new SQL() {{
      SELECT("*");
      FROM(getTableName());
    }}.toString();
  }

  String findOne(Integer id);

  String save(T item);

  String update(T item);

  String delete(Integer id);

  String bulkFind(List<Integer> ids);

  String bulkDelete(List<Integer> ids);

  String getTableName();

}
