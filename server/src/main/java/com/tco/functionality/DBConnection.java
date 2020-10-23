package com.tco.functionality;

import org.slf4j.Logger;
import org.slf4j.LoggerFactory;

import java.sql.Connection;
import java.sql.DriverManager;
import java.sql.Statement;
import java.sql.ResultSet;

public class DBConnection {
    private String DB_USER;
    private String DB_PASSWORD;
    private String DB_URL;

    private final Logger log = LoggerFactory.getLogger(DBConnection.class);

    public DBConnection() {
        // url logic taken from Zybooks instructions on DB (author: Dave Mathews and TA's)

        String isTravis = System.getenv("TRAVIS");
        String useTunnel = System.getenv("CS314_USE_DATABASE_TUNNEL");

        if (isTravis != null && isTravis.equals("true")) {
            initForTravis();
        } else if (useTunnel != null && useTunnel.equals("true")) {
            initForDev();
        } else {
            initForProd();
        }
    }

    private void initForTravis() {
        log.info("Initializing DBConnection for Travis");
        DB_URL = "jdbc:mysql://127.0.0.1/cs314";
        DB_USER = "root";
        DB_PASSWORD = null;
    }

    private void initForDev() {
        log.info("Initializing DBConnection for an off-campus machine");
        DB_URL = "jdbc:mysql://127.0.0.1:1870/cs314";
        DB_USER = "cs314-db";
        DB_PASSWORD = "eiK5liet1uej";
    }

    private void initForProd() {
        log.info("Initializing DBConnection for production (black-bottle)");
        DB_URL = "jdbc:mysql://faure.cs.colostate.edu/cs314";
        DB_USER = "cs314-db";
        DB_PASSWORD = "eiK5liet1uej";
    }

    public ResultSet querySQL(String sql) {
        try (Connection conn = DriverManager.getConnection(DB_URL, DB_USER, DB_PASSWORD);
             Statement query = conn.createStatement()) {
            return query.executeQuery(sql);
        } catch (Exception e){
            log.error("Exception caught when querying sql: \"" + sql + "\":" + e);
            return null;
        }
    }
}
