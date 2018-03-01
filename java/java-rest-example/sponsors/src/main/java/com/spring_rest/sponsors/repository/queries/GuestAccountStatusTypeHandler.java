package com.spring_rest.sponsors.repository.queries;

import com.spring_rest.sponsors.enums.GuestStatus;
import org.apache.ibatis.type.EnumTypeHandler;
import org.apache.ibatis.type.JdbcType;
import org.apache.ibatis.type.MappedTypes;

import java.sql.CallableStatement;
import java.sql.PreparedStatement;
import java.sql.ResultSet;
import java.sql.SQLException;


@SuppressWarnings("unused")
@MappedTypes(value = GuestStatus.class)
public class GuestAccountStatusTypeHandler extends EnumTypeHandler<GuestStatus> {

  public GuestAccountStatusTypeHandler(Class<GuestStatus> type) {
    super(type);
  }

  @Override
  public void setNonNullParameter(PreparedStatement ps, int i, GuestStatus parameter, JdbcType jdbcType) throws SQLException {
    ps.setInt(i, parameter.ordinal());
  }

  @Override
  public GuestStatus getNullableResult(ResultSet rs, String columnName) throws SQLException {
    Integer code = rs.getInt(columnName);
    return GuestStatus.of(code);
  }

  @Override
  public GuestStatus getNullableResult(ResultSet rs, int columnIndex) throws SQLException {
    Integer code = rs.getInt(columnIndex);
    return GuestStatus.of(code);
  }

  @Override
  public GuestStatus getNullableResult(CallableStatement cs, int columnIndex) throws SQLException {
    Integer code = cs.getInt(columnIndex);
    return GuestStatus.of(code);
  }
}