package com.tco.functionality;

import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.DisplayName;
import org.junit.jupiter.api.Test;

import java.util.ArrayList;

import static com.tco.requests.RequestFind.MAX_LIMIT;
import static org.junit.jupiter.api.Assertions.assertEquals;

public class TestFind {

    private Find findMatchLimit;
    private Find findMatchZeroLimit;
    private Find findMatchNoLimit;

    private Find findEmptyMatchLimit;
    private Find findEmptyMatchZeroLimit;
    private Find findEmptyMatchNoLimit;

    private Find findNoMatchLimit;
    private Find findNoMatchZeroLimit;
    private Find findNoMatchNoLimit;

    @BeforeEach
    public void initFinds(){
        findMatchLimit = new Find("Heli@#",4);
        findMatchZeroLimit = new Find("Heli@#",0);
        findMatchNoLimit = new Find("Heli@#",null);

        findEmptyMatchLimit = new Find("",4);
        findEmptyMatchZeroLimit = new Find("",0);
        findEmptyMatchNoLimit = new Find("", null);

        findNoMatchLimit = new Find(null,4);
        findNoMatchZeroLimit = new Find(null,0);
        findNoMatchNoLimit = new Find(null,null);
    }

    @Test
    @DisplayName("Test Match, Limit")
    public void testMatchLimit(){
        ArrayList<Place> places = findMatchLimit.getPlaces();
        assertEquals(4, places.size());
        assertEquals(9403, findMatchLimit.getFound());
    }

    @Test
    @DisplayName("Test Match, Zero Limit")
    public void testMatchZeroLimit(){
        ArrayList<Place> places = findMatchZeroLimit.getPlaces();
        assertEquals(MAX_LIMIT, places.size());
        assertEquals(9403, findMatchZeroLimit.getFound());
    }

    @Test
    @DisplayName("Test Match, No Limit")
    public void testMatchNoLimit(){
        ArrayList<Place> places = findMatchNoLimit.getPlaces();
        assertEquals(MAX_LIMIT, places.size());
        assertEquals(9403, findMatchNoLimit.getFound());
    }

    @Test
    @DisplayName("Test Empty Match, Limit")
    public void testEmptyMatchLimit(){
        ArrayList<Place> places = findEmptyMatchLimit.getPlaces();
        assertEquals(4, places.size());
        assertEquals(4, findEmptyMatchLimit.getFound());
    }

    @Test
    @DisplayName("Test Empty Match, Zero Limit")
    public void testEmptyMatchZeroLimit(){
        ArrayList<Place> places = findEmptyMatchZeroLimit.getPlaces();
        assertEquals(MAX_LIMIT, places.size());
        assertEquals(MAX_LIMIT, findEmptyMatchZeroLimit.getFound());
    }

    @Test
    @DisplayName("Test Empty Match, No Limit")
    public void testEmptyMatchNoLimit(){
        ArrayList<Place> places = findEmptyMatchNoLimit.getPlaces();
        assertEquals(1, places.size());
        assertEquals(1, findEmptyMatchNoLimit.getFound());
    }

    @Test
    @DisplayName("Test No Match, Limit")
    public void testNoMatchLimit(){
        ArrayList<Place> places = findNoMatchLimit.getPlaces();
        assertEquals(4, places.size());
        assertEquals(4, findNoMatchLimit.getFound());
    }

    @Test
    @DisplayName("Test No Match, Zero Limit")
    public void testNoMatchZeroLimit(){
        ArrayList<Place> places = findNoMatchZeroLimit.getPlaces();
        assertEquals(MAX_LIMIT, places.size());
        assertEquals(MAX_LIMIT, findNoMatchZeroLimit.getFound());
    }

    @Test
    @DisplayName("Test No Match, No Limit")
    public void testNoMatchNoLimit(){
        ArrayList<Place> places = findNoMatchNoLimit.getPlaces();
        assertEquals(1, places.size());
        assertEquals(1, findNoMatchNoLimit.getFound());
    }

    @Test
    @DisplayName("Test Get Places")
    public void testGetPlaces(){
        ArrayList<Place> places = findMatchLimit.getPlaces();
        for (Place place : places) {
            assert (place != null);
        }
    }

    @Test
    @DisplayName("Test No Records")
    public void testNoRecords(){
        Find f = new Find("YOU WERE MY BROTHER ANAKIN",6);
        assertEquals(0,f.getFound());
        assertEquals(0,f.getPlaces().size());
    }
}