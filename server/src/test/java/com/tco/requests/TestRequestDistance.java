package com.tco.requests;

import com.tco.requests.RequestConfig;

import org.junit.jupiter.api.Test;
import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.DisplayName;
import java.util.*;

import static org.junit.jupiter.api.Assertions.assertEquals;

public class TestRequestDistance {


    private RequestDistance distanceRequest;

    @BeforeEach
    public void createConfigurationForTestCases(){
        distanceRequest = new RequestDistance();
        distanceRequest.buildResponse();
    }

    @Test
    @DisplayName("Request type is \"distance\"")
    public void testType()
    {
        String type = distanceRequest.getRequestType();
        assertEquals("distance", type);
    }

    @Test
    @DisplayName("Version Number is equal to 2")
    public void testVersion()
    {
        Integer version = distanceRequest.getRequestVersion();
        assertEquals(2, version);
    }

    @Test
    @DisplayName("The Distance from Estes Park(40.3772° N, 105.5217° W) to Ouray Colorado (38.0228° N, 107.6714° W) is 199 mi")
    public void testDistance()
    {
        Integer distance = distanceRequest.getDistance();
        assertEquals(199, distance);
    }

}