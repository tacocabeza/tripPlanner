package com.tco.misc;

import com.tco.functionality.Options;

import java.util.ArrayList;
import java.util.HashMap;
import java.util.Map;

public class DistanceCalculator {

    public Long calculateGreatCircleDistance(Map<String,String> place1, Map<String,String> place2, Double radius)
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

        Long distance = Math.round(centralAngle);

        return  distance;
    }

    public Long[] calculateDistances(ArrayList<HashMap<String,String>> places, Options options)
    {
        Long [] distances = new Long[places.size()];

        System.out.println(places.size());

        for(int i = 0; i<=places.size()-1; i++)
        {

            if(i == places.size()-1)
            {
                distances[i] = calculateGreatCircleDistance(places.get(0), places.get(i), Double.parseDouble(options.getEarthRadius()));
                break;
            }

            distances[i] = calculateGreatCircleDistance(places.get(i), places.get(i+1), Double.parseDouble(options.getEarthRadius()));
        }

        return distances;
    }
}
