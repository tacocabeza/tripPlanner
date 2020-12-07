package com.tco.requests;

import com.tco.functionality.Options;
import com.tco.misc.DistanceCalculator;
import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.DisplayName;
import org.junit.jupiter.api.Test;

import java.util.HashMap;

import static org.junit.jupiter.api.Assertions.assertArrayEquals;
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
    @DisplayName("Version number is equal to 5")
    public void testVersion() {
        int version = requestTrip.getRequestVersion();
        assertEquals(4, version);
    }

    @Test
    @DisplayName("Distances should be [562,439,162")
    public void testGetDistances()
    {
        HashMap<String, String> juarez = new HashMap<>();
        juarez.put("latitude", "31.6904");
        juarez.put("longitude", "106.4245");
        requestTrip.places.add(juarez);
        HashMap<String, String> denver = new HashMap<>();
        denver.put("latitude", "39.7392");
        denver.put("longitude", "104.9903");
        requestTrip.places.add(denver);
        HashMap<String,String>  roswell = new HashMap<>();
        roswell.put("latitude", "33.3943");
        roswell.put("longitude", "104.5230");
        requestTrip.places.add(roswell);
        DistanceCalculator distanceCalculator = new DistanceCalculator();
        requestTrip.options = new Options("3959.0");
        requestTrip.options.setResponse("0.0");

        requestTrip.buildResponse();

        Long[] expected = new Long[]{562L,439L,162L};

        assertArrayEquals(expected,requestTrip.getDistances());

    }
}
