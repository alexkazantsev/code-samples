package com.spring_rest.sponsors.service.GuestGroup;

import com.spring_rest.sponsors.domain.GuestGroup;
import java.util.List;

public interface GuestGroupService {

  List<GuestGroup> findAll();

  GuestGroup findById(Integer id);

  GuestGroup create(GuestGroup guestAccount);

  GuestGroup update(GuestGroup guestAccount, Integer id);

  List<GuestGroup> bulkUpdate(List<GuestGroup> accounts);

  Boolean delete(Integer id);

  void bulkDelete(List<Integer> ids);
}
