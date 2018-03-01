package com.spring_rest.sponsors.domain;

import lombok.Data;

import java.io.Serializable;
import java.util.Collections;
import java.util.List;

@Data
@SuppressWarnings("FieldCanBeLocal")
public class Organization implements Serializable {

  private Integer id;
  private String name;
  private String domainName;
  private String uuid;
  private String logo;
  private Boolean allowUUIDsearch = true;
  private Boolean allowDomainSearch = true;
  private String spEntityId;
  private Boolean enableEnvoy = false;
  private String envoyApiKey;
  private Integer macdelimiter = 0;
  private Boolean onlyoneuserperdevice = false;
  private Integer maxconcurrentusersession = 0;
  private Boolean allowadminguestaccess = true;
  private List<SponsorUser> sponsorUsers = Collections.emptyList();
  private List<GuestAccount> guestAccounts = Collections.emptyList();

  public Organization(String name, String domainName, String uuid, String logo,
                      Boolean allowUUIDsearch, Boolean allowDomainSearch, String spEntityId,
                      Boolean enableEnvoy, String envoyApiKey, Integer macdelimiter,
                      Boolean onlyoneuserperdevice, Integer maxconcurrentusersession, Boolean allowadminguestaccess,
                      List<SponsorUser> sponsorUsers, List<GuestAccount> guestAccounts) {
    this.name = name;
    this.domainName = domainName;
    this.uuid = uuid;
    this.logo = logo;
    this.allowUUIDsearch = allowUUIDsearch;
    this.allowDomainSearch = allowDomainSearch;
    this.spEntityId = spEntityId;
    this.enableEnvoy = enableEnvoy;
    this.envoyApiKey = envoyApiKey;
    this.macdelimiter = macdelimiter;
    this.onlyoneuserperdevice = onlyoneuserperdevice;
    this.maxconcurrentusersession = maxconcurrentusersession;
    this.allowadminguestaccess = allowadminguestaccess;
    this.sponsorUsers = sponsorUsers;
    this.guestAccounts = guestAccounts;
  }

  public Organization() {
  }
}
