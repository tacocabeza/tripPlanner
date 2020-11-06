package com.tco.functionality;

import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.DisplayName;
import org.junit.jupiter.api.Test;
import static org.junit.jupiter.api.Assertions.assertEquals;

public class TestNarrow {

     Narrow narrow;


    @Test
    @BeforeEach
    @DisplayName("Init Tests")
    public void initNarrow() {
        String [] type = new String[]{"airport", "balloonport"};
        String [] where = new String[] {"Canada"};
        narrow = new Narrow(type,where);
    }

    @Test
    @DisplayName("Test get where")
    public void testGetWhere() {
        System.out.println(narrow.getWhere().length);
        assertEquals(1,narrow.getWhere().length);
    }

    @Test
    @DisplayName("Test get type")
    public  void testGetType(){
        assertEquals(2, narrow.getType().length);
    }
}
