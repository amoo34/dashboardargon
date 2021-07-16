
import Index from "views/Index.js";
import Profile from "views/examples/Profile.js";
import Maps from "views/examples/Maps.js";
import Register from "views/examples/Register.js";
import Login from "views/examples/Login.js";
import Tables from "views/examples/Tables.js";
import Icons from "views/examples/Icons.js";
import BussesCard from "components/Busses/BussesCard";
import StudentsCard from "components/Students/StudentsCard";
import DriversCard from "components/Drivers/DriversCard";

var routes = [
  {
    path: "/index",
    name: "Dashboard",
    icon: "ni ni-tv-2 text-primary",
    component: Index,
    layout: "/admin",
    showInSidebar:true
  },
  {
    path: "/maps",
    name: "Maps",
    icon: "ni ni-pin-3 text-orange",
    component: Maps,
    layout: "/admin",
    showInSidebar:true
  },
  {
    path: "/user-profile",
    name: "User Profile",
    icon: "ni ni-single-02 text-yellow",
    component: Profile,
    layout: "/admin",
    showInSidebar:true
  },
  {
    path: "/tables",
    name: "Tables",
    icon: "ni ni-bullet-list-67 text-red",
    component: Tables,
    layout: "/admin",
    showInSidebar:true
  },
  {
    path: "/login",
    name: "Login",
    icon: "ni ni-key-25 text-info",
    component: Login,
    layout: "/auth",
    showInSidebar:true
  },
  {
    path: "/register",
    name: "Register",
    icon: "ni ni-circle-08 text-pink",
    component: Register,
    layout: "/auth",
    showInSidebar:true
  },
  {
    path: "/showBusses",
    name: "",
    icon: "ni ni-circle-08 text-pink",
    component: BussesCard,
    layout: "/admin",
    showInSidebar:false
  },
  {
    path: "/showStudents",
    name: "",
    icon: "ni ni-circle-08 text-pink",
    component: StudentsCard,
    layout: "/admin",
    showInSidebar:false
  },
  {
    path: "/showDrivers",
    name: "",
    icon: "ni ni-circle-08 text-pink",
    component: DriversCard,
    layout: "/admin",
    showInSidebar:false
  },
  
];
export default routes;
