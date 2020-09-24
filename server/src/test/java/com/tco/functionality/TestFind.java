package com.tco.functionality;

import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.DisplayName;
import org.junit.jupiter.api.Test;

import java.util.ArrayList;

import static org.junit.jupiter.api.Assertions.assertEquals;

public class TestFind {

    private Find findMatchLimit;
    private Find findMatchNoLimit;
    private Find findNoMatch;

    @BeforeEach
    public void initFinds(){
        findMatchLimit = new Find("A.*%_$[]()!@#;",3);
        findMatchNoLimit = new Find("A.*%_$[]()!@#;",0);
        findNoMatch = new Find("",4);
    }

    @Test
    @DisplayName("Test Match")
    public void testMatch(){
        assert(findMatchLimit.getMatch().equals("A_____________"));
    }

    @Test
    @DisplayName("Test Empty Match")
    public void testEmptyMatch(){
        ArrayList<Place> places = findNoMatch.getPlaces();
        assertEquals(1, places.size());
    }

    @Test
    @DisplayName("Test Limit")
    public void testLimit(){
        ArrayList<Place> places = findMatchLimit.getPlaces();
        assertEquals(findMatchLimit.getLimit(), places.size());
    }

    @Test
    @DisplayName("Test No Limit")
    public void testNoLimit(){
        ArrayList<Place> places = findMatchNoLimit.getPlaces();
        assertEquals(Find.MAX_LIMIT, places.size());
    }

    @Test
    @DisplayName("Test Found")
    public void testFound(){
        findMatchLimit.getPlaces();
        assertEquals(319, findMatchLimit.getFound());
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