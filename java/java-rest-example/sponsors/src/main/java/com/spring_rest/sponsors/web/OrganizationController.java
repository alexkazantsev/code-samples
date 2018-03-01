package com.spring_rest.sponsors.web;

import com.spring_rest.sponsors.domain.Organization;
import com.spring_rest.sponsors.service.organization.OrganizationService;
import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequestMapping(path = "/api/organization", produces = "application/json")
public class OrganizationController {

  @Autowired
  private OrganizationService organizationService;


  @GetMapping
  public ResponseEntity<List<Organization>> fetchAll() {
    List<Organization> pagedOrganizations = organizationService.findAll();
    return ResponseEntity.ok(pagedOrganizations);
  }


}
