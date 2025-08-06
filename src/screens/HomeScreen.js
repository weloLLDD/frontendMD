
import Header from "./../components/Header";
import ShopSection from "./../components/homeComponents/ShopSection";
import ContactInfo from "./../components/homeComponents/ContactInfo";
import CalltoActionSection from "./../components/homeComponents/CalltoActionSection";
import { useParams } from 'react-router-dom';

const HomeScreen = () => {
    const {keyword} =useParams(); 
  const {pagenumber} =useParams(); 


  window.scrollTo(0, 0);
  return (
    <div>
      <Header />
      <ShopSection keyword={keyword} pagenumber={pagenumber} />
      <CalltoActionSection />
      <ContactInfo />
  
    </div>
  );
};

export default HomeScreen;
