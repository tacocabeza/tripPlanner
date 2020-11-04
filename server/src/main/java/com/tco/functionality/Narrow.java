package com.tco.functionality;

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
}
