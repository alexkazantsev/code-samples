package com.spring_rest.sponsors.service.search_filter;

import com.fasterxml.jackson.databind.ObjectMapper;
import com.spring_rest.sponsors.enums.GuestStatus;
import com.spring_rest.sponsors.enums.MacAddressStatus;
import lombok.Data;
import org.joda.time.DateTime;
import org.joda.time.format.DateTimeFormat;

import java.lang.reflect.Field;
import java.util.Date;
import java.util.List;
import java.util.Map;
import java.util.stream.Collectors;

@Data
class BaseSearchFilter {

  BaseSearchFilter(Map<String, String> params) {
    ObjectMapper objectMapper = new ObjectMapper();
    @SuppressWarnings("unchecked") Map<String, Object> map = objectMapper.convertValue(this, Map.class);

    List<String> fields = map.entrySet()
        .stream()
        .map(Map.Entry::getKey)
        .collect(Collectors.toList());

    params.entrySet().stream()
        .filter(k -> fields.contains(k.getKey()))
        .forEach(k -> {
          try {
            Field field = this.getClass()
                .getDeclaredField(k.getKey());

            field.setAccessible(true);

            String type = field.getAnnotatedType().getType().getTypeName();

            if (type.equals(String.class.getName())) {
              field.set(this, k.getValue());
            } else if (type.equals(Integer.class.getName())) {
              field.set(this, Integer.parseInt(k.getValue()));
            } else if (type.equals(GuestStatus.class.getName())) {
              field.set(this, GuestStatus.valueOf(k.getValue()));
            } else if (type.equals(MacAddressStatus.class.getName())) {
              field.set(this, MacAddressStatus.valueOf(k.getValue()));
            } else if (type.equals(Date.class.getName())) {
              DateTime dateTime = DateTime.parse(k.getValue(), DateTimeFormat.forPattern("YYYY-MM-dd"));
              field.set(this, dateTime.toDate());
            }

          } catch (IllegalAccessException | NoSuchFieldException e) {
            e.printStackTrace();
          }
        });
  }
}
