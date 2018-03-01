package com.spring_rest.sponsors.service.GuestGroup;

import com.spring_rest.sponsors.domain.GuestGroup;
import com.spring_rest.sponsors.exception.ItemAlreadyExistException;
import com.spring_rest.sponsors.exception.ItemNotFoundException;
import com.spring_rest.sponsors.repository.GuestGroupRepository;
import java.util.List;
import java.util.stream.Collectors;

import org.springframework.beans.BeanUtils;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.dao.DataAccessException;
import org.springframework.dao.DataIntegrityViolationException;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

@Service
@Transactional
public class GuestGroupServiceImpl implements GuestGroupService {

  @Autowired
  GuestGroupRepository guestGroupRepository;

  @Override
  public List<GuestGroup> findAll() {
    return guestGroupRepository.findAll();
  }

  @Override
  public GuestGroup findById(Integer id) {
    GuestGroup group = guestGroupRepository.findOne(id);
    if (group == null) {
      throw new ItemNotFoundException(id);
    }
    return group;
  }

  @Override
  public GuestGroup create(GuestGroup guestGroup) {
    try {
      guestGroupRepository.save(guestGroup);
      return guestGroup;
    } catch (DataIntegrityViolationException e) {
      throw new ItemAlreadyExistException();
    }
  }

  @Override
  public GuestGroup update(GuestGroup guestGroup, Integer id) {
    GuestGroup group = guestGroupRepository.findOne(id);
    if (group == null) {
      throw new ItemNotFoundException(id);
    }
    BeanUtils.copyProperties(guestGroup, group);
    group.setId(id);
    guestGroupRepository.update(group);
    return group;
  }

  @Override
  public Boolean delete(Integer id) {
    try {
      guestGroupRepository.delete(id);
      return true;
    } catch (DataAccessException ex) {
      throw new ItemNotFoundException(id);
    }
  }

  @Override
  public List<GuestGroup> bulkUpdate(List<GuestGroup> groups) {
    return groups.stream().map(guestGroup -> this.update(guestGroup, guestGroup.getId()))
        .collect(Collectors.toList());
  }

  @Override
  public void bulkDelete(List<Integer> ids) {
    this.guestGroupRepository.bulkDelete(ids);
  }
}
