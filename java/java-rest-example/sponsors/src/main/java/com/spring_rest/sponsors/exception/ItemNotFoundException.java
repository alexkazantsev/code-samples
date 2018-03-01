package com.spring_rest.sponsors.exception;

import org.springframework.http.HttpStatus;
import org.springframework.web.bind.annotation.ResponseStatus;

@ResponseStatus(value = HttpStatus.NOT_FOUND)
public class ItemNotFoundException extends RuntimeException {

  public ItemNotFoundException(Integer id) {
    super("Item with id: " + id + " was not found");

  }
}
