package com.tco.functionality;

import org.junit.jupiter.api.DisplayName;
import org.junit.jupiter.api.Test;

import java.util.ArrayList;

import static com.tco.requests.RequestFind.MAX_LIMIT;
import static org.junit.jupiter.api.Assertions.assertEquals;

public class TestFind {

    @Test
    @DisplayName("Test Match, Limit")
    public void testMatchLimit(){
        Find findMatchLimit = new Find("Heli@#",4, null);
        ArrayList<Place> places = findMatchLimit.getPlaces();
        assertEquals(4, places.size());
        assertEquals(9403, findMatchLimit.getFound());
    }

    @Test
    @DisplayName("Test Match, Zero Limit")
    public void testMatchZeroLimit(){
        Find findMatchZeroLimit = new Find("Heli@#",0, null);
        ArrayList<Place> places = findMatchZeroLimit.getPlaces();
        assertEquals(MAX_LIMIT, places.size());
        assertEquals(9403, findMatchZeroLimit.getFound());
    }

    @Test
    @DisplayName("Test Match, No Limit")
    public void testMatchNoLimit(){
        Find findMatchNoLimit = new Find("Heli@#",null, null);
        ArrayList<Place> places = findMatchNoLimit.getPlaces();
        assertEquals(MAX_LIMIT, places.size());
        assertEquals(9403, findMatchNoLimit.getFound());
    }

    @Test
    @DisplayName("Test Empty Match, Limit")
    public void testEmptyMatchLimit(){
        Find findEmptyMatchLimit = new Find("",4, null);
        ArrayList<Place> places = findEmptyMatchLimit.getPlaces();
        assertEquals(4, places.size());
        assertEquals(4, findEmptyMatchLimit.getFound());
    }

    @Test
    @DisplayName("Test Empty Match, Zero Limit")
    public void testEmptyMatchZeroLimit(){
        Find findEmptyMatchZeroLimit = new Find("",0, null);
        ArrayList<Place> places = findEmptyMatchZeroLimit.getPlaces();
        assertEquals(MAX_LIMIT, places.size());
        assertEquals(MAX_LIMIT, findEmptyMatchZeroLimit.getFound());
    }

    @Test
    @DisplayName("Test Empty Match, No Limit")
    public void testEmptyMatchNoLimit(){
        Find findEmptyMatchNoLimit = new Find("", null, null);
        ArrayList<Place> places = findEmptyMatchNoLimit.getPlaces();
        assertEquals(1, places.size());
        assertEquals(1, findEmptyMatchNoLimit.getFound());
    }

    @Test
    @DisplayName("Test No Match, Limit")
    public void testNoMatchLimit(){
        Find findNoMatchLimit = new Find(null,4, null);
        ArrayList<Place> places = findNoMatchLimit.getPlaces();
        assertEquals(4, places.size());
        assertEquals(4, findNoMatchLimit.getFound());
    }

    @Test
    @DisplayName("Test No Match, Zero Limit")
    public void testNoMatchZeroLimit(){
        Find findNoMatchZeroLimit = new Find(null,0, null);
        ArrayList<Place> places = findNoMatchZeroLimit.getPlaces();
        assertEquals(MAX_LIMIT, places.size());
        assertEquals(MAX_LIMIT, findNoMatchZeroLimit.getFound());
    }

    @Test
    @DisplayName("Test No Match, No Limit")
    public void testNoMatchNoLimit(){
        Find findNoMatchNoLimit = new Find(null,null, null);
        ArrayList<Place> places = findNoMatchNoLimit.getPlaces();
        assertEquals(1, places.size());
        assertEquals(1, findNoMatchNoLimit.getFound());
    }

    @Test
    @DisplayName("Test Get Places")
    public void testGetPlaces(){
        Find findMatchLimit = new Find("Heli@#",4, null);
        ArrayList<Place> places = findMatchLimit.getPlaces();
        for (Place place : places) {
            assert (place != null);
        }
    }

    @Test
    @DisplayName("Test No Records")
    public void testNoRecords(){
        Find f = new Find("YOU WERE MY BROTHER ANAKIN",6, null);
        assertEquals(0,f.getFound());
        assertEquals(0,f.getPlaces().size());
    }

    @Test
    @DisplayName("Test URL")
    public void testURL(){
        Find f_home_link = new Find("Hudson Bay Helicopters Heliport",0, null);
        assertEquals("http://hudsonbayheli.com/", f_home_link.getPlaces().get(0).url);

        Find f_wiki_link = new Find("Vatican City Heliport",0, null);
        assertEquals("http://en.wikipedia.org/wiki/Vatican_City_Heliport",
                f_wiki_link.getPlaces().get(0).url);
    }

