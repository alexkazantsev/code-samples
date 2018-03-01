package com.spring_rest.sponsors.enums;

@SuppressWarnings({"UnnecessaryEnumModifier", "unused", "FieldCanBeLocal"})
public enum GuestStatus {
  CREATED(0),
  ACTIVE(1),
  EXPIRED(2),
  INACTIVE(3);

  private Integer id;

  private GuestStatus(final Integer id) {
    this.id = id;
  }

  public static GuestStatus of(Integer code){
    return GuestStatus.values()[code];
  }
}
