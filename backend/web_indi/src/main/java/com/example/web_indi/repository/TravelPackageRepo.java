package com.example.web_indi.repository;

import com.example.web_indi.entity.TravelPackage;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;
import java.util.Optional;

@Repository
public interface TravelPackageRepo  extends JpaRepository<TravelPackage,Long> {
    Optional<TravelPackage> findById(Long id);
    List<TravelPackage> findByPackageTitleIgnoreCase(String  package_title );


}
