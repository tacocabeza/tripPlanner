package com.tco.misc;

import com.tco.functionality.DBConnection;

import org.slf4j.Logger;
import org.slf4j.LoggerFactory;

import java.sql.ResultSet;
import java.sql.SQLException;
import java.util.ArrayList;
import java.util.List;

public class FillFilters {

    private final static Logger log = LoggerFactory.getLogger(FillFilters.class);

    public String[] getCountries()
    {
        DBConnection db = new DBConnection();

        ResultSet rs = db.querySQL("select name from country;");
        List<String> countries = new ArrayList<>();
        try{
            while(rs.next())
            {
                countries.add(rs.getString("name"));
            }
        }
        catch(SQLException e){
            log.info("ERROR"+e);
        }

        return countries.toArray(new String[0]);
    }
}
