package com.spring_rest.sponsors.web;

import com.spring_rest.sponsors.domain.MacAddress;
import com.spring_rest.sponsors.enums.MacAddressStatus;
import com.spring_rest.sponsors.exception.IdsNotEqualsException;
import com.spring_rest.sponsors.exception.QueryParamsParseException;
import com.spring_rest.sponsors.service.export.CsvFieldFactory;
import com.spring_rest.sponsors.service.export.ImportProcessor;
import com.spring_rest.sponsors.service.mac_address.MacAddressBulkUpdateRequest;
import com.spring_rest.sponsors.service.mac_address.MacAddressCreateRequest;
import com.spring_rest.sponsors.service.mac_address.MacAddressFetchAllResponse;
import com.spring_rest.sponsors.service.mac_address.MacAddressServiceImpl;
import com.spring_rest.sponsors.service.mac_address.MacAddressUpdateRequest;
import com.spring_rest.sponsors.service.search_filter.MacAddressSearchFilter;
import com.spring_rest.sponsors.web.view.ExportViewFactory;
import com.spring_rest.sponsors.web.view.ExportableView;
import io.swagger.annotations.ApiImplicitParam;
import io.swagger.annotations.ApiImplicitParams;
import io.swagger.annotations.ApiOperation;
import io.swagger.annotations.ApiResponse;
import io.swagger.annotations.ApiResponses;
import java.util.Arrays;
import java.util.List;
import java.util.Map;
import java.util.Objects;
import java.util.stream.Collectors;
import javax.validation.Valid;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Pageable;
import org.springframework.data.web.PageableDefault;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;
import org.springframework.web.multipart.MultipartFile;
import org.springframework.web.servlet.ModelAndView;


@SuppressWarnings({"unused", "SpellCheckingInspection"})
@RestController
@RequestMapping(value = "/api/mac-address", produces = "application/json")
public class MacAddressController {

  public static final List<String> fields = Arrays
      .asList("macaddress", "firstName", "lastName", "organization", "emailAddress",
          "phoneNumber", "emailNotify", "smsNotify");
  private static Logger logger = LoggerFactory.getLogger(MacAddressController.class);
  @Autowired
  ImportProcessor processor;
  @Autowired
  private MacAddressServiceImpl macAddressService;
  @Autowired
  private ExportViewFactory viewFactory;
  @Autowired
  private CsvFieldFactory fieldFactory;

  @ApiOperation(value = "Fetching all mac addresses", response = Iterable.class)
  @ApiImplicitParams(value = {
      @ApiImplicitParam(name = "page", dataType = "int", paramType = "query", value = "Results page you want to retrieve (1..N)"),
      @ApiImplicitParam(name = "size", dataType = "int", paramType = "query", value = "Number of records per page."),
      @ApiImplicitParam(name = "username", dataType = "string", paramType = "query", value = "Filter by username field."),
      @ApiImplicitParam(name = "phoneNumber", dataType = "string", paramType = "query", value = "Filter by phoneNumber field. [0-9]"),
      @ApiImplicitParam(name = "emailAddress", dataType = "string", paramType = "query", value = "Filter by emailAddress field."),
      @ApiImplicitParam(name = "orderBy", dataType = "string", paramType = "query", value = "Order result by existing fields."),
      @ApiImplicitParam(name = "sortType", dataType = "string", paramType = "query", value = "Sort result. Can be ASC or DESC. Default value ASC."),
      @ApiImplicitParam(name = "renewCount", dataType = "int", paramType = "query", value = "Filter by renewals count."),
      @ApiImplicitParam(name = "createdOn", dataType = "string", paramType = "query", value = "Filter by creation day. Format: YYYY-MM-DD. Example: 2017-10-18."),
      @ApiImplicitParam(name = "status", dataType = "string", paramType = "query", value = "Filter by status. Can be: [CREATED, ACTIVE, EXPIRED, INACTIVE]"),
  })
  @ApiResponse(code = 200, message = "OK", response = MacAddressFetchAllResponse.class)
  @GetMapping
  public ResponseEntity<MacAddressFetchAllResponse> fetchAll(
      @RequestParam Map<String, String> params,
      @PageableDefault(page = 1) Pageable pageable) {

    MacAddressSearchFilter filter = new MacAddressSearchFilter(params);

    List<MacAddress> accounts = this.macAddressService.findAllFiltered(
        pageable.getPageNumber(), pageable.getPageSize(), filter
    );
    MacAddressFetchAllResponse response = new MacAddressFetchAllResponse(accounts);
    return ResponseEntity.ok(response);
  }

