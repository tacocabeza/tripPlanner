package com.tco.requests;

import com.tco.requests.RequestConfig;
import com.tco.requests.RequestFind;

import org.junit.jupiter.api.Test;
import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.DisplayName;
import java.util.*;

import static com.tco.requests.RequestFind.MAX_LIMIT;
import static org.junit.jupiter.api.Assertions.assertEquals;

public class TestRequestFind {


    private RequestFind findRequest;

    @BeforeEach
    public void createConfigurationForTestCases(){
        findRequest = new RequestFind();
        findRequest.match = "_____Airport";
        findRequest.buildResponse();
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
    @DisplayName("Current match is '_____Airport'")
    public void testMatch()
    {
        String match = findRequest.getMatch();
        assertEquals("_____Airport", match);
    }

    @Test
    @DisplayName("Limit is equal to MAX_LIMIT")
    public void testLimit()
    {
        Integer limit = findRequest.getLimit();
        assertEquals(MAX_LIMIT, limit);
    }

    @Test
    @DisplayName("Found is equal to 728")
    public void testFound()
    {
        Integer found = findRequest.getFound();
        assertEquals(728, found);
    }

    @Test
    @DisplayName("Test Places")
    public void testPlaces()
    {
        Integer places = findRequest.getPlaces();
        assertEquals(MAX_LIMIT, places);
    }

}