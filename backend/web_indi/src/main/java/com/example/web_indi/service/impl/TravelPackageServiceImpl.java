package com.example.web_indi.service.impl;

import com.example.web_indi.config.ImageToBase64;
import com.example.web_indi.entity.Location;
import com.example.web_indi.entity.TravelPackage;
import com.example.web_indi.pojo.TravelPackagePojo;
import com.example.web_indi.repository.LocationRepo;
import com.example.web_indi.repository.TravelPackageRepo;
import com.example.web_indi.service.TravelPackageService;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;
import org.springframework.web.multipart.MultipartFile;

import java.io.File;
import java.io.IOException;
import java.nio.file.Files;
import java.nio.file.Path;
import java.nio.file.Paths;
import java.util.List;
import java.util.NoSuchElementException;
import java.util.Optional;
import java.util.stream.Collectors;

@Service
@RequiredArgsConstructor

public class TravelPackageServiceImpl implements TravelPackageService {
    private  final TravelPackageRepo travelPackageRepo;
    private final LocationRepo locationRepo;
    ImageToBase64 imageToBase64 = new ImageToBase64();

    private final String UPLOAD_DIRECTORY = new StringBuilder().append(System.getProperty("user.dir")).append("/web_indi/packageImage").toString();
    public void savePackage(TravelPackagePojo travelPackagePojo) throws IOException {
        TravelPackage travelPackage=new TravelPackage();


        if(travelPackagePojo.getPackageId()!=null){
            travelPackage=travelPackageRepo.findById(travelPackagePojo.getPackageId())
                    .orElseThrow(()-> new NoSuchElementException("No data found"));
        }

        travelPackage.setPackageTitle(travelPackagePojo.getPackageTitle());
        travelPackage.setAbout(travelPackagePojo.getAbout());
        travelPackage.setAccessibility(travelPackagePojo.getAccessibility());
        travelPackage.setDiscount(travelPackagePojo.getDiscount());
        travelPackage.setPrice(travelPackagePojo.getPrice());
        travelPackage.setAdditionalInfo(travelPackagePojo.getAdditionalInfo());
        travelPackage.setDepartureAndReturn(travelPackagePojo.getDepartureAndReturn());
        travelPackage.setDuration(travelPackagePojo.getDuration());
        travelPackage.setGuidanceLanguage(travelPackagePojo.getGuidanceLanguage());
        travelPackage.setWhatsIncluded(travelPackagePojo.getWhatsIncluded());
        travelPackage.setWhatToExpect(travelPackagePojo.getWhatToExpect());
        Location location = locationRepo.findById(travelPackagePojo.getLocationId())
                .orElseThrow(() -> new NoSuchElementException("Location ID found"));
        travelPackage.setLocation_id(location);

        if (travelPackagePojo.getImage1()!= null) {
            StringBuilder fileNames = new StringBuilder();
            Path fileNameAndPath = Paths.get(UPLOAD_DIRECTORY, travelPackagePojo.getImage1().getOriginalFilename());
            fileNames.append(travelPackagePojo.getImage1().getOriginalFilename());
            Files.write(fileNameAndPath, travelPackagePojo.getImage1().getBytes());
        }

        travelPackage.setImage1(travelPackagePojo.getImage1().getOriginalFilename());

        travelPackage.setImage2(travelPackagePojo.getImage2().getOriginalFilename());
        if (travelPackagePojo.getImage2()!= null) {
            StringBuilder fileNames = new StringBuilder();
            Path fileNameAndPath = Paths.get(UPLOAD_DIRECTORY, travelPackagePojo.getImage2().getOriginalFilename());
            fileNames.append(travelPackagePojo.getImage2().getOriginalFilename());
            Files.write(fileNameAndPath, travelPackagePojo.getImage2().getBytes());
        }
        travelPackage.setImage2(travelPackagePojo.getImage2().getOriginalFilename());

        travelPackage.setImage3(travelPackagePojo.getImage3().getOriginalFilename());
        if (travelPackagePojo.getImage3()!= null) {
            StringBuilder fileNames = new StringBuilder();
            Path fileNameAndPath = Paths.get(UPLOAD_DIRECTORY, travelPackagePojo.getImage3().getOriginalFilename());
            fileNames.append(travelPackagePojo.getImage3().getOriginalFilename());
            Files.write(fileNameAndPath, travelPackagePojo.getImage3().getBytes());
        }
        travelPackage.setImage3(travelPackagePojo.getImage3().getOriginalFilename());

        travelPackage.setImage4(travelPackagePojo.getImage4().getOriginalFilename());
        if (travelPackagePojo.getImage4()!= null) {
            StringBuilder fileNames = new StringBuilder();
            Path fileNameAndPath = Paths.get(UPLOAD_DIRECTORY, travelPackagePojo.getImage4().getOriginalFilename());
            fileNames.append(travelPackagePojo.getImage4().getOriginalFilename());
            Files.write(fileNameAndPath, travelPackagePojo.getImage4().getBytes());
        }
        travelPackage.setImage4(travelPackagePojo.getImage4().getOriginalFilename());

        travelPackageRepo.save(travelPackage);

    }
    @Override
    public List<TravelPackage> findAll() {
        List<TravelPackage> travelPackages = travelPackageRepo.findAll();
        travelPackages = travelPackages.stream().map(travelPackage -> {
            travelPackage.setImage1(imageToBase64.getImageBase64("/packageImage/" + travelPackage.getImage1()));
            travelPackage.setImage2(imageToBase64.getImageBase64("/packageImage/" + travelPackage.getImage2()));
            travelPackage.setImage3(imageToBase64.getImageBase64("/packageImage/" + travelPackage.getImage3()));
            travelPackage.setImage4(imageToBase64.getImageBase64("/packageImage/" + travelPackage.getImage4()));
            return travelPackage;
        }).collect(Collectors.toList());
        return travelPackages;
    }

