import React from 'react'
import { Link } from 'react-router-dom'
import "./pageNotFound.css"

const PageNotFound = () => {
  return (
    <div className='container-fluid'>
      <div className="container">
        <div className="row">
          <div className="col-12 col-sm-12 col-md-6 col-lg-6 d-flex flex-column justify-content-center">
              <p className='fw-bold fs-3'><span style={{fontSize:"40px"}}>O</span>ops!</p>
              <p className='fs-4'>404 Error</p>
              <p className='text-warning fs-4'>Something Went Wrong</p>
              <Link to="/home" className='btn bg-info p-3 my-5 text-decoration-none fs-5 text-dark homeBtn'>Return to home</Link>
          </div>
          <div className="col-12 col-sm-12 col-md-6 col-lg-6">
            <img src="/assets/404.png" alt="" className='img-fluid h-75 my-5'/>
          </div>
        </div>
      </div>
    </div>
  )
}

export default PageNotFound

