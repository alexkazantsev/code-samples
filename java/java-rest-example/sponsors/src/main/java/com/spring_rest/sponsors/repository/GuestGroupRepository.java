package com.spring_rest.sponsors.repository;

import com.spring_rest.sponsors.domain.GuestGroup;
import com.spring_rest.sponsors.repository.queries.GuestGroupQueryBuilder;
import java.util.List;

import org.apache.ibatis.annotations.DeleteProvider;
import org.apache.ibatis.annotations.InsertProvider;
import org.apache.ibatis.annotations.Mapper;
import org.apache.ibatis.annotations.Options;
import org.apache.ibatis.annotations.Options.FlushCachePolicy;
import org.apache.ibatis.annotations.Param;
import org.apache.ibatis.annotations.SelectProvider;

@Mapper
public interface GuestGroupRepository {

  @SelectProvider(type = GuestGroupQueryBuilder.class, method = "findAll")
  List<GuestGroup> findAll();

  @SelectProvider(type = GuestGroupQueryBuilder.class, method = "findOne")
  GuestGroup findOne(Integer id);

  @InsertProvider(type = GuestGroupQueryBuilder.class, method = "save")
  @Options(useGeneratedKeys = true, keyColumn = "id", flushCache = FlushCachePolicy.TRUE)
  void save(GuestGroup guestGroup);

  @InsertProvider(type = GuestGroupQueryBuilder.class, method = "update")
  void update(GuestGroup guestGroup);

  @DeleteProvider(type = GuestGroupQueryBuilder.class, method = "delete")
  void delete(Integer id);

  @DeleteProvider(type = GuestGroupQueryBuilder.class, method = "bulkDelete")
  void bulkDelete(@Param("arg0") List<Integer> ids);
}
