package com.tco.functionality;
import com.tco.misc.DistanceCalculator;
import org.junit.jupiter.api.Test;

import java.util.ArrayList;
import java.util.Arrays;
import java.util.HashMap;

import static org.junit.jupiter.api.Assertions.assertFalse;


public class TestOptimizeTrip {

    private Options options = new Options("trip", "3959.0","10.0", "miles");
    private DistanceCalculator distanceCalculator= new DistanceCalculator();
    @Test
    public void testNearestNeighbor(){
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

        OptimizeTrip optimizeTrip = new OptimizeTrip(trip, options);

        ArrayList<HashMap<String,String>> places = optimizeTrip.nearestNeighbor();


        Long[] unOptimized = new Long[]{1371L, 1628L, 663L};

        assertFalse(Arrays.equals(unOptimized, distanceCalculator.calculateDistances(places,options)));
    }

}
