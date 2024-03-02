import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";
import TravelPackageTable from "../components/Packages/TravelPackageTable";
import ExpandableSection from "../components/Packages/DropDown";
import Navbar from "../components/Footer/navbar";
import Footer from "../components/Footer/Footer";




export default function PackageDetail(){
 
 const params = useParams();
 const id = params.id;
 const [loading, setLoading] = useState(true);
 console.log(id);
 const [error, setError] = useState(null);

 
  const [data, setData] = useState<any>(null);

  useEffect(() => {
    const fetchPackageData = async () => {
      try {
        const response = await axios.get(
          `http://localhost:8082/package/getSelectedPackage/${id}`
        );

        console.log("Retrieved data:", response.data);
        const { location_id: { location, ...restLocation }, ...packageDataWithoutLocation } = response.data;
        console.log(packageDataWithoutLocation,
            location);
        
            setData({
                ...packageDataWithoutLocation,
                location
              });
        console.log("Current data state:", data);
         

      }  catch (error) {
        console.error("Error fetching package data:", error);
        
        setLoading(false); // Update loading state even in case of error
      }
    };

    fetchPackageData();
  }, [id]);

  if (!data) {
    return <div>Loading...</div>; // Show loading indicator
  }

  if (error) {
    return <div>Error: {error.message}</div>; // Show error message
  }

  const numericPrice = parseInt(data.price);
  const discountPercentage = parseInt(data.discount);

  if (isNaN(numericPrice) || isNaN(discountPercentage)) {
    console.error("Invalid price or discount:", data.price, data.discount);
    return null;
  }

  const discountedPrice =
    numericPrice - (numericPrice * discountPercentage) / 100;


  return (
    <>
      <Navbar/>

      <div className="mt-14 flex py-5 md:py-5 lg:py-5 justify-center bg-slate-50">
        <div className="max-w-7xl w-full">
          <h1 className="text-2xl font-bold mt-2 mb-5">{data.packageTitle}</h1>
          <span className="text-violet-600 font-semibold mt-2 mb-">
            {data.location}
          </span>

          <div className="flex flex-col justify-between lg:flex-row gap-16 mt-2">
            <div className="flex flex-col gap-6 w-full ">
              <div className="flex items-stretch h-96 rounded-3xl">
                {data.image1 && (
                  <img
                  src={`data:image/png;base64,${data.image1}`}
                    alt={data.packageTitle}
                    className="w-2/3 h-auto object-cover "
                  />
                )}

                <div className="flex flex-col ml-4 w-1/2">
                  {data.image2 && (
                    <img
                    src={`data:image/png;base64,${data.image2}`}
                      alt={data.package_title}
                      className="h-1/2 w-3/4 mb-2 "
                    />
                  )}
                  {data.image3 && (
                    <img
                    src={`data:image/png;base64,${data.image3}`}
                      alt={data.package_title}
                      className="h-1/2 w-3/4 "
                    />
                  )}
                </div>
              </div>

              <div className="flex flex-wrap flex-col gap-4 bg-slate-50">
                {/* Additional content goes here */}
                <div className="text-xl font-bold text-black">About</div>
                <p className="text-gray-700">{data.about}</p>

                {/* Container for Price Box and Table */}
                <div className="flex flex-auto  mt-4">
                  {/* Table */}
                  <div className="flex lg:w-2/3 flex-col">
                    <TravelPackageTable
                      depature_and_return={data.departureAndReturn}
                      accessibility={data.accessibility}
                      guidance_language={data.guidanceLanguage}
                    />
                    <div>
                      {/* Uncommented ExpandableSection */}
                      <ExpandableSection
                        buttonLabel="What to expect"
                        expandedContent={data.whatToExpect}
                      />
                      <ExpandableSection
                        buttonLabel="What is included"
                        expandedContent={data.whatsIncluded}
                      />
                      <ExpandableSection
                        buttonLabel="Additional Information"
                        expandedContent={data.additionalInfo}
                      />
                      <div className="pb-4"></div>
                    </div>
                  </div>

                  {/* Price Box */}
                  <div className="p-4 rounded-lg shadow-lg lg:w-1/4 h-44">
                    <h2 className="text-xl font-bold mb-2">Package Price:</h2>
                    {discountPercentage > 0 ? (
                      <div>
                        <span className="text-red-500 text-2xl font-semibold">
                          {`$ ${discountedPrice.toFixed(2)}`}
                        </span>
                        <br />
                        <span className="line-through text-gray-500">{`$ ${numericPrice.toFixed(
                          2
                        )}`}</span>
                      </div>
                    ) : (
                      <span className="text-2xl font-semibold">{`$ ${numericPrice.toFixed(
                        2
                      )}`}</span>
                    )}
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      <Footer/>
    </>
  );
}
