package com.spring_rest.sponsors.service.account_duration_template;

import com.spring_rest.sponsors.domain.AccountDurationTemplate;
import com.spring_rest.sponsors.repository.AccountDurationTemplateRepository;
import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

@Service
public class AccountDurationTemplateServiceImpl implements AccountDurationTemplateService {

  @Autowired
  private AccountDurationTemplateRepository repository;

  @Override
  public List<AccountDurationTemplate> findAll() {
    return repository.findAll();
  }
}
