package com.spring_rest.sponsors.repository.queries;

import com.spring_rest.sponsors.domain.MacAddress;
import com.spring_rest.sponsors.service.search_filter.MacAddressSearchFilter;
import org.apache.ibatis.jdbc.SQL;


@SuppressWarnings({"unused", "SpellCheckingInspection"})
public class MacAddressQueryBuilder extends CrudQueryBuilder<MacAddress> {

  private static final String TABLE_NAME = "macaddress";

  public String findAllFiltered(MacAddressSearchFilter filter) {
    return new SQL() {{
      SELECT("*");
      FROM(TABLE_NAME);
      if (filter.getUsername() != null) WHERE("username LIKE CONCAT('%', #{username}, '%')");
      if (filter.getPhonenumber() != null) WHERE("phonenumber LIKE CONCAT('%', #{phonenumber}, '%')");
      if (filter.getEmailaddress() != null) WHERE("emailaddress LIKE CONCAT('%', #{emailaddress}, '%')");
      if (filter.getRenewcount() != null) WHERE("renewcount=#{renewcount}");
      if (filter.getCreatedon() != null) WHERE("createdon <= DATE_ADD(#{createdon}, INTERVAL 1 DAY) AND createdon > #{createdon}");
      if (filter.getStatus() != null) WHERE("status=#{status.id}");
      if (filter.getOrderBy() != null) ORDER_BY(String.format("%s %s", filter.getOrderBy(), filter.getSortType()));
    }}.toString();
  }
  public String findAll(){
    return new SQL(){{
      SELECT("*");
      FROM(TABLE_NAME);
    }}.toString();
  }

  @Override
  public String getTableName() {
    return TABLE_NAME;
  }
}
