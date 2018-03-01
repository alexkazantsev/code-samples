package com.spring_rest.sponsors.domain;

import lombok.Data;

import java.io.Serializable;
import java.util.List;

@Data
@SuppressWarnings("FieldCanBeLocal")
public class SponsorUser implements Serializable {

  private Integer id;
  private String username;
  private String userfulldn;
  private Integer guestcount;
  private String locale;
  private String email;
  private String name;
  private Organization organization;
  private List<GuestAccount> guestAccounts;

  public SponsorUser(String username, String userfulldn, Integer guestcount, String locale, String email,
                     String name, Organization organization) {
    this.username = username;
    this.userfulldn = userfulldn;
    this.guestcount = guestcount;
    this.locale = locale;
    this.email = email;
    this.name = name;
    this.organization = organization;
  }

  public SponsorUser() {
  }

}
