package com.example.web_indi.service.impl;

import com.example.web_indi.entity.Location;
import com.example.web_indi.pojo.LocationPojo;
import com.example.web_indi.repository.LocationRepo;
import com.example.web_indi.service.LocationService;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.NoSuchElementException;
import java.util.Optional;

@Service
@RequiredArgsConstructor
public class LocationServiceImpl implements LocationService {
    private final LocationRepo locationRepo;

    @Override
    public void saveLocation (LocationPojo locationPojo) {

        Location location = new Location();

        if(locationPojo.getLocation_id()!=null){
            location=locationRepo.findById(locationPojo.getLocation_id())
                    .orElseThrow(()-> new NoSuchElementException("No data found"));
        }

        location.setLocation(locationPojo.getLocation());
        location.setLatitude(locationPojo.getLatitude());
        location.setLongitude(locationPojo.getLongitude());




        locationRepo.save(location);
    }
    @Override
    public List<Location> findAll() {return  locationRepo.findAll();
    }
    @Override
    public Optional<Location> findById(long location_id) {
        return locationRepo.findById(location_id);
    }

    @Override
    public void deleteById(Long location_id) {
        locationRepo.deleteById(location_id);
    }

}
