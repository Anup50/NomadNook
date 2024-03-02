package com.example.web_indi.pojo;

import com.example.web_indi.entity.Location;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

import javax.validation.constraints.NotNull;

@Getter
@Setter
@AllArgsConstructor
@NoArgsConstructor
public class LocationPojo {
    private Long location_id;

    @NotNull
    private String location;
    @NotNull
    private Double longitude;
    @NotNull
    private Double latitude;



    public LocationPojo(Location location) {
        this.location_id = location.getLocationId();
        this.location = location.getLocation();
    }
}

