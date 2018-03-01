package com.spring_rest.sponsors.security;

import com.spring_rest.sponsors.domain.Authority;
import com.spring_rest.sponsors.domain.Credentials;
import org.springframework.security.core.GrantedAuthority;
import org.springframework.security.core.authority.SimpleGrantedAuthority;

import java.util.List;
import java.util.stream.Collectors;

public final class JwtUserFactory {

  public static JwtUser create(Credentials credentials) {
    return new JwtUser(
        credentials.getId(),
        credentials.getUserName(),
        credentials.getPassword(),
        mapToGrantedAuthority(credentials.getAuthorities()),
        credentials.getLastPasswordResetDate());
  }

  private static List<GrantedAuthority> mapToGrantedAuthority(List<Authority> authorities) {
    return authorities.stream()
        .map(authority -> new SimpleGrantedAuthority(authority.getName().name()))
        .collect(Collectors.toList());
  }

}
