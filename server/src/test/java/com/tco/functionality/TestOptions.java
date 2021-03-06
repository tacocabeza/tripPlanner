package com.tco.functionality;
import com.tco.functionality.Options;
import org.junit.jupiter.api.Test;
import static org.junit.jupiter.api.Assertions.assertEquals;

public class TestOptions {

    Options options = new Options("Feather Friends: One Last Flight", "3959", "7.0", "miles");

    @Test
    public void testGetTripTitle()
    {
        assertEquals("Feather Friends: One Last Flight", options.getTripTitle());
    }

    @Test
    public void testSetTripTitle()
    {
        options.setTripTitle("Feather Friends: Chirp Off The Old Block");
        assertEquals("Feather Friends: Chirp Off The Old Block", options.getTripTitle());
    }

    @Test
    public void testGetEarthRadius()
    {
        assertEquals("3959", options.getEarthRadius());
    }

    @Test
    public void testSetEarthRadius()
    {
        options.setEarthRadius("1");
        assertEquals("1", options.getEarthRadius());
    }

    @Test
    public void testGetOptions(){
        assertEquals("7.0", options.getResponse());
    }

    @Test
    public void testGetUnits(){
        assertEquals("miles", options.getUnits());
    }

    @Test
    public void testSetResponse(){
        options.setResponse("10.0");
        assertEquals("10.0", options.getResponse());
    }

    @Test
    public void testIsOptimized(){
        options.setResponse("0.0");
        assertEquals(false, options.isOptimized());
    }

}
