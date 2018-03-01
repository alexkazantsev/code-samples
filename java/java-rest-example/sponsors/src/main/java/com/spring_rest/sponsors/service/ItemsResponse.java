package com.spring_rest.sponsors.service;

import com.github.pagehelper.Page;
import java.util.List;
import lombok.Data;

@Data
public class ItemsResponse<T> {

  private Long total;
  private Integer pageSize;
  private Integer pageNum;
  private List<T> items;

  public ItemsResponse(List<T> items) {
    Page currentPage = (Page) items;
    this.pageSize = currentPage.getPageSize();
    this.pageNum = currentPage.getPageNum();
    this.total = currentPage.getTotal();
    this.items = items;
  }
}
