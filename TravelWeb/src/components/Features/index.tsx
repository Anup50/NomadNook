import FeatureCard from "./featureCard";
import { features } from "./featureData";

const Features = () => {
  return (
    <>
          <section id="features" className="flex py-16 md:py-20 lg:py-28 justify-center text-center">
      <div className="w-[85%] text-center pb-14">
        <h1 className="font-bold text-3xl mb-4">Why Choose Us?</h1>
        <div className="container">
          <div className="grid grid-cols-1 gap-x-8 gap-y-14 md:grid-cols-2 lg:grid-cols-3 justify-center items-center pt-4">
            {features.map((feature) => (
              <FeatureCard
                key={feature.id}  
                id={feature.id}
                title={feature.title}
                description={feature.description}
                icon={feature.icon}
              />
            ))}
          </div>
        </div>
      </div>
    </section>
    </>
  );
};

export default Features;
