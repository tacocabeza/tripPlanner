package com.tco.requests;

import com.tco.requests.RequestConfig;
import com.tco.requests.RequestDistance;

import org.junit.jupiter.api.Test;
import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.DisplayName;
import java.util.*;

import static org.junit.jupiter.api.Assertions.assertEquals;
import static org.junit.jupiter.api.Assertions.assertNull;

public class TestRequestDistance {


    private RequestDistance distanceRequest;

    @BeforeEach
    public void createConfigurationForTestCases(){
        distanceRequest = new RequestDistance();
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

        distanceRequest.earthRadius = 3959d;
        System.out.println(distanceRequest.earthRadius);

        distanceRequest.place1.put("latitude", "40.3772");
        distanceRequest.place1.put("longitude", "105.5217");

        distanceRequest.place2.put("latitude", "38.0228");
        distanceRequest.place2.put("longitude", "107.6714");

        distanceRequest.buildResponse();

        Long distance = distanceRequest.getDistance();


        assertEquals(199, distance);
    }
    @Test
    public void testDistanceInitial()
    {
        assertNull(distanceRequest.getDistance());
    }
    @Test
    public void testLat1NullInitial()
    {
        assertNull(distanceRequest.place1.get("latitude"));
    }

    @Test
    public void testLong1NullInitial()
    {
        assertNull(distanceRequest.place1.get("longitude"));
    }

    @Test
    public void testLat2NullInitial()
    {
        assertNull(distanceRequest.place2.get("latitude"));
    }

    @Test
    public void testLong2Initial()
    {
        assertNull(distanceRequest.place2.get("longitude"));
    }
    @Test
    public void testEarthRadius()
    {
        assertNull(distanceRequest.getEarthRadius());
    }
}