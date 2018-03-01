package com.spring_rest.sponsors.service.guest_account;

import com.github.pagehelper.Page;
import com.spring_rest.sponsors.domain.GuestAccount;
import lombok.Data;

import java.util.List;

@Data
public class GuestAccountFetchAllResponse {

  private Long total;
  private List<GuestAccount> accounts;

  public GuestAccountFetchAllResponse(List<GuestAccount> accounts) {
    Page guestAccountPage = (Page) accounts;
    this.total = guestAccountPage.getTotal();
    this.accounts = accounts;
  }

  public GuestAccountFetchAllResponse() {
  }
}
