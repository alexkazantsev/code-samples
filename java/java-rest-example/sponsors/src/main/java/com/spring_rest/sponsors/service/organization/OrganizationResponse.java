package com.spring_rest.sponsors.service.organization;

import com.spring_rest.sponsors.domain.Organization;
import com.spring_rest.sponsors.service.ItemsResponse;

import java.util.List;

public class OrganizationResponse extends ItemsResponse<Organization> {

  public OrganizationResponse(List<Organization> items) {
    super(items);
  }
}
