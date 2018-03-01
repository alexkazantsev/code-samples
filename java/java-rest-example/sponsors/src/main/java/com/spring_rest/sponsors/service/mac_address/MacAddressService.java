package com.spring_rest.sponsors.service.mac_address;

import com.spring_rest.sponsors.domain.MacAddress;
import com.spring_rest.sponsors.exception.GuestAccountNotFoundException;
import com.spring_rest.sponsors.service.search_filter.MacAddressSearchFilter;

import java.util.List;

public interface MacAddressService {

  List<MacAddress> findAllFiltered(Integer page, Integer size, MacAddressSearchFilter filter);
  List<MacAddress> findAll();

  MacAddress findById(Integer id);

  MacAddress create(MacAddress guestAccount);

  MacAddress update(MacAddress guestAccount, Integer id) throws GuestAccountNotFoundException;

  List<MacAddress> bulkUpdate(List<MacAddress> accounts) throws GuestAccountNotFoundException;;

  List<MacAddress> bulkFind(List<Integer> ids);

  Boolean delete(Integer id);

  void bulkDelete(List<Integer> ids);

}
