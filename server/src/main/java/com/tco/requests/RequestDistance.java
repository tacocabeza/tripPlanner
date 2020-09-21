package com.tco.requests;

import java.util.*;
import com.tco.misc.BadRequestException;
import com.tco.misc.DistanceCalculator;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;

public class RequestDistance extends RequestHeader{
    private Integer distance;
    Float earthRadius;
    Map<String,String> place1;
    Map<String,String> place2;

    DistanceCalculator distanceCalculator;

    private final transient Logger log = LoggerFactory.getLogger(RequestDistance.class);


    public RequestDistance(){
        this.requestType = "distance";
        this.distanceCalculator = new DistanceCalculator();
        this.place1 = new HashMap<String,String>();
        this.place2 = new HashMap<String,String>();
        this.requestVersion = RequestHeader.CURRENT_SUPPORTED_VERSION;
    }
    // never called but for testing purposes
    public RequestDistance(Float radius, String lat1, String lon1, String lat2, String lon2){
        this();
        this.distance = null;
        this.earthRadius = radius;
        this.place1 = new HashMap<String,String>();
        this.place1.put("latitude", lat1);
        this.place1.put("longitude", lon1);

        this.place2 = new HashMap<String,String>();
        this.place2.put("latitude", lat2);
        this.place2.put("longitude", lon2);
    }

    @Override
    public void buildResponse(){
        this.distance = distanceCalculator.calculateGreatCircleDistance(place1,place2,earthRadius);
        log.trace("buildResponse -> {}", this);
    }

    public Integer getDistance() {
        return distance;
    }

    public Float getEarthRadius()
    {
        return earthRadius;
    }


}