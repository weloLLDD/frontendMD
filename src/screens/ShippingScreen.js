import React, { useState } from "react";
import { Link } from "react-router-dom";
import Header from "../components/Header";
import { useDispatch, useSelector } from "react-redux"; 
import { saveShppingAdress } from "../Redux/Action/CartActions";
import { useNavigate} from 'react-router-dom'; 

const ShippingScreen = ({history}) => {
  window.scrollTo(0, 0);

 

  const [adress, setAdress]=useState("")
  const [city, setCity]=useState("")
  const [postalcode, setPostalcode]=useState("AV.JUSTICE/GOMBE")
  const [country, setcountry]=useState("KINSHASA/RDC")
    const productList = useSelector((state) => state.productList);
    const { products} = productList;

  const dispatch = useDispatch()
   const navigate = useNavigate();


  const submitHandler = (e) => {
    e.preventDefault();
    dispatch(saveShppingAdress({adress,city,postalcode,country}));
  //  navigate("/payment");
      //navigate("/shipping");
       navigate(`/placeorder/${products._id}}`);
  };
  return (
    <>
      <Header />
      <div className="container d-flex justify-content-center align-items-center login-center">
        <form
          className="Login col-md-8 col-lg-4 col-11"
          onSubmit={submitHandler}
        >
          <h6>NOM COMPLET DU client</h6>
          <input type="text" placeholder="NOM COMPLET CLIENT"  
          value={adress} 
          required
          onChange={(e)=>setAdress(e.target.value)}

          />
          <input type="text" placeholder="N° TELEPHONE" 
          value={city} 
          required
          onChange={(e)=>setCity(e.target.value)}
        
          />
          <input type="text" placeholder="Enter postal code" 
           value={postalcode} 
           required
           onChange={(e)=>setPostalcode(e.target.value)}
 
          />
          <input type="text" placeholder="Enter country" 
           value={country} 
           required
           onChange={(e)=>setcountry(e.target.value)}
          
          />
          <button type="submit">
            <Link to={`/placeorder/${products._id}}`} className="text-white">
              Continue
            </Link>
          </button>
        </form>
      </div>
    </>
  );
};

export default ShippingScreen;
