package com.spring_rest.sponsors.repository;


import com.spring_rest.sponsors.domain.dao.GuestAccountDao;
import com.spring_rest.sponsors.repository.queries.GuestAccountQueryBuilder;
import com.spring_rest.sponsors.service.search_filter.GuestAccountSearchFilter;
import java.util.Date;
import java.util.List;

import org.apache.ibatis.annotations.DeleteProvider;
import org.apache.ibatis.annotations.InsertProvider;
import org.apache.ibatis.annotations.Mapper;
import org.apache.ibatis.annotations.Options;
import org.apache.ibatis.annotations.Param;
import org.apache.ibatis.annotations.Select;
import org.apache.ibatis.annotations.SelectProvider;
import org.apache.ibatis.annotations.UpdateProvider;

@SuppressWarnings("JavaDoc")
@Mapper
public interface GuestAccountRepository {

  @SelectProvider(type = GuestAccountQueryBuilder.class, method = "findAllFiltered")
  List<GuestAccountDao> findAllFiltered(GuestAccountSearchFilter filter);

  @SelectProvider(type = GuestAccountQueryBuilder.class, method = "findAll")
  List<GuestAccountDao> findAll();

  @SelectProvider(type = GuestAccountQueryBuilder.class, method = "findOne")
  GuestAccountDao findOne(Integer id);

  @InsertProvider(type = GuestAccountQueryBuilder.class, method = "save")
  @Options(useGeneratedKeys = true, keyColumn = "id", flushCache = Options.FlushCachePolicy.TRUE)
  void save(GuestAccountDao guestAccount);

  @UpdateProvider(type = GuestAccountQueryBuilder.class, method = "update")
  void update(GuestAccountDao guestAccount);

  @Select("SELECT AUTO_INCREMENT\n"
      + "FROM information_schema.tables\n"
      + "WHERE table_name = 'guestaccount'\n"
      + "AND table_schema = DATABASE( );")
  int getNextId();

  @InsertProvider(type = GuestAccountQueryBuilder.class, method = "bulkInsert")
  @Options(useGeneratedKeys = true, keyColumn = "id", keyProperty = "id", flushCache = Options.FlushCachePolicy.TRUE)
  int bulkCreate(@Param("arg0") List<GuestAccountDao> arg0);

  @Deprecated
  @SelectProvider(type = GuestAccountQueryBuilder.class, method = "bulkFindInserted")
  List<GuestAccountDao> bulkFindInserted(Date createdon,String prefix,String suffix);

  @DeleteProvider(type = GuestAccountQueryBuilder.class, method = "delete")
  void delete(int id);

  @SelectProvider(type = GuestAccountQueryBuilder.class, method = "bulkFind")
  List<GuestAccountDao> bulkFind(@Param("arg0") List<Integer> ids);

  /**
   * For some reason without @Param("arg0") mybatis throw an error: `Parameter 'arg0' not found.
   * Available parameters are [ids, param1]`
   */
  @DeleteProvider(type = GuestAccountQueryBuilder.class, method = "bulkDelete")
  void bulkDelete(@Param("arg0") List<Integer> ids);
}
