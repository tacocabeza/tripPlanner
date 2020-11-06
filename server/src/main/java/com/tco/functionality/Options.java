package com.tco.functionality;

public class Options {


    private String title;
    private String earthRadius;
    private String response;

    public Options(){

    }
    public Options(String title, String earthRadius, String response)
    {
        this.title = title;
        this.response = response;
        this.earthRadius = earthRadius;
    }


    public Options(String earthRadius)
    {
        this("", earthRadius, "5.0");
    }

    public void setEarthRadius(String earthRadius) {
        this.earthRadius = earthRadius;
    }

    public void setTripTitle(String title) {
        this.title = title;
    }

    public String getEarthRadius() {
        return earthRadius;
    }

    public String getTripTitle() {
        return title;
    }

    public String getResponse(){return response;}
}
