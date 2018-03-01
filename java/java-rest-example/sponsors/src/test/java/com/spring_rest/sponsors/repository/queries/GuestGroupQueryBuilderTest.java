package com.spring_rest.sponsors.repository.queries;

import static org.hamcrest.CoreMatchers.equalTo;
import static org.hamcrest.CoreMatchers.is;
import static org.junit.Assert.assertThat;

import com.spring_rest.sponsors.domain.GuestGroup;
import java.util.Arrays;
import org.junit.After;
import org.junit.Before;
import org.junit.Test;

public class GuestGroupQueryBuilderTest {

  private static final String TABLE_NAME = "guestgroup";

  private GuestGroupQueryBuilder builder;

  @Before
  public void setUp() throws Exception {
    builder = new GuestGroupQueryBuilder();
  }

  @After
  public void tearDown() throws Exception {

  }

  @Test
  public void findAll() throws Exception {
    String allQuery = builder.findAll();
    assertThat(allQuery, is(equalTo("SELECT *\nFROM " + TABLE_NAME + "")));
  }

  @Test
  public void findOne() throws Exception {
    String oneQuery = builder.findOne(1);
    assertThat(oneQuery, is(equalTo("SELECT *\nFROM " + TABLE_NAME + "\nWHERE (id=#{id})")));
  }

  @Test
  public void save() throws Exception {
    GuestGroup guestGroup = new GuestGroup();
    guestGroup.setId(2);
    guestGroup.setGroupName("Guesters");
    guestGroup.setGroupDescription("Main group");
    guestGroup.setOrgid(0);
    String saveQuery = builder.save(guestGroup);
    assertThat(saveQuery, is(equalTo("INSERT INTO " + TABLE_NAME
        + "\n (groupName,groupDescription,orgid)\nVALUES (#{groupName},#{groupDescription},#{orgid})")));

  }

  @Test
  public void update() throws Exception {
    GuestGroup guestGroup = new GuestGroup();
    guestGroup.setId(2);
    guestGroup.setGroupName("Guesters");
    guestGroup.setGroupDescription("Main group");
    guestGroup.setOrgid(0);
    String saveQuery = builder.update(guestGroup);
    assertThat(saveQuery, is(equalTo(
        "UPDATE " + TABLE_NAME
            + "\nSET groupName=#{groupName},groupDescription=#{groupDescription},orgid=#{orgid}\nWHERE (id=#{id})")));

  }

  @Test
  public void delete() throws Exception {
    String deleteQuery = builder.delete(1);
    assertThat(deleteQuery, is(equalTo(
        "DELETE FROM " + TABLE_NAME + "\n"
            + "WHERE (id=#{id})"
    )));
  }

  @Test
  public void bulkDelete() throws Exception {
    String bulkDeleteQuery = builder.bulkDelete(Arrays.asList(1, 2, 3, 4));
    assertThat(bulkDeleteQuery, is(equalTo(
        "DELETE FROM " + TABLE_NAME + "\n"
            + "WHERE (`id` IN (1,2,3,4))"
    )));
  }
}