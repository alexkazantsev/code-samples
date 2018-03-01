package com.spring_rest.sponsors.exception;

import org.springframework.http.HttpStatus;
import org.springframework.web.bind.annotation.ResponseStatus;

@ResponseStatus(value = HttpStatus.BAD_REQUEST)
public class QueryParamsParseException extends RuntimeException {
  public QueryParamsParseException(String params) {
    super(String.format("Can't parse params: %s", params));
  }
}
