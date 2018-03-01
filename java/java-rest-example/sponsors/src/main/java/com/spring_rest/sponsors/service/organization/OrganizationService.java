package com.spring_rest.sponsors.service.organization;

import com.spring_rest.sponsors.domain.Organization;

import java.util.List;

public interface OrganizationService {

  List<Organization> findAll();

  Organization findOne(Integer id);
}
