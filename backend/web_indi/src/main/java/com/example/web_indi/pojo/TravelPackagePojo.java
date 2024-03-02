package com.example.web_indi.pojo;

import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;
import org.springframework.web.multipart.MultipartFile;

import javax.validation.constraints.NotNull;
import java.math.BigDecimal;

@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor

public class TravelPackagePojo {
    private Long packageId;
    @NotNull
    private String packageTitle;
    @NotNull
    private Long locationId;
    @NotNull
    private String about;
    @NotNull
    private String guidanceLanguage;
    @NotNull
    private String whatsIncluded;
    @NotNull
    private String whatToExpect;
    @NotNull
    private String departureAndReturn;
    @NotNull
    private String accessibility;
    @NotNull
    private String additionalInfo;
    @NotNull
    private BigDecimal price;
    @NotNull
    private BigDecimal discount;
    @NotNull
    private Integer duration;
    @NotNull
    private MultipartFile image1;

    private MultipartFile image2;

    private MultipartFile image3;

    private MultipartFile image4;
}
