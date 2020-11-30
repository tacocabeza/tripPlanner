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

    private Find findNoTypeNoWhere;
    private Find findNoTypeEmptyWhere;
    private Find findNoType1Where;
    private Find findNoTypeMultipleWhere;

    private Find findEmptyTypeNoWhere;
    private Find findEmptyTypeEmptyWhere;
    private Find findEmptyType1Where;
    private Find findEmptyTypeMultipleWhere;

    private Find find1TypeNoWhere;
    private Find find1TypeEmptyWhere;
    private Find find1Type1Where;
    private Find find1TypeMultipleWhere;

    private Find findMultipleTypeNoWhere;
    private Find findMultipleTypeEmptyWhere;
    private Find findMultipleType1Where;
    private Find findMultipleTypeMultipleWhere;

    @BeforeEach
    public void initFinds(){
        findMatchLimit = new Find("Heli@#",4, null);
        findMatchZeroLimit = new Find("Heli@#",0, null);
        findMatchNoLimit = new Find("Heli@#",null, null);

        findEmptyMatchLimit = new Find("",4, null);
        findEmptyMatchZeroLimit = new Find("",0, null);
        findEmptyMatchNoLimit = new Find("", null, null);

        findNoMatchLimit = new Find(null,4, null);
        findNoMatchZeroLimit = new Find(null,0, null);
        findNoMatchNoLimit = new Find(null,null, null);

        findNoTypeNoWhere = new Find("Heli@#",0,
                new Narrow(null, null));
        findNoTypeEmptyWhere = new Find("Heli@#",0,
                new Narrow(null, new String[] {}));
        findNoType1Where = new Find("Heli@#",0,
                new Narrow(null, new String[] {"California"}));
        findNoTypeMultipleWhere = new Find("Heli@#",0,
                new Narrow(null, new String[] {"California", "Connecticut"}));

        findEmptyTypeNoWhere = new Find("Heli@#",0,
                new Narrow(new String[] {}, null));
        findEmptyTypeEmptyWhere = new Find("Heli@#",0,
                new Narrow(new String[] {}, new String[] {}));
        findEmptyType1Where = new Find("Heli@#",0,
                new Narrow(new String[] {}, new String[] {"California"}));
        findEmptyTypeMultipleWhere = new Find("Heli@#",0,
                new Narrow(new String[] {}, new String[] {"California", "Connecticut"}));

        find1TypeNoWhere = new Find("Heli@#",0,
                new Narrow(new String[] {"heliport"}, null));
        find1TypeEmptyWhere = new Find("Heli@#",0,
                new Narrow(new String[] {"heliport"}, new String[] {}));
        find1Type1Where = new Find("Heli@#",0,
                new Narrow(new String[] {"heliport"}, new String[] {"California"}));
        find1TypeMultipleWhere = new Find("Heli@#",0,
                new Narrow(new String[] {"heliport"}, new String[] {"California", "Connecticut"}));

        findMultipleTypeNoWhere = new Find("Heli@#",0,
                new Narrow(new String[] {"heliport", "closed"}, null));
        findMultipleTypeEmptyWhere = new Find("Heli@#",0,
                new Narrow(new String[] {"heliport", "closed"}, new String[] {}));
        findMultipleType1Where = new Find("Heli@#",0,
                new Narrow(new String[] {"heliport", "closed"}, new String[] {"California"}));
        findMultipleTypeMultipleWhere = new Find("Heli@#",0,
                new Narrow(new String[] {"heliport", "closed"}, new String[] {"California", "Connecticut"}));
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
        Find f = new Find("YOU WERE MY BROTHER ANAKIN",6, null);
        assertEquals(0,f.getFound());
        assertEquals(0,f.getPlaces().size());
    }

    @Test
    @DisplayName("Test URL")
    public void testURL(){
        Find f_home_link = new Find("Hudson Bay Helicopters Heliport",0);
        assertEquals("http://hudsonbayheli.com/", f_home_link.getPlaces().get(0).url);

        Find f_wiki_link = new Find("Vatican City Heliport",0);
        assertEquals("http://en.wikipedia.org/wiki/Vatican_City_Heliport",
                f_wiki_link.getPlaces().get(0).url);
    }

    @Test
    @DisplayName("Test No Type, No Where")
    public void testNoTypeNoWhere(){
        assertEquals(9403, findNoTypeNoWhere.getFound());
    }

    @Test
    @DisplayName("Test No Type, 1 Where")
    public void testNoType1Where(){
        ArrayList<Place> places = findNoType1Where.getPlaces();
        assertEquals(9403, findNoType1Where.getFound());
        for(Place p : places){
            assert
        }
    }
}