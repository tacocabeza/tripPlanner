package com.tco.functionality;

import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.DisplayName;
import org.junit.jupiter.api.Test;

import static org.junit.jupiter.api.Assertions.*;

public class TestPlace {

    private Place place;

    @BeforeEach
    public void createPlaceForTestCases() {
        place = new Place("39.2203","-105.9927",10160);
    }

    @Test
    @DisplayName("Get Latitude")
    public void testGetLatitude(){
        assertEquals("39.2203",place.getLatitude());
    }

    @Test
    @DisplayName("Set Latitude Valid")
    public void testSetLatitudeValid(){
        place.setLatitudeLongitude("90.0", "0.0");
        assertEquals("90.0",place.getLatitude());
        place.setLatitudeLongitude("0.0", "0.0");
        assertEquals("0.0",place.getLatitude());
        place.setLatitudeLongitude("-90.0", "0.0");
        assertEquals("-90.0",place.getLatitude());
    }

    @Test
    @DisplayName("Set Latitude Invalid")
    public void testSetLatitudeInvalid(){
        try{
            place.setLatitudeLongitude("-90.0001", "0.0");
            fail("Should have thrown an exception");
        } catch(IllegalArgumentException e){
            assertEquals("39.2203", place.getLatitude());
        }
        try{
            place.setLatitudeLongitude("90.0001", "0.0");
            fail("Should have thrown an exception");
        } catch(IllegalArgumentException e){
            assertEquals("39.2203", place.getLatitude());
        }
    }

    @Test
    @DisplayName("Get Longitude")
    public void testGetLongitude(){
        assertEquals("-105.9927",place.getLongitude());
    }

    @Test
    @DisplayName("Set Longitude Valid")
    public void testSetLongitudeValid(){
        place.setLatitudeLongitude("0.0", "180.0");
        assertEquals("180.0",place.getLongitude());
        place.setLatitudeLongitude("0.0", "0.0");
        assertEquals("0.0",place.getLongitude());
        place.setLatitudeLongitude("0.0", "-180.0");
        assertEquals("-180.0",place.getLongitude());
    }

    @Test
    @DisplayName("Set Longitude Invalid")
    public void testSetLongitudeInvalid(){
        try{
            place.setLatitudeLongitude("0.0", "-180.0001");
            fail("Should have thrown an exception");
        } catch(IllegalArgumentException e){
            assertEquals("-105.9927", place.getLongitude());
        }
        try{
            place.setLatitudeLongitude("0.0","180.0001");
            fail("Should have thrown an exception");
        } catch(IllegalArgumentException e){
            assertEquals("-105.9927", place.getLongitude());
        }
    }
}