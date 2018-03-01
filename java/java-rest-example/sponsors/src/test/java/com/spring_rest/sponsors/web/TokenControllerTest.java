package com.spring_rest.sponsors.web;

import com.spring_rest.sponsors.domain.Authority;
import com.spring_rest.sponsors.domain.Credentials;
import com.spring_rest.sponsors.security.*;
import org.junit.Before;
import org.junit.Test;
import org.junit.runner.RunWith;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.context.SpringBootTest;
import org.springframework.boot.test.mock.mockito.MockBean;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.test.context.support.WithAnonymousUser;
import org.springframework.security.test.context.support.WithMockUser;
import org.springframework.test.context.junit4.SpringRunner;
import org.springframework.test.web.servlet.MockMvc;
import org.springframework.test.web.servlet.setup.MockMvcBuilders;
import org.springframework.web.context.WebApplicationContext;

import java.util.Arrays;
import java.util.Date;
import java.util.List;

import static org.mockito.Matchers.any;
import static org.mockito.Matchers.eq;
import static org.mockito.Mockito.when;
import static org.springframework.security.test.web.servlet.setup.SecurityMockMvcConfigurers.springSecurity;
import static org.springframework.test.web.servlet.request.MockMvcRequestBuilders.get;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.status;

@RunWith(SpringRunner.class)
@SpringBootTest
public class TokenControllerTest {

  private MockMvc mvc;

  @Autowired
  private WebApplicationContext context;

  @MockBean
  private AuthenticationManager authenticationManager;

  @MockBean
  private JwtTokenUtil jwtTokenUtil;

  @MockBean
  private JwtUserDetailsService userDetailsService;

  @Before
  public void setup() {
    mvc = MockMvcBuilders
        .webAppContextSetup(context)
        .apply(springSecurity())
        .build();
  }

  @Test
  @WithAnonymousUser
  public void shouldGetUnauthorizedWithAnonymousUser() throws Exception {

    this.mvc.perform(get("/api/token/refresh"))
        .andExpect(status().isForbidden());

  }

  @Test
  @WithMockUser(roles = "USER")
  public void successfulRefreshTokenWithUserRole() throws Exception {

    Authority authority = new Authority();
    authority.setId(0);
    authority.setName(AuthorityName.ROLE_USER);
    List<Authority> authorities = Arrays.asList(authority);

    Credentials credentials = new Credentials();
    credentials.setUserName("username");
    credentials.setAuthorities(authorities);
    credentials.setLastPasswordResetDate(new Date(System.currentTimeMillis() + 1000 * 1000));

    JwtUser jwtUser = JwtUserFactory.create(credentials);

    when(this.jwtTokenUtil.getUsernameFromToken(any())).thenReturn(credentials.getUserName());

    when(this.userDetailsService.loadUserByUsername(eq(credentials.getUserName()))).thenReturn(jwtUser);

    when(this.jwtTokenUtil.canTokenBeRefreshed(any(), any())).thenReturn(true);

    this.mvc.perform(get("/api/token/refresh"))
        .andExpect(status().is2xxSuccessful());
  }

  @Test
  @WithMockUser(roles = "ADMIN")
  public void successfulRefreshTokenWithAdminRole() throws Exception {

    Authority authority = new Authority();
    authority.setId(1);
    authority.setName(AuthorityName.ROLE_ADMIN);
    List<Authority> authorities = Arrays.asList(authority);

    Credentials credentials = new Credentials();
    credentials.setUserName("admin");
    credentials.setAuthorities(authorities);
    credentials.setLastPasswordResetDate(new Date(System.currentTimeMillis() + 1000 * 1000));

    JwtUser jwtUser = JwtUserFactory.create(credentials);

    when(this.jwtTokenUtil.getUsernameFromToken(any())).thenReturn(credentials.getUserName());

    when(this.userDetailsService.loadUserByUsername(eq(credentials.getUserName()))).thenReturn(jwtUser);

    when(this.jwtTokenUtil.canTokenBeRefreshed(any(), any())).thenReturn(true);

    this.mvc.perform(get("/api/token/refresh"))
        .andExpect(status().is2xxSuccessful());
  }

}