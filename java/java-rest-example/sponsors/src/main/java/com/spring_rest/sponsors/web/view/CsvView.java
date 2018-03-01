package com.spring_rest.sponsors.web.view;

import com.spring_rest.sponsors.utils.Exportable;
import com.spring_rest.sponsors.utils.converter.IntToBooleanProcessor;
import java.io.IOException;
import java.lang.reflect.Field;
import java.util.ArrayList;
import java.util.LinkedList;
import java.util.List;
import java.util.Map;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;

import org.springframework.web.servlet.view.AbstractView;
import org.supercsv.cellprocessor.Optional;
import org.supercsv.cellprocessor.ift.CellProcessor;
import org.supercsv.io.CsvBeanWriter;
import org.supercsv.prefs.CsvPreference;

public class CsvView extends AbstractView implements ExportableView {

  private static final String CONTENT_TYPE = "text/csv";
  private String name;
  private List<String> exportableFields;
  private Map<Field, String> fieldsMap;

  public CsvView() {
    exportableFields = new ArrayList<>();
    setContentType(CONTENT_TYPE);
  }

  @Override
  protected boolean generatesDownloadContent() {
    return true;
  }

  @Override
  protected void renderMergedOutputModel(Map<String, Object> model, HttpServletRequest request,
      HttpServletResponse response) throws Exception {
    response.setHeader("Content-Disposition", "attachment: filename=\"" + name + ".csv\"");
    response.setContentType(CONTENT_TYPE);
    List items = (List) model.get("items");
    if (items == null || items.size() == 0) {
      return;
    }
    fieldsMap = parseFields(items, exportableFields);
    CellProcessor[] processors = getProcessors(fieldsMap);

    CsvBeanWriter csvBeanWriter = new CsvBeanWriter(response.getWriter(),
        CsvPreference.STANDARD_PREFERENCE);

    String[] headers = processHeaders(csvBeanWriter, fieldsMap);

    for (Object item : items) {
      csvBeanWriter.write(item, headers, processors);
    }

    csvBeanWriter.close();
  }

  private CellProcessor[] getProcessors(Map<Field, String> fieldsMap) {
    List<CellProcessor> processors = new LinkedList<>();
    for (Field field : fieldsMap.keySet()) {
      if (field.isAnnotationPresent(Exportable.class)) {
        Exportable exportable = field.getDeclaredAnnotation(Exportable.class);
        Class forcedType = exportable.forcedType();
        if (forcedType != Void.class) {
          if (forcedType == Boolean.class) {
            processors.add(new Optional(new IntToBooleanProcessor()));
          }
        } else {
          processors.add(new Optional());
        }
      } else {
        processors.add(new Optional());
      }
    }

    return processors.toArray(new CellProcessor[0]);
  }

  private String[] processHeaders(CsvBeanWriter writer, Map<Field, String> fieldsMap)
      throws IOException {
    writer.writeHeader(fieldsMap.values().toArray(new String[0]));
    return getHeaders(fieldsMap);
  }

  @Override
  public void setName(String name) {
    this.name = name;
  }

  @Override
  public void setExportFields(List<String> fields) {
    exportableFields = fields;
  }
}
