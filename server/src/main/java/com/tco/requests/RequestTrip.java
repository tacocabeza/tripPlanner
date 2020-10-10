package com.tco.requests;

import com.tco.misc.BadRequestException;

public class RequestTrip extends RequestHeader{

    public RequestTrip(){
        this.requestType = "trip";
        this.requestVersion = RequestHeader.CURRENT_SUPPORTED_VERSION;
    }


    @Override
    public void buildResponse() throws BadRequestException {

    }
}
