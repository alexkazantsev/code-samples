package com.spring_rest.sponsors.service.search_filter;

import com.spring_rest.sponsors.enums.GuestStatus;
import lombok.Data;
import lombok.EqualsAndHashCode;

import java.util.Date;
import java.util.Map;

@EqualsAndHashCode(callSuper = true)
@SuppressWarnings({"JavaDoc", "SpellCheckingInspection"})
@Data
public class GuestAccountSearchFilter extends BaseSearchFilter {

  private String username;
  private String firstname;
  private String lastname;
  private String phonenumber;
  private String emailaddress;
  private String organization;
  private String orderBy;
  private String sortType = "ASC";
  private Integer accesspolicyid;
  private Integer accountdurationtemplateid;
  private Integer guestgroupid;
  private Integer languagetemplateid;
  private Integer renewcount;
  private Date createdon;
  private GuestStatus status;

  public GuestAccountSearchFilter(Map<String, String> params) {
    super(params);
  }
}
