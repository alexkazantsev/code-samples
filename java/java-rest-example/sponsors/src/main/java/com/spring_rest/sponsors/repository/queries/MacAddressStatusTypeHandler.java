package com.spring_rest.sponsors.repository.queries;

import com.spring_rest.sponsors.enums.MacAddressStatus;
import org.apache.ibatis.type.EnumTypeHandler;
import org.apache.ibatis.type.JdbcType;
import org.apache.ibatis.type.MappedTypes;

import java.sql.CallableStatement;
import java.sql.PreparedStatement;
import java.sql.ResultSet;
import java.sql.SQLException;


@SuppressWarnings("unused")
@MappedTypes(value = MacAddressStatus.class)
public class MacAddressStatusTypeHandler extends EnumTypeHandler<MacAddressStatus> {

  public MacAddressStatusTypeHandler(Class<MacAddressStatus> type) {
    super(type);
  }

  @Override
  public void setNonNullParameter(PreparedStatement ps, int i, MacAddressStatus parameter, JdbcType jdbcType) throws SQLException {
    ps.setInt(i, parameter.ordinal());
  }

  @Override
  public MacAddressStatus getNullableResult(ResultSet rs, String columnName) throws SQLException {
    Integer code = rs.getInt(columnName);
    return MacAddressStatus.of(code);
  }

  @Override
  public MacAddressStatus getNullableResult(ResultSet rs, int columnIndex) throws SQLException {
    Integer code = rs.getInt(columnIndex);
    return MacAddressStatus.of(code);
  }

  @Override
  public MacAddressStatus getNullableResult(CallableStatement cs, int columnIndex) throws SQLException {
    Integer code = cs.getInt(columnIndex);
    return MacAddressStatus.of(code);
  }
}