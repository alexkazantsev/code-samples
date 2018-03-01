package com.spring_rest.sponsors.service.guest_account;

import com.github.pagehelper.PageHelper;
import com.spring_rest.sponsors.domain.GuestAccount;
import com.spring_rest.sponsors.domain.dao.GuestAccountDao;
import com.spring_rest.sponsors.exception.GuestAccountAlreadyExistException;
import com.spring_rest.sponsors.exception.GuestAccountNotFoundException;
import com.spring_rest.sponsors.exception.ParameterNotFoundException;
import com.spring_rest.sponsors.repository.GuestAccountRepository;
import com.spring_rest.sponsors.service.search_filter.GuestAccountSearchFilter;
import java.util.Date;
import java.util.Iterator;
import java.util.List;
import java.util.stream.Collectors;
import java.util.stream.IntStream;
import net.bytebuddy.utility.RandomString;
import org.apache.commons.lang3.RandomStringUtils;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.BeanUtils;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.dao.DataAccessException;
import org.springframework.dao.DataIntegrityViolationException;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Propagation;
import org.springframework.transaction.annotation.Transactional;


@Service
@Transactional
public class GuestAccountServiceImpl implements GuestAccountService {

  private static Logger logger = LoggerFactory.getLogger(GuestAccountServiceImpl.class);

  @SuppressWarnings("SpringJavaAutowiringInspection")
  @Autowired
  private GuestAccountRepository guestAccountRepository;
  // TODO: 11/1/17 connect to admin panel
  private int randomCharCount = 6;

  @Override
  public List<GuestAccount> findAll(Integer page, Integer size, GuestAccountSearchFilter filter) {

    if (page > 0 && size > 0) {
      PageHelper.startPage(page, size);
    }
    return this.guestAccountRepository.findAllFiltered(filter)
        .stream()
        .map(GuestAccountDao::dto)
        .collect(Collectors.toList());
  }

  @Override
  public List<GuestAccount> findAll() {
    return this.guestAccountRepository.findAll().stream()
        .map(GuestAccountDao::dto)
        .collect(Collectors.toList());
  }

  @Override
  public GuestAccount findById(Integer id) throws GuestAccountNotFoundException {
    GuestAccount account = this.guestAccountRepository.findOne(id).dto();
    if (account == null) {
      throw new GuestAccountNotFoundException(id);
    }
    return account;
  }

  @Override
  public GuestAccount create(GuestAccount guestAccount) throws GuestAccountAlreadyExistException {
    try {
      if (guestAccount.getIsAutoUsername() != null && guestAccount.getIsAutoUsername()) {
        guestAccount.setUsername(generateUsername(guestAccount));
      }
      if (guestAccount.getIsAutoPassword() != null && guestAccount.getIsAutoPassword()) {
        guestAccount.setPassword(generatePassword());
      }
      if (guestAccount.getUsername() == null) {
        throw new ParameterNotFoundException("username");
      }
      GuestAccountDao accountDao = guestAccount.dao();
      this.guestAccountRepository.save(accountDao);
      return accountDao.dto();
    } catch (DataIntegrityViolationException ex) {
      throw new GuestAccountAlreadyExistException();
    }
  }

  @Override
  public GuestAccount update(GuestAccount guestAccount, Integer id)
      throws GuestAccountNotFoundException {

    // Check if user exists
    GuestAccount account = this.findById(id);
    if (account == null) {
      throw new GuestAccountNotFoundException(id);
    }

    // Copy all properties to account
    BeanUtils.copyProperties(guestAccount, account);

    // Update account in DB and return
    this.guestAccountRepository.update(account.dao());
    return account;
  }

  @Transactional(propagation = Propagation.REQUIRED, rollbackFor = Exception.class)
  public List<GuestAccount> bulkCreate(GuestAccountBulkCreateRequest request) {
    Date bulkInsertDate = new Date();
    List<GuestAccount> generatedAccounts = IntStream.range(0, request.getBatchSize())
        .boxed()
        .map(integer -> {
          GuestAccount guestAccount = new GuestAccount();
          guestAccount.setUsername(request.getPrefix() + integer + request.getSuffix());
          guestAccount.setGuestGroupId(request.getGuestGroupId());
          guestAccount.setAccessPolicyId(request.getAccessPolicyId());
          guestAccount.setLanguageTemplateId(request.getLanguageTemplateId());
          guestAccount.setAccountDurationTemplateId(request.getAccountDurationTemplateId());
          guestAccount.setCreatedOn(bulkInsertDate);
          return guestAccount;
        }).collect(Collectors.toList());
    int nextId = guestAccountRepository.getNextId();
    logger.debug("nextId: {}", nextId);
    int affectedCount = guestAccountRepository
        .bulkCreate(generatedAccounts
            .stream()
            .map(GuestAccount::dao)
            .collect(Collectors.toList()));

    logger.debug("affectedRows: {}", affectedCount);
    Iterator<GuestAccount> iterator = generatedAccounts.iterator();
    List<GuestAccount> savedGuestAccounts = IntStream.range(nextId, nextId + affectedCount).boxed()
        .map(id -> {
          if (iterator.hasNext()) {
            GuestAccount next = iterator.next();
            next.setId(id);
            return next;
          }
          return null;
        }).collect(Collectors.toList());
    return savedGuestAccounts;
  }

  @Override
  public List<GuestAccount> bulkUpdate(List<GuestAccount> accounts)
      throws GuestAccountNotFoundException {
    return accounts.stream()
        .map(account -> this.update(account, account.getId()))
        .collect(Collectors.toList());
  }

  @Override
  public Boolean delete(Integer id) throws GuestAccountNotFoundException {
    try {
      this.guestAccountRepository.delete(id);
      return true;
    } catch (DataAccessException ex) {
      throw new GuestAccountNotFoundException(id);
    }
  }

  @Override
  public String generateUsername(GuestAccount guestAccount) {
    if (guestAccount.getEmailAddress() != null) {
      return guestAccount.getEmailAddress();
    }
    if (guestAccount.getFirstName() != null && guestAccount.getLastName() != null) {
      return guestAccount.getFirstName() + guestAccount.getLastName() + RandomString.make(
          randomCharCount);
    }
    return RandomString.make(randomCharCount);
  }

  @Override
  public String generatePassword() {
    return RandomStringUtils.random(randomCharCount, false, true);
  }

  @Override
  public List<GuestAccount> bulkFind(List<Integer> ids) {
    return guestAccountRepository.bulkFind(ids)
        .stream()
        .map(GuestAccountDao::dto)
        .collect(Collectors.toList());
  }

  @Override
  public void bulkDelete(List<Integer> ids) {
    this.guestAccountRepository.bulkDelete(ids);
  }
}
