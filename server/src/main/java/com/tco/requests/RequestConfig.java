package com.tco.requests;

import com.tco.misc.BadRequestException;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;

public class RequestConfig extends RequestHeader {

  private String serverName;
  private String[] supportedRequests = new String[3];
  private final transient Logger log = LoggerFactory.getLogger(RequestConfig.class);

  public RequestConfig() {
    this.requestType = "config";
    this.requestVersion = RequestHeader.CURRENT_SUPPORTED_VERSION;
  }

  @Override
  public void buildResponse() {
    this.serverName = "t01 Feather Friends";
    this.supportedRequests[0] = "config";
    this.supportedRequests[1] = "distance";
    this.supportedRequests[2] = "find";
    log.trace("buildResponse -> {}", this);
  }

  public String getServerName() {
    return serverName;
  }

  public String[] getSupportedRequests() {
    return supportedRequests;
  }
}