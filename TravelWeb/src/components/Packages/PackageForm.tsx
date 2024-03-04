import { useState, useEffect } from "react";
import { useMutation } from "@tanstack/react-query";
import { useForm } from "react-hook-form";
import axios from "axios";
import { toast, Toaster } from "sonner";

export const PackageForm: React.FC = () => {
  const [imagePreview, setImagePreview] = useState<string[][]>([
    [],
    [],
    [],
    [],
  ]);

  const [locations, setLocations] = useState<
    { locationId: number; location: string }[]
  >([]);
  const { register, handleSubmit, watch, reset } = useForm();
  const selectedLocation = watch("locationId");
  const watchedimage1 = watch("image!");
  const watchedimage2 = watch("image!");
  const watchedimage3 = watch("image!");
  const watchedimage4 = watch("image!");

  

  useEffect(() => {
    const fetchCategories = async () => {
      try {
        const response = await fetch("http://localhost:8082/location/getAll");
        if (!response.ok) {
          throw new Error("Failed to fetch locations");
        }
        const data = await response.json();
        setLocations(data);
      } catch (error) {
        console.error("Error fetching categories:", error);
      }
    };

    fetchCategories();
  }, [selectedLocation]);

  useEffect(() => {
    if (watchedimage1 && watchedimage1.length > 0) {
      handleFileInputChange(watchedimage1, "image1", 0);
    }
    if (watchedimage2 && watchedimage2.length > 0) {
      handleFileInputChange(watchedimage2, "image2", 1);
    }
    if (watchedimage3 && watchedimage3.length > 0) {
      handleFileInputChange(watchedimage3, "image3", 2);
    }
    if (watchedimage4 && watchedimage4.length > 0) {
      handleFileInputChange(watchedimage4, "image4", 3);
    }
  }, [watchedimage1, watchedimage2, watchedimage3, watchedimage4]);

  const handleFileInputChange = (
    files: FileList,
    fieldName: string,
    index: number
  ) => {
    const previews = Array.from(files).map((file) => {
      const reader = new FileReader();
      reader.readAsDataURL(file);
      return new Promise<string>((resolve) => {
        reader.onloadend = () => {
          resolve(reader.result as string);
        };
      });
    });

    Promise.all(previews).then((previewUrls) => {
      setImagePreview((prevState) => {
        const newState = [...prevState];
        newState[index] = previewUrls;
        return newState;
      });
    });
  };

  const useApiCall = useMutation({
    mutationKey: ["POST_Package_MANAGEPackage"],
    mutationFn: async (formData: FormData) => {
      try {
        // Log the token
        const token = localStorage.getItem("token");
        console.log("Access Token:", token);

        const response = await axios.post(
          "http://localhost:8082/package/save",
          formData,
          {
            headers: {
              authorization: "Bearer " + token,
              "Content-Type": "multipart/form-data",
            },
          }
        );

        if (response.status === 200) {
          toast.success("Package added Successfully");
          reset();
        }
      } catch (error: any) {
        console.error("Error adding restaurant:", error);
        toast.error(`Error: ${error.message}`);
      }
    },
  });

  const onSubmit = (formData: any) => {
    if (!formData.image1 || formData.image1.length === 0) {
      toast.error("Please select a image1 image");
      return;
    }

    const formDataWithFile = new FormData();
    formDataWithFile.append("packageTitle", formData.packageTitle);
    formDataWithFile.append("locationId", formData.locationId);
    formDataWithFile.append("about", formData.about);
    formDataWithFile.append("duration", String(formData.duration));
    formDataWithFile.append("guidanceLanguage", formData.guidanceLanguage);
    formDataWithFile.append("whatsIncluded", formData.whatsIncluded);
    formDataWithFile.append("whatToExpect", formData.whatToExpect);
    formDataWithFile.append("departureAndReturn", formData.departureAndReturn);
    formDataWithFile.append("accessibility", formData.accessibility);
    formDataWithFile.append("additionalInfo", formData.additionalInfo);
    formDataWithFile.append("price", String(formData.price));
    formDataWithFile.append("discount", String(formData.discount));
    formDataWithFile.append("image1", formData.image1[0]);
    if (formData.image2 && formData.image2.length > 0) {
      formDataWithFile.append("image2", formData.image2[0]);
    }

    if (formData.image3 && formData.image3.length > 0) {
      formDataWithFile.append("image3", formData.image3[0]);
    }

    if (formData.image4 && formData.image4.length > 0) {
      formDataWithFile.append("image4", formData.image4[0]);
    }

    useApiCall.mutate(formDataWithFile);
  };

  return (
    <div className=" flex flex-col items-center w-full h-[91.2%] overflow-y-auto  ">
      <span className="text-main text-4xl text-center font-bold ">
        Add Package
      </span>
      <form
        className="flex flex-col gap-10 bg-white py-20 w-full"
        onSubmit={handleSubmit(onSubmit)}
      >
        <div className="flex justify-start px-44 items-start name gap-5">
          <label className="text-xl text-slate-500">Package Name:</label>
          <input
            type="text"
            className="w-[70%] text-lg p-1 mx-[6%] bg-slate-100 border rounded focus:border-2 focus:border-main focus:outline-none  "
            {...register("packageTitle")}
          />
        </div>
        <div className="flex justify-start px-44 items-center name gap-5">
          <label className="text-xl text-slate-500">
            Departure and Return:
          </label>
          <input
            type="text"
            className="w-[70%] text-lg p-1 bg-slate-100 border rounded focus:border-2 focus:border-main focus:outline-none mr-4 "
            {...register("departureAndReturn")}
          />
        </div>
        <div className="flex justify-start px-44 items-center name gap-5">
          <label className="text-xl text-slate-500">Location:</label>

          <select className="w-[100%] p-2 mx-[11.5%]" {...register("locationId")}>
            {locations.map((location) => (
              <option key={location.locationId} value={location.locationId}>
                {location.location}
              </option>
            ))}
          </select>
        </div>
        <div className="flex justify-start px-44 items-center name gap-5">
          <label className="text-xl text-slate-500 mr-16">About:</label>
          <textarea
            className="w-[70%] text-lg p-1 mx-[8%] bg-slate-100 border rounded focus:border-2 focus:border-main focus:outline-none  "
            {...register("about")}
          />
        </div>
        <div className="flex justify-start px-44 items-center name gap-5">
          <label className="text-xl text-slate-500 mr-16">Duration:</label>
          <input
            type="number"
            className="w-[70%] text-lg p-1 mx-[5.5%] bg-slate-100 border rounded focus:border-2 focus:border-main focus:outline-none justify-end "
            {...register("duration")}
          />
        </div>
        {/* Image Previews */}

        {imagePreview && (
          <div className="flex ml-72 gap-1 flex-row">
            {imagePreview.map((preview, index) => (
              <div
                key={index}
                className="flex items-center mr-2 border border-gray-300 rounded-sm"
              >
                {preview.map((img, imgIndex) => (
                  <img
                    key={imgIndex} // Ensure unique key for each image
                    src={img}
                    alt={`Preview-${index}-${imgIndex}`}
                    className="mr-2 border border-gray-300 rounded-sm flex items-center"
                    style={{ width: "100px", height: "100px" }}
                  />
                ))}
              </div>
            ))}
          </div>
        )}

        {/* Image Upload Form */}
        <div className="flex w-full size-auto px-44 gap-1 items-center">
          <label className="text-xl text-slate-500 mr-4">Image 1:</label>
          <input
            className="cursor-pointer  mx-[12%]"
            type="file"
            accept="image/*"
            
            {...register("image1", {
              onChange: (event) => {
                
                const updatedPreview = [...imagePreview[0]];

                
                if (event.target.files && event.target.files[0]) {
                  const file = event.target.files[0];
                  const allowedMimeTypes = ["image/jpeg", "image/png"]; // Adjust as needed
                  if (!allowedMimeTypes.includes(file.type)) {
                    alert(
                      "Invalid file type. Please select an image (JPEG or PNG)."
                    );
                    return; 
                  }

                 
                  const reader = new FileReader();
                  reader.onload = (e?) => {
                    updatedPreview.push(e?.target?.result);
                    
                    setImagePreview([updatedPreview]);
                  };
                  reader.onerror = (error) => {
                    console.error("Error creating image URL:", error);
                    
                  };
                  reader.readAsDataURL(file);
                } else {
                  console.warn("No file selected for Image 1.");
                }
              },
            })}
          />
        </div>

        <div className="flex w-full size-auto px-44 gap-1 items-center">
          <label className="text-xl text-slate-500 mr-4">Image 2:</label>
          <input
            className="cursor-pointer mx-[12%]"
            type="file"
            accept="image/*"
            {...register("image2", {
              onChange: (event) => {
                const updatedPreview = [...imagePreview[0]];

                
                if (event.target.files && event.target.files[0]) {
                  const file = event.target.files[0];
                  const allowedMimeTypes = ["image/jpeg", "image/png"]; // Adjust as needed
                  if (!allowedMimeTypes.includes(file.type)) {
                    alert(
                      "Invalid file type. Please select an image (JPEG or PNG)."
                    );
                    return; 
                  }

                 
                  const reader = new FileReader();
                  reader.onload = (e) => {
                    updatedPreview.push(e?.target?.result);
                    
                    setImagePreview([updatedPreview]);
                  };
                  reader.onerror = (error) => {
                    console.error("Error creating image URL:", error);
                    
                  };
                  reader.readAsDataURL(file);
                } else {
                  console.warn("No file selected for Image 2.");
                }
              },
            })}
          />
        </div>
        <div className="flex w-full size-auto px-44 gap-1 items-center">
          <label className="text-xl text-slate-500 mr-4">Image 3:</label>
          <input
            className="cursor-pointer mx-[12%]"
            type="file"
            accept="image/*"
            {...register("image3", {
              onChange: (event) => {
                const updatedPreview = [...imagePreview[0]];

                
                if (event.target.files && event.target.files[0]) {
                  const file = event.target.files[0];
                  const allowedMimeTypes = ["image/jpeg", "image/png"]; // Adjust as needed
                  if (!allowedMimeTypes.includes(file.type)) {
                    alert(
                      "Invalid file type. Please select an image (JPEG or PNG)."
                    );
                    return; 
                  }

                 
                  const reader = new FileReader();
                  reader.onload = (e) => {
                    updatedPreview.push(e?.target?.result);
                    
                    setImagePreview([updatedPreview]);
                  };
                  reader.onerror = (error) => {
                    console.error("Error creating image URL:", error);
                    
                  };
                  reader.readAsDataURL(file);
                } else {
                  console.warn("No file selected for Image 1.");
                }
              },
            })}
          />
        </div>
        <div className="flex w-full size-auto px-44 gap-1 items-center">
          <label className="text-xl text-slate-500 mr-4">Image 4:</label>
          <input
            className="cursor-pointer mx-[12%]"
            type="file"
            accept="image/*"
            {...register("image4", {
              onChange: (event) => {
                const updatedPreview = [...imagePreview[0]];

                
                if (event.target.files && event.target.files[0]) {
                  const file = event.target.files[0];
                  const allowedMimeTypes = ["image/jpeg", "image/png"]; // Adjust as needed
                  if (!allowedMimeTypes.includes(file.type)) {
                    alert(
                      "Invalid file type. Please select an image (JPEG or PNG)."
                    );
                    return; 
                  }

                 
                  const reader = new FileReader();
                  reader.onload = (e) => {
                    updatedPreview.push(e?.target?.result);
                    
                    setImagePreview([updatedPreview]);
                  };
                  reader.onerror = (error) => {
                    console.error("Error creating image URL:", error);
                    
                  };
                  reader.readAsDataURL(file);
                } else {
                  console.warn("No file selected for Image 1.");
                }
              },
            })}
          />
        </div>

        <div className="flex justify-start px-44 items-center name gap-5">
          <label className="text-xl text-slate-500 mr-16">
            Guidance Language:
          </label>
          <textarea
            className="w-[70%] text-lg p-1 -mx-[4%] bg-slate-100 border rounded focus:border-2 focus:border-main focus:outline-none "
            {...register("guidanceLanguage")}
          />
        </div>
        <div className="flex justify-start px-44 items-center name gap-5">
          <label className="text-xl text-slate-500 mr-16">
            Whats Included:
          </label>
          <textarea
            className="w-[70%] text-lg p-1 bg-slate-100 border rounded focus:border-2 focus:border-main focus:outline-none "
            {...register("whatsIncluded")}
          />
        </div>
        <div className="flex justify-start px-44 items-center name gap-5">
          <label className="text-xl text-slate-500 mr-16">
            What To Expect:
          </label>
          <textarea
            className="w-[70%] text-lg p-1 bg-slate-100 border rounded focus:border-2 focus:border-main focus:outline-none "
            {...register("whatToExpect")}
          />
        </div>
        <div className="flex justify-start px-44 items-center name gap-5">
          <label className="text-xl text-slate-500 mr-16">Accessibility</label>
          <textarea
            className="w-[70%] text-lg p-1 mx-[3%] bg-slate-100 border rounded focus:border-2 focus:border-main focus:outline-none "
            {...register("accessibility")}
          />
        </div>
        <div className="flex justify-start px-44 items-center name gap-5">
          <label className="text-xl text-slate-500 mr-16">
            Additional Info
          </label>
          <textarea
            className="w-[70%] text-lg p-1 bg-slate-100 border rounded focus:border-2 focus:border-main focus:outline-none "
            {...register("additionalInfo")}
          />
        </div>
        <div className="flex justify-start px-44 items-center name gap-5">
          <label className="text-xl text-slate-500 mr-16">Price:</label>
          <input
            type="number"
            className="w-[70%] text-lg p-1 mx-[8%] bg-slate-100 border rounded focus:border-2 focus:border-main focus:outline-none "
            {...register("price")}
          />
        </div>
        <div className="flex justify-start px-44 items-center name gap-5">
          <label className="text-xl text-slate-500 mr-16">Discount:</label>
          <input
            type="number"
            className="w-[70%] mx-[5%] text-lg p-1 bg-slate-100 border rounded focus:border-2 focus:border-main focus:outline-none "
            {...register("discount")}
          />
        </div>

        <div className="mt-0">
          <button
            className="px-5 py-3 bg-blue-500 text-white font-semibold text-xl hover:bg-yellow-400 focus:outline-none focus:border-yellow-400 transition"
            type={"submit"}
          >
            Add Package
            <Toaster
              className="absolute right-0 transform translate-x-16 transition-transform duration-300 ease-in-out"
              richColors
            />
          </button>
        </div>
      </form>
    </div>
  );
};
