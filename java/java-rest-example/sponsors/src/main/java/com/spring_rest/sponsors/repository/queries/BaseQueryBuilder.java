package com.spring_rest.sponsors.repository.queries;

import com.fasterxml.jackson.databind.ObjectMapper;

import java.util.List;
import java.util.Map;
import java.util.function.Supplier;
import java.util.stream.Collectors;
import java.util.stream.Stream;


@SuppressWarnings("unchecked")
class BaseQueryBuilder<T> {
  private Supplier<Stream<String>> supplier;
  private List<String> ignoredFields;

  BaseQueryBuilder(T t, List<String> ignoredFields) {

    this.ignoredFields = ignoredFields;

    ObjectMapper objectMapper = new ObjectMapper();
    Map<String, Object> map = objectMapper.convertValue(t, Map.class);

    this.supplier = () -> map.entrySet()
        .stream()
        .map(Map.Entry::getKey)
        .filter(this::filter);
  }

  private Boolean filter(String v) {
    return !this.ignoredFields.contains(v);
  }
  private String formatGuestAccountValues(String v) {
    if (v.equals("status")) {
      return String.format("#{%s, typeHandler=org.apache.ibatis.type.EnumOrdinalTypeHandler}", v);
    }
    return String.format("#{%s}", v);
  }

  String getColumns() {
    return this.supplier
        .get()
        .collect(Collectors.joining(","));
  }

  String getValues() {
    return this.supplier
        .get()
        .map(this::formatGuestAccountValues)
        .collect(Collectors.joining(","));
  }

  String getSetString() {
    return this.supplier
        .get()
        .map(v -> String.format("%s=#{%s}", v, v))
        .collect(Collectors.joining(","));
  }
}
