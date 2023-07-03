import { Route, Routes, Navigate } from "react-router-dom";
import Inventories from "pages/vendors";
import MiniDrawer from "pages/Drawer";
import Categories from "pages/categories";
import Dashboard from "pages/Dashboard";
import Profile from "pages/profile";
import Inventory from "pages/vendors/Inventory";
import Support from "pages/support";
import Orders from "pages/orders";
import SupportForm from "components/SupportForm";
import SupportFAQ from "components/SupportFAQ";
import SupportMessages from "components/SupportMessages";
import SupportMessage from "components/SupportMessage";

const PrivateRoutes = () => {
  return (
    <Routes>
      <Route element={<MiniDrawer />}>
        <Route path="auth/*" element={<Navigate to="/dashboard" />} />

        <Route path="dashboard" element={<Dashboard />} />
        <Route path="inventories" element={<Inventories />} />
        <Route path="inventories/:id" element={<Inventory />} />
        <Route path="orders" element={<Orders />} />

        <Route path="categories" element={<Categories />} />
        <Route path="account" element={<Profile />} />
        <Route path="support" element={<Support />} />
        <Route path="support/faq" element={<SupportFAQ />} />
        <Route path="support/form" element={<SupportForm />} />
        <Route path="support/message" element={<SupportMessages />} />
        <Route path="support/message/:id" element={<SupportMessage />} />

        <Route index element={<Inventories />} />
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
