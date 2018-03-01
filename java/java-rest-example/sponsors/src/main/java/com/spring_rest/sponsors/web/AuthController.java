package com.spring_rest.sponsors.web;

import com.spring_rest.sponsors.security.JwtAuthRequest;
import com.spring_rest.sponsors.security.JwtAuthResponse;
import com.spring_rest.sponsors.security.JwtTokenUtil;
import com.spring_rest.sponsors.security.JwtUserDetailsService;
import io.swagger.annotations.ApiOperation;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.mobile.device.Device;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.AuthenticationException;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import javax.validation.Valid;

@RestController
@RequestMapping("/api/auth")
public class AuthController {

  @Autowired
  private AuthenticationManager authenticationManager;

  @Autowired
  private JwtUserDetailsService jwtUserDetailsService;

  @Autowired
  private JwtTokenUtil jwtTokenUtil;

  @ApiOperation(value = "Login user in sponsors portal.")
  @PostMapping(value = "login")
  public ResponseEntity<JwtAuthResponse> auth(@RequestBody @Valid final JwtAuthRequest authRequest, Device device)
      throws AuthenticationException {

    final Authentication authentication =
        this.authenticationManager.authenticate(
            new UsernamePasswordAuthenticationToken(
                authRequest.username,
                authRequest.password
            )
        );

    SecurityContextHolder.getContext().setAuthentication(authentication);

    final UserDetails userDetails = jwtUserDetailsService.loadUserByUsername(authRequest.username);
    final String token = this.jwtTokenUtil.generateToken(userDetails, device);

    return ResponseEntity.ok(new JwtAuthResponse(token));
  }
}

