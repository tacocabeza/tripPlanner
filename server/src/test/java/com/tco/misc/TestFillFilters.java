package com.tco.misc;

import org.junit.jupiter.api.DisplayName;
import org.junit.jupiter.api.Test;

import static org.junit.jupiter.api.Assertions.assertArrayEquals;
import static org.junit.jupiter.api.Assertions.assertEquals;

public class TestFillFilters {

    FillFilters fillFilters = new FillFilters();


    @Test
    @DisplayName("Testing that filters returns an non empty array")
    public void testArrayLength()
    {
        String[] arr = fillFilters.getCountries();
        assertEquals(arr.length,247);
    }
}
