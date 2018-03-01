package com.spring_rest.sponsors.web.view;

import org.springframework.stereotype.Component;

@Component
public class ExportViewFactory {


  public ExportableView getViewForType(String type) {
    switch (type) {
      default:
      case "csv":
        return new CsvView();
      case "xlsx":
        return new ExcelView();
    }
  }
}
