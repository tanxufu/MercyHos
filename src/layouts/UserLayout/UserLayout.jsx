import Footer from "../../components/Footer/Footer";
import Header from "../../components/Header/Header";
import Profile from "../../pages/Profile/Profile";

function UserLayout () {
    return ( 
        <>
        <div>
        <Header/>
        <Profile/>
        <Footer/>
        </div>
        </>
     );
}

export default UserLayout;