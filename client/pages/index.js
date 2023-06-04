import React from "react";

const Home = () => {
  return (
    <div>
      <section className="relative bg-stone-500">
        <div className="absolute inset-0" />
        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-48">
          <h1 className="text-4xl font-bold tracking-tight text-white sm:text-5xl md:text-6xl">
            <span className="block xl:inline">Complaint Management System</span>
          </h1>
          <p className="mt-3 text-base text-gray-300 sm:mt-5 sm:text-xl md:mt-5 md:text-2xl">
            Complaints made easy, justice made possible.
          </p>
          <div className="w-1/2 xs:w-full mt-5 sm:mt-8 sm:flex sm:justify-center lg:justify-start">
            <div className="rounded-md shadow">
              <a
                href="#features"
                className="w-full flex items-center justify-center px-8 py-3 border border-transparent text-base font-medium rounded-md text-white bg-stone-700 hover:bg-stone-900 md:py-4 md:text-lg md:px-10"
              >
                Learn More
              </a>
            </div>
          </div>
        </div>
      </section>

      <div className="container mx-auto mb-32 xs:mb-60" id="features">
        <h2 className="text-3xl font-bold text-center my-4">Our Features</h2>
        <div className="flex flex-wrap content-start justify-around [&>*]:w-[30%] [&>*]:m-2 xs:[&>*]:w-[100%]">
          <div className="bg-white rounded-lg shadow-md hover:shadow-lg transition duration-300 ease-in-out">
            <div className="px-4 py-6">
              <h3 className="text-lg font-medium text-gray-900 mb-2">
                Complaint Registration
              </h3>
              <p className="text-gray-700 leading-relaxed">
                Register complaints easily and efficiently.
              </p>
            </div>
          </div>
          <div className="bg-white rounded-lg shadow-md hover:shadow-lg transition duration-300 ease-in-out">
            <div className="px-4 py-6">
              <h3 className="text-lg font-medium text-gray-900 mb-2">
                Transparent System
              </h3>
              <p className="text-gray-700 leading-relaxed">
                The system is transparent and open to public scrutiny.
              </p>
            </div>
          </div>
          <div className="bg-white rounded-lg shadow-md hover:shadow-lg transition duration-300 ease-in-out">
            <div className="px-4 py-6">
              <h3 className="text-lg font-medium text-gray-900 mb-2">
                Immutable Records
              </h3>
              <p className="text-gray-700 leading-relaxed">
                Records are stored on a secure and immutable blockchain.
              </p>
            </div>
          </div>
          <div className="bg-white rounded-lg shadow-md hover:shadow-lg transition duration-300 ease-in-out">
            <div className="px-4 py-6">
              <h3 className="text-lg font-medium text-gray-900 mb-2">
                Decentralized System
              </h3>
              <p className="text-gray-700 leading-relaxed">
                The system is decentralized and not controlled by any single
                entity.
              </p>
            </div>
          </div>
          <div className="bg-white rounded-lg shadow-md hover:shadow-lg transition duration-300 ease-in-out">
            <div className="px-4 py-6">
              <h3 className="text-lg font-medium text-gray-900 mb-2">
                Secure Storage
              </h3>
              <p className="text-gray-700 leading-relaxed">
                Data is stored on a secure and tamper-proof blockchain.
              </p>
            </div>
          </div>
          <div className="bg-white rounded-lg shadow-md hover:shadow-lg transition duration-300 ease-in-out">
            <div className="px-4 py-6">
              <h3 className="text-lg font-medium text-gray-900 mb-2">
                Faster Processing
              </h3>
              <p className="text-gray-700 leading-relaxed">
                Complaints are processed quickly and efficiently.
              </p>
            </div>
          </div>
          <div className="bg-white rounded-lg shadow-md hover:shadow-lg transition duration-300 ease-in-out">
            <div className="px-4 py-6">
              <h3 className="text-lg font-medium text-gray-900 mb-2">
                User-Friendly Interface
              </h3>
              <p className="text-gray-700 leading-relaxed">
                The system is easy to use and navigate.
              </p>
            </div>
          </div>
        </div>
      </div>
      <footer className="bg-gray-900 text-white py-4 px-2 fixed bottom-0 w-full">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex justify-between items-center xs:flex-col ">
          <p>&copy; 2023 Complaint Management System</p>
          <ul className="flex xs:my-3 xs:flex-col xs:justify-center items-center">
            <li className="mx-3">
              <a href="#" className="hover:text-gray-400">
                Privacy Policy
              </a>
            </li>
            <li className="mx-3">
              <a href="#" className="hover:text-gray-400">
                Terms of Service
              </a>
            </li>
            <li className="mx-3">
              <a href="#" className="hover:text-gray-400">
                Contact Us
              </a>
            </li>
          </ul>
        </div>
      </footer>
    </div>
  );
};

export default Home;
