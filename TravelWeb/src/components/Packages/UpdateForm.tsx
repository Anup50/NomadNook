import { useState, useEffect } from "react";
import { useMutation } from "@tanstack/react-query";
import { useForm } from "react-hook-form";
import axios from "axios";
import { toast, Toaster } from "sonner";

interface Dishdata {
  id?: number;
  dish?: string;
  categoryID?: number;
  dishImage?: string;
  price?: number;
}
const UpdateForm: React.FC<{ dishId: number }> = ({ dishId }) => {
  const [dishData, setDishData] = useState<Dishdata>({});
  const { register, handleSubmit, setValue, watch } = useForm();
  const [categories, setCategories] = useState<
    { id: number; category: string }[]
  >([]);
  const [dishPreview, setDishPreview] = useState<string[]>([]);
  const watchedDishImage = watch("dishImage");

  useEffect(() => {
    const fetchCategories = async () => {
      try {
        const response = await axios.get(
          "http://localhost:8080/category/getAllCategories"
        );
        if (response.status === 200) {
          setCategories(response.data);
        }
      } catch (error) {
        console.error("Error fetching categories:", error);
      }
    };

    fetchCategories();
  }, []);

  useEffect(() => {
    const fetchDishData = async () => {
      try {
        const response = await axios.get(
          `http://localhost:8080/dish/findDishById/${dishId}`
        );
        const { dishImage, ...dishDataWithoutImage } = response.data;
        setDishData(dishDataWithoutImage);
        setDishPreview([response.data.dishImage]);
      } catch (error) {
        console.error("Error fetching dish data:", error);
      }
    };

    fetchDishData();
  }, [dishId]);

  useEffect(() => {
    if (watchedDishImage && watchedDishImage.length > 0) {
      handleFileInputChange(watchedDishImage, "dishImage");
    }
  }, [watchedDishImage]);

  const handleFileInputChange = (files: FileList, fieldName: "dishImage") => {
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
      if (fieldName === "dishImage") {
        setDishPreview(previewUrls);
      }
    });
  };

  useEffect(() => {
    setValue("id", dishData.id);
    setValue("dish", dishData.dish);
    setValue("categoryID", dishData.categoryID);
    setValue("dishImage", dishData.dishImage);
    setValue("price", dishData.price);
  }, [dishData, setValue]);

  const useApiCall = useMutation({
    mutationKey: ["POST_PRODUCT_MANAGEPRODUCT"],
    mutationFn: async (formData: any) => {
      try {
        const response = await axios.post(
          "http://localhost:8080/dish/createDish",
          formData,
          {
            headers: {
              authorization: "Bearer " + localStorage.getItem("accessToken"),
              "Content-Type": "multipart/form-data",
            },
          }
        );
        if (response.status === 200) {
          toast.success("Dish updated Successfully");
        }
      } catch (error: any) {
        console.error("Error updating dish:", error);
        toast.error(`Error: ${error.message}`);
      }
    },
  });

  const onSubmit = (formData: Dishdata) => {
    useApiCall.mutate(formData);
  };

  return (
    <div className="flex flex-col items-center w-full h-[91.2%] ">
      <span className="text-main text-4xl text-center font-bold ml-24">
        Update Dish
      </span>
      <form
        className="flex flex-col gap-10 bg-white w-full py-20"
        onSubmit={handleSubmit(onSubmit)}
      >
        <div className="flex justify-center items-center name gap-5">
          <label className="text-xl text-slate-500">Dish Name:</label>
          <input
            type="text"
            className="w-[63%] text-lg p-1 bg-slate-100 border rounded focus:border-2 focus:border-main focus:outline-none "
            {...register("dish")}
          />
        </div>
        <div className="flex justify-center items-center gap-3">
          <label className="text-xl text-slate-500">Category:</label>
          <select className="w-[48%] p-2" {...register("categoryID")}>
            {categories.map((category) => (
              <option key={category.id} value={category.id}>
                {category.category}
              </option>
            ))}
          </select>
          <button className="bg-main p-2.5 text-white text-xl font-semibold rounded hover:bg-yellow-400 focus:outline-none focus:border-yellow-400 transition">
            Add Category
          </button>
        </div>
        <div className="flex w-full size-auto ml-60 gap-1 items-center">
          <label className="text-xl text-slate-500 mr-4">Dish Image:</label>
          <input
            className=" cursor-pointer"
            type="file"
            accept="image/*"
            {...register("dishImage")}
          />
          <div>
            {dishPreview.map((preview, index) => (
              <img
                key={index}
                src={
                  watchedDishImage && watchedDishImage.length > 0
                    ? preview
                    : `data:image/jpeg;base64,${preview}`
                }
                alt={`Preview-${index}`}
                className="mr-2 border border-gray-300 rounded-sm"
                style={{ width: "100px", height: "100px" }}
              />
            ))}
          </div>
        </div>
        <div className="flex justify-center items-center name gap-5">
          <label className="text-xl text-slate-500 mr-16">Price:</label>
          <input
            type="number"
            className="w-[60%] text-lg p-1 bg-slate-100 border rounded focus:border-2 focus:border-main focus:outline-none "
            {...register("price")}
          />
        </div>
        <div className="mt-5">
          <button
            className="px-5 py-3 bg-main text-white font-semibold text-xl hover:bg-yellow-400 focus:outline-none focus:border-yellow-400 transition"
            type="submit"
          >
            Update Dish
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

export default UpdateForm;