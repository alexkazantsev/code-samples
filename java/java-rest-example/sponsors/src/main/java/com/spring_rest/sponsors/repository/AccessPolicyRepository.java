package com.spring_rest.sponsors.repository;

import com.spring_rest.sponsors.domain.AccessPolicy;
import com.spring_rest.sponsors.repository.queries.AccessPolicyQueryBuilder;
import java.util.List;

import org.apache.ibatis.annotations.Mapper;
import org.apache.ibatis.annotations.SelectProvider;

@Mapper
public interface AccessPolicyRepository {

  @SelectProvider(type = AccessPolicyQueryBuilder.class, method = "findAll")
  List<AccessPolicy> findAll();
}
