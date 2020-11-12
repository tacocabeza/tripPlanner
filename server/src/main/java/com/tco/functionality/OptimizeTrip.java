package com.tco.functionality;

import com.tco.misc.DistanceCalculator;

import java.util.ArrayList;
import java.util.Arrays;
import java.util.HashMap;

public class OptimizeTrip {


    public ArrayList<HashMap<String,String>> nearestNeighbor(ArrayList<HashMap<String,String>> places, Options options){
        // init the data structures we will be using
        Long shortest = Long.MAX_VALUE;
        int[] solutionTour = new int[places.size()];
        Long[][] distanceMatrix = buildDistanceMatrix(places, options);
        Long begin = System.currentTimeMillis();
        boolean builtTrip = false;

        for (int startingCity = 0; startingCity < places.size(); startingCity++) {

            boolean[] unvisitedCities = new boolean[places.size()];
            Arrays.fill(unvisitedCities, true);
            unvisitedCities[startingCity] = false;
            int k = 1;
            int previous = startingCity;
            long tourDistance = 0;
            int[] tempTour = new int[places.size()];
            tempTour[0] = startingCity;

            for (int unvisited = places.size() - 1; unvisited > 0; unvisited--) {
                if(System.currentTimeMillis() - begin >= (long) (Double.parseDouble(options.getResponse()) * 1000)){
                    break;
                }
                int nearest = nearestUnvisted(distanceMatrix[previous], unvisitedCities);
                tourDistance += distanceMatrix[previous][nearest];
                tempTour[k] = nearest;
                k++;
                previous = nearest;
                unvisitedCities[nearest] = false;
            }
            if(System.currentTimeMillis() - begin >= (long) (Double.parseDouble(options.getResponse()) * 1000)){
                break;
            }
            if (tourDistance < shortest) {
                solutionTour = tempTour;
                shortest = tourDistance;
                builtTrip = true;
            }
        }
        if (builtTrip) {
            return buildTrip(solutionTour,places);
        } else {
            return places;
        }
    }

    private ArrayList<HashMap<String,String>> buildTrip(int[] tour, ArrayList<HashMap<String,String>> places){
        ArrayList<HashMap<String,String>> solution = new ArrayList<>(places.size());

        for(int i = 0; i<places.size(); i++){
            solution.add(places.get(tour[i]));
        }

        return solution;

    }

    private int nearestUnvisted(Long[] distance, boolean[] unvistedCities){

        long best = Long.MAX_VALUE;
        int bestIndex =0;

        for(int i=0; i< distance.length; i++){
            if(distance[i] != 0 && best > distance[i] && unvistedCities[i]){
                best = distance[i];
                bestIndex = i;
            }
        }

        return bestIndex;
    }

    private Long[][] buildDistanceMatrix(ArrayList<HashMap<String,String>> places, Options options) {
        DistanceCalculator distanceCalculator = new DistanceCalculator();
        Long[][] matrix = new Long[places.size()][places.size()];

        for (int i = 0; i < places.size(); i++) {
            // A diagonal of 0's -> the distance between A and A is 0.
            matrix[i][i] = 0L;

            for (int j = i + 1; j < places.size(); j++) {
                matrix[i][j] = distanceCalculator.calculateGreatCircleDistance(places.get(i), places.get(j), Double.parseDouble(options.getEarthRadius()));
                matrix[j][i] = matrix[i][j];
            }
        }

        return matrix;
    }
}
