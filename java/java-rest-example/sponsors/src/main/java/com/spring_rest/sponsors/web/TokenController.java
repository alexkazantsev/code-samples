package com.spring_rest.sponsors.web;

import com.spring_rest.sponsors.security.JwtAuthResponse;
import com.spring_rest.sponsors.security.JwtTokenUtil;
import com.spring_rest.sponsors.security.JwtUser;
import com.spring_rest.sponsors.security.JwtUserDetailsService;
import io.swagger.annotations.ApiOperation;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import javax.servlet.http.HttpServletRequest;

@RestController
@RequestMapping(value = "/api/token")
public class TokenController {

  @Autowired
  private JwtUserDetailsService jwtUserDetailsService;

  @Autowired
  private JwtTokenUtil jwtTokenUtil;

  @ApiOperation(value = "Refresh current token")
  @GetMapping(value = "refresh")
  public ResponseEntity<JwtAuthResponse> refreshToken(HttpServletRequest httpServletRequest) {
    String token = httpServletRequest.getHeader(JwtTokenUtil.TOKEN_HEADER);
    String username = this.jwtTokenUtil.getUsernameFromToken(token);
    JwtUser user = (JwtUser) this.jwtUserDetailsService.loadUserByUsername(username);

    if (this.jwtTokenUtil.canTokenBeRefreshed(token, user.getLastPasswordResetDate())) {
      String refreshedToken = this.jwtTokenUtil.refreshToken(token);
      return ResponseEntity.ok(new JwtAuthResponse(refreshedToken));
    } else {
      return ResponseEntity.badRequest().body(null);
    }
  }
}
