package com.tco.functionality;

public class Place {

    public Integer altitude;
    public String id;
    public String municipality;
    public String name;
    public String type;

    private String latitude;
    private String longitude;

    public Place(String latitude, String longitude){
        this.setLatitudeLongitude(latitude, longitude);
    }

    public Place(String latitude, String longitude, Integer altitude){
        this.setLatitudeLongitude(latitude, longitude);
        this.altitude = altitude;
    }

    public String getLatitude() {
        return latitude;
    }

    public void setLatitudeLongitude(String latitude, String longitude) {
        Double dlat = new Double(latitude);
        Double dlon = new Double(longitude);
        if(dlat < -90 || dlat > 90){
            throw new IllegalArgumentException("Latitude " + latitude + " is not in range [-90.0,90.0]");
        }
        this.latitude = latitude;
        if(dlon < -180 || dlon > 180){
            throw new IllegalArgumentException("Longitude " + longitude + " is not in range [-180.0,180.0]");
        }
        this.longitude = longitude;
    }

    public String getLongitude() {
        return longitude;
    }

    @Override
    public String toString() {
        return "Place{" +
                "id='" + id + '\'' +
                ", municipality='" + municipality + '\'' +
                ", name='" + name + '\'' +
                ", type='" + type + '\'' +
                ", altitude=" + altitude +
                ", latitude=" + latitude +
                ", longitude=" + longitude +
                '}';
    }
}