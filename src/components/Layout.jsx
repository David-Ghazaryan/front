import { Outlet } from "react-router-dom";
import AppHeader from "./header/header";
import AppFooter from "./footer/footer";
const Layout = ()=>{
        return (
            <>
                <AppHeader/>
                <Outlet/>
                <AppFooter/>
            </>
        )
}
export {Layout}