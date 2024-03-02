import React, { useEffect, useState } from "react";
import axios from "axios";
import Carousel from "react-multi-carousel";
import "react-multi-carousel/lib/styles.css";
import { useNavigate } from "react-router-dom";
import Card from "../components/Packages/Cards";

type PackageItemProps = {
  packageTitle: string;
  discount: string;
  price: string;
  about: string;
  duration: string;
  id: string;
  image1: string;
};

const responsive = {
  desktop: {
    breakpoint: { max: 3000, min: 1024 },
    items: 4,
    slidesToSlide: 3, // optional, default to 1.
  },
  tablet: {
    breakpoint: { max: 1024, min: 464 },
    items: 2,
    slidesToSlide: 2, // optional, default to 1.
  },
  mobile: {
    breakpoint: { max: 464, min: 0 },
    items: 1,
    slidesToSlide: 1, // optional, default to 1.
  },
};

const PackageItem: React.FC<PackageItemProps> = ({
  packageTitle,
  price,
  about,
  duration,
  id,
  discount,
  image1,
}) => {
  const numericPrice = parseInt(price);
  const discountPercentage = parseInt(discount);

  const navigate = useNavigate();

  const handleClickDetails = () => {
    navigate(`/package/${id}`);
  };

  if (isNaN(numericPrice) || isNaN(discountPercentage)) {
    console.error("Invalid price or discount:", price, discount);
    return null;
  }

  return (
    <div className="overflow-hidden border border-slate-200 w-80 h-80 group flex  justify-center mx-auto">
      <div className="overflow-hidden relative">
        <Card package_title={packageTitle} price={price} image1={image1}>
          <div className="text-bold flex justify-between">
            <strong className="text-xl">{packageTitle}</strong>

            {discountPercentage > 0 ? (
              <>
                <span className="text-white font-bold ">{discount}% OFF!</span>
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
            <button
              className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-700 transition"
              onClick={handleClickDetails}
            >
              Details
            </button>
          </div>
        </Card>
      </div>
    </div>
  );
};

export const PackageSlider = () => {
  const [packageData, setPackageData] = useState<Array<PackageItemProps>>([]);

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

  return (
    <section id="package" className="flex items-center justify-center">
      <div className="w-[90%] py-5 items-center text-center pb-14">
        <h1 className="font-bold text-3xl mb-4">Our Packages</h1>

        <Carousel
          swipeable={false}
          draggable={false}
          showDots={true}
          responsive={responsive}
          ssr={true}
          infinite={true}
          autoPlaySpeed={1000}
          keyBoardControl={true}
          customTransition="all .5"
          transitionDuration={500}
          containerClass="carousel-container"
          removeArrowOnDeviceType={["tablet", "mobile"]}
          dotListClass="custom-dot-list-style"
          itemClass="carousel-item-padding-40-px  "
        >
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
            />
          ))}
        </Carousel>
      </div>
    </section>
  );
};
