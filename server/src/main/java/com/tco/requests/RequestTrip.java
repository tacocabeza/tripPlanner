package com.tco.requests;

import com.tco.misc.BadRequestException;

public class RequestTrip extends RequestHeader{

    Long [] distances;
    public RequestTrip(){
        this.requestType = "trip";
        this.requestVersion = RequestHeader.CURRENT_SUPPORTED_VERSION;
    }


    @Override
    public void buildResponse(){
        distances = new Long[]{1L,2L,3L};
    }
}
