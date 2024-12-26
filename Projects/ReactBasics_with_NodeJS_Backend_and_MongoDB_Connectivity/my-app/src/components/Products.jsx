import React, { useState, useEffect } from "react";
import 'bootstrap/dist/css/bootstrap.min.css';


const Products = () => {

  const [productDetails,setProductDetails] = useState([]);

  useEffect(()=>{
    const fetchProducts = async ()=>{
      try {
        const response = await fetch('https://fakestoreapi.in/api/products');
        const data = await response.json();
        if (data.status === 'SUCCESS') {
          console.log(data)
          setProductDetails(data.products);
        }
      } catch (error) {
        console.error('error fetching api : ', error);
      }
    } ;
    fetchProducts();
  },[])

  return (
    <div className="d-flex flex-wrap">
      {productDetails.map((product)=>(
        <div key={product.id} className="card" style={{width : "18rem"}}>
        <img className="card-img-top" src={product.image} alt="Card image cap" />
        <div className="card-body">
          <h5 className="card-title">{product.title}</h5>
          <p className="card-text">
            {product.description}
          </p>
          <a href="#" className="btn btn-primary">
            Go somewhere
          </a>
        </div>
      </div>
      ))}
    </div>
  );
};

export default Products;
