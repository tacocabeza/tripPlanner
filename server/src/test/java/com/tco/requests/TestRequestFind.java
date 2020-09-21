package com.tco.requests;

import com.tco.requests.RequestConfig;
import com.tco.requests.RequestFind;

import org.junit.jupiter.api.Test;
import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.DisplayName;
import java.util.*;

import static org.junit.jupiter.api.Assertions.assertEquals;

public class TestRequestFind {


    private RequestFind findRequest;

    @BeforeEach
    public void createConfigurationForTestCases(){
        distanceRequest = new RequestFind();
        distanceRequest.buildResponse();
    }

    @Test
    @DisplayName("Request type is \"find\"")
    public void testType()
    {
        String type = findRequest.getRequestType();
        assertEquals("find", type);
    }

    @Test
    @DisplayName("Version Number is equal to 2")
    public void testVersion()
    {
        Integer version = findRequest.getRequestVersion();
        assertEquals(2, version);
    }

    @Test
    @DisplayName("Current match is empty")
    public void testMatch()
    {
        String match = findRequest.getMatch();
        assertEquals("", match);
    }

    @Test
    @DisplayName("Limit is equal to 100")
    public void testLimit()
    {
        Integer limit = findRequest.getLimit();
        assertEquals(100, limit);
    }

    @Test
    @DisplayName("Found is equal to 0")
    public void testFound()
    {
        Integer found = findRequest.getFound();
        assertEquals(0, found);
    }

}