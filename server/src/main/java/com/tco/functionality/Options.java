package com.tco.functionality;

public class Options {


    private String tripTitle;
    private String earthRadius;

    public Options(String tripTitle, String earthRadius)
    {
        this.tripTitle = tripTitle;
        this.earthRadius = earthRadius;
    }


    public Options(String earthRadius)
    {
        this("", earthRadius);
    }

    public void setEarthRadius(String earthRadius) {
        this.earthRadius = earthRadius;
    }

    public void setTripTitle(String tripTitle) {
        this.tripTitle = tripTitle;
    }

    public String getEarthRadius() {
        return earthRadius;
    }

    public String getTripTitle() {
        return tripTitle;
    }
}
