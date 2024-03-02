package com.example.web_indi.service;

import com.example.web_indi.entity.TravelPackage;
import com.example.web_indi.pojo.TravelPackagePojo;

import java.io.IOException;
import java.util.List;
import java.util.Optional;

public interface TravelPackageService {
    void savePackage(TravelPackagePojo travelPackagePojo) throws IOException;
    List<TravelPackage> findAll();

    Optional<TravelPackage> findById(Long id);

    void deleteById(Long id);
    List<TravelPackage> searchByName(String itemName);

}
