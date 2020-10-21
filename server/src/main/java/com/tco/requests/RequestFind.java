package com.tco.requests;

import com.tco.misc.BadRequestException;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import com.tco.functionality.Place;
import com.tco.functionality.Find;
import java.util.*;

public class RequestFind extends RequestHeader{

    public static final int MAX_LIMIT = 100;

    private Integer found;
    String match;
    Integer limit;
    private Integer sentLimit;
    private ArrayList<Place> places;


    private final transient Logger log = LoggerFactory.getLogger(RequestFind.class);


    public RequestFind(){
        this.requestType = "find";
        this.match = "";
        this.limit = 0;
        this.sentLimit = 0;
        this.requestVersion = RequestHeader.CURRENT_SUPPORTED_VERSION;
    }

    @Override
    public void buildResponse() {
        if (limit == null) {
            this.sentLimit = 1;
        } else {
            this.sentLimit = limit;
        }
        Find f = new Find(match, this.sentLimit);
        this.found = f.getFound();
        this.places = f.getPlaces();
        log.trace("buildResponse -> {}", this);
    }

    public Integer getLimit() {
        return limit;
    }

    public String getMatch() { return match; }

    public Integer getFound() { return found; }

    public Integer getPlaces() { return places.size(); }

}