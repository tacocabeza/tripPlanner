package com.tco.functionality;

import com.tco.misc.DistanceCalculator;

import java.util.ArrayList;
import java.util.Arrays;
import java.util.HashMap;

public class OptimizeTrip {

    private ArrayList<HashMap<String, String>> places;
    private Options options;
    private int n;

    public OptimizeTrip(ArrayList<HashMap<String,String>> places, Options options) {
        this.places = places;
        this.options = options;
        this.n = places.size();
    }


    public ArrayList<HashMap<String,String>> nearestNeighbor(){
        // init the data structures we will be using
        Long shortest = Long.MAX_VALUE;
        int[] solutionTour = new int[n];
        Long[][] distanceMatrix = buildDistanceMatrix();
        Long begin = System.currentTimeMillis();
        boolean builtTrip = false;

        for (int startingCityIndex = 0; startingCityIndex < n; startingCityIndex++) {

            boolean[] visitedCities = new boolean[n];
            visitedCities[startingCityIndex] = true;
          
            int k = 1;
            int previous = startingCityIndex;
            long tourDistance = 0;
            int[] tempTour = new int[n];
            tempTour[0] = startingCityIndex;

            for (int unvisitedIndex = n - 1; unvisitedIndex > 0; unvisitedIndex--) {
                if(System.currentTimeMillis() - begin >= (long) (Double.parseDouble(options.getResponse()) * 1000)){
                    break;
                }
                int nearest = nearestUnvisited(distanceMatrix[previous], visitedCities);
                tourDistance += distanceMatrix[previous][nearest];
                tempTour[k] = nearest;
                k++;
                previous = nearest;
                visitedCities[nearest] = true;
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
            return buildTrip(solutionTour);
        } else {
            return places;
        }
    }

    private ArrayList<HashMap<String,String>> buildTrip(int[] tour){
        ArrayList<HashMap<String,String>> solution = new ArrayList<>(n);

        for(int i = 0; i<n; i++){
            solution.add(places.get(tour[i]));
        }

        return solution;

    }

    private int nearestUnvisited(Long[] distance, boolean[] visitedCities){

        long best = Long.MAX_VALUE;
        int bestIndex =0;

        for(int i=0; i< distance.length; i++){
            if(!visitedCities[i] && distance[i] != 0 && best > distance[i]){
                best = distance[i];
                bestIndex = i;
            }
        }

        return bestIndex;
    }

    private Long[][] buildDistanceMatrix() {
        DistanceCalculator distanceCalculator = new DistanceCalculator();
        Long[][] matrix = new Long[n][n];

        for (int i = 0; i < n; i++) {
            // A diagonal of 0's -> the distance between A and A is 0.
            matrix[i][i] = 0L;

            for (int j = i + 1; j < n; j++) {
                matrix[i][j] = distanceCalculator.calculateGreatCircleDistance(places.get(i), places.get(j), Double.parseDouble(options.getEarthRadius()));
                matrix[j][i] = matrix[i][j];
            }
        }

        return matrix;
    }
}
