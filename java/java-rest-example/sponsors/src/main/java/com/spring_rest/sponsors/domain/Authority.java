package com.spring_rest.sponsors.domain;

import com.spring_rest.sponsors.security.AuthorityName;
import lombok.Data;

import javax.persistence.*;
import java.io.Serializable;
import java.util.List;

@Data
@Entity
@Table(name = "authority")
@SuppressWarnings("FieldCanBeLocal")
public class Authority implements Serializable {

  @Id
  @GeneratedValue(strategy = GenerationType.AUTO)
  private Integer id;

  @Column(name = "name", length = 50)
  @Enumerated(EnumType.STRING)
  private AuthorityName name;

  @Column(name = "description", length = 255)
  private String description;

  @ManyToMany(mappedBy = "authorities", fetch = FetchType.LAZY)
  private List<Credentials> credentials;

  public Authority(Integer id, AuthorityName name, String description, List<Credentials> credentials) {
    this.id = id;
    this.name = name;
    this.description = description;
    this.credentials = credentials;
  }

  public Authority() {
  }
}
