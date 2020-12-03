package com.tco.requests;

import com.tco.functionality.Find;
import com.tco.functionality.Narrow;
import com.tco.functionality.Place;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;

import java.util.ArrayList;

public class RequestFind extends RequestHeader{

    public static final int MAX_LIMIT = 100;

    private Integer found;
    String match;
    Integer limit;
    Narrow narrow;
    private ArrayList<Place> places;

    private final transient Logger log = LoggerFactory.getLogger(RequestFind.class);

    public RequestFind(){
        this.requestType = "find";
        this.requestVersion = RequestHeader.CURRENT_SUPPORTED_VERSION;
    }

    @Override
    public void buildResponse() {

        Find f = new Find(this.match, this.limit, this.narrow);
        this.found = f.getFound();
        this.places = f.getPlaces();

        log.trace("buildResponse -> {}", this);
    }

    public Integer getLimit() {
        return limit;
    }

    public String getMatch() { return match; }

    public Integer getFound() { return found; }

    public ArrayList<Place> getPlaces() { return places; }

}