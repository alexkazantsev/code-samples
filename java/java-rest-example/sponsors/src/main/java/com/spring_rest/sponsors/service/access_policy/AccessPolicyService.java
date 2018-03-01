package com.spring_rest.sponsors.service.access_policy;

import com.spring_rest.sponsors.domain.AccessPolicy;

import java.util.List;

public interface AccessPolicyService {

  List<AccessPolicy> findAll();

}
