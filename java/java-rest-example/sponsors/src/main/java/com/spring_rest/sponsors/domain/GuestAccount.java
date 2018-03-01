package com.spring_rest.sponsors.domain;

import com.spring_rest.sponsors.domain.dao.GuestAccountDao;
import com.spring_rest.sponsors.enums.GuestStatus;
import com.spring_rest.sponsors.service.guest_account.GuestAccountBulkUpdateRequest;
import com.spring_rest.sponsors.service.guest_account.GuestAccountCreateRequest;
import com.spring_rest.sponsors.service.guest_account.GuestAccountUpdateRequest;
import com.spring_rest.sponsors.utils.Exportable;
import java.util.Date;

import lombok.Data;
import org.springframework.beans.BeanUtils;

@Data
@SuppressWarnings({"FieldCanBeLocal", "SpellCheckingInspection"})
public class GuestAccount {

  private Integer id;
  @Exportable("Username")
  private String username;
  private GuestStatus status = GuestStatus.CREATED;
  @Exportable("FirstName")
  private String firstName;
  @Exportable("LastName")
  private String lastName;
  @Exportable("Email")
  private String emailAddress;
  private String sponsorEmailAddress;
  private Boolean isProgramUser = false;
  @Exportable("PhoneNumber")
  private String phoneNumber;
  private String passcode;
  private Boolean isAutoUsername = false;
  @Exportable("Password")
  private String password;
  @Exportable("Organization")
  private String organization;
  private Integer orgId;
  private String comments;
  private String customField1;
  private String customField2;
  private Integer guestGroupId;
  private String guestGroupName;
  private String countryCode;
  private Integer accessPolicyId;
  private String accessPolicyName;
  private Integer languageTemplateId;
  private String languageTemplateName;
  private Integer accountDurationTemplateId;
  private String accountDurationTemplateName;
  private Integer durationTableId;
  private String createdBy;
  private Integer sponsorGroupId;
  private String sponsorGroupName;
  private Date createdOn = new Date();
  private Date firstCreatedOn;
  private Date expiryOn;
  private String createdOnValue;
  private Date firstLoginTime;
  private Date updateLoginTime;
  private String updateLoginTimeValue;
  private Boolean isAutoPasscode = false;
  private Boolean isAutoPassword = false;
  @Exportable(value = "EmailNotify", forcedType = Boolean.class)
  private Boolean emailNotify;
  private Boolean sponsorEmailNotify;
  @Exportable(value = "SmsNotify", forcedType = Boolean.class)
  private Boolean smsNotify;
  private Integer renewCount = 0;
  private Boolean isBulk = false;
  private String authRealm;
  private Boolean isFirstTimePasswordChanged = false;

  public GuestAccount(GuestAccountCreateRequest ga) {
    BeanUtils.copyProperties(ga, this);
  }

  public GuestAccount(GuestAccountUpdateRequest ga) {
    BeanUtils.copyProperties(ga, this);
  }

  public GuestAccount(GuestAccountBulkUpdateRequest ga) {
    BeanUtils.copyProperties(ga, this);
  }

  public GuestAccount() {
  }

  public GuestAccountDao dao(){
    GuestAccountDao accountDao = new GuestAccountDao();
    accountDao.setId(id);
    accountDao.setUsername(username);
    accountDao.setStatus(status);
    accountDao.setFirstname(firstName);
    accountDao.setLastname(lastName);
    accountDao.setEmailaddress(emailAddress);
    accountDao.setSponsoremailaddress(sponsorEmailAddress);
    accountDao.setIsprogramuser(isProgramUser);
    accountDao.setPhonenumber(phoneNumber);
    accountDao.setPasscode(passcode);
    if(isAutoUsername != null){
      accountDao.setIsautousername(isAutoUsername?"1":"0");
    }
    accountDao.setPassword(passcode);
    accountDao.setOrganization(organization);
    accountDao.setOrgId(orgId);
    accountDao.setComments(comments);
    accountDao.setCustomfield1(customField1);
    accountDao.setCustomfield2(customField2);
    accountDao.setGuestgroupid(guestGroupId);
    accountDao.setGuestgroupname(guestGroupName);
    accountDao.setCountrycode(countryCode);
    accountDao.setAccesspolicyid(accessPolicyId);
    accountDao.setAccesspolicyname(accessPolicyName);
    accountDao.setLanguagetemplateid(languageTemplateId);
    accountDao.setLanguagetemplatename(languageTemplateName);
    accountDao.setDurationtable_id(durationTableId);
    accountDao.setCreatedby(createdBy);
    accountDao.setSponsorgroupid(sponsorGroupId);
    accountDao.setSponsoremailaddress(sponsorGroupName);
    accountDao.setCreatedon(createdOn);
    accountDao.setFirstcreatedon(firstCreatedOn);
    accountDao.setExpiryon(expiryOn);
    accountDao.setCreatedonvalue(createdOnValue);
    accountDao.setFirstlogintime(firstLoginTime);
    accountDao.setUpdatelogintime(updateLoginTime);
    accountDao.setUpdatelogintimevalue(updateLoginTimeValue);
    if(isAutoPasscode != null){
      accountDao.setIsautousername(isAutoPasscode?"1":"0");
    }
    if(isAutoPassword != null){
      accountDao.setIsautopassword(isAutoPassword?1:0);
    }
    if(emailNotify != null) {
      accountDao.setEmailnotify(emailNotify?1:0);
    }
    if(sponsorEmailNotify != null) {
      accountDao.setSponsoremailnotify(sponsorEmailNotify?1:0);
    }
    if( smsNotify != null) {
      accountDao.setSmsnotify(smsNotify?1:0);
    }
    accountDao.setRenewcount(renewCount);
    accountDao.setIsbulk(isBulk);
    accountDao.setAuthrealm(authRealm);
    if(isFirstTimePasswordChanged != null) {
      accountDao.setIsfirsttimepasswordchanged(isFirstTimePasswordChanged?1:0);
    }
    return accountDao;
  }
}
