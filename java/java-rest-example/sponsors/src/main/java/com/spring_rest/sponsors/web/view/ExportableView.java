package com.spring_rest.sponsors.web.view;

import com.spring_rest.sponsors.utils.Exportable;
import java.lang.reflect.Field;
import java.util.Arrays;
import java.util.List;
import java.util.Map;
import java.util.stream.Collectors;

import org.apache.commons.collections4.map.ListOrderedMap;
import org.springframework.web.servlet.View;

public interface ExportableView extends View {


  void setName(String name);

  void setExportFields(List<String> fields);

  default Map<Field, String> parseFields(List items, List<String> allowedFields) {
    Object fieldObject = items.get(0);
    Field[] fields = fieldObject.getClass().getDeclaredFields();

    Map<Field, String> fieldsMap = new ListOrderedMap<>();

    List<Field> exportFields = Arrays.stream(fields)
        .filter(field -> allowedFields.contains(field.getName())).collect(
            Collectors.toList());

    for (Field field : exportFields) {
      String exportName = field.getName();
      if (field.isAnnotationPresent(Exportable.class)) {
        Exportable exportable = field.getDeclaredAnnotation(Exportable.class);
        String csvExportName = exportable.value();
        if (!csvExportName.isEmpty()) {
          exportName = csvExportName;
        }

      }
      fieldsMap.put(field, exportName);
    }

    return fieldsMap;
  }


  default String[] getHeaders(Map<Field, String> fieldsMap) {
    return fieldsMap.keySet()
        .stream()
        .map(Field::getName)
        .collect(Collectors.toList())
        .toArray(new String[0]);
  }

}
