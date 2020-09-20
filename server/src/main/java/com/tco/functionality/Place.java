package com.tco.functionality;

public class Place {

    public String id;
    public String municipality;
    public String name;
    public String type;

    private Integer altitude;
    private Double latitude;
    private Double longitude;

    public Place(Double latitude, Double longitude){
        this.setLatitude(latitude);
        this.setLongitude(longitude);
    }

    public Place(Double latitude, Double longitude, Integer altitude){
        this.setLatitude(latitude);
        this.setLongitude(longitude);
        this.setAltitude(altitude);
    }

    public Integer getAltitude() {
        return altitude;
    }

    public void setAltitude(Integer altitude) {
        if(altitude < 0){
            throw new IllegalArgumentException("Altitude " + altitude + " is not positive.");
        }
        this.altitude = altitude;
    }

    public Double getLatitude() {
        return latitude;
    }

    public void setLatitude(Double latitude) {
        if(latitude < -90 || latitude > 90){
            throw new IllegalArgumentException("Latitude " + latitude + " is not in range [-90.0,90.0]");
        }
        this.latitude = latitude;
    }

    public Double getLongitude() {
        return longitude;
    }

    public void setLongitude(Double longitude) {
        if(longitude < -180 || longitude > 180){
            throw new IllegalArgumentException("Longitude " + longitude + " is not in range [-180.0,180.0]");
        }
        this.longitude = longitude;
    }

}