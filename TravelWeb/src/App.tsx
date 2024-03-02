
import {createBrowserRouter, RouterProvider} from "react-router-dom";
import Home from "./pages/Home.tsx";
import Login from "./pages/Login.tsx";
import Register from "./pages/Register.tsx";
import Packages from "./pages/TPackage.tsx";
import {QueryClient, QueryClientProvider} from "@tanstack/react-query";
import AdminPackagePage from "./pages/Admin/Packagess.tsx";
import { AdminMap } from "./pages/Admin/AdminMap.tsx";
import PackageDetail from "./pages/PackageDetail.tsx";

const  router = createBrowserRouter([
    {path:"/",element:<Home />},
    {path:"/login",element:<Login />},
    {path:"/register",element:<Register />},
    {path:"/package",element:<Packages />},
    { path: "/admin/packages", element: <AdminPackagePage /> },
    { path: "/admin/location", element: <AdminMap id="adminMap"/> },
    {path:"/package/:id",element:<PackageDetail />},


])
const queryClient= new QueryClient();
function App() {

  return (
    <>
    <QueryClientProvider client={queryClient}>
        <RouterProvider router={router}/>
        </QueryClientProvider>
    </>
  )
}

export default App
