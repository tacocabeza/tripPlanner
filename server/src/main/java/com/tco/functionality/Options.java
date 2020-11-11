package com.tco.functionality;

public class Options {


    private String title;
    private String earthRadius;
    private String response;
    private String units;

    public Options(){

    }
    public Options(String title, String earthRadius, String response, String units)
    {
        this.title = title;
        this.response = response;
        this.earthRadius = earthRadius;
        this.units = units;
    }


    public Options(String earthRadius)
    {
        this("", earthRadius, "5.0", "miles");
    }

    public void setEarthRadius(String earthRadius) {
        this.earthRadius = earthRadius;
    }

    public void setTripTitle(String title) {
        this.title = title;
    }

    public void setResponse(String response){this.response = response;}

    public String getEarthRadius() {
        return earthRadius;
    }

    public String getTripTitle() {
        return title;
    }

    public String getResponse(){return response;}

    public String getUnits(){return units;}

    public boolean isOptimized(){
        if(response == "0.0" || response == null) {
            return false;
        }

        else return true;
    }
}
