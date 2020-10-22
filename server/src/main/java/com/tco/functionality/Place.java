package com.tco.functionality;

public class Place {

    public String altitude;
    public String id;
    public String latitude;
    public String longitude;
    public String municipality;
    public String name;
    public String type;

    public Place(String latitude, String longitude, String altitude){
        this.latitude = latitude;
        this.longitude = longitude;
        this.altitude = altitude;
    }

}