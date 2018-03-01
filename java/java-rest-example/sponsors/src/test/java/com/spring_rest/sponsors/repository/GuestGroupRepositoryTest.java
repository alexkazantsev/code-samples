package com.spring_rest.sponsors.repository;

import static org.hamcrest.CoreMatchers.equalTo;
import static org.hamcrest.CoreMatchers.is;
import static org.hamcrest.CoreMatchers.not;
import static org.hamcrest.CoreMatchers.notNullValue;
import static org.hamcrest.Matchers.empty;
import static org.junit.Assert.assertNotNull;
import static org.junit.Assert.assertNull;
import static org.junit.Assert.assertThat;

import com.spring_rest.sponsors.domain.GuestGroup;
import java.util.Arrays;
import java.util.List;
import org.junit.After;
import org.junit.Before;
import org.junit.Test;
import org.junit.runner.RunWith;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.context.SpringBootTest;
import org.springframework.test.context.junit4.SpringRunner;

@RunWith(SpringRunner.class)
@SpringBootTest
public class GuestGroupRepositoryTest {

  @Autowired
  private GuestGroupRepository guestGroupRepository;

  private GuestGroup testGroup;


  @Before
  public void setUp() throws Exception {
    testGroup = new GuestGroup();
    testGroup.setGroupName("New Group");
    testGroup.setOrgid(1);
    testGroup.setGroupDescription("Basic group");
  }


  @Test
  public void findAll() throws Exception {
    save();
    List<GuestGroup> all = guestGroupRepository.findAll();
    assertThat(all, is(not(empty())));
  }

  @Test
  public void findOne() throws Exception {
    GuestGroup guestGroup = new GuestGroup();
    guestGroup.setGroupName("New Group");
    guestGroup.setOrgid(1);
    guestGroup.setGroupDescription("Basic group");
    int id = saveGroup(guestGroup);
    GuestGroup group = guestGroupRepository.findOne(id);
    assertThat(group, is(notNullValue()));
  }

  @Test
  public void save() throws Exception {
    GuestGroup guestGroup = new GuestGroup();
    guestGroup.setGroupName("New Group");
    guestGroup.setOrgid(1);
    guestGroup.setGroupDescription("Basic group");
    saveGroup(guestGroup);
    assertThat(guestGroup.getId(), is(notNullValue()));
  }

  private int saveGroup(GuestGroup guestGroup) {
    guestGroupRepository.save(guestGroup);
    return guestGroup.getId();
  }

  @Test
  public void saveWithId() throws Exception {
    GuestGroup guestGroup = new GuestGroup();
    guestGroup.setGroupName("New Group");
    int firstId = 222;
    guestGroup.setId(firstId);
    guestGroup.setOrgid(1);
    guestGroup.setGroupDescription("Basic group");
    guestGroupRepository.save(guestGroup);
    assertThat(guestGroup.getId(), is(notNullValue()));
    assertThat(guestGroup.getId(), is(not(firstId)));
  }

  @Test
  public void update() throws Exception {
    int id = saveGroup(testGroup);
    String newDescription = "New Description";
    testGroup.setGroupDescription(newDescription);
    guestGroupRepository.update(testGroup);
    GuestGroup guestGroup = guestGroupRepository.findOne(id);
    assertNotNull(guestGroup);
    assertThat(guestGroup.getGroupDescription(), is(equalTo(newDescription)));
  }

  @Test
  public void delete() throws Exception {
    int id = saveGroup(testGroup);
    guestGroupRepository.delete(id);
    GuestGroup one = guestGroupRepository.findOne(id);
    assertNull(one);
  }

  @Test
  public void bulkDelete() throws Exception {
    Integer[] ids = {saveGroup(testGroup), saveGroup(testGroup), saveGroup(testGroup)};

    guestGroupRepository.bulkDelete(Arrays.asList(ids));
    for (Integer id : ids) {
      GuestGroup group = guestGroupRepository.findOne(id);
      assertNull(group);
    }
  }


  @After
  public void tearDown() throws Exception {
  }

}