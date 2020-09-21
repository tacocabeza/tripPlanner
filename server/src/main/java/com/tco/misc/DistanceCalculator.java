package com.tco.misc;

import java.util.Map;

public class DistanceCalculator {

    public Integer calculateGreatCircleDistance(Map<String,String> place1, Map<String,String> place2, Float Radius)
    {
        Double long1 = Math.toRadians(Double.parseDouble(place1.get("longitude")));
        Double lat1 = Math.toRadians(Double.parseDouble(place1.get("latitude")));

        Double long2 = Math.toRadians(Double.parseDouble(place2.get("longitude")));
        Double lat2 = Math.toRadians(Double.parseDouble(place2.get("latitude")));

        Double deltaLongitude = long2 - long1;
        Double deltaLatitude = lat2 - lat1;

        Double radicand = Math.pow(Math.sin(deltaLatitude/2), 2) + Math.cos(lat1)*Math.cos(lat2)*Math.pow(Math.sin(deltaLongitude/2),2);

        Double SquareRoot = 2*Math.asin(Math.sqrt(radicand));

        Integer answer = (int) Math.round(Radius*SquareRoot);

        return answer;
    }
}
