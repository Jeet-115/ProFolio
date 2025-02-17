import React from 'react'

const CTALeftDiv = () => {
  return (
    <>
      {/* Left Div - Paragraph */}
      <div className="md:w-1/2 text-center md:text-left mb-6 md:mb-0">
          <p className="text-lg text-gray-200">
            Create a stunning portfolio and showcase your skills to the world.
            Profolio helps you build professional resumes effortlessly.Create a
            stunning portfolio and showcase your skills to the world. Profolio
            helps you build professional resumes effortlessly.Create a stunning
            portfolio and showcase your skills to the world. Profolio helps you
            build professional resumes effortlessly.Create a stunning portfolio
            and showcase your skills to the world. Profolio helps you build
            professional resumes effortlessly.
          </p>
          {/* Buttons */}
          <div className="flex justify-center space-x-14 mt-8">
            <button className=" px-6 py-3 bg-[#346779] text-white rounded-2xl text-lg hover:bg-[#1F3B45] transition duration-300 hover:shadow-[0_0_5px_0px_#ffffff]">
              My Projects
            </button>
            <button className="px-6 py-3 bg-transparent border-2 border-[#346779] text-[#346779] rounded-2xl text-lg hover:bg-[#1F3B45] hover:text-white transition duration-300 hover:shadow-[0_0_5px_0px_#ffffff]">
              Create Projects
            </button>
          </div>
        </div>
    </>
  )
}

export default CTALeftDiv
