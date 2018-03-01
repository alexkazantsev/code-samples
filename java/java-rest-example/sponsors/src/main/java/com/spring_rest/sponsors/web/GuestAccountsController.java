package com.spring_rest.sponsors.web;

import com.github.pagehelper.util.StringUtil;
import com.spring_rest.sponsors.domain.GuestAccount;
import com.spring_rest.sponsors.enums.GuestStatus;
import com.spring_rest.sponsors.exception.IdsNotEqualsException;
import com.spring_rest.sponsors.exception.QueryParamsParseException;
import com.spring_rest.sponsors.service.guest_account.GuestAccountBulkCreateRequest;
import com.spring_rest.sponsors.service.guest_account.GuestAccountBulkUpdateRequest;
import com.spring_rest.sponsors.service.guest_account.GuestAccountCreateRequest;
import com.spring_rest.sponsors.service.guest_account.GuestAccountFetchAllResponse;
import com.spring_rest.sponsors.service.guest_account.GuestAccountServiceImpl;
import com.spring_rest.sponsors.service.guest_account.GuestAccountUpdateRequest;
import com.spring_rest.sponsors.service.export.ImportProcessor;
import com.spring_rest.sponsors.service.search_filter.GuestAccountSearchFilter;
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
import org.springframework.transaction.annotation.Transactional;
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


@RestController
@RequestMapping(value = "/api/guest-account", produces = "application/json")
@Transactional
public class GuestAccountsController {

  public static final List<String> fields = Arrays
      .asList("username", "password", "firstName", "lastName", "organization", "emailAddress",
          "phoneNumber", "emailNotify", "smsNotify");

  private static Logger logger = LoggerFactory.getLogger(GuestAccountsController.class);

  @Autowired
  ImportProcessor processor;

  @Autowired
  private ExportViewFactory viewFactory;

  @Autowired
  private GuestAccountServiceImpl guestAccountService;

  @ApiOperation(value = "Fetching all guest accounts", response = Iterable.class)
  @ApiImplicitParams(value = {
      @ApiImplicitParam(name = "page", dataType = "int", paramType = "query", value = "Results page you want to retrieve (1..N)"),
      @ApiImplicitParam(name = "size", dataType = "int", paramType = "query", value = "Number of records per page."),
      @ApiImplicitParam(name = "username", dataType = "string", paramType = "query", value = "Filter by username field."),
      @ApiImplicitParam(name = "firstName", dataType = "string", paramType = "query", value = "Filter by firstName field."),
      @ApiImplicitParam(name = "lastName", dataType = "string", paramType = "query", value = "Filter by lastName field."),
      @ApiImplicitParam(name = "phoneNumber", dataType = "string", paramType = "query", value = "Filter by phoneNumber field. [0-9]"),
      @ApiImplicitParam(name = "emailAddress", dataType = "string", paramType = "query", value = "Filter by emailAddress field."),
      @ApiImplicitParam(name = "organization", dataType = "string", paramType = "query", value = "Filter by organization name."),
      @ApiImplicitParam(name = "orderBy", dataType = "string", paramType = "query", value = "Order result by existing fields."),
      @ApiImplicitParam(name = "sortType", dataType = "string", paramType = "query", value = "Sort result. Can be ASC or DESC. Default value ASC."),
      @ApiImplicitParam(name = "accessPolicyId", dataType = "int", paramType = "query", value = "Filter by Access Policy."),
      @ApiImplicitParam(name = "accountDurationTemplateId", dataType = "int", paramType = "query", value = "Filter by Account Duration Template."),
      @ApiImplicitParam(name = "guestGroupId", dataType = "int", paramType = "query", value = "Filter by Guest Group."),
      @ApiImplicitParam(name = "languageTemplateId", dataType = "int", paramType = "query", value = "Filter by Language template."),
      @ApiImplicitParam(name = "renewCount", dataType = "int", paramType = "query", value = "Filter by renewals count."),
      @ApiImplicitParam(name = "createdOn", dataType = "string", paramType = "query", value = "Filter by creation day. Format: YYYY-MM-DD. Example: 2017-10-18."),
      @ApiImplicitParam(name = "status", dataType = "string", paramType = "query", value = "Filter by status. Can be: [CREATED, ACTIVE, EXPIRED, INACTIVE]"),
  })
  @ApiResponse(code = 200, message = "OK", response = GuestAccountFetchAllResponse.class)
  @GetMapping
  public ResponseEntity<GuestAccountFetchAllResponse> fetchAll(
      @RequestParam Map<String, String> params,
      @PageableDefault(page = 1) Pageable pageable) {

    GuestAccountSearchFilter filter = new GuestAccountSearchFilter(params);

    List<GuestAccount> accounts = this.guestAccountService.findAll(
        pageable.getPageNumber(), pageable.getPageSize(), filter
    );
    GuestAccountFetchAllResponse response = new GuestAccountFetchAllResponse(accounts);
    return ResponseEntity.ok(response);
  }

