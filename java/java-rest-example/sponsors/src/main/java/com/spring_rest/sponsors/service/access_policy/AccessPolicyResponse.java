package com.spring_rest.sponsors.service.access_policy;

import com.spring_rest.sponsors.domain.AccessPolicy;
import com.spring_rest.sponsors.service.ItemsResponse;

import java.util.List;

public class AccessPolicyResponse extends ItemsResponse<AccessPolicy> {

  public AccessPolicyResponse(List<AccessPolicy> items) {
    super(items);
  }
}
