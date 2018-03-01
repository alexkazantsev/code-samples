package com.spring_rest.sponsors.exception;

import org.springframework.http.HttpStatus;
import org.springframework.web.bind.annotation.ResponseStatus;

@ResponseStatus(HttpStatus.BAD_REQUEST)
public class ParameterNotFoundException extends RuntimeException {

  public ParameterNotFoundException(String parameter) {
    super("Parameter '" + parameter + "' not found");
  }
}
