package com.spring_rest.sponsors.repository;

import com.spring_rest.sponsors.domain.MacAddress;
import com.spring_rest.sponsors.repository.queries.MacAddressQueryBuilder;
import com.spring_rest.sponsors.service.search_filter.MacAddressSearchFilter;
import java.util.List;

import org.apache.ibatis.annotations.DeleteProvider;
import org.apache.ibatis.annotations.InsertProvider;
import org.apache.ibatis.annotations.Mapper;
import org.apache.ibatis.annotations.Options;
import org.apache.ibatis.annotations.Param;
import org.apache.ibatis.annotations.SelectProvider;
import org.apache.ibatis.annotations.UpdateProvider;

@SuppressWarnings("JavaDoc")
@Mapper
public interface MacAddressRepository {

  @SelectProvider(type = MacAddressQueryBuilder.class, method = "findAllFiltered")
  List<MacAddress> findAllFiltered(MacAddressSearchFilter filter);

  @SelectProvider(type = MacAddressQueryBuilder.class, method = "findAll")
  List<MacAddress> findAll();

  @SelectProvider(type = MacAddressQueryBuilder.class, method = "findOne")
  MacAddress findOne(Integer id);

  @InsertProvider(type = MacAddressQueryBuilder.class, method = "save")
  @Options(useGeneratedKeys = true, keyColumn = "id", flushCache = Options.FlushCachePolicy.TRUE)
  void save(MacAddress macAddress);

  @UpdateProvider(type = MacAddressQueryBuilder.class, method = "update")
  void update(MacAddress macAddress);

  @DeleteProvider(type = MacAddressQueryBuilder.class, method = "delete")
  void delete(int id);

  @SelectProvider(type = MacAddressQueryBuilder.class, method = "bulkFind")
  List<MacAddress> bulkFind(@Param("arg0") List<Integer> ids);

  /**
   * For some reason without @Param("arg0") mybatis throw an error:
   * `Parameter 'arg0' not found. Available parameters are [ids, param1]`
   * @param ids
   */
  @DeleteProvider(type = MacAddressQueryBuilder.class, method = "bulkDelete")
  void bulkDelete(@Param("arg0") List<Integer> ids);
}
