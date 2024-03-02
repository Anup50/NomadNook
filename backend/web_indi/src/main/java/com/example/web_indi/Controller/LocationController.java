package com.example.web_indi.Controller;

import com.example.web_indi.entity.Location;;
import com.example.web_indi.pojo.LocationPojo;
import com.example.web_indi.service.LocationService;
import jakarta.validation.Valid;
import lombok.RequiredArgsConstructor;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.Optional;

@RequestMapping("/location")
@RestController
@RequiredArgsConstructor
@CrossOrigin
public class LocationController {
    private final LocationService locationService;
    @PostMapping("/addLocation")
    public String addLocation (@Valid @RequestBody LocationPojo locationPojo) {
        try {
            locationService.saveLocation(locationPojo);
            return "success";
        } catch (Exception e) {
            e.printStackTrace(); // Print the stack trace of the exception to the console
            System.out.println("Error message: " + e.getMessage()); // Print the error message
            return "error"; // Return an error message or code to indicate failure
        }
    }

    @GetMapping("/getAll")
    public List<Location> getAllData(){
        return locationService.findAll();
    }

    @GetMapping("/getById/{location_id}")
    public Optional<Location> getDataBtId(@PathVariable("location_id") Integer location_id){
        return locationService.findById(Long.valueOf(location_id));
    }

    @DeleteMapping("/deleteById/{location_id}")
    public void deleteById(@PathVariable("location_id") Integer location_id){
        locationService.deleteById(Long.valueOf(location_id));
    }
}
