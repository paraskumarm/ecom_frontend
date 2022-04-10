import React from "react";

const ShopSearch = (products, setCurrentData = (f) => f) => {
  const myfun = (e) => {
    e.preventDefault();
    let filterval = document.getElementById("sidesearchbar").value;
    
    let p = products.products;
    let fp = [];
    for (let i = 0; i < p.length; i++) {
      if (p[i].name.toLowerCase().includes(filterval)) {
        fp.push(p[i]);
      }
    }
    setCurrentData(fp);
  };
  return (
    <div className="sidebar-widget">
      <h4 className="pro-sidebar-title">Search </h4>
      <div className="pro-sidebar-search mb-50 mt-25">
        <form className="pro-sidebar-search-form" action="#">
          <input type="text" placeholder="Search here..." id="sidesearchbar" />
          <button onClick={myfun}>
            <i className="pe-7s-search" />
          </button>
        </form>
      </div>
    </div>
  );
};

export default ShopSearch;
