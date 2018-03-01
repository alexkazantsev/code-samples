package com.spring_rest.sponsors.exception;

import org.springframework.http.HttpStatus;
import org.springframework.web.bind.annotation.ResponseStatus;

@ResponseStatus(value = HttpStatus.BAD_REQUEST)
public class IdsNotEqualsException extends RuntimeException {

  public IdsNotEqualsException(Integer itemId, Integer id) {
    super(String.format("Ids %s and %s should be equals", itemId, id));

  }
}
