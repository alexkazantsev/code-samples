package com.spring_rest.sponsors.service.guest_account;

import com.spring_rest.sponsors.enums.GuestStatus;
import io.swagger.annotations.ApiModelProperty;
import lombok.Data;
import org.hibernate.validator.constraints.Email;

import javax.validation.constraints.Min;
import javax.validation.constraints.NotNull;

@Data
public class GuestAccountCreateRequest {

  private String username;
  private String password;
  private Boolean isAutoUsername;
  private Integer isAutoPassword;
  private GuestStatus status;

  @NotNull
  @ApiModelProperty(required = true)
  private String firstName;

  @NotNull
  @ApiModelProperty(required = true)
  private String lastName;

  @Email
  @ApiModelProperty(required = true)
  private String emailAddress;

  @NotNull
  @ApiModelProperty(required = true)
  private String phoneNumber;

  @NotNull
  @ApiModelProperty(required = true)
  private Integer orgId;

  @Min(1)
  @ApiModelProperty(required = true)
  private Integer guestGroupId;

  @Min(1)
  @ApiModelProperty(required = true)
  private Integer accessPolicyId;

  @Min(1)
  @ApiModelProperty(required = true)
  private Integer accountDurationTemplateId;

  @Min(1)
  @ApiModelProperty(required = true)
  private Integer languageTemplateId;


}