    @Test
    @DisplayName("Test No Type, No Where")
    public void testNoTypeNoWhere(){
        Find findNoTypeNoWhere = new Find("Heli@#",0,
                new Narrow(null, null));
        assertEquals(9403, findNoTypeNoWhere.getFound());
    }

    @Test
    @DisplayName("Test No Type, Empty Where")
    public void testNoTypeEmptyWhere() {
        Find findNoTypeEmptyWhere = new Find("Heli@#",0,
                new Narrow(null, new String[] {}));
        assertEquals(9403, findNoTypeEmptyWhere.getFound());
    }

    @Test
    @DisplayName("Test No Type, 1 Where")
    public void testNoType1Where(){
        Find findNoType1Where = new Find("Heli@#",0,
                new Narrow(null, new String[] {"California"}));
        ArrayList<Place> places = findNoType1Where.getPlaces();
        assertEquals(9403, findNoType1Where.getFound());
        for(Place p : places){
            assert
        }
    }

    @Test
    @DisplayName("Test No Type, Multiple Where")
    public void testNoTypeMultipleWhere() {
        Find findNoTypeMultipleWhere = new Find("Heli@#",0,
                new Narrow(null, new String[] {"California", "Connecticut"}));
    }

    @Test
    @DisplayName("Test Empty Type, No Where")
    public void testEmptyTypeNoWhere() {
        Find findEmptyTypeNoWhere = new Find("Heli@#",0,
                new Narrow(new String[] {}, null));
    }

    @Test
    @DisplayName("Test Empty Type, Empty Where")
    public void testEmptyTypeEmptyWhere() {
        Find findEmptyTypeEmptyWhere = new Find("Heli@#",0,
                new Narrow(new String[] {}, new String[] {}));
    }

    @Test
    @DisplayName("Test Empty Type, 1 Where")
    public void testEmptyType1Where() {
        Find findEmptyType1Where = new Find("Heli@#",0,
                new Narrow(new String[] {}, new String[] {"California"}));
    }

    @Test
    @DisplayName("Test Empty Type, Multiple Where")
    public void testEmptyTypeMultipleWhere() {
        Find findEmptyTypeMultipleWhere = new Find("Heli@#",0,
                new Narrow(new String[] {}, new String[] {"California", "Connecticut"}));
    }

    @Test
    @DisplayName("Test 1 Type, No Where")
    public void test1TypeNoWhere() {
        Find find1TypeNoWhere = new Find("Heli@#",0,
                new Narrow(new String[] {"heliport"}, null));
    }

    @Test
    @DisplayName("Test 1 Type, Empty Where")
    public void test1TypeEmptyWhere() {
        Find find1TypeEmptyWhere = new Find("Heli@#",0,
                new Narrow(new String[] {"heliport"}, new String[] {}));
    }

    @Test
    @DisplayName("Test 1 Type, 1 Where")
    public void test1Type1Where() {
        Find find1Type1Where = new Find("Heli@#",0,
                new Narrow(new String[] {"heliport"}, new String[] {"California"}));
    }

    @Test
    @DisplayName("Test 1 Type, Multiple Where")
    public void test1TypeMultipleWhere() {
        Find find1TypeMultipleWhere = new Find("Heli@#",0,
                new Narrow(new String[] {"heliport"}, new String[] {"California", "Connecticut"}));
    }

    @Test
    @DisplayName("Test Multiple Type, No Where")
    public void testMultipleTypeNoWhere() {
        Find findMultipleTypeNoWhere = new Find("Heli@#",0,
                new Narrow(new String[] {"heliport", "closed"}, null));
    }

    @Test
    @DisplayName("Test Multiple Type, Empty Where")
    public void testMultipleTypeEmptyWhere() {
        Find findMultipleTypeEmptyWhere = new Find("Heli@#",0,
                new Narrow(new String[] {"heliport", "closed"}, new String[] {}));
    }

    @Test
    @DisplayName("Test Multiple Type, 1 Where")
    public void testMultipleType1Where() {
        Find findMultipleType1Where = new Find("Heli@#",0,
                new Narrow(new String[] {"heliport", "closed"}, new String[] {"California"}));
    }

    @Test
    @DisplayName("Test Multiple Type, Multiple Where")
    public void testMultipleTypeMultipleWhere() {
        Find findMultipleTypeMultipleWhere = new Find("Heli@#",0,
                new Narrow(new String[] {"heliport", "closed"}, new String[] {"California", "Connecticut"}));
    }

}