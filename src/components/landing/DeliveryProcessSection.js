import React from 'react';

const DeliveryProcessSection = () => {
  return (
    <section className="py-16 px-4 sm:px-6 lg:px-8 bg-white">
      <div className="max-w-7xl mx-auto">
        {/* Title with Question Mark */}
        <div className="text-center mb-12">
          <h2 className="text-4xl font-bold mb-2">
            <span className="text-purple-600">Delivery Process</span>
          </h2>
          <div className="text-3xl font-bold text-gray-700">
            for VIP Number <span className="text-red-600 ml-2">?</span>
          </div>
        </div>

        {/* Process Steps - Fixed Horizontal */}
        <div className="flex justify-between items-start gap-4">
          {/* Pay Step */}
          <div className="flex-1 text-center">
            <div className="w-16 h-16 mx-auto mb-4">
              <svg className="w-full h-full" viewBox="0 0 24 24" fill="none" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5" d="M17 9V7a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2m2 4h10a2 2 0 002-2v-6a2 2 0 00-2-2H9a2 2 0 00-2 2v6a2 2 0 002 2zm7-5a2 2 0 11-4 0 2 2 0 014 0z" />
              </svg>
            </div>
            <h3 className="text-lg sm:text-xl font-semibold text-purple-600 mb-2">Pay</h3>
            <p className="text-sm sm:text-base text-gray-700">to place an Order</p>
          </div>

          {/* Get UPC Step */}
          <div className="flex-1 text-center">
            <div className="w-16 h-16 mx-auto mb-4">
              <svg className="w-full h-full" viewBox="0 0 24 24" fill="none" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5" d="M5 13l4 4L19 7" />
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5" d="M13 2H6a2 2 0 00-2 2v16a2 2 0 002 2h12a2 2 0 002-2V9l-7-7z" />
              </svg>
            </div>
            <h3 className="text-lg sm:text-xl font-semibold text-purple-600 mb-2">Get UPC</h3>
            <p className="text-sm sm:text-base text-gray-700">UPC will be delivered through SMS, Whatsapp & Email.</p>
          </div>

          {/* Do MNP Step */}
          <div className="flex-1 text-center">
            <div className="w-16 h-16 mx-auto mb-4">
              <svg className="w-full h-full" viewBox="0 0 24 24" fill="none" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5" d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
              </svg>
            </div>
            <h3 className="text-lg sm:text-xl font-semibold text-purple-600 mb-2">Do MNP</h3>
            <p className="text-sm sm:text-base text-gray-700">Start the MNP Process at the nearest retail shop to get the Sim</p>
          </div>
        </div>
      </div>
    </section>
  );
};

export default DeliveryProcessSection;