package com.spring_rest.sponsors.utils.converter;

import org.supercsv.cellprocessor.ift.CellProcessor;
import org.supercsv.util.CsvContext;

public class BooleanToIntProcessor implements CellProcessor {

  @Override
  public Object execute(Object value, CsvContext context) {
    if(value == null) return null;
    return value.equals("true");
  }
}