  @GetMapping(value = "/status-list")
  public ResponseEntity<List<GuestStatus>> getStatusList() {
    return ResponseEntity.ok(Arrays.asList(GuestStatus.values()));
  }

  @ApiOperation(value = "Fetch guest account by account id")
  @ApiResponses(value = {
      @ApiResponse(code = 404, message = "Guest account not found")
  })
  @GetMapping(value = "/{id}")
  public ResponseEntity<GuestAccount> fetchById(@PathVariable("id") Integer id) {
    return ResponseEntity.ok(this.guestAccountService.findById(id));
  }

  @ApiOperation(value = "Create new guest account")
  @ApiResponses(value = {
      @ApiResponse(code = 400, message = "Guest account already exist")
  })
  @PostMapping
  public ResponseEntity<GuestAccount> create(
      @Valid @RequestBody final GuestAccountCreateRequest guestAccount) {
    GuestAccount account = this.guestAccountService.create(new GuestAccount(guestAccount));
    return ResponseEntity.ok(account);
  }

  @ApiOperation(value = "Update guest account by id")
  @ApiResponses(value = {
      @ApiResponse(code = 404, message = "Guest account not found")
  })
  @PutMapping(value = "/{id}")
  public ResponseEntity<GuestAccount> update(
      @Valid @RequestBody final GuestAccountUpdateRequest guestAccount,
      @PathVariable("id") Integer id) {
    if (!Objects.equals(id, guestAccount.getId())) {
      throw new IdsNotEqualsException(guestAccount.getId(), id);
    }

    GuestAccount account = this.guestAccountService.update(new GuestAccount(guestAccount), id);
    return ResponseEntity.ok(account);
  }

  @PostMapping("/bulk-create")
  public ResponseEntity<List<GuestAccount>> bulkCreate(
      @RequestBody @Valid GuestAccountBulkCreateRequest request) {
    return ResponseEntity.ok(guestAccountService.bulkCreate(request));
  }

  @ApiOperation(value = "Bulk update guest accounts")
  @PutMapping(value = "/bulk-update")
  public ResponseEntity<List<GuestAccount>> bulkUpdate(
      @Valid @RequestBody final List<GuestAccountBulkUpdateRequest> accounts) {
    return ResponseEntity.ok(this.guestAccountService.bulkUpdate(accounts.stream()
        .map(GuestAccount::new).collect(Collectors.toList())));
  }

  @ApiOperation(value = "Delete single guest account by id")
  @ApiResponses(value = {
      @ApiResponse(code = 204, message = "Guest account was successfully deleted"),
      @ApiResponse(code = 404, message = "Guest account not found")
  })
  @DeleteMapping(value = "/{id}")
  public ResponseEntity<Void> delete(@PathVariable("id") Integer id) {
    this.guestAccountService.delete(id);
    return ResponseEntity.status(204).body(null);
  }

  @ApiOperation(value = "Bulk delete guest accounts by ids")
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

    this.guestAccountService.bulkDelete(collect);
    return ResponseEntity.status(204).body(null);
  }

  @GetMapping(value = "/export")
  public ModelAndView export(Map<String, Object> model,
      @RequestParam(value = "ids", required = false) String ids,
      @RequestParam(defaultValue = "csv", required = false) String type) {
    List<GuestAccount> exportableElements;
    if (ids == null || ids.isEmpty()) {
      exportableElements = guestAccountService.findAll();
    } else {
      String[] idsArray = ids.split(",");
      exportableElements = guestAccountService.bulkFind(
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

  @PostMapping(value = "/import")
  public List<GuestAccount> importAccounts(
      @RequestParam("file") MultipartFile file,
      @RequestParam Map<String, String> params
  ) throws Exception {
    logger.debug("File with name: {}, content type: {}, original name: {}",
        file.getName(),
        file.getContentType(),
        file.getOriginalFilename());

    List<GuestAccount> guestAccounts = processor.process(file, GuestAccount.class);
    guestAccounts.forEach(account -> {
      String guestgroupid = params.get("guestGroupId");
      if (StringUtil.isNotEmpty(guestgroupid)) {
        account.setGuestGroupId(Integer.parseInt(guestgroupid));
      }
      String accesspolicyid = params.get("accessPolicyId");
      if (StringUtil.isNotEmpty(accesspolicyid)) {
        account.setAccessPolicyId(Integer.parseInt(accesspolicyid));
      }

      String accountdurationtemplateid = params.get("accountDurationTemplateId");
      if (StringUtil.isNotEmpty(accountdurationtemplateid)) {
        account.setAccountDurationTemplateId(Integer.parseInt(accountdurationtemplateid));
      }
    });
    return guestAccounts.stream().map(account -> guestAccountService.create(account))
        .collect(Collectors.toList());
  }
}
