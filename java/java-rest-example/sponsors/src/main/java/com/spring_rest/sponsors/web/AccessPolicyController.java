package com.spring_rest.sponsors.web;

import com.spring_rest.sponsors.domain.AccessPolicy;
import com.spring_rest.sponsors.service.access_policy.AccessPolicyService;
import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequestMapping(path = "/api/access-policy")
public class AccessPolicyController {

  @Autowired
  private AccessPolicyService policyService;

  @GetMapping
  public ResponseEntity<List<AccessPolicy>> fetchAll() {
    List<AccessPolicy> accessPolicies = policyService
        .findAll();
    return ResponseEntity.ok(accessPolicies);
  }
}
