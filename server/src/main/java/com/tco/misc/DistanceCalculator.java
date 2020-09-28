package com.tco.misc;

import java.util.Map;

public class DistanceCalculator {

    public Integer calculateGreatCircleDistance(Map<String,String> place1, Map<String,String> place2, Float radius)
    {
        Double long1 = Math.toRadians(Double.parseDouble(place1.get("longitude")));
        Double lat1 = Math.toRadians(Double.parseDouble(place1.get("latitude")));

        Double long2 = Math.toRadians(Double.parseDouble(place2.get("longitude")));
        Double lat2 = Math.toRadians(Double.parseDouble(place2.get("latitude")));

        Double deltaLongitude = long1 - long2;

        /* formula from wikipedia:
            where: λ,ɸ are longitude and latitude
            Δσ = arctan(sqrt((cos(ɸ2)sin(Δλ))^2 + (cos(ɸ1)sin(ɸ2) - sin(ɸ1)cos(ɸ2)cos((Δλ))^2)
            -------------------------------------------------------------------------
                   sin(ɸ1)sin(ɸ2) + cos(ɸ1)cos(ɸ2)cos(Δλ)
         */

        // sqrt((cos(ɸ2)sin(Δλ))^2
        Double numerator_1 = Math.pow(Math.cos(lat2)*Math.sin(deltaLongitude), 2);
        // (cos(ɸ1)sin(ɸ2) - sin(ɸ1)cos(ɸ2)cos((Δλ))^2
        Double numerator_2 = Math.pow((Math.cos(lat1)*Math.sin(lat2)) - Math.sin(lat1)*Math.cos(lat2)
                * Math.cos(deltaLongitude),2);

        Double numerator = Math.sqrt(numerator_1+numerator_2);

        Double denominator = ((Math.sin(lat1)*Math.sin(lat2)) + (Math.cos(lat1) * Math.cos(lat2) *Math.cos(deltaLongitude)));

        // arctan2(y/x)
        Double centralAngle = radius * (Math.atan2(numerator,denominator));

        Integer distance = (int) Math.round(centralAngle);

        return  distance;
    }
}
