package com.spring_rest.sponsors.repository;

import com.spring_rest.sponsors.domain.Organization;
import com.spring_rest.sponsors.repository.queries.OrganizationQueryBuilder;
import java.util.List;

import org.apache.ibatis.annotations.Mapper;
import org.apache.ibatis.annotations.SelectProvider;

@Mapper
public interface OrganizationRepository {

  @SelectProvider(type = OrganizationQueryBuilder.class, method = "findAll")
  List<Organization> findAll();

  @SelectProvider(type = OrganizationQueryBuilder.class, method = "findOne")
  Organization findOne(Integer id);

}
