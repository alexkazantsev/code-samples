package com.spring_rest.sponsors.service.export;

import com.spring_rest.sponsors.domain.GuestAccount;
import com.spring_rest.sponsors.domain.MacAddress;
import com.spring_rest.sponsors.utils.converter.BooleanToIntProcessor;
import java.util.Arrays;
import java.util.HashMap;
import java.util.List;
import java.util.Map;

import org.springframework.stereotype.Component;
import org.supercsv.cellprocessor.Optional;
import org.supercsv.cellprocessor.ift.CellProcessor;

@Component
public class CsvFieldFactory {

  private Map<Class, CellProcessor[]> processorMap;
  private Map<Class, List<String>> fieldsMap;

  public CsvFieldFactory() {
    processorMap = new HashMap<>();
    processorMap.put(
        GuestAccount.class,
        new CellProcessor[]{
            new Optional(),
            new Optional(),
            new Optional(),
            new Optional(),
            new Optional(),
            new Optional(),
            new Optional(),
            new BooleanToIntProcessor(),
            new BooleanToIntProcessor()
        }
    );
    processorMap.put(MacAddress.class,
        new CellProcessor[]{
            new Optional(),
            new Optional(),
            new Optional(),
            new Optional(),
            new Optional(),
            new Optional(),
            new BooleanToIntProcessor(),
            new BooleanToIntProcessor()
        });
    fieldsMap = new HashMap<>();
    fieldsMap.put(GuestAccount.class, Arrays
        .asList("username", "password", "firstName", "lastName", "organization", "emailAddress",
            "phoneNumber", "emailNotify", "smsNotify"));
    fieldsMap.put(MacAddress.class, Arrays
        .asList("macaddress", "firstName", "lastName", "organization", "emailAddress",
            "phoneNumber", "emailNotify", "smsNotify"));
  }

  public List<String> getFieldsFor(Class clazz){
    return fieldsMap.get(clazz);
  }

  public CellProcessor[] getProcessorsFor(Class clazz) {
    return processorMap.get(clazz);
  }
}
