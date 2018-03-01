package com.spring_rest.sponsors.domain;

import com.spring_rest.sponsors.enums.MacAddressStatus;
import com.spring_rest.sponsors.service.mac_address.MacAddressBulkUpdateRequest;
import com.spring_rest.sponsors.service.mac_address.MacAddressCreateRequest;
import com.spring_rest.sponsors.service.mac_address.MacAddressUpdateRequest;
import com.spring_rest.sponsors.utils.Exportable;
import lombok.Data;
import org.springframework.beans.BeanUtils;

import java.util.Date;

@SuppressWarnings({"SpellCheckingInspection", "unused"})
@Data
public class MacAddress {

  private Integer id;
  private MacAddressStatus status = MacAddressStatus.CREATED;
  @Exportable("MacAddress")
  private String macaddress;
  @Exportable("FirstName")
  private String firstname;
  @Exportable("LastName")
  private String lastname;
  @Exportable("EmailAddress")
  private String emailaddress;
  @Exportable("PhoneNumber")
  private String phonenumber;
  @Exportable("Organization")
  private String organization;
  private String comments;
  private String customfield1;
  private String customfield2;
  private Integer guestgroupid;
  private String guestgroupname;
  private String countrycode;
  private Integer accesspolicyid;
  private String accesspolicyname;
  private Integer languagetemplateid;
  private String languagetemplatename;
  private Integer accountdurationtemplateid;
  private String accountdurationtemplatename;
  private Integer durationtable_id;
  private String createdby;
  private String sponsorgroupname;
  private Integer sponsorgroupid;
  private Date createdon = new Date();
  private Date firstcreatedon;
  private Date expiryon;
  private String createdonvalue;
  private Date firstlogintime;
  private Date updatelogintime;
  private String updatelogintimevalue;
  private Integer sponsoruser_id;
  @Exportable(value = "EmailNotify", forcedType = Boolean.class)
  private Integer emailnotify;
  @Exportable(value = "SmsNotify", forcedType = Boolean.class)
  private Integer smsnotify;
  private Integer orgId;
  private Integer renewcount = 0;
  private String authrealm;

  public MacAddress(MacAddressCreateRequest ga) {
    BeanUtils.copyProperties(ga, this);
  }

  public MacAddress(MacAddressUpdateRequest ga) {
    BeanUtils.copyProperties(ga, this);
  }

  public MacAddress(MacAddressBulkUpdateRequest ga) {
    BeanUtils.copyProperties(ga, this);
  }

  public MacAddress() {
  }

}
