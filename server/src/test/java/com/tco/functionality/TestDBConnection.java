package com.tco.functionality;

import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.DisplayName;
import org.junit.jupiter.api.Test;

import java.sql.ResultSet;

public class TestDBConnection {

    private DBConnection dbc;

    @BeforeEach
    public void initializeDBConnect(){
        this.dbc = new DBConnection();
    }

    @Test
    @DisplayName("Query SQL")
    public void testQuerySQL(){
        ResultSet results = dbc.querySQL("select * from colorado where municipality = 'Denver';");
        assert(results != null);
    }

}
