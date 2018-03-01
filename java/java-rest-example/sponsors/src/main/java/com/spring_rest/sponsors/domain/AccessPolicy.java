package com.spring_rest.sponsors.domain;

import java.io.Serializable;
import lombok.Data;

@Data
public class AccessPolicy implements Serializable {

  private Integer id;
  private String name;
  private String description;
  private Integer authenticationsettings_id;
  private Integer orgid;

  public AccessPolicy(Integer id, String name, String description,
      Integer authenticationsettings_id, Integer orgid) {
    this.id = id;
    this.name = name;
    this.description = description;
    this.authenticationsettings_id = authenticationsettings_id;
    this.orgid = orgid;
  }

  public AccessPolicy() {
  }
}
