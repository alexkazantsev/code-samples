package com.spring_rest.sponsors.web.view;

import com.spring_rest.sponsors.utils.Exportable;
import com.spring_rest.sponsors.utils.converter.IntToBooleanProcessor;
import java.lang.reflect.Field;
import java.util.ArrayList;
import java.util.Date;
import java.util.List;
import java.util.Map;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;

import org.apache.poi.hssf.util.HSSFColor;
import org.apache.poi.hssf.util.HSSFColor.BLACK;
import org.apache.poi.ss.usermodel.Cell;
import org.apache.poi.ss.usermodel.CellStyle;
import org.apache.poi.ss.usermodel.CellType;
import org.apache.poi.ss.usermodel.FillPatternType;
import org.apache.poi.ss.usermodel.Font;
import org.apache.poi.ss.usermodel.Row;
import org.apache.poi.ss.usermodel.Sheet;
import org.apache.poi.ss.usermodel.Workbook;
import org.springframework.web.servlet.view.document.AbstractXlsxView;

public class ExcelView extends AbstractXlsxView implements ExportableView {

  private String name;
  private List<String> exportableFields;
  private Map<Field, String> fieldsMap;
  private CellStyle headerStyle;
  private CellStyle dateStyle;

  @Override
  protected void buildExcelDocument(Map<String, Object> model, Workbook workbook,
      HttpServletRequest request, HttpServletResponse response) throws Exception {
    response.setHeader("Content-Disposition", "attachment: filename=\"" + name + ".xlsx\"");

    Sheet sheet = prepareDocument(workbook);
    List items = (List) model.get("items");
    if (items == null || items.size() == 0) {
      return;
    }
    fieldsMap = parseFields(items, exportableFields);

    processHeaders(sheet, fieldsMap);
    processItems(sheet, items);
  }

  private void processHeaders(Sheet sheet, Map<Field, String> fieldsMap) {
    Row header = sheet.createRow(0);
    List<String> headers = new ArrayList<>(fieldsMap.values());
    for (int i = 0; i < headers.size(); i++) {
      header.createCell(i).setCellValue(headers.get(i));
      header.getCell(i).setCellStyle(headerStyle);
    }
  }

  private void processItems(Sheet sheet, List items)
      throws NoSuchFieldException, IllegalAccessException {
    List<Field> headers = new ArrayList<>(fieldsMap.keySet());
    int currentRow = 1;

    for (Object item : items) {
      Row itemRow = sheet.createRow(currentRow++);
      for (int i = 0; i < headers.size(); i++) {
        writeItem(item, itemRow, i);
      }
    }
  }

  private void writeItem(Object item, Row itemRow, int i)
      throws NoSuchFieldException, IllegalAccessException {
    List<Field> headers = new ArrayList<>(fieldsMap.keySet());
    Cell cell = itemRow.createCell(i);
    Field declaredField = item.getClass().getDeclaredField(headers.get(i).getName());
    declaredField.setAccessible(true);

    Object fieldValue = declaredField.get(item);
    CellType cellType = CellType.STRING;
    if (fieldValue != null) {
      cellType = getCellType(fieldValue, declaredField);
      processCell(cell, fieldValue);
    }

    cell.setCellType(cellType);
  }

  private CellType getCellType(Object item, Field field) {
    CellType cellType = CellType.STRING;
    if (field.isAnnotationPresent(Exportable.class)) {
      Exportable exportable = field.getDeclaredAnnotation(Exportable.class);
      if (exportable.forcedType() == Boolean.class) {
        cellType = CellType.BOOLEAN;
      }
    }
    if (item instanceof Integer) {
      cellType = CellType.NUMERIC;
    } else if (item instanceof Double) {
      cellType = CellType.NUMERIC;
    }

    return cellType;
  }

  private void processCell(Cell cell, Object item) {
    if (cell.getCellTypeEnum() == CellType.BOOLEAN) {
      Boolean booleanString = (Boolean) new IntToBooleanProcessor().execute(item, null);
      cell.setCellValue(booleanString);
    } else if (item instanceof String) {
      cell.setCellValue(((String) item));
    } else if (item instanceof Integer) {
      cell.setCellValue(((Integer) item).doubleValue());
    } else if (item instanceof Double) {
      cell.setCellValue(((Double) item));
    } else if (item instanceof Date) {
      cell.setCellValue(((Date) item));
      cell.setCellStyle(dateStyle);
    } else {
      cell.setCellValue(item.toString());
    }
  }

  private Sheet prepareDocument(Workbook workbook) {
    Sheet sheet = workbook.createSheet(name);
    sheet.setDefaultColumnWidth(20);

    prepareStyles(workbook);
    return sheet;
  }

  private void prepareStyles(Workbook workbook) {
    headerStyle = getCellStyle(workbook);
    dateStyle = workbook.createCellStyle();
    dateStyle.setDataFormat(
        workbook.getCreationHelper().createDataFormat().getFormat("yyyy-MM-dd HH:mm:ss"));
  }

  private CellStyle getCellStyle(Workbook workbook) {
    CellStyle style = workbook.createCellStyle();
    Font font = workbook.createFont();
    font.setFontName("Arial");
    style.setFillForegroundColor(HSSFColor.CORAL.index);
    style.setFillPattern(FillPatternType.SOLID_FOREGROUND);
    font.setBold(true);
    font.setColor(BLACK.index);
    style.setFont(font);
    return style;
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
