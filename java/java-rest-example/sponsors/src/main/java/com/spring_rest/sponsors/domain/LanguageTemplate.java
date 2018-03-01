package com.spring_rest.sponsors.domain;

import lombok.Data;

@Data
public class LanguageTemplate {

  private Integer id;
  private String name;
  private String description;
  private String locale;
  private Integer textmessage_id;
  private Integer email_id;
  private Integer print_id;
  private Integer guestlogin_id;
  private Integer devicelogin_id;
  private Integer customfield_id;
  private Integer guestportal_id;
  private String image;
  private Integer webauthentication_id;
  private Integer resultpage_id;
  private Integer orgid;

  public LanguageTemplate() {
  }

  public LanguageTemplate(Integer id, String name, String description, String locale,
      Integer textmessage_id, Integer email_id, Integer print_id, Integer guestlogin_id,
      Integer devicelogin_id, Integer customfield_id, Integer guestportal_id, String image,
      Integer webauthentication_id, Integer resultpage_id, Integer orgid) {
    this.id = id;
    this.name = name;
    this.description = description;
    this.locale = locale;
    this.textmessage_id = textmessage_id;
    this.email_id = email_id;
    this.print_id = print_id;
    this.guestlogin_id = guestlogin_id;
    this.devicelogin_id = devicelogin_id;
    this.customfield_id = customfield_id;
    this.guestportal_id = guestportal_id;
    this.image = image;
    this.webauthentication_id = webauthentication_id;
    this.resultpage_id = resultpage_id;
    this.orgid = orgid;
  }
}
