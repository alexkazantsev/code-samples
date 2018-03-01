package com.spring_rest.sponsors.security;

import com.fasterxml.jackson.annotation.JsonIgnore;
import org.springframework.security.core.GrantedAuthority;
import org.springframework.security.core.userdetails.UserDetails;

import java.util.Collection;
import java.util.Date;

public class JwtUser implements UserDetails {

  private final Integer id;
  private final String username;
  private final String password;
  private final Collection<? extends GrantedAuthority> authorities;
  private final Date lastPasswordResetDate;
  
  public JwtUser(Integer id, String username, String password,
                 Collection<? extends GrantedAuthority> authorities, Date lastPasswordResetDate) {
    this.id = id;
    this.username = username;
    this.password = password;
    this.authorities = authorities;
    this.lastPasswordResetDate = lastPasswordResetDate;
  }

  @Override
  public Collection<? extends GrantedAuthority> getAuthorities() {
    return authorities;
  }

  @Override
  @JsonIgnore
  public String getPassword() {
    return password;
  }

  @Override
  public String getUsername() {
    return username;
  }

  @Override
  @JsonIgnore
  public boolean isAccountNonExpired() {
    return true;
  }

  @Override
  @JsonIgnore
  public boolean isAccountNonLocked() {
    return true;
  }

  @Override
  @JsonIgnore
  public boolean isCredentialsNonExpired() {
    return true;
  }

  @Override
  public boolean isEnabled() {
    return true;
  }

  @JsonIgnore
  public Integer getId() {
    return id;
  }

  public Date getLastPasswordResetDate() {
    return lastPasswordResetDate;
  }
}
