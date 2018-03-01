package com.spring_rest.sponsors.exception;

import org.springframework.http.HttpStatus;
import org.springframework.web.bind.annotation.ResponseStatus;

@ResponseStatus(value = HttpStatus.BAD_REQUEST)
public class ItemAlreadyExistException extends RuntimeException {

  public ItemAlreadyExistException() {
    super("Item already exist");
  }

}
