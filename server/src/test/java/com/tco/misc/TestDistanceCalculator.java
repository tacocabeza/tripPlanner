package com.tco.misc;

import com.tco.functionality.Options;
import org.junit.jupiter.api.DisplayName;
import org.junit.jupiter.api.Test;
import java.util.*;

import static org.junit.jupiter.api.Assertions.assertArrayEquals;
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
        Long distance = distanceCalculator.calculateGreatCircleDistance(place1,place2,3959d);
        assertEquals(334, distance);
    }


    @Test
    @DisplayName("A trip from Dallas, Newyork, Denver should have distances [1370, 1628, 663]")
    public void testCalculateDistances(){
        ArrayList<HashMap<String,String>> trip = new ArrayList<>();
        HashMap<String, String> dallas = new HashMap<>();
        dallas.put("latitude", "32.7767");
        dallas.put("longitude", "96.7970");

        HashMap<String, String> newyork = new HashMap<>();
        newyork.put("latitude", "40.7128");
        newyork.put("longitude", "74.0060");

        HashMap<String,String> denver = new HashMap<>();
        denver.put("latitude", "39.7392");
        denver.put("longitude", "104.9903");

        trip.add(dallas);
        trip.add(newyork);
        trip.add(denver);
        Options options = new Options("3959.0");

        Long[] distances = distanceCalculator.calculateDistances(trip, options);
        Long[] expected = new Long[]{1371L, 1628L, 663L};
        assertArrayEquals(expected, distances);
    }

}
