import React from 'react';
import { useSelector } from 'react-redux';
import SectionTitle from '../../components/SectionTitle';


function Contact() {
  // Fetch `portfolioData` from Redux and provide a default fallback for `contact`
  const { portfolioData } = useSelector((state) => state.root);
  const contacts = portfolioData?.contacts || {}; // Fallback to empty object if `contact` is undefined

  return (
    <div className='text-xl'>
      <SectionTitle title="Say Hello" />
      <div className="flex sm:flext-col items-center justify-between">
        <div className="flex flex-col ">
          <p className="text-white text-ml">{"{"}</p>
          {/* Only map over `contact` if it has keys */}
          {Object.keys(contacts).length > 0 ? (
            Object.keys(contacts).map((key) => (
              <p className="text-md" key={key}>
                <span className="text-white text-sm">{key} : </span>
                <span className="text-white text-sm">{contacts[key]}</span>
              </p>
            ))
          ) : (
            <p className="text-white text-sm">No contact information available</p>
          )}
          <h1 className="text-white">{"}"}</h1>
        </div>
        <div className="h-[400px]">
          <lottie-player
            src="https://lottie.host/809d03aa-5907-425d-8a03-087a7d9db311/liOrlpzNUt.json"
            background="##FFFFFF"
            speed="1"
            loop
            autoplay
            mode="transparent"
          ></lottie-player>
        </div>
      </div>
    </div>
  );
}

export default Contact;
