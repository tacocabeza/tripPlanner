package com.tco.functionality;

import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.DisplayName;
import org.junit.jupiter.api.Test;

import static org.junit.jupiter.api.Assertions.*;

public class TestPlace {

    private Place place;

    @BeforeEach
    public void createPlaceForTestCases() {
        place = new Place(39.2203,-105.9927,10160);
        place.setId("0CO1");
        place.setMunicipality("Leadville");
        place.setName("Periodic Brewing");
        place.setType("brewery");
    }

    @Test
    @DisplayName("Get Altitude")
    public void testGetAltitude(){
        assertEquals(10160,place.getAltitude());
    }

    @Test
    @DisplayName("Set Altitude Valid")
    public void testSetAltitudeValid(){
        place.setAltitude(345);
        assertEquals(345,place.getAltitude());
        place.setAltitude(0);
        assertEquals(0,place.getAltitude());
    }

    @Test
    @DisplayName("Set Altitude Invalid")
    public void testSetAltitudeInvalid(){
        try{
            place.setAltitude(-314);
            fail("Should have thrown an exception");
        } catch(IllegalArgumentException e){
            assertEquals(10160, place.getAltitude());
        }
    }

    @Test
    @DisplayName("Get Latitude")
    public void testGetLatitude(){
        assertEquals(39.2203,place.getLatitude());
    }

    @Test
    @DisplayName("Set Latitude Valid")
    public void testSetLatitudeValid(){
        place.setLatitude(90);
        assertEquals(90,place.getLatitude());
        place.setLatitude(0);
        assertEquals(0,place.getLatitude());
        place.setLatitude(-90);
        assertEquals(-90,place.getLatitude());
    }

    @Test
    @DisplayName("Set Latitude Invalid")
    public void testSetLatitudeInvalid(){
        try{
            place.setLatitude(-90.0001);
            fail("Should have thrown an exception");
        } catch(IllegalArgumentException e){
            assertEquals(39.2203, place.getLatitude());
        }
        try{
            place.setLatitude(90.0001);
            fail("Should have thrown an exception");
        } catch(IllegalArgumentException e){
            assertEquals(39.2203, place.getLatitude());
        }
    }

    @Test
    @DisplayName("Get Longitude")
    public void testGetLongitude(){
        assertEquals(-105.9927,place.getLongitude());
    }

    @Test
    @DisplayName("Set Longitude Valid")
    public void testSetLongitudeValid(){
        place.setLongitude(180);
        assertEquals(180,place.getLongitude());
        place.setLongitude(0);
        assertEquals(0,place.getLongitude());
        place.setLongitude(-180);
        assertEquals(-180,place.getLongitude());
    }

    @Test
    @DisplayName("Set Longitude Invalid")
    public void testSetLongitudeInvalid(){
        try{
            place.setLongitude(-180.0001);
            fail("Should have thrown an exception");
        } catch(IllegalArgumentException e){
            assertEquals(-105.9927, place.getLongitude());
        }
        try{
            place.setLongitude(180.0001);
            fail("Should have thrown an exception");
        } catch(IllegalArgumentException e){
            assertEquals(-105.9927, place.getLongitude());
        }
    }
}