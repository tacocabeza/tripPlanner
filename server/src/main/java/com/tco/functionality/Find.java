package com.tco.functionality;

import org.eclipse.jetty.security.SpnegoUserPrincipal;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;

import java.sql.ResultSet;
import java.util.ArrayList;
import java.util.Collection;
import java.util.Collections;

import static com.tco.requests.RequestFind.MAX_LIMIT;

public class Find {

    private final Logger log = LoggerFactory.getLogger(DBConnection.class);

    private final String match;
    private int limit;
    private int found;
    private ArrayList<Place> places;
    private boolean lucky = false;

    public Find(String match, Integer limit){
        if(limit == null){
            this.limit = 1;
        } else {
            this.limit = limit;
        }

        this.match = formatMatch(match);
        if (match.equals("")) {
            this.lucky = true;
        }
        if(this.limit == 0){
            this.limit = 1;
        }
    }

    private String formatMatch(String match){
        // replace all non alpha-numeric characters with _
        if(match == null){
            return "";
        } else {
            return match.replaceAll("[^a-zA-Z\\d]", "_");
        }
    }

    public int getFound(){
        populatePlaces();
        return found;
    }

    public ArrayList<Place> getPlaces(){
        if (this.lucky == true) {
            populatePlaces();
            Collections.shuffle(places);
        } else {
            populatePlaces();
        }
        while (places.size() > limit && places.size() != 0) {
            places.remove(places.size() - 1);
        }
        return places;
    }

    public void populatePlaces(){
        if(places == null){
            queryPlaces();
        }
    }

    private void queryPlaces(){
        String columns = "world.name, latitude, longitude, world.id, altitude, municipality, type";
        String joins = "inner join country on world.iso_country = country.id " +
                        "inner join region on world.iso_region = region.id";
        String where = "world.name like \"%" + match + "%\" or " +
                        "world.municipality like \"%" + match + "%\" or " +
                        "region.name like \"%" + match + "%\" or " +
                        "country.name like \"%" + match + "%\"";
        String sql = "select " + columns + " from world " + joins + " where " + where + ";";

        DBConnection dbc = new DBConnection();
        ResultSet results = dbc.querySQL(sql);

        setResultFields(results);
    }

    private void setResultFields(ResultSet results){
        ArrayList<Place> newPlaces = parsePlaces(results);
        this.found = newPlaces.size();
        int subListLimit = Math.min(newPlaces.size(), this.limit);
        if (this.lucky == true) {
            subListLimit = Math.min(newPlaces.size(), 100);
        }
        this.places = new ArrayList<Place>(newPlaces.subList(0,subListLimit));
    }

    private ArrayList<Place> parsePlaces(ResultSet results){
        ArrayList<Place> newPlaces = new ArrayList<Place>();

        try {
            while (results.next()) {
                String latitude = results.getString("latitude");
                String longitude = results.getString("longitude");
                String altitude = results.getString("altitude");

                Place p = new Place(latitude, longitude, altitude);

                p.name = results.getString("world.name");
                p.id = results.getString("world.id");
                p.municipality = results.getString("municipality");
                p.type = results.getString("type");

                newPlaces.add(p);
            }
        } catch(Exception e){
            log.error("Exception caught when parsing places: " + e);
        }

        return newPlaces;
    }

}