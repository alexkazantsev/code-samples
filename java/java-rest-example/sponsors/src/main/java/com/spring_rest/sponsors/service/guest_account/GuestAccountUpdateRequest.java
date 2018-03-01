package com.spring_rest.sponsors.service.guest_account;

import lombok.Data;
import lombok.EqualsAndHashCode;

@EqualsAndHashCode(callSuper = true)
@Data
public class GuestAccountUpdateRequest extends GuestAccountCreateRequest {
  private Integer id;
}
