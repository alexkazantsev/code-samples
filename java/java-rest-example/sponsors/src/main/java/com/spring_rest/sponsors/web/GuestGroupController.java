package com.spring_rest.sponsors.web;

import com.spring_rest.sponsors.domain.GuestGroup;
import com.spring_rest.sponsors.service.GuestGroup.GuestGroupResponse;
import com.spring_rest.sponsors.service.GuestGroup.GuestGroupService;
import com.spring_rest.sponsors.utils.ValidList;
import io.swagger.annotations.ApiImplicitParam;
import io.swagger.annotations.ApiImplicitParams;
import io.swagger.annotations.ApiOperation;
import io.swagger.annotations.ApiResponse;
import io.swagger.annotations.ApiResponses;
import java.util.Arrays;
import java.util.List;
import java.util.stream.Collectors;
import javax.validation.Valid;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.validation.annotation.Validated;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequestMapping(path = "/api/guest-group", produces = "application/json")
public class GuestGroupController {

  @Autowired
  private GuestGroupService guestGroupService;

  @GetMapping
  @ApiOperation(value = "Fetching all guest groups")
  @ApiResponse(code = 200, message = "OK", response = GuestGroupResponse.class)
  @ApiImplicitParams(value = {
      @ApiImplicitParam(name = "page", dataType = "int", paramType = "query", value = "Results page you want to retrieve (1..N)"),
      @ApiImplicitParam(name = "size", dataType = "int", paramType = "query", value = "Number of records per page.")
  })
  public ResponseEntity<List<GuestGroup>> fetchAll() {
    List<GuestGroup> pagedGuestGroups = guestGroupService
        .findAll();
    return ResponseEntity.ok(pagedGuestGroups);
  }

  @GetMapping(value = "/{id}")
  @ApiOperation(value = "Fetching specific guest group by id")
  @ApiImplicitParam(name = "id", required = true, dataType = "int", paramType = "query", value = "Id of guest group")
  public ResponseEntity<GuestGroup> fetchById(@PathVariable Integer id) {
    return ResponseEntity.ok(guestGroupService.findById(id));
  }


  @PostMapping
  @ApiOperation(value = "Creating new guest group")
  @ApiResponses({
      @ApiResponse(code = 400, message = "Item already exist")
  })
  public ResponseEntity<GuestGroup> create(@Validated @RequestBody GuestGroup group) {
    GuestGroup createdGroup = guestGroupService.create(group);
    return ResponseEntity.ok(createdGroup);
  }

  @PutMapping(value = "/{id}")
  @ApiOperation("Updating guest group by id")
  public ResponseEntity<GuestGroup> update(
      @Validated @RequestBody GuestGroup group,
      @PathVariable Integer id
  ) {
    GuestGroup updatedGroup = guestGroupService.update(group, id);
    return ResponseEntity.ok(updatedGroup);
  }

  @PutMapping(value = "/bulk-update")
  @ApiOperation("Bulk update guest groups")
  public ResponseEntity<List<GuestGroup>> bulkUpdate(
      @Valid @RequestBody ValidList<GuestGroup> groups) {
    List<GuestGroup> updatedGroups = guestGroupService.bulkUpdate(groups.getItems());
    return ResponseEntity.ok(updatedGroups);
  }


  @DeleteMapping(value = "/{id}")
  @ApiOperation(value = "Delete guest group by id", code = 204)
  public ResponseEntity<Void> delete(@PathVariable Integer id) {
    guestGroupService.delete(id);
    return ResponseEntity.status(204).body(null);
  }

  @DeleteMapping(value = "/bulk-delete")
  @ApiOperation(value = "Bulk delete guest groups by ids")
  @ApiImplicitParam(name = "ids", dataType = "string", paramType = "query", value = "Id list separated by `,`. Example: ids=113,23,496")
  public ResponseEntity<?> bulkDelete(@RequestParam("ids") String ids) {
    List<Integer> collect = Arrays.stream(ids.split(",")).map(Integer::valueOf)
        .collect(Collectors.toList());
    guestGroupService.bulkDelete(collect);
    return ResponseEntity.status(204).body(null);
  }


}
