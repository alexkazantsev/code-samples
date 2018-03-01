package com.spring_rest.sponsors.domain;

import lombok.Data;

import javax.persistence.*;
import java.io.Serializable;
import java.util.Date;
import java.util.List;

@Data
@Entity
@Table(name = "credentials")
@SuppressWarnings("FieldCanBeLocal")
public class Credentials implements Serializable {

  @Id
  @GeneratedValue(strategy = GenerationType.AUTO)
  private Integer id;

  @Column(name = "username", unique = true, length = 255)
  private String userName;

  @Column(length = 255)
  private String password;

  @Column(name = "last_password_reset_date")
  @Temporal(TemporalType.TIMESTAMP)
  private Date lastPasswordResetDate;

  @ManyToMany(fetch = FetchType.EAGER)
  @JoinTable(
      name = "credential_authority",
      joinColumns = {@JoinColumn(name = "credential_id", referencedColumnName = "id")},
      inverseJoinColumns = {@JoinColumn(name = "authority_id", referencedColumnName = "id")}
  )
  private List<Authority> authorities;

  public Credentials(String userName, String password, Date lastPasswordResetDate, List<Authority> authorities) {
    this.userName = userName;
    this.password = password;
    this.lastPasswordResetDate = lastPasswordResetDate;
    this.authorities = authorities;
  }

  public Credentials() { }
}
