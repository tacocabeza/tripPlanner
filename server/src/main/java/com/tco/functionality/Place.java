package com.tco.functionality;

public class Place {

    public Integer altitude;
    public String id;
    public String municipality;
    public String name;
    public String type;

    private Double latitude;
    private Double longitude;

    public Place(Double latitude, Double longitude){
        this.setLatitudeLongitude(latitude, longitude);
    }

    public Place(Double latitude, Double longitude, Integer altitude){
        this.setLatitudeLongitude(latitude, longitude);
        this.altitude = altitude;
    }

    public Double getLatitude() {
        return latitude;
    }

    public void setLatitudeLongitude(Double latitude, Double longitude) {
        if(latitude < -90 || latitude > 90){
            throw new IllegalArgumentException("Latitude " + latitude + " is not in range [-90.0,90.0]");
        }
        this.latitude = latitude;
        if(longitude < -180 || longitude > 180){
            throw new IllegalArgumentException("Longitude " + longitude + " is not in range [-180.0,180.0]");
        }
        this.longitude = longitude;
    }

    public Double getLongitude() {
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