  @GetMapping(value = "/status-list")
  public ResponseEntity<List<MacAddressStatus>> getStatusList() {
    return ResponseEntity.ok(Arrays.asList(MacAddressStatus.values()));
  }

  @ApiOperation(value = "Fetch Mac Address by id")
  @ApiResponses(value = {
      @ApiResponse(code = 404, message = "Mac Address not found")
  })
  @GetMapping(value = "/{id}")
  public ResponseEntity<MacAddress> fetchById(@PathVariable("id") Integer id) {
    return ResponseEntity.ok(this.macAddressService.findById(id));
  }

  @ApiOperation(value = "Create new mac address")
  @ApiResponses(value = {
      @ApiResponse(code = 400, message = "Mac Address already exist")
  })
  @PostMapping
  public ResponseEntity<MacAddress> create(
      @Valid @RequestBody final MacAddressCreateRequest createRequest) {
    MacAddress account = this.macAddressService.create(new MacAddress(createRequest));
    return ResponseEntity.ok(account);
  }

  @ApiOperation(value = "Update mac address by id")
  @ApiResponses(value = {
      @ApiResponse(code = 404, message = "Mac Address not found")
  })
  @PutMapping(value = "/{id}")
  public ResponseEntity<MacAddress> update(
      @Valid @RequestBody final MacAddressUpdateRequest updateRequest,
      @PathVariable("id") Integer id) {
    if (!Objects.equals(id, updateRequest.getId())) {
      throw new IdsNotEqualsException(updateRequest.getId(), id);
    }

    MacAddress account = this.macAddressService.update(new MacAddress(updateRequest), id);
    return ResponseEntity.ok(account);
  }

  @ApiOperation(value = "Bulk update mac addresses")
  @PutMapping(value = "/bulk-update")
  public ResponseEntity<List<MacAddress>> bulkUpdate(
      @Valid @RequestBody final List<MacAddressBulkUpdateRequest> accounts) {
    return ResponseEntity.ok(this.macAddressService.bulkUpdate(accounts.stream()
        .map(MacAddress::new).collect(Collectors.toList())));
  }

  @ApiOperation(value = "Delete single mac address by id")
  @ApiResponses(value = {
      @ApiResponse(code = 204, message = "Mac address was successfully deleted"),
      @ApiResponse(code = 404, message = "Mac address was not found")
  })
  @DeleteMapping(value = "/{id}")
  public ResponseEntity<Void> delete(@PathVariable("id") Integer id) {
    this.macAddressService.delete(id);
    return ResponseEntity.status(204).body(null);
  }

  @ApiOperation(value = "Bulk delete mac addresses by ids")
  @ApiImplicitParam(name = "ids", dataType = "string", paramType = "query", value = "Id list separated by `,`. Example: ids=113,23,496")
  @DeleteMapping(value = "/bulk-delete")
  public ResponseEntity<?> bulkDelete(@RequestParam("ids") String ids) {
    List<Integer> collect;

    try {
      collect = Arrays.stream(ids.split(","))
          .map(Integer::valueOf).collect(Collectors.toList());
    } catch (NumberFormatException e) {
      throw new QueryParamsParseException(ids);
    }

    this.macAddressService.bulkDelete(collect);
    return ResponseEntity.status(204).body(null);
  }

  @GetMapping("/export")
  public ModelAndView export(Map<String, Object> model, @RequestParam("ids") String ids,
      @RequestParam(defaultValue = "csv") String type) {
    List<MacAddress> exportableElements = null;
    if (ids == null || ids.isEmpty()) {
      exportableElements = macAddressService.findAll();
    } else {
      String[] idsArray = ids.split(",");
      exportableElements = macAddressService.bulkFind(
          Arrays.stream(idsArray)
              .map(Integer::valueOf)
              .collect(Collectors.toList()));
    }
    model.put("items", exportableElements);

    ExportableView view = viewFactory.getViewForType(type);
    view.setName("GuestAccounts");
    view.setExportFields(fields);
    return new ModelAndView(view, model);
  }

  @PostMapping("/import")
  public List<MacAddress> importData(@RequestParam("file") MultipartFile file) throws Exception {
    List<MacAddress> process = processor.process(file, MacAddress.class);
    process.forEach(macAddressService::create);
    return process;
  }

}
