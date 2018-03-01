package com.spring_rest.sponsors.security;

import javax.validation.constraints.NotNull;
import java.io.Serializable;

public class JwtAuthRequest implements Serializable {

  @NotNull
  public String username;

  @NotNull
  public String password;

  public JwtAuthRequest(String username, String password) {
    this.username = username;
    this.password = password;
  }

  public JwtAuthRequest() {}

}
