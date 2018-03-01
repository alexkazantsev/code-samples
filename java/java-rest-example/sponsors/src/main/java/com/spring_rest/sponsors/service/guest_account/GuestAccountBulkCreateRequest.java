package com.spring_rest.sponsors.service.guest_account;

import javax.validation.constraints.Max;
import javax.validation.constraints.NotNull;
import lombok.Data;

@Data
public class GuestAccountBulkCreateRequest {

  @NotNull
  @Max(1000)
  private Integer batchSize;
  @NotNull
  private String prefix;
  @NotNull
  private String suffix;
  @NotNull
  private Integer guestGroupId;
  @NotNull
  private Integer accessPolicyId;
  @NotNull
  private Integer languageTemplateId;
  @NotNull
  private Integer accountDurationTemplateId;

}
