package com.spring_rest.sponsors.security;

import io.jsonwebtoken.Claims;
import io.jsonwebtoken.Jwts;
import io.jsonwebtoken.SignatureAlgorithm;
import org.apache.juli.logging.Log;
import org.apache.juli.logging.LogFactory;
import org.springframework.mobile.device.Device;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.stereotype.Component;

import java.io.Serializable;
import java.util.Date;
import java.util.HashMap;
import java.util.Map;
import java.util.function.Function;

@Component
public class JwtTokenUtil implements Serializable {

  private Log logger = LogFactory.getLog(this.getClass());

  private static final String secret = "s1x!wmz6(h@u8b1s(ei$nsfv%z0x32r=wgt&s=tt)w3cms$i*z";
  private static final Long expiration = 604800L;

  public static final String TOKEN_HEADER = "Authorization";

  static final String CLAIM_KEY_USERNAME = "sub";
  static final String CLAIM_KEY_AUDIENCE = "aud";
  static final String CLAIM_KEY_CREATED = "iat";

  private static final String AUDIENCE_UNKNOWN = "unknown";
  private static final String AUDIENCE_WEB = "web";
  private static final String AUDIENCE_MOBILE = "mobile";
  private static final String AUDIENCE_TABLET = "tablet";

  public String getUsernameFromToken(String token) {
    return getClaimFromToken(token, Claims::getSubject);
  }

  private <T> T getClaimFromToken(String token, Function<Claims, T> claimsResolver) {
    final Claims claims = getAllClaimsFromToken(token);
    return claimsResolver.apply(claims);
  }

  private Claims getAllClaimsFromToken(String token) {
    return Jwts.parser()
        .setSigningKey(secret)
        .parseClaimsJws(token)
        .getBody();
  }

  public Boolean validateToken(String token, UserDetails userDetails) {
    JwtUser user = (JwtUser) userDetails;
    final String username = getUsernameFromToken(token);
    final Date created = getIssuedAtDateFromToken(token);
    return (
        username.equals(user.getUsername())
            && !isTokenExpired(token)
            && !isCreatedBeforeLastPasswordReset(created, user.getLastPasswordResetDate())
    );
  }

  private Date getIssuedAtDateFromToken(String token) {
    return getClaimFromToken(token, Claims::getIssuedAt);
  }

  private Boolean isTokenExpired(String token) {
    final Date expiration = getExpirationDateFromToken(token);
    return expiration.before(new Date());
  }

  private Date getExpirationDateFromToken(String token) {
    return getClaimFromToken(token, Claims::getExpiration);
  }

  private String generateAudience(Device device) {
    String audience = AUDIENCE_UNKNOWN;
    if (device.isNormal()) {
      audience = AUDIENCE_WEB;
    } else if (device.isTablet()) {
      audience = AUDIENCE_TABLET;
    } else if (device.isMobile()) {
      audience = AUDIENCE_MOBILE;
    }
    return audience;
  }

  public String generateToken(UserDetails userDetails, Device device) {
    Map<String, Object> claims = new HashMap<>();
    return doGenerateToken(claims, userDetails.getUsername(), generateAudience(device));
  }

  private String doGenerateToken(Map<String, Object> claims, String subject, String audience) {
    final Date createdDate = new Date();
    final Date expirationDate = calculateExpirationDate(createdDate);

    logger.info(String.format("Expired date: %s", expirationDate));

    return Jwts.builder()
        .setClaims(claims)
        .setSubject(subject)
        .setAudience(audience)
        .setIssuedAt(createdDate)
        .setExpiration(expirationDate)
        .signWith(SignatureAlgorithm.HS512, secret)
        .compact();
  }

  private Date calculateExpirationDate(Date createdDate) {
    return new Date(createdDate.getTime() + expiration * 1000);
  }

  public String refreshToken(String token) {
    final Date createdDate = new Date();
    final Date expirationDate = calculateExpirationDate(createdDate);

    final Claims claims = getAllClaimsFromToken(token);
    claims.setIssuedAt(createdDate);
    claims.setExpiration(expirationDate);

    return Jwts.builder()
        .setClaims(claims)
        .signWith(SignatureAlgorithm.HS512, secret)
        .compact();
  }

  public Boolean canTokenBeRefreshed(String token, Date lastPasswordReset) {
    final Date created = getIssuedAtDateFromToken(token);
    return !isCreatedBeforeLastPasswordReset(created, lastPasswordReset)
        && (!isTokenExpired(token) || ignoreTokenExpiration(token));
  }

  private Boolean isCreatedBeforeLastPasswordReset(Date created, Date lastPasswordReset) {
    return (lastPasswordReset != null && created.before(lastPasswordReset));
  }

  private Boolean ignoreTokenExpiration(String token) {
    String audience = getAudienceFromToken(token);
    return (AUDIENCE_TABLET.equals(audience) || AUDIENCE_MOBILE.equals(audience));
  }

  private String getAudienceFromToken(String token) {
    return getClaimFromToken(token, Claims::getAudience);
  }

}
