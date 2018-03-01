package com.spring_rest.sponsors.service.search_filter;

import com.spring_rest.sponsors.enums.MacAddressStatus;
import lombok.Data;
import lombok.EqualsAndHashCode;

import java.util.Date;
import java.util.Map;

@EqualsAndHashCode(callSuper = true)
@SuppressWarnings({"JavaDoc", "SpellCheckingInspection"})
@Data
public class MacAddressSearchFilter extends BaseSearchFilter {

  private String username;
  private String phonenumber;
  private String emailaddress;
  private String orderBy;
  private String sortType = "ASC";
  private Integer renewcount;
  private Date createdon;
  private MacAddressStatus status;

  public MacAddressSearchFilter(Map<String, String> params) {
    super(params);
  }
}
