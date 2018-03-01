package com.spring_rest.sponsors.service.mac_address;

import lombok.Data;
import lombok.EqualsAndHashCode;

@EqualsAndHashCode(callSuper = true)
@Data
public class MacAddressUpdateRequest extends MacAddressCreateRequest {
  private Integer id;
}