    @Override
    public Optional<TravelPackage> findById(Long id) {
        Optional<TravelPackage> optionalItem = travelPackageRepo.findById(id);
        if (optionalItem.isPresent()) {
            TravelPackage item = optionalItem.get();
            String imagePath = "/packageImage/" + item.getImage1();

            String base64Image = imageToBase64.getImageBase64(imagePath);

            if (base64Image == null) {
                return Optional.empty();
            }

            item.setImage1(base64Image);
            // Image 2
            String imagePath2 = "/packageImage/" + item.getImage2();
            String base64Image2 = imageToBase64.getImageBase64(imagePath2);
            if (base64Image2 == null) {
                return Optional.empty();
            }
            item.setImage2(base64Image2);

            // Image 3
            String imagePath3 = "/packageImage/" + item.getImage3();
            String base64Image3 = imageToBase64.getImageBase64(imagePath3);
            if (base64Image3 == null) {
                return Optional.empty();
            }
            item.setImage3(base64Image3);

            // Image 4
            String imagePath4 = "/packageImage/" + item.getImage4();
            String base64Image4 = imageToBase64.getImageBase64(imagePath4);
            if (base64Image4 == null) {
                return Optional.empty();
            }
            item.setImage4(base64Image4);

        }


        return optionalItem;
    }


    @Override
    public void deleteById(Long id) {travelPackageRepo.deleteById(id);}

    @Override
    public List<TravelPackage> searchByName(String paclage_title) {
        List<TravelPackage> travelPackages = travelPackageRepo.findByPackageTitleIgnoreCase(paclage_title);
        travelPackages = travelPackages.stream().map(travelPackage -> {
            travelPackage.setImage1(imageToBase64.getImageBase64("/packageImage/" + travelPackage.getImage1()));
            travelPackage.setImage2(imageToBase64.getImageBase64("/packageImage/" + travelPackage.getImage2()));
            travelPackage.setImage3(imageToBase64.getImageBase64("/packageImage/" + travelPackage.getImage3()));
            travelPackage.setImage4(imageToBase64.getImageBase64("/packageImage/" + travelPackage.getImage4()));
            return travelPackage;
        }).collect(Collectors.toList());
        return travelPackages;
    }



}
