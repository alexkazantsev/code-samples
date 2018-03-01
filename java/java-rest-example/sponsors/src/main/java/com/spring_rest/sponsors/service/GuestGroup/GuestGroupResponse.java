package com.spring_rest.sponsors.service.GuestGroup;

import com.spring_rest.sponsors.domain.GuestGroup;
import com.spring_rest.sponsors.service.ItemsResponse;

import java.util.List;

public class GuestGroupResponse extends ItemsResponse<GuestGroup> {

  public GuestGroupResponse(List<GuestGroup> items) {
    super(items);
  }
}
