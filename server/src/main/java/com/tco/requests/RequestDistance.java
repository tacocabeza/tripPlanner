package com.tco.requests;

import com.tco.misc.BadRequestException;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import java.util.*;

public class RequestDistance extends RequestHeader{
    private Integer distance;
    private Float earthRadius;
    private Map<String,String> place1, place2;


    private final transient Logger log = LoggerFactory.getLogger(RequestDistance.class);


    public RequestDistance(){
        this.requestType = "distance";
        this.requestVersion = RequestHeader.CURRENT_SUPPORTED_VERSION;
    }

    public RequestDistance(Float radius, String lat1, String lon1, String lat2, String lon2){
        this();
        this.distance = null;
        this.earthRadius = radius;
        this.place1 = new HashMap();
        this.place1.put("latitude", lat1);
        this.place1.put("longitude", lon1);
        this.place2.put("latitude", lat2);
        this.place2.put("longitude", lon2);
    }

    @Override
    public void buildResponse(){
        this.distance = 199;
        log.trace("buildResponse -> {}", this);
    }

    public Integer getDistance() {
        return distance;
    }
}