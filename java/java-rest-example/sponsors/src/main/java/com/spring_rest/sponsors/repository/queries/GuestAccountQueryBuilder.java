package com.spring_rest.sponsors.repository.queries;

import com.spring_rest.sponsors.domain.dao.GuestAccountDao;
import com.spring_rest.sponsors.service.search_filter.GuestAccountSearchFilter;
import java.util.Date;
import java.util.List;

import org.apache.ibatis.jdbc.SQL;


@SuppressWarnings({"unused", "SpellCheckingInspection"})
public class GuestAccountQueryBuilder extends CrudQueryBuilder<GuestAccountDao> {

  private static final String TABLE_NAME = "guestaccount";

  public String findAllFiltered(GuestAccountSearchFilter filter) {
    return new SQL() {{
      SELECT("*");
      FROM(TABLE_NAME);
      if (filter.getUsername() != null) WHERE("username LIKE CONCAT('%', #{username}, '%')");
      if (filter.getFirstname() != null) WHERE("firstname LIKE CONCAT('%', #{firstname}, '%')");
      if (filter.getLastname() != null) WHERE("lastname LIKE CONCAT('%', #{lastname}, '%')");
      if (filter.getPhonenumber() != null) WHERE("phonenumber LIKE CONCAT('%', #{phonenumber}, '%')");
      if (filter.getEmailaddress() != null) WHERE("emailaddress LIKE CONCAT('%', #{emailaddress}, '%')");
      if (filter.getOrganization() != null) WHERE("organization LIKE CONCAT('%', #{organization}, '%')");
      if (filter.getAccesspolicyid() != null) WHERE("accesspolicyid=#{accesspolicyid}");
      if (filter.getAccountdurationtemplateid() != null) WHERE("accountdurationtemplateid=#{accountdurationtemplateid}");
      if (filter.getGuestgroupid() != null) WHERE("guestgroupid=#{guestgroupid}");
      if (filter.getLanguagetemplateid() != null) WHERE("languagetemplateid=#{languagetemplateid}");
      if (filter.getRenewcount() != null) WHERE("renewcount=#{renewcount}");
      if (filter.getCreatedon() != null) WHERE("createdon <= DATE_ADD(#{createdon}, INTERVAL 1 DAY) AND createdon > #{createdon}");
      if (filter.getStatus() != null) WHERE("status=#{status.id}");
      if (filter.getOrderBy() != null) ORDER_BY(String.format("%s %s", filter.getOrderBy(), filter.getSortType()));
    }}.toString();
  }

  @Deprecated
  public String bulkFindInserted(Date createdon, String prefix, String suffix) {
    return new SQL() {{
      SELECT("*");
      FROM(TABLE_NAME);
      WHERE("createdon = #{arg0,jdbcType=TIMESTAMP}").AND()
      .WHERE("isbulk = 1").AND()
      .WHERE("username LIKE '%' || #{arg1} || '%' || #{arg2} || '%'");
    }}.toString();
  }

  public String bulkInsert(List<GuestAccountDao> accounts) {
    String sql =
        "INSERT INTO sponsors.guestaccount" +
            "(username, guestgroupid, accesspolicyid, languagetemplateid, accountdurationtemplateid, createdon, firstcreatedon, isbulk)"
            +
            "VALUES";
    for (int i = 0; i < accounts.size(); i++) {
      sql += "(" +
          "#{arg0[" + i + "].username,jdbcType=VARCHAR}," +
          "#{arg0[" + i + "].guestgroupid,jdbcType=INTEGER}," +
          "#{arg0[" + i + "].accesspolicyid,jdbcType=INTEGER}," +
          "#{arg0[" + i + "].languagetemplateid,jdbcType=INTEGER}," +
          "#{arg0[" + i + "].accountdurationtemplateid,jdbcType=INTEGER}," +
          "#{arg0[" + i + "].createdon,jdbcType=TIMESTAMP}," +
          "#{arg0[" + i + "].createdon,jdbcType=TIMESTAMP}," +
          "1" +
          ")";
      if (i != accounts.size() - 1) {
        sql += ",";
      }
    }
    sql += ";";
    return sql;
  }

  @Override
  public String getTableName() {
    return TABLE_NAME;
  }
}
