package com.tco.requests;

import com.tco.functionality.Options;
import com.tco.misc.BadRequestException;
import com.tco.misc.DistanceCalculator;

import java.util.ArrayList;
import java.util.HashMap;

public class RequestTrip extends RequestHeader{

    ArrayList<HashMap<String,String>> places;
    Options options;
    private Long [] distances;

    public RequestTrip(){
        this.requestType = "trip";
        this.places = new ArrayList<>();
        this.requestVersion = RequestHeader.CURRENT_SUPPORTED_VERSION;
    }


    @Override
    public void buildResponse(){
        DistanceCalculator distanceCalculator = new DistanceCalculator();

        distances = distanceCalculator.calculateDistances(places, options);
    }

    Long[] getDistances()
    {
        return distances;
    }
}
