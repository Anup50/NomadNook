package com.example.web_indi.entity;

import jakarta.persistence.*;
import lombok.*;

import java.math.BigDecimal;

@Entity
@Table(name = "packagetable")
@Getter
@Setter
@Builder
@AllArgsConstructor
@NoArgsConstructor

public class TravelPackage {
    @Id
    @SequenceGenerator(name = "package_seq_gen", sequenceName = "package_id_seq",allocationSize = 1)
    @GeneratedValue(generator="package_seq_gen", strategy = GenerationType.SEQUENCE)
    @Column(name = "id")
    private Long id;

    @Column(name = "package_title")
    private String packageTitle;

    @ManyToOne
    @JoinColumn(name = "location_id")
    private Location location_id;

    @Column(name = "about")
    private String about;

    @Column(name = "guidance_language")
    private String guidanceLanguage;

    @Column(name = "whats_included")
    private String whatsIncluded;

    @Column(name = "what_to_expect")
    private String whatToExpect;

    @Column(name = "departure_and_return")
    private String departureAndReturn;

    @Column(name = "accessibility")
    private String accessibility;

    @Column(name = "additional_info")
    private String additionalInfo;

    @Column(name = "price")
    private BigDecimal price;

    @Column(name = "discount")
    private BigDecimal discount;

    @Column(name = "duration")
    private Integer duration;

    @Column(name = "image1")
    @Lob
    private String image1;

    @Column(name = "image2")
    @Lob
    private String image2;

    @Column(name = "image3")
    @Lob
    private String image3;

    @Column(name = "image4")
    @Lob
    private String image4;

}
