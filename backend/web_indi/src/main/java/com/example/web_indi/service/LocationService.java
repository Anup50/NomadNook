package com.example.web_indi.service;
import com.example.web_indi.entity.Location;
import com.example.web_indi.pojo.LocationPojo;

import java.util.List;
import java.util.Optional;
public interface LocationService {
    void saveLocation(LocationPojo locationpojo);
    List<Location> findAll();

    Optional<Location> findById(long location_id);

    void deleteById(Long location_id);
}
