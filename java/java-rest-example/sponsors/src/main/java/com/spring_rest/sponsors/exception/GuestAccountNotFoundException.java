package com.spring_rest.sponsors.exception;

import org.springframework.http.HttpStatus;
import org.springframework.web.bind.annotation.ResponseStatus;

@ResponseStatus(value = HttpStatus.NOT_FOUND)
public class GuestAccountNotFoundException extends RuntimeException {
  public GuestAccountNotFoundException(Integer id) {
    super("Guest account with id: " + id + " was not found");
  }
}
