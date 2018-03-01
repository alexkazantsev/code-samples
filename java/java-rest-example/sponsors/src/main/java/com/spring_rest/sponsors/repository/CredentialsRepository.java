package com.spring_rest.sponsors.repository;

import com.spring_rest.sponsors.domain.Credentials;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;

public interface CredentialsRepository extends JpaRepository<Credentials, Integer> {

  Credentials findByUserName(String username);
  List<Credentials> findAll();

}
