package com.spring_rest.sponsors.security;

import com.spring_rest.sponsors.domain.Credentials;
import com.spring_rest.sponsors.exception.UserNotFoundException;
import com.spring_rest.sponsors.repository.CredentialsRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.core.userdetails.UserDetailsService;
import org.springframework.security.core.userdetails.UsernameNotFoundException;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class JwtUserDetailsService implements UserDetailsService {

  @Autowired
  private CredentialsRepository credentials;

  @Override
  public UserDetails loadUserByUsername(String username) throws UsernameNotFoundException {
    Credentials credentials = this.credentials.findByUserName(username);

    List<Credentials> credentialsList = this.credentials.findAll();

    if (credentials == null) {
      throw new UserNotFoundException(username);
    }

    return JwtUserFactory.create(credentials);
  }
}
