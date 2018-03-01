package com.spring_rest.sponsors.service.mac_address;

import com.github.pagehelper.Page;
import com.spring_rest.sponsors.domain.MacAddress;
import lombok.Data;

import java.util.List;

@SuppressWarnings("unused")
@Data
public class MacAddressFetchAllResponse {

  private Long total;
  private List<MacAddress> macAddresses;

  public MacAddressFetchAllResponse(List<MacAddress> macAddresses) {
    Page guestAccountPage = (Page) macAddresses;
    this.total = guestAccountPage.getTotal();
    this.macAddresses = macAddresses;
  }

  public MacAddressFetchAllResponse() {
  }
}
