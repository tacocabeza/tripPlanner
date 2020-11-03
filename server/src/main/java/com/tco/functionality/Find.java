package com.tco.functionality;

import org.slf4j.Logger;
import org.slf4j.LoggerFactory;

import java.sql.ResultSet;
import java.util.ArrayList;

import static com.tco.requests.RequestFind.MAX_LIMIT;

public class Find {

    private final Logger log = LoggerFactory.getLogger(DBConnection.class);

    private final String match;
    private int limit;
    private int found;
    private ArrayList<Place> places;
    private boolean lucky = false;
    final int maxMatch = 256;

    public Find(String match, Integer limit){
        this.match = formatMatch(match);
        if (this.match.equals("")) {
            lucky = true;
        }

        if(limit == null){
            if(lucky) {
                this.limit = 1;
            } else {
                this.limit = MAX_LIMIT;
            }
        } else {
            this.limit = limit;
        }

        if(this.limit <= 0 || this.limit > MAX_LIMIT){
            this.limit = MAX_LIMIT;
        }
    }

    private String formatMatch(String match){
        // replace all non alpha-numeric characters with _
        if(match == null){
            return "";
        } else {
            match = match.substring(0, Math.min(match.length(), maxMatch));
            return match.replaceAll("[^a-zA-Z\\d]", "_");
        }
    }

    public int getFound(){
        populatePlaces();
        return found;
    }

    public ArrayList<Place> getPlaces(){
        populatePlaces();
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
        String order = lucky ? ("order by rand() limit " + limit) : "order by world.name";

        String sql = "select " + columns + " from world " + joins +
                " where " + where + " " + order + ";";

        DBConnection dbc = new DBConnection();
        ResultSet results = dbc.querySQL(sql);

        setResultFields(results);
    }

    private void setResultFields(ResultSet results){
        ArrayList<Place> newPlaces = parsePlaces(results);

        if (lucky) {
            found = limit;
        } else {
            found = newPlaces.size();
            if(newPlaces.size() > limit) {
                newPlaces = new ArrayList<Place>(newPlaces.subList(0,limit));
            }
        }
        this.places = newPlaces;
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