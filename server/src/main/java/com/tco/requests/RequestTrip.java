package com.tco.requests;

import com.tco.functionality.OptimizeTrip;
import com.tco.functionality.Options;
import com.tco.misc.BadRequestException;
import com.tco.misc.DistanceCalculator;

import java.util.ArrayList;
import java.util.HashMap;

public class RequestTrip extends RequestHeader{

    public ArrayList<HashMap<String,String>> places;
    public Options options;
    private Long [] distances;

    public RequestTrip(){
        this.requestType = "trip";
        this.places = new ArrayList<>();
        this.options = new Options();
        this.requestVersion = RequestHeader.CURRENT_SUPPORTED_VERSION;
    }


    @Override
    public void buildResponse(){
        DistanceCalculator distanceCalculator = new DistanceCalculator();
        OptimizeTrip optimizeTrip = new OptimizeTrip();
        System.out.println(options.getTripTitle());
        System.out.println(options.getEarthRadius());
        System.out.println(options.getUnits());
        System.out.println(options.getResponse());

        if(options.isOptimized()){
            places = optimizeTrip.nearestNeighbor(places, options);
        }
        distances = distanceCalculator.calculateDistances(places, options);
    }

    Long[] getDistances()
    {
        return distances;
    }
}
