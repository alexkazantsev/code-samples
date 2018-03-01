package com.spring_rest.sponsors.utils.converter;

import org.supercsv.cellprocessor.ift.CellProcessor;
import org.supercsv.util.CsvContext;

public class IntToBooleanProcessor implements CellProcessor {

  @Override
  public Object execute(Object o, CsvContext csvContext) {
    Integer intObject = (Integer) o;
    if(intObject == null){
      return null;
    }
    if (intObject == 0) {
      return Boolean.FALSE;
    } else {
      return Boolean.TRUE;
    }
  }
}
