package com.spring_rest.sponsors.utils;

import java.util.ArrayList;
import java.util.Collection;
import java.util.Iterator;
import java.util.List;
import java.util.ListIterator;
import javax.validation.Valid;
import lombok.Data;

@Data
public class ValidList<T> implements List<T> {


  public ValidList() {
    this.items = new ArrayList<>();
  }

  public ValidList(List<T> items) {
    super();
    this.items = items;
  }

  @Valid
  private List<T> items;

  @Override
  public int size() {
    return items.size();
  }

  @Override
  public boolean isEmpty() {
    return items.isEmpty();
  }

  @Override
  public boolean contains(Object o) {
    return items.contains(o);
  }

  @Override
  public Iterator<T> iterator() {
    return items.iterator();
  }

  @Override
  public Object[] toArray() {
    return items.toArray();
  }

  @Override
  public <T1> T1[] toArray(T1[] t1s) {
    return items.toArray(t1s);
  }

  @Override
  public boolean add(T t) {
    return items.add(t);
  }

  @Override
  public boolean remove(Object o) {
    return items.remove(o);
  }

  @Override
  public boolean containsAll(Collection<?> collection) {
    return items.containsAll(collection);
  }

  @Override
  public boolean addAll(Collection<? extends T> collection) {
    return items.addAll(collection);
  }

  @Override
  public boolean addAll(int i, Collection<? extends T> collection) {
    return items.addAll(i, collection);
  }

  @Override
  public boolean removeAll(Collection<?> collection) {
    return items.removeAll(collection);
  }

  @Override
  public boolean retainAll(Collection<?> collection) {
    return items.retainAll(collection);
  }

  @Override
  public void clear() {
    items.clear();
  }

  @Override
  public T get(int i) {
    return items.get(i);
  }

  @Override
  public T set(int i, T t) {
    return items.set(i, t);
  }

  @Override
  public void add(int i, T t) {
    items.add(i, t);
  }

  @Override
  public T remove(int i) {
    return items.remove(i);
  }

  @Override
  public int indexOf(Object o) {
    return items.indexOf(o);
  }

  @Override
  public int lastIndexOf(Object o) {
    return items.lastIndexOf(o);
  }

  @Override
  public ListIterator<T> listIterator() {
    return items.listIterator();
  }

  @Override
  public ListIterator<T> listIterator(int i) {
    return items.listIterator(i);
  }

  @Override
  public List<T> subList(int i, int i1) {
    return items.subList(i, i1);
  }
}
