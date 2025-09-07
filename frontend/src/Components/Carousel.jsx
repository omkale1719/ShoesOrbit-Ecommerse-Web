import React from 'react'

const Carousel = () => {
  return (
    <div>
        <div id="carouselExampleControlsNoTouching" className="carousel slide" data-bs-touch="false" >
  <div className="carousel-inner" id="carousel">
    
        {/* Search Box */}
          <div className="carousel-caption" style={{ zIndex: "10" }}>
            <form className="d-flex">
              <input
                className="form-control me-2"
                type="search"
                placeholder="Search"
                aria-label="Search"
              />
              <button className="btn btn-outline-success" type="submit">
                Search
              </button>
            </form>
          </div>
          <div className="carousel-item active">
      <img src="https://img.freepik.com/free-vector/modern-sale-banner-with-product-description_1361-1259.jpg?semt=ais_hybrid&w=740&q=80" className="d-block w-100 img-contain" style={{ filter: "brightness(30%)" }} alt="..."/>
    </div>
    <div className="carousel-item">
      <img src="https://img.freepik.com/free-psd/sneakers-template-design_23-2151796603.jpg" className="d-block w-100 img-contain" style={{ filter: "brightness(30%)" }} alt="..."/>
    </div>
    <div className="carousel-item">
      <img src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcThcq0DqlxRHaR-mOZwq4O-IeGJY39oQz58asfpfkPwXAcFv97a4YQhsOHK8QitCtNWBkE&usqp=CAU" className="d-block w-100 img-contain" style={{ filter: "brightness(30%)" }} alt="..."/>
    </div>
  </div>
  <button className="carousel-control-prev" type="button" data-bs-target="#carouselExampleControlsNoTouching" data-bs-slide="prev">
    <span className="carousel-control-prev-icon" aria-hidden="true"></span>
    <span className="visually-hidden">Previous</span>
  </button>
  <button className="carousel-control-next" type="button" data-bs-target="#carouselExampleControlsNoTouching" data-bs-slide="next">
    <span className="carousel-control-next-icon" aria-hidden="true"></span>
    <span className="visually-hidden">Next</span>
  </button>
</div>
    </div>
  )
}

export default Carousel