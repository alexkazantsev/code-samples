package com.spring_rest.sponsors.service.mac_address;

import io.swagger.annotations.ApiModelProperty;
import lombok.Data;
import org.hibernate.validator.constraints.Email;

import javax.validation.constraints.NotNull;

@SuppressWarnings("SpellCheckingInspection")
@Data
public class MacAddressCreateRequest {

  @NotNull
  @ApiModelProperty(required = true)
  private String macaddress;

  @NotNull
  @ApiModelProperty(required = true)
  private String firstname;

  @NotNull
  @ApiModelProperty(required = true)
  private String lastname;

  @Email
  @ApiModelProperty(required = true)
  private String emailaddress;

  @NotNull
  @ApiModelProperty(required = true)
  private String phonenumber;

  @NotNull
  @ApiModelProperty(required = true)
  private Integer orgId;

  private Integer smsnotify;

}
