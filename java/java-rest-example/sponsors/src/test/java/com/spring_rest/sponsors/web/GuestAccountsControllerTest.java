package com.spring_rest.sponsors.web;

import com.github.pagehelper.Page;
import com.google.gson.Gson;
import com.spring_rest.sponsors.domain.GuestAccount;
import com.spring_rest.sponsors.enums.GuestStatus;
import com.spring_rest.sponsors.exception.GuestAccountNotFoundException;
import com.spring_rest.sponsors.service.guest_account.GuestAccountCreateRequest;
import com.spring_rest.sponsors.service.search_filter.GuestAccountSearchFilter;
import com.spring_rest.sponsors.service.guest_account.GuestAccountServiceImpl;
import org.junit.Test;
import org.junit.runner.RunWith;
import org.mockito.Mock;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.autoconfigure.web.servlet.WebMvcTest;
import org.springframework.boot.test.context.ConfigFileApplicationContextInitializer;
import org.springframework.boot.test.mock.mockito.MockBean;
import org.springframework.data.domain.Pageable;
import org.springframework.data.web.config.EnableSpringDataWebSupport;
import org.springframework.http.MediaType;
import org.springframework.security.test.context.support.WithMockUser;
import org.springframework.test.context.ContextConfiguration;
import org.springframework.test.context.junit4.SpringJUnit4ClassRunner;
import org.springframework.test.context.web.WebAppConfiguration;
import org.springframework.test.web.servlet.MockMvc;

import static java.util.Arrays.asList;
import static org.hamcrest.Matchers.is;
import static org.hamcrest.collection.IsCollectionWithSize.hasSize;
import static org.mockito.Mockito.*;
import static org.springframework.test.web.servlet.request.MockMvcRequestBuilders.*;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.jsonPath;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.status;


@RunWith(SpringJUnit4ClassRunner.class)
@WebMvcTest(GuestAccountsController.class)
@ContextConfiguration(initializers = ConfigFileApplicationContextInitializer.class)
@WebAppConfiguration
@EnableSpringDataWebSupport
public class GuestAccountsControllerTest {

  @Autowired
  private MockMvc mvc;

  @Mock
  private Pageable pageable;

  @MockBean(name = "guestAccountServiceImpl")
  private GuestAccountServiceImpl guestAccountServiceImpl;

  @Test
  @WithMockUser(roles = "USER")
  public void fetchAll() throws Exception {

    GuestAccount account1 = new GuestAccount();
    account1.setId(1);
    GuestAccount account2 = new GuestAccount();
    account2.setId(2);

    Page<GuestAccount> page = new Page<>();
    page.addAll(asList(account1, account2));

    when(pageable.getPageNumber()).thenReturn(1);
    when(pageable.getPageSize()).thenReturn(2);
    when(this.guestAccountServiceImpl.findAll(
        any(Integer.class), any(Integer.class), any(GuestAccountSearchFilter.class))).thenReturn(page);

    this.mvc.perform(
        get("/api/guest-account"))
        .andExpect(status().isOk())
        .andExpect(jsonPath("$.accounts", hasSize(2)))
        .andExpect(jsonPath("$.accounts[0].id", is(1)))
        .andExpect(jsonPath("$.accounts[1].id", is(2)));

    verify(this.guestAccountServiceImpl, times(1))
        .findAll(any(Integer.class), any(Integer.class), any(GuestAccountSearchFilter.class));
    verifyNoMoreInteractions(this.guestAccountServiceImpl);
  }

  @Test
  @WithMockUser(roles = "USER")
  public void getStatusList() throws Exception {

    this.mvc.perform(
        get("/api/guest-account/status-list"))
        .andExpect(status().isOk())
        .andExpect(jsonPath("$", hasSize(GuestStatus.values().length)))
        .andExpect(jsonPath("$[0]", is("CREATED")))
        .andExpect(jsonPath("$[1]", is("ACTIVE")))
        .andExpect(jsonPath("$[2]", is("EXPIRED")))
        .andExpect(jsonPath("$[3]", is("INACTIVE")));
  }

  @Test
  @WithMockUser(roles = "USER")
  public void fetchById() throws Exception {
    GuestAccount account1 = new GuestAccount();
    account1.setId(1);

    when(this.guestAccountServiceImpl.findById(1)).thenReturn(account1);

    this.mvc.perform(get("/api/guest-account/{id}", 1))
        .andExpect(status().isOk())
        .andExpect(jsonPath("$.id", is(1)));

    verify(this.guestAccountServiceImpl, times(1)).findById(1);
    verifyNoMoreInteractions(this.guestAccountServiceImpl);
  }

