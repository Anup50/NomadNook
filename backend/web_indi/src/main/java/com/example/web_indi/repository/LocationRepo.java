package com.example.web_indi.repository;
import com.example.web_indi.entity.Location;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;


import java.util.List;
import java.util.Optional;
@Repository

public interface LocationRepo extends JpaRepository<Location,Long> {
    Optional<Location> findById(Long location_id);
    List<Location> findByLocationIgnoreCase(String location);


}
