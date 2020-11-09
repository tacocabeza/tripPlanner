package com.tco.functionality;

import com.tco.misc.DistanceCalculator;

import java.util.ArrayList;
import java.util.HashMap;

public class OptimizeTrip {

    private Long[][] buildDistanceMatrix(ArrayList<HashMap<String,String>> places) {
        DistanceCalculator distanceCalculator = new DistanceCalculator();
        Long[][] matrix = new Long[places.size()][places.size()];

        for (int i = 0; i < places.size(); i++) {
            // A diagonal of 0's -> the distance between A and A is 0.
            matrix[i][i] = 0L;

            for (int j = i + 1; j < places.size(); j++) {
                matrix[i][j] = distanceCalculator.calculateGreatCircleDistance(places.get(i), places.get(j), 3959.0D);
                matrix[j][i] = matrix[i][j];
            }
        }

        return matrix;
    }
}
