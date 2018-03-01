package com.spring_rest.sponsors.service.export;

import com.spring_rest.sponsors.utils.Exportable;
import java.io.IOException;
import java.io.InputStream;
import java.io.InputStreamReader;
import java.lang.reflect.Field;
import java.util.ArrayList;
import java.util.Arrays;
import java.util.Date;
import java.util.Iterator;
import java.util.List;
import java.util.stream.Collectors;

import org.apache.poi.ss.usermodel.Cell;
import org.apache.poi.ss.usermodel.CellType;
import org.apache.poi.ss.usermodel.Row;
import org.apache.poi.xssf.usermodel.XSSFSheet;
import org.apache.poi.xssf.usermodel.XSSFWorkbook;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.multipart.MultipartFile;
import org.supercsv.io.dozer.CsvDozerBeanReader;
import org.supercsv.prefs.CsvPreference;

public class ImportProcessor {

  private static Logger logger = LoggerFactory.getLogger(ImportProcessor.class);

  @Autowired
  private CsvFieldFactory fieldFactory;
  private Class currentClass;

  @SuppressWarnings("unchecked")
  public <T> List<T> process(MultipartFile multipartFile,Class<T> currentClass) throws Exception {
    this.currentClass = currentClass;
    List<T> guestAccounts = new ArrayList<>();
    switch (multipartFile.getContentType()) {
      case "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet":
        guestAccounts = (List<T>) parseXlsx(multipartFile.getInputStream());
        break;
      case "text/csv":
        guestAccounts = (List<T>) parseCsv(multipartFile.getInputStream());
        break;
    }
    return guestAccounts;
  }

  private List<Object> parseCsv(InputStream inputStream)
      throws IOException {
    List<Object> guestAccounts = new ArrayList<>();
    CsvDozerBeanReader beanReader = new CsvDozerBeanReader(
        new InputStreamReader(inputStream),
        CsvPreference.STANDARD_PREFERENCE);
    beanReader.configureBeanMapping(currentClass,
        fieldFactory.getFieldsFor(currentClass).toArray(new String[0]));
    logger.debug("parsing csv with headers: {}", fieldFactory.getFieldsFor(currentClass));
    Object guestAccount;
    while ((guestAccount = beanReader
        .read(currentClass, fieldFactory.getProcessorsFor(currentClass))) != null) {
      guestAccounts.add(guestAccount);
    }
    guestAccounts.remove(0);
    return guestAccounts;
  }

  private List<Object> parseXlsx(InputStream inputStream) throws Exception {
    XSSFWorkbook workbook = new XSSFWorkbook(inputStream);
    XSSFSheet sheet = workbook.getSheetAt(0);
    Iterator<Row> rowIterator = sheet.iterator();
    List<Object> accounts = new ArrayList<>();
    rowIterator.next();
    List<String> allowedFields = fieldFactory.getFieldsFor(currentClass);
    List<String> fields = Arrays.stream(currentClass.getDeclaredFields()).map(Field::getName)
        .filter(allowedFields::contains)
        .collect(Collectors.toList());
    while (rowIterator.hasNext()) {
      Row row = rowIterator.next();
      accounts.add(parseAccount(fields, row));
    }
    return accounts;
  }

  private Object parseAccount(List<String> fields, Row row)
      throws NoSuchFieldException, IllegalAccessException {
    Object item = new Object();
    List<String> allowedFields = fieldFactory.getFieldsFor(currentClass);
    for (int i = 0; i < allowedFields.size(); i++) {
      Cell cell = row.getCell(i);
      if (cell.getCellTypeEnum() == CellType._NONE) {
        continue;
      }
      Field declaredField = currentClass.getDeclaredField(fields.get(i));
      Class<?> fieldType = declaredField.getType();
      declaredField.setAccessible(true);

      Object insertObject = getObjectFromCell(cell, declaredField, fieldType);
      declaredField.set(item, insertObject);
    }
    return item;
  }

  private Object getObjectFromCell(Cell cell, Field declaredField, Class<?> fieldType) {
    Object insertObject = null;
    logger.trace("parsing cell at [{}:{}], with type {} for field {}",
        cell.getRowIndex(),
        cell.getColumnIndex(),
        cell.getCellTypeEnum(),
        fieldType.getName()
    );
    if (fieldType == Boolean.class) {
      insertObject = cell.getBooleanCellValue();
    }
    Exportable declaredAnnotation = declaredField.getDeclaredAnnotation(Exportable.class);
    if (declaredField.isAnnotationPresent(Exportable.class)
        && declaredAnnotation.forcedType() != Void.class) {
      if (declaredAnnotation.forcedType() == Boolean.class) {
        try {
          insertObject = Double.valueOf(cell.getNumericCellValue()).intValue();
        } catch (Exception e) {
          insertObject = null;
        }
      }
    } else if (fieldType == Integer.class) {
      insertObject = Double.valueOf(cell.getNumericCellValue()).intValue();
    } else if (fieldType == Double.class) {
      insertObject = (cell.getNumericCellValue());
    } else if (fieldType == Date.class) {
      insertObject = cell.getDateCellValue();
    } else {
      insertObject = cell.getStringCellValue();
    }
    return insertObject;
  }
}
