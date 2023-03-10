import { Route, Routes, Navigate } from "react-router-dom";
import Inventories from "pages/vendors";
import MiniDrawer from "pages/Drawer";
import Categories from "pages/categories";
import Dashboard from "pages/Dashboard";
import Profile from "pages/profile";
import Inventory from "pages/vendors/Inventory";

const PrivateRoutes = () => {
  return (
    <Routes>
      <Route element={<MiniDrawer />}>
        <Route path="auth/*" element={<Navigate to="/dashboard" />} />

        <Route path="dashboard" element={<Dashboard />} />
        <Route path="inventories" element={<Inventories />} />
        <Route path="inventories/:id" element={<Inventory />} />

        <Route path="categories" element={<Categories />} />
        <Route path="account" element={<Profile />} />

        <Route index element={<Inventories />} />
        {/* <Route path="*" element={<Navigate to="/error/404" />} /> */}
      </Route>
    </Routes>
  );
};

// const SuspensedView: FC<{ children?: ReactNode }> = ({ children }) => {
//   const baseColor = getCSSVariableValue("--bs-primary");
//   TopBarProgress.config({
//     barColors: {
//       0: baseColor,
//     },
//     barThickness: 1,
//     shadowBlur: 5,
//   });
//   return <Suspense fallback={<TopBarProgress />}>{children}</Suspense>;
// };

export default PrivateRoutes;
