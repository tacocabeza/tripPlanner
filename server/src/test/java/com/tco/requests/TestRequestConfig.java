package com.tco.requests;

import com.tco.requests.RequestConfig;

import org.junit.jupiter.api.Test;
import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.DisplayName;
import java.util.*;

import static org.junit.jupiter.api.Assertions.assertEquals;

public class TestRequestConfig {

  private RequestConfig conf;

  @BeforeEach
  public void createConfigurationForTestCases(){
    conf = new RequestConfig();
    conf.buildResponse();
  }

  @Test
  @DisplayName("Request type is \"config\"")
  public void testType() {
    String type = conf.getRequestType();
    assertEquals("config", type);
  }

  @Test
  @DisplayName("Version number is equal to 4")
  public void testVersion() {
    int version = conf.getRequestVersion();
    assertEquals(4, version);
  }

  @Test
  @DisplayName("Team name is t01 Feather Friends")
  public void testServerName() {
    String name = conf.getServerName();
    assertEquals("t01 Feather Friends", name);
  }

  @Test
  @DisplayName("Supported Requests")
  public void testSupportedRequests() {
    List<String> supportedRequests = conf.getSupportedRequests();
    assertEquals(4, supportedRequests.size());
  }

  @Test
  @DisplayName("Supported Filters")
  public void testSupportedFilters()
  {
    Map<String,String[]> filters = conf.getFilters();
    assertEquals(2,filters.size());
  }
}