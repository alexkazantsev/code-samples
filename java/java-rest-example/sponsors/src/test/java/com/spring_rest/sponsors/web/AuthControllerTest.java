package com.spring_rest.sponsors.web;

import com.fasterxml.jackson.databind.ObjectMapper;
import com.spring_rest.sponsors.security.JwtAuthRequest;
import com.spring_rest.sponsors.security.JwtTokenUtil;
import com.spring_rest.sponsors.security.JwtUserDetailsService;
import org.junit.Before;
import org.junit.Test;
import org.junit.runner.RunWith;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.context.SpringBootTest;
import org.springframework.boot.test.mock.mockito.MockBean;
import org.springframework.http.MediaType;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.test.context.support.WithAnonymousUser;
import org.springframework.test.context.junit4.SpringRunner;
import org.springframework.test.web.servlet.MockMvc;
import org.springframework.test.web.servlet.setup.MockMvcBuilders;
import org.springframework.web.context.WebApplicationContext;

import static org.springframework.security.test.web.servlet.setup.SecurityMockMvcConfigurers.springSecurity;
import static org.springframework.test.web.servlet.request.MockMvcRequestBuilders.post;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.status;


@RunWith(SpringRunner.class)
@SpringBootTest
public class AuthControllerTest {

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
  public void successfulAuthenticationWithAnonymousUser() throws Exception {

    JwtAuthRequest jwtAuthenticationRequest = new JwtAuthRequest("user", "password");

    this.mvc.perform(post("/api/auth/login")
        .contentType(MediaType.APPLICATION_JSON)
        .content(new ObjectMapper().writeValueAsString(jwtAuthenticationRequest)))
        .andExpect(status().is2xxSuccessful());
  }

  @Test
  public void auth() throws Exception {
  }

  @Test
  public void refreshToken() throws Exception {
  }

}