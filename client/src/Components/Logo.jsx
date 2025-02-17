import React from 'react'
import { Link } from "react-router-dom";

const Logo = () => {
  return (
    <>
      <Link to="/">
          <div className="flex pl-3 pt-3">
            <h1 className="text-5xl font-bold text-[#1ABC9C] inter">PROFOLIO</h1>
          </div>
        </Link>
    </>
  )
}

export default Logo
