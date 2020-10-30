package com.tco.requests;

import com.tco.functionality.Place;
import com.tco.requests.RequestConfig;
import com.tco.requests.RequestFind;

import org.junit.jupiter.api.Test;
import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.DisplayName;

import java.lang.reflect.Array;
import java.util.*;

import static com.tco.requests.RequestFind.MAX_LIMIT;
import static org.junit.jupiter.api.Assertions.assertEquals;

public class TestRequestFind {


    private RequestFind findRequest;

    @BeforeEach
    public void createConfigurationForTestCases(){
        findRequest = new RequestFind();
        findRequest.match = "Heli@#";
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
    @DisplayName("Version Number is equal to 3")
    public void testVersion()
    {
        Integer version = findRequest.getRequestVersion();
        assertEquals(3, version);
    }

    @Test
    @DisplayName("Current match is 'Heli@#'")
    public void testMatch()
    {
        String match = findRequest.getMatch();
        assertEquals("Heli@#", match);
    }

    @Test
    @DisplayName("Found is equal to 9403")
    public void testFound()
    {
        Integer found = findRequest.getFound();
        assertEquals(9403, found);
    }

    @Test
    @DisplayName("Test Places")
    public void testPlaces()
    {
        ArrayList<Place> places = findRequest.getPlaces();
        assertEquals(MAX_LIMIT, places.size());
    }

}