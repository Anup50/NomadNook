package com.example.web_indi.entity;

import jakarta.persistence.*;
import lombok.*;

@Entity
@Table(name = "locationtable")
@Getter
@Setter
@Builder
@AllArgsConstructor
@NoArgsConstructor
public class Location {
    @Id
    @SequenceGenerator(name = "location_seq_gen", sequenceName = "location_id_seq",allocationSize = 1)
    @GeneratedValue(generator="location_seq_gen", strategy = GenerationType.SEQUENCE)
    private Long locationId;
    @Column(name = "location", nullable = false)
    private String location;
    @Column(name = "longitude", nullable = false)
    private Double longitude;

    @Column(name = "latitude", nullable = false)
    private Double latitude;
}