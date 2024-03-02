"use client";
import React, { useState, useEffect } from "react";
import Card from "../components/Packages/Cards";
import axios from "axios";
import { IoSearch } from "react-icons/io5";
import Navbar from "../components/Footer/navbar";
import Footer from "../components/Footer/Footer";


type PackageItemProps = {
  packageTitle: string;
  discount: string;
  price: string;
  about: string;
  duration: string;
  id: string;
  image1: string;
  image2: string | null;
  image3: string | null;
  image4: string | null;
};

const PackageItem: React.FC<PackageItemProps> = ({
    
 packageTitle ,
  price,
  about,
  duration,
  id,
  discount,
  image1,
}) => {
  const numericPrice = parseInt(price);
  const discountPercentage = parseInt(discount);
  
  console.log("packagetitle",packageTitle)
  console.log("duration",duration)
  console.log("price",price)
  if (isNaN(numericPrice) || isNaN(discountPercentage)) {
    console.error("Invalid price or discount:", price, discount);
    return null;
  }

  return (
    <div className="overflow-hidden border border-slate-200 w-80 h-80 group flex justify-center mx-auto">
      <div className="overflow-hidden relative">
        <Card package_title={packageTitle } price={price} image1={image1}>
          <div className="text-bold flex justify-between">
            <strong className="text-xl">{packageTitle }</strong>
            
              {discountPercentage > 0 ? (
                <>
                  <span className="text-white font-bold ">
                    {discount}% OFF!
                  </span>
                </>
              ) : (
                <span className="font-bold">${numericPrice.toFixed(2)}</span>
              )}
            
          </div>

          <div className="flex justify-between">
            <div className="mt-1">{duration} days</div>
            
            
          </div>
          <hr className="mt-2 mb-2 border-white" />
          <div className="mt-2">{about}</div>
          <hr className="mt-2 mb-2 border-white" />
          <div className="mt-2 flex justify-between items-center">
            <button className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-700 transition">
              {/* <Link
                href="/packages/[package_id]"
                as={`/packages/${package_id}`}
              > */}
                Details
              {/* </Link> */}
            </button>
          </div>
                    
        </Card>
      </div>
    </div>
  );
};

const Packages: React.FC = () => {
  const [packageData, setPackageData] = useState<Array<PackageItemProps>>([]);
  const [searchQuery, setSearchQuery] = useState("");

  useEffect(() => {
    axios
      .get("http://localhost:8082/package/getAll")
      .then((response) => {
        setPackageData(response.data);
      })
      .catch((error) => {
        console.error("Error fetching package data:", error);
      });
      
  }, []);

  const handleSearchChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearchQuery(e.target.value);
  };
  
  return (
    <>
      <Navbar />
      <div className="mt-16">
        <div className="mb-0" style={{ position: "relative" }}>
        <h3 className="font-bold text-4xl text-left bg-indigo-950 text-white p-4 pb-4 mb-0">
            Our Packages
          </h3>
          <div
            style={{
              position: "absolute",
              top: "70%",
              left: "50%",
              transform: "translate(-50%, -50%)",
              width: "700px",
              textAlign: "center",
            }}
          >
            <div
              style={{
                position: "absolute",
                top: "70%",
                left: "50%",
                transform: "translate(-50%, -50%)",
                width: "80%",
                textAlign: "center",
              }}
            >
              <form className="flex items-center bg-white rounded-md">
                <IoSearch className="text-slate-600 mx-4 mr-2" />
                <input
                  type="text"
                  placeholder="Search..."
                  style={{
                    width: "50%",
                    padding: "10px",
                    borderRadius: "2px",
                    border: "0px solid #fff",
                    outline: "none",
                  }}
                  value={searchQuery}
                  onChange={handleSearchChange}
                />
              </form>
            </div>
          </div>
        </div>
        <>

          <section className="">
            <div className="container ">
              <div className="grid grid-cols-1 gap-x-8 gap-y-14 sm:grid-cols-1 md:grid-cols-2 lg:grid-cols-4 items-center">
                {packageData.map((card) => (
                  <PackageItem
                    key={card.id}
                    packageTitle={card.packageTitle}
                    image1={card.image1}
                    price={card.price.toString()}
                    about={card.about}
                    id={card.id.toString()}
                    duration={card.duration}
                    discount={card.discount.toString()} 
                    image2={null} image3={null} image4={null}                  />
                ))}
              </div>
            </div>
          </section>
          
        </>
      </div>
      <Footer/>
    </>
  );
};

export default Packages;