  @Test
  @WithMockUser(roles = "USER")
  public void fetchById_GuestAccountNotFound() throws Exception {
    when(this.guestAccountServiceImpl.findById(1)).thenThrow(new GuestAccountNotFoundException(1));

    this.mvc.perform(get("/api/guest-account/{id}", 1))
        .andExpect(status().isNotFound());

    verify(this.guestAccountServiceImpl, times(1)).findById(1);
    verifyNoMoreInteractions(this.guestAccountServiceImpl);
  }

  @Test
  @WithMockUser(roles = "USER")
  public void create() throws Exception {

    GuestAccountCreateRequest request = new GuestAccountCreateRequest();
    request.setFirstName("firstName");
    request.setLastName("lastName");
    request.setEmailAddress("emailAddress@email.com");
    request.setPhoneNumber("phoneNumber");
    request.setOrgId(1);
    request.setGuestGroupId(1);
    request.setAccessPolicyId(1);
    request.setAccountDurationTemplateId(1);

    GuestAccount response = new GuestAccount(request);

    when(this.guestAccountServiceImpl.create(any(GuestAccount.class))).thenReturn(response);

    Gson gson = new Gson();
    String json = gson.toJson(request);

    this.mvc.perform(
        post("/api/guest-account")
            .content(json)
            .contentType(MediaType.APPLICATION_JSON))
        .andExpect(status().isOk())
        .andExpect(jsonPath("$.firstName", is("firstName")))
        .andExpect(jsonPath("$.lastName", is("lastName")))
        .andExpect(jsonPath("$.emailAddress", is("emailAddress@email.com")))
        .andExpect(jsonPath("$.phoneNumber", is("phoneNumber")));

    verify(this.guestAccountServiceImpl, times(1)).create(refEq(response));
    verifyNoMoreInteractions(this.guestAccountServiceImpl);
  }

  @Test
  @WithMockUser(roles = "USER")
  public void delete_success() throws Exception {
    when(this.guestAccountServiceImpl.delete(1)).thenReturn(true);

    this.mvc.perform(
        delete("/api/guest-account/{id}", 1)
            .contentType(MediaType.APPLICATION_JSON))
        .andExpect(status().isNoContent());

    verify(this.guestAccountServiceImpl, times(1)).delete(1);
    verifyNoMoreInteractions(this.guestAccountServiceImpl);
  }

  @Test
  @WithMockUser(roles = "USER")
  public void delete_NotFoundException() throws Exception {
    when(this.guestAccountServiceImpl.delete(1)).thenThrow(new GuestAccountNotFoundException(1));

    this.mvc.perform(
        delete("/api/guest-account/{id}", 1)
            .contentType(MediaType.APPLICATION_JSON))
        .andExpect(status().isNotFound());

    verify(this.guestAccountServiceImpl, times(1)).delete(1);
    verifyNoMoreInteractions(this.guestAccountServiceImpl);
  }

  @Test
  @WithMockUser(roles = "USER")
  public void update() throws Exception {
    GuestAccount request = new GuestAccount();
    request.setId(1);
    request.setUsername("username2");

    when(this.guestAccountServiceImpl.update(any(GuestAccount.class), 1)).thenReturn(request);

    Gson gson = new Gson();
    String json = gson.toJson(request);

    System.out.println(json);

    this.mvc.perform(
        put("/api/guest-account/{id}", 1)
            .contentType(MediaType.APPLICATION_JSON)
            .content(json))
        .andExpect(status().isOk())
        .andExpect(jsonPath("$.id", is(1)))
        .andExpect(jsonPath("$.username", is("username2")));

    verify(this.guestAccountServiceImpl, times(1)).update(refEq(request), 1);
    verifyNoMoreInteractions(this.guestAccountServiceImpl);

  }

  @Test
  @WithMockUser(roles = "USER")
  public void update_NotFoundException() throws Exception {
    GuestAccount request = new GuestAccount();

    when(this.guestAccountServiceImpl.update(any(GuestAccount.class), 1))
        .thenThrow(new GuestAccountNotFoundException(1));

    Gson gson = new Gson();
    String json = gson.toJson(request);

    this.mvc.perform(
        put("/api/guest-account/{id}", 1)
            .contentType(MediaType.APPLICATION_JSON)
            .content(json))
        .andExpect(status().isNotFound());

    verify(this.guestAccountServiceImpl, times(1)).update(refEq(request), 1);
    verifyNoMoreInteractions(this.guestAccountServiceImpl);
  }

}