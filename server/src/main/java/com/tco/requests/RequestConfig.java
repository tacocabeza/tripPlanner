package com.tco.requests;

import com.tco.misc.BadRequestException;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import java.util.*;

public class RequestConfig extends RequestHeader {

  private String serverName;
  private List<String> supportedRequests;
  private final transient Logger log = LoggerFactory.getLogger(RequestConfig.class);

  public RequestConfig() {
    this.requestType = "config";
    this.requestVersion = RequestHeader.CURRENT_SUPPORTED_VERSION;
  }

  @Override
  public void buildResponse() {
    this.serverName = "t01 Feather Friends";
    this.supportedRequests = new ArrayList();
    this.supportedRequests.add("config");
    this.supportedRequests.add("distance");
    this.supportedRequests.add("find");
    this.supportedRequests.add("trip");
    log.trace("buildResponse -> {}", this);
  }

  public String getServerName() {
    return serverName;
  }

  public List<String> getSupportedRequests() {
    return supportedRequests;
  }
}