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


    private final transient Logger log = LoggerFactory.getLogger(RequestDistance.class);


    public RequestDistance(){
        this.requestType = "distance";
        this.place1 = new HashMap<String,String>();
        this.place2 = new HashMap<String,String>();
        this.requestVersion = RequestHeader.CURRENT_SUPPORTED_VERSION;
    }

    @Override
    public void buildResponse(){
        DistanceCalculator distanceCalculator = new DistanceCalculator();
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