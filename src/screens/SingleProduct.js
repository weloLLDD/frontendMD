import React, { useEffect, useState } from "react";
import Header from "./../components/Header";
import Rating from "../components/homeComponents/Rating";
import { useDispatch, useSelector } from "react-redux";
import { listProductDetails } from "../Redux/Action/ProductAction";
import Loading from "../components/LoadingError/Loading";
import Message from "./../components/LoadingError/Error";
import { useParams } from 'react-router-dom';
import { useNavigate } from 'react-router-dom';

const SingleProduct = ({ history, match }) => {
  const [qty, setQty] = useState(1); 
  

   const {id} = useParams();
    const productId = id

  const navigate = useNavigate();

   
  const dispatch = useDispatch();

  const productDetails = useSelector((state) => state.productDetails);

  const { loading, error, product } = productDetails; 

  useEffect(() => {
 
    dispatch(listProductDetails(productId));
  }, [dispatch, productId]);

  const AddToCartHandle = (e) => {

    e.preventDefault();     
      navigate(`/cart/${productId}?qty=${qty}`);
  };

  return (
    <>
      <Header />
      <div className="container single-product">
       
        {loading ? (
          <div className="mb-5">
            <Loading />
          </div>
        ) : error ? (
          <Message variant="alert-danger">{error}</Message>
        ) : (
          <>
            <div className="row">
              <div className="col-md-6">
                <div className="single-image">
                  <img src={product.image} alt={product.name} />
                </div>
              </div>
              <div className="col-md-6">
                <div className="product-dtl">
                  <div className="product-info">
                    <div className="product-name">{product.name}</div>
                  </div>
                  <p>{product.description}</p>

                  <div className="product-count col-lg-7 ">
                    <div className="flex-box d-flex justify-content-between align-items-center">
                      <h6>Price</h6>
                      <span>${product.price}</span>
  
                    </div>
                    <div className="flex-box d-flex justify-content-between align-items-center">
                      <h6>Status</h6>
                      {product.countInStock > 0 ? (
                        <span>En stock</span>
                      ) : (
                        <span>indisponible</span>
                      )}
                    </div>
                    <div className="flex-box d-flex justify-content-between align-items-center">
                      <h6>Reviews</h6>
                      <Rating
                        value={product.rating}
                        text={`${product.numReviews} reviews`}
                      />
                    </div>
                    {product.countInStock > 0 ? (
                      <>
                        <div className="flex-box d-flex justify-content-between align-items-center">
                          <h6>Quantity</h6>
                          <select
                            value={qty}
                            onChange={(e) => setQty(e.target.value)}
                          >
                            {[...Array(product.countInStock).keys()].map(
                              (x) => (
                                <option key={x + 1} value={x + 1}>
                                  {x + 1}
                                </option>
                              )
                            )}
                          </select>
                        </div>

                        <button
                          onClick={AddToCartHandle}
                          className="round-black-btn"
                        >
                  
                          AJOUTER AU PANIER
                        </button>
                      </>
                    ) : null}
                  </div>
                </div>
              </div>
            </div>

            {/* RATING */}
     
          </>
        )}
      </div>
    </>
  );
};

export default SingleProduct;
