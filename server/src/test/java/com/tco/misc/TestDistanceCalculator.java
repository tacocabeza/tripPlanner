package com.tco.misc;

import org.junit.jupiter.api.DisplayName;
import org.junit.jupiter.api.Test;
import java.util.*;

import static org.junit.jupiter.api.Assertions.assertEquals;


public class TestDistanceCalculator {

    private DistanceCalculator distanceCalculator = new DistanceCalculator();
    private Map<String,String> place1 = new HashMap<>();
    private Map<String,String> place2 = new HashMap<>();

    public TestDistanceCalculator() {
        place1.put("latitude", "39.7392");
        place1.put("longitude", "104.9903");

        place2.put("latitude", "35.0844");
        place2.put("longitude", "106.6504");
    }

    @Test
    @DisplayName("Distance from Denver to Albuquerque should be 334")
    public void testDistanceCalculator()
    {
        Integer distance = distanceCalculator.calculateGreatCircleDistance(place1,place2,3959f);
        assertEquals(334, distance);
    }

}
