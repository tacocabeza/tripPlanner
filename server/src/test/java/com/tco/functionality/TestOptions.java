package com.tco.functionality;
import com.tco.functionality.Options;
import org.junit.jupiter.api.Test;
import static org.junit.jupiter.api.Assertions.assertEquals;

public class TestOptions {

    Options options = new Options("Feather Friends: One Last Flight", "3959", "7.0");

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

}
