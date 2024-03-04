package com.example.web_indi.Controller;

import com.example.web_indi.entity.TravelPackage;
import com.example.web_indi.entity.User;
import com.example.web_indi.pojo.TravelPackagePojo;
import com.example.web_indi.service.TravelPackageService;
import lombok.RequiredArgsConstructor;
import org.springframework.web.bind.annotation.*;

import java.io.IOException;
import java.util.List;
import java.util.Optional;

@RequestMapping("/package")
@RestController
@RequiredArgsConstructor
@CrossOrigin
public class TravelPackageController {
    private final TravelPackageService travelPackageService;
    @PostMapping("/save")
    public String savePackage(@RequestBody @ModelAttribute TravelPackagePojo travelPackagePojo) throws IOException {
        travelPackageService.savePackage(travelPackagePojo);
        return "data created successfully";
    }
    @GetMapping("/getAll")
    public List<TravelPackage> findAll(){
        return travelPackageService.findAll();
    }
    @GetMapping("/getSelectedPackage/{id}")
    public Optional<TravelPackage> findById(@PathVariable("id") Long id){
        return travelPackageService.findById(id);
    }
    @DeleteMapping("/deletePackage/{id}")
    public void deleteById(@PathVariable("id") Long id){
        travelPackageService.deleteById(id);
    }
}
