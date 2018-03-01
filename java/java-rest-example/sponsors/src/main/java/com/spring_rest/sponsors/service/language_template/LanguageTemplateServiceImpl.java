package com.spring_rest.sponsors.service.language_template;

import com.spring_rest.sponsors.domain.LanguageTemplate;
import com.spring_rest.sponsors.repository.LanguageTemplateRepository;
import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

@Service
public class LanguageTemplateServiceImpl implements LanguageTemplateService {

  @Autowired
  LanguageTemplateRepository repository;

  @Override
  public List<LanguageTemplate> findAll() {
    return repository.findAll();
  }
}
