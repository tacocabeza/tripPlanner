package com.tco.functionality;

public class Place {

    public String altitude;
    public String id;
    public String latitude;
    public String longitude;
    public String municipality;
    public String name;
    public String type;
    public String region;
    public String country;
    public String url;

    public Place(String latitude, String longitude, String altitude){
        this.latitude = latitude;
        this.longitude = longitude;
        this.altitude = altitude;
    }

}