package com.spring_rest.sponsors.domain;

import javax.validation.constraints.NotNull;
import lombok.Data;

@Data
public class GuestGroup {

  private Integer id;

  private String groupName;

  private String groupDescription;

  @NotNull
  private Integer orgid;

}
