package com.spring_rest.sponsors.web;

import com.spring_rest.sponsors.domain.AccountDurationTemplate;
import com.spring_rest.sponsors.service.account_duration_template.AccountDurationTemplateService;
import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@SuppressWarnings("unused")
@RestController
@RequestMapping(path = "/api/account-duration-template", produces = "application/json")
public class AccountDurationTemplateController {

  @Autowired
  private AccountDurationTemplateService accountDurationTemplateService;

  @GetMapping
  public ResponseEntity<List<AccountDurationTemplate>> fetchAll() {
    return ResponseEntity.ok(accountDurationTemplateService.findAll());
  }
}
