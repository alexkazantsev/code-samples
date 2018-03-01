package com.spring_rest.sponsors.service.guest_account;

import com.spring_rest.sponsors.domain.GuestAccount;
import com.spring_rest.sponsors.exception.GuestAccountNotFoundException;
import com.spring_rest.sponsors.service.search_filter.GuestAccountSearchFilter;

import java.util.List;

public interface GuestAccountService {

  List<GuestAccount> findAll(Integer page, Integer size, GuestAccountSearchFilter filter);
  List<GuestAccount> findAll();
  GuestAccount findById(Integer id);

  GuestAccount create(GuestAccount guestAccount);

  GuestAccount update(GuestAccount guestAccount, Integer id) throws GuestAccountNotFoundException;

  List<GuestAccount> bulkUpdate(List<GuestAccount> accounts) throws GuestAccountNotFoundException;;
  List<GuestAccount> bulkFind(List<Integer> ids);
  Boolean delete(Integer id);
  String generateUsername(GuestAccount guestAccount);
  String generatePassword();
  void bulkDelete(List<Integer> ids);

}
