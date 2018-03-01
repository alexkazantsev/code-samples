package com.spring_rest.sponsors.enums;

@SuppressWarnings({"UnnecessaryEnumModifier", "unused", "FieldCanBeLocal"})
public enum MacAddressStatus {
  CREATED(0),
  ACTIVE(1),
  EXPIRED(2),
  INACTIVE(3);

  private Integer id;

  private MacAddressStatus(final Integer id) {
    this.id = id;
  }

  public static MacAddressStatus of(Integer code){
    return MacAddressStatus.values()[code];
  }
}
