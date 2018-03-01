package com.spring_rest.sponsors.security;

public class JwtAuthResponse {
  private String token;

  public JwtAuthResponse(String token) {
    this.token = token;
  }

  public String getToken() {
    return token;
  }

  public void setToken(String token) {
    this.token = token;
  }
}
