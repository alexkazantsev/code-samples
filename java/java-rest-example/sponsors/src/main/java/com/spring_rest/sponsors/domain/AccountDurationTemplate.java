package com.spring_rest.sponsors.domain;

import lombok.Data;

@Data
public class AccountDurationTemplate {

  private Integer id;
  private String name;
  private String description;
  private Integer type;
  private Integer time;
  private Integer timetype;
  private Integer limittype;
  private Integer orgid;
  private Integer autorenew;
  private Integer autorenewCount;

  public AccountDurationTemplate(Integer id, String name, String description, Integer type,
      Integer time, Integer timetype, Integer limittype, Integer orgid, Integer autorenew,
      Integer autorenewCount) {
    this.id = id;
    this.name = name;
    this.description = description;
    this.type = type;
    this.time = time;
    this.timetype = timetype;
    this.limittype = limittype;
    this.orgid = orgid;
    this.autorenew = autorenew;
    this.autorenewCount = autorenewCount;
  }

  public AccountDurationTemplate() {
  }
}
