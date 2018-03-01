package com.spring_rest.sponsors.web;

import com.spring_rest.sponsors.domain.LanguageTemplate;
import com.spring_rest.sponsors.service.language_template.LanguageTemplateService;
import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequestMapping(path = "/api/language-template", produces = "application/json")
public class LanguageTemplateController {

  @Autowired
  private LanguageTemplateService languageTemplateService;

  @GetMapping
  public ResponseEntity<List<LanguageTemplate>> fetchAll() {
    return ResponseEntity.ok(languageTemplateService.findAll());
  }
}
