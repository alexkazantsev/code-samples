package com.spring_rest.sponsors.config;

import com.google.common.collect.ImmutableList;
import com.spring_rest.sponsors.security.JwtAuthenticationEntryPoint;
import com.spring_rest.sponsors.security.JwtAuthenticationTokenFilter;
import com.spring_rest.sponsors.security.JwtUserDetailsService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.http.HttpMethod;
import org.springframework.security.config.annotation.authentication.builders.AuthenticationManagerBuilder;
import org.springframework.security.config.annotation.web.builders.HttpSecurity;
import org.springframework.security.config.annotation.web.configuration.EnableWebSecurity;
import org.springframework.security.config.annotation.web.configuration.WebSecurityConfigurerAdapter;
import org.springframework.security.config.http.SessionCreationPolicy;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.security.web.authentication.UsernamePasswordAuthenticationFilter;
import org.springframework.web.cors.CorsConfiguration;
import org.springframework.web.cors.CorsConfigurationSource;
import org.springframework.web.cors.UrlBasedCorsConfigurationSource;

@SuppressWarnings("SpringJavaAutowiringInspection")
@Configuration
@EnableWebSecurity
public class WebSecurityConfig extends WebSecurityConfigurerAdapter {

  @Autowired
  private JwtUserDetailsService jwtUserDetailsService;

  @Autowired
  private JwtAuthenticationEntryPoint jwtAuthenticationEntryPoint;

  @Override
  protected void configure(AuthenticationManagerBuilder authenticationManagerBuilder) throws Exception {
    super.configure(authenticationManagerBuilder);
    authenticationManagerBuilder
        .userDetailsService(this.jwtUserDetailsService)
        .passwordEncoder(passwordEncoder());
  }

  @Bean
  public PasswordEncoder passwordEncoder() {
    return new BCryptPasswordEncoder();
  }

  @Bean
  public JwtAuthenticationTokenFilter authenticationTokenFilterBean() throws Exception {
    return new JwtAuthenticationTokenFilter();
  }

  @Override
  protected void configure(HttpSecurity httpSecurity) throws Exception {

    httpSecurity
        .csrf().disable()
        .cors().and()
        .exceptionHandling().authenticationEntryPoint(this.jwtAuthenticationEntryPoint).and()
        .sessionManagement().sessionCreationPolicy(SessionCreationPolicy.STATELESS).and()
        .authorizeRequests()

        /* STATIC FILES */
        .antMatchers("/example/**").permitAll()

        /* FRONTEND REQUIREMENTS */
        .antMatchers(
            HttpMethod.GET,
            "/",
            "/*.html",
            "/assets/**",
            "/favicon.ico",
            "/**/*.html",
            "/**/*.ttf",
            "/**/*.css",
            "/**/*.js",
            "/**/*.woff",
            "/**/*.woff2"
        ).permitAll()

        /* SWAGGER UI REQUIREMENTS */
        .antMatchers(
            "/v2/api-docs",
            "/configuration/ui",
            "/swagger-resources/**",
            "/configuration/**",
            "/swagger-ui.html",
            "/webjars/**"
        ).permitAll()

        /* AUTH REQUIREMENTS */
        .antMatchers( "/api/auth/**").permitAll()
        .anyRequest().authenticated();

    httpSecurity
        .addFilterBefore(this.authenticationTokenFilterBean(), UsernamePasswordAuthenticationFilter.class);

    httpSecurity.headers().cacheControl();

  }

  @Bean
  public CorsConfigurationSource corsConfigurationSource() {
    final CorsConfiguration configuration = new CorsConfiguration();
    configuration.setAllowedOrigins(ImmutableList.of("*"));
    configuration.setAllowedMethods(ImmutableList.of(
        "HEAD", "GET", "POST", "PUT", "DELETE", "PATCH"
    ));
    /**
     * setAllowCredentials(true) is important, otherwise:
     * The value of the 'Access-Control-Allow-Origin' header in the response must not be the wildcard '*'
     * when the request's credentials mode is 'include'.
     */
    configuration.setAllowCredentials(true);

    /**
     * setAllowedHeaders is important! Without it, OPTIONS preflight request
     * will fail with 403 Invalid CORS request
     */
    configuration.setAllowedHeaders(ImmutableList.of("Authorization", "Cache-Control", "Content-Type"));
    final UrlBasedCorsConfigurationSource source = new UrlBasedCorsConfigurationSource();
    source.registerCorsConfiguration("/**", configuration);
    return source;
  }
}
