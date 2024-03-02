export const Hero = () => {
  return (
   <section id="hero" className='max-container padding-container flex flex-col gap-20 py-10 md:gap-28 lg:py-20'>
    <div>
    <div className="mt-1">
      <div className="flex bg-white h-96 container mx-auto">
        <div className="flex items-center text-center lg:text-left px-8 md:px-12 lg:w-1/2">
          <div>
            <h2 className="text-3xl font-semibold text-gray-800 md:text-4xl">
              Welcome to <span className="text-pink-600">Nomad Nook</span>
            </h2>
            <p className="mt-2 text-sm text-gray-500 md:text-base">
            Embark on your next adventure with our travel platform, where wanderlust meets 
            convenience. Discover breathtaking destinations, immerse yourself in diverse cultures, 
            and create unforgettable memories. Whether you crave the thrill of exploring bustling cities, 
            the serenity of remote beaches, or the wonder of natural wonders, our platform connects you to your dream getaway. 
            Let us inspire your wanderlust and make your travel dreams a reality. Start your journey today!
            </p>
            <div className="flex justify-center lg:justify-start mt-6">
              <button className="md:mt-0 mt-2 ml-2 md:mr-0 mr-2 bg-blue-500 px-5 py-3 rounded-xl text-sm text-white hover:text-white shadow-xl hover:shadow-xl hover:shadow-blue-400 shadow-pink-400/40 hover:bg-blue-600">Explore Packages</button> 
            </div>
          </div>
        </div>
        <div className="hidden lg:block lg:w-1/2" style={{clipPath: "polygon(10% 0, 100% 0%, 100% 100%, 0 100%)"}}>
          <div className="h-full object-cover" style={{backgroundImage: `url('https://media.istockphoto.com/id/835197122/vector/golden-light-background.jpg?s=612x612&w=0&k=20&c=W6_7rbuCcts5BetM-8g514-xe6x7liARVj5ZgWhliEM=')`}}>
            <div className="h-full bg-black opacity-25"></div>
          </div>
        </div>
      </div>
    </div>
    </div>
   </section> 
  )
}
