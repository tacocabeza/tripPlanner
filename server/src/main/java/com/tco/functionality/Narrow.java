package com.tco.functionality;

import java.util.Arrays;

public class Narrow {

    String[] type;
    String[] where;
    // for testing purposes
    public Narrow(String[] type, String[] where)
    {
        this.type = type;
        this.where = where;

    }

    public Narrow() {

    }


    public String[] getType(){
        return type;
    }

    public String[] getWhere() {
        return where;
    }

    public String toString() { return Arrays.toString(type) + " " + Arrays.toString(where);}
}
