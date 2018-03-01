package com.spring_rest.sponsors.service.access_policy;

import com.spring_rest.sponsors.domain.AccessPolicy;
import com.spring_rest.sponsors.repository.AccessPolicyRepository;
import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

@Service
public class AccessPolicyServiceImpl implements AccessPolicyService {

  @SuppressWarnings("SpringJavaAutowiringInspection")
  @Autowired
  AccessPolicyRepository policyRepository;

  @Override
  public List<AccessPolicy> findAll() {
    return policyRepository.findAll();
  }
}
