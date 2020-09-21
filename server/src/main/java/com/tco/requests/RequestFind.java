package com.tco.requests;

import com.tco.misc.BadRequestException;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import com.tco.functionality.Place;
import com.tco.functionality.Find;
import java.util.*;

public class RequestFind extends RequestHeader{
    private Integer found;
    private String match;
    private Integer limit;
    private Array<Place> places;


    private final transient Logger log = LoggerFactory.getLogger(FindDistance.class);


    public RequestFind(){
        this.requestType = "find";
        this.requestVersion = RequestHeader.CURRENT_SUPPORTED_VERSION;
    }

    public RequestFind(String match){
        this();
        this.limit = 100;
        this.match = match;
        Find f = new Find(match, limit);
        this.found = f.getFound();
        this.places = f.getPlaces();

    }

    @Override
    public void buildResponse() {
        log.trace("buildResponse -> {}", this);
    }

    public Integer getLimit() {
        return limit;
    }

    public String getMatch() { return match; }

    public Integer getFound() { return found; }

}