package com.spring_rest.sponsors.service.organization;

import com.spring_rest.sponsors.domain.Organization;
import com.spring_rest.sponsors.exception.ItemNotFoundException;
import com.spring_rest.sponsors.repository.OrganizationRepository;
import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

@Service
@Transactional
public class OrganizationServiceImpl implements OrganizationService {

  @Autowired
  OrganizationRepository organizationRepository;

  @Override
  public List<Organization> findAll() {
    return organizationRepository.findAll();
  }

  @Override
  public Organization findOne(Integer id) {
    Organization organization = organizationRepository.findOne(id);
    if (organization == null) {
      throw new ItemNotFoundException(id);
    }
    return organization;
  }
}
