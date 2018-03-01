package com.spring_rest.sponsors.service.mac_address;

import com.github.pagehelper.PageHelper;
import com.spring_rest.sponsors.domain.MacAddress;
import com.spring_rest.sponsors.exception.GuestAccountAlreadyExistException;
import com.spring_rest.sponsors.exception.GuestAccountNotFoundException;
import com.spring_rest.sponsors.repository.MacAddressRepository;
import com.spring_rest.sponsors.service.search_filter.MacAddressSearchFilter;
import java.util.List;
import java.util.stream.Collectors;
import org.springframework.beans.BeanUtils;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.dao.DataAccessException;
import org.springframework.dao.DataIntegrityViolationException;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;


@SuppressWarnings("unused")
@Service
@Transactional
public class MacAddressServiceImpl implements MacAddressService {

  @Autowired
  private MacAddressRepository macAddressRepository;

  @Override
  public List<MacAddress> findAllFiltered(Integer page, Integer size,
      MacAddressSearchFilter filter) {

    if (page > 0 && size > 0) {
      PageHelper.startPage(page, size);
    }
    return this.macAddressRepository.findAllFiltered(filter);
  }

  @Override
  public List<MacAddress> findAll() {
    return macAddressRepository.findAll();
  }


  @Override
  public MacAddress findById(Integer id) throws GuestAccountNotFoundException {
    MacAddress account = this.macAddressRepository.findOne(id);
    if (account == null) {
      throw new GuestAccountNotFoundException(id);
    }
    return account;
  }

  @Override
  public MacAddress create(MacAddress guestAccount) throws GuestAccountAlreadyExistException {
    try {
      this.macAddressRepository.save(guestAccount);
      return guestAccount;
    } catch (DataIntegrityViolationException ex) {
      throw new GuestAccountAlreadyExistException();
    }
  }

  @Override
  public MacAddress update(MacAddress guestAccount, Integer id)
      throws GuestAccountNotFoundException {

    // Check if user exists
    MacAddress account = this.findById(id);
    if (account == null) {
      throw new GuestAccountNotFoundException(id);
    }

    // Copy all properties to account
    BeanUtils.copyProperties(guestAccount, account);

    // Update account in DB and return
    this.macAddressRepository.update(account);
    return account;
  }

  @Override
  public List<MacAddress> bulkUpdate(List<MacAddress> accounts)
      throws GuestAccountNotFoundException {
    return accounts.stream()
        .map(account -> this.update(account, account.getId()))
        .collect(Collectors.toList());
  }

  @Override
  public List<MacAddress> bulkFind(List<Integer> ids) {
    return macAddressRepository.bulkFind(ids);
  }

  @Override
  public Boolean delete(Integer id) throws GuestAccountNotFoundException {
    try {
      this.macAddressRepository.delete(id);
      return true;
    } catch (DataAccessException ex) {
      throw new GuestAccountNotFoundException(id);
    }
  }

  @Override
  public void bulkDelete(List<Integer> ids) {
    this.macAddressRepository.bulkDelete(ids);
  }
}
