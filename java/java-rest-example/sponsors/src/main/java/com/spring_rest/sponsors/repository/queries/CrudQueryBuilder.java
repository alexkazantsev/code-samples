package com.spring_rest.sponsors.repository.queries;

import java.util.Arrays;
import java.util.List;
import java.util.stream.Collectors;
import org.apache.ibatis.jdbc.SQL;

public abstract class CrudQueryBuilder<T> implements QueryBuilder<T> {

  @Override
  public String findOne(Integer id) {
    return new SQL() {{
      SELECT("*");
      FROM(getTableName());
      WHERE("id=#{id}");
    }}.toString();
  }

  @Override
  public String save(T item) {
    BaseQueryBuilder<T> builder = getBuilder(item, "id");
    return new SQL() {{
      INSERT_INTO(getTableName());
      VALUES(
          builder.getColumns(),
          builder.getValues()
      );
    }}.toString();
  }

  @Override
  public String update(T item) {
    BaseQueryBuilder<T> builder = getBuilder(item, "id");
    return new SQL() {{
      UPDATE(getTableName());
      SET(builder.getSetString());
      WHERE("id=#{id}");
    }}.toString();
  }


  @Override
  public String delete(Integer id) {
    return new SQL() {{
      DELETE_FROM(getTableName());
      WHERE("id=#{id}");
    }}.toString();
  }

  @Override
  public String bulkFind(List<Integer> ids) {
    return new SQL() {{
      SELECT("*");
      FROM(getTableName());
      WHERE(formatIdIn(ids));
    }}.toString();
  }

  @Override
  public String bulkDelete(List<Integer> ids) {
    return new SQL() {{
      DELETE_FROM(getTableName());
      WHERE(formatIdIn(ids));
    }}.toString();
  }

  private String formatIdIn(List<Integer> ids) {
    return String.format(
        "`id` IN (%s)",
        ids.stream().map(String::valueOf)
            .collect(Collectors.joining(",")));

  }


  private BaseQueryBuilder<T> getBuilder(T item, String... ignoredfields) {
    return new BaseQueryBuilder<>(item, Arrays.asList(ignoredfields));
  }
}
