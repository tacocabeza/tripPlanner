package com.tco.requests;

import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.DisplayName;
import org.junit.jupiter.api.Test;

import static org.junit.jupiter.api.Assertions.assertEquals;

public class TestRequestTrip {

    private  RequestTrip requestTrip;
    @BeforeEach
    public void createConfigurationForTestCases()
    {
        requestTrip = new RequestTrip();
        requestTrip.buildResponse();
    }

    @Test
    @DisplayName("Request type is \"trip\"")
    public void testType() {
        String type = requestTrip.getRequestType();
        assertEquals("trip", type);
    }

    @Test
    @DisplayName("Version number is equal to 3")
    public void testVersion() {
        int version = requestTrip.getRequestVersion();
        assertEquals(3, version);
    }
}
