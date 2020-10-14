package com.tco.functionality;

public class Options {


    private String title;
    private String earthRadius;

    public Options(String title, String earthRadius)
    {
        this.title = title;
        this.earthRadius = earthRadius;
    }


    public Options(String earthRadius)
    {
        this("", earthRadius);
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
}
