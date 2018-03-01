package com.spring_rest.sponsors.domain.dao;

import com.spring_rest.sponsors.domain.GuestAccount;
import com.spring_rest.sponsors.enums.GuestStatus;
import java.util.Date;

import lombok.Data;

@Data
@SuppressWarnings({"FieldCanBeLocal", "SpellCheckingInspection"})
public class GuestAccountDao {

  private Integer id;
  private String username;
  private GuestStatus status = GuestStatus.CREATED;
  private String firstname;
  private String lastname;
  private String emailaddress;
  private String sponsoremailaddress;
  private Boolean isprogramuser = false;
  private String phonenumber;
  private String passcode;
  private String isautousername;
  private String password;
  private String organization;
  private Integer orgId;
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
  private Integer sponsorgroupid;
  private String sponsorgroupname;
  private Date createdon;
  private Date firstcreatedon;
  private Date expiryon;
  private String createdonvalue;
  private Date firstlogintime;
  private Date updatelogintime;
  private String updatelogintimevalue;
  private Integer isautopasscode;
  private Integer isautopassword;
  private Integer emailnotify;
  private Integer sponsoremailnotify;
  private Integer smsnotify;
  private Integer renewcount;
  private Boolean isbulk;
  private String authrealm;
  private Integer isfirsttimepasswordchanged;

  public GuestAccount dto(){
    GuestAccount account = new GuestAccount();
    account.setId(id);
    account.setUsername(username);
    account.setStatus(status);
    account.setFirstName(firstname);
    account.setLastName(lastname);
    account.setEmailAddress(emailaddress);
    account.setSponsorEmailAddress(sponsoremailaddress);
    account.setIsProgramUser(isprogramuser);
    account.setPhoneNumber(phonenumber);
    account.setPasscode(passcode);
    if(isautousername != null){
      account.setIsAutoUsername(isautousername.equals("1"));
    }
    account.setPasscode(password);
    account.setOrganization(organization);
    account.setOrgId(orgId);
    account.setComments(comments);
    account.setCustomField1(customfield1);
    account.setCustomField2(customfield2);
    account.setGuestGroupId(guestgroupid);
    account.setGuestGroupName(guestgroupname);
    account.setCountryCode(countrycode);
    account.setAccessPolicyId(accesspolicyid);
    account.setAccessPolicyName(accesspolicyname);
    account.setLanguageTemplateId(languagetemplateid);
    account.setLanguageTemplateName(languagetemplatename);
    account.setDurationTableId(durationtable_id);
    account.setCreatedBy(createdby);
    account.setSponsorGroupId(sponsorgroupid);
    account.setSponsorGroupName(sponsoremailaddress);
    account.setCreatedOn(createdon);
    account.setFirstCreatedOn(firstcreatedon);
    account.setExpiryOn(expiryon);
    account.setCreatedOnValue(createdonvalue);
    account.setFirstLoginTime(firstlogintime);
    account.setUpdateLoginTime(updatelogintime);
    account.setUpdateLoginTimeValue(updatelogintimevalue);
    if(isautopasscode != null){
      account.setIsAutoPasscode(isautopasscode == 1);
    }
    if(isautopassword != null){
      account.setIsAutoPassword(isautopassword == 1);
    }
    if(emailnotify != null) {
      account.setEmailNotify(emailnotify == 1);
    }
    if(sponsoremailnotify != null) {
      account.setSponsorEmailNotify(sponsoremailnotify == 1);
    }
    if( smsnotify != null) {
      account.setSmsNotify(smsnotify == 1);
    }
    account.setRenewCount(renewcount);
    account.setIsBulk(isbulk);
    account.setAuthRealm(authrealm);
    if(isfirsttimepasswordchanged != null) {
      account.setIsFirstTimePasswordChanged(isfirsttimepasswordchanged == 1);
    }
    return account;
  }

  public GuestAccountDao() {
  }
}