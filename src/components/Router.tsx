import { MemberProvider } from '@/integrations';
import { createBrowserRouter, RouterProvider, Navigate, Outlet } from 'react-router-dom';
import { ScrollToTop } from '@/lib/scroll-to-top';
import ErrorPage from '@/integrations/errorHandlers/ErrorPage';
import HomePage from '@/components/pages/HomePage';
import AboutPage from '@/components/pages/AboutPage';
import ProductsPage from '@/components/pages/ProductsPage';
import ProductDetailPage from '@/components/pages/ProductDetailPage';
import ApplicationsPage from '@/components/pages/ApplicationsPage';
import GalleryPage from '@/components/pages/GalleryPage';
import DealerPage from '@/components/pages/DealerPage';
import ContactPage from '@/components/pages/ContactPage';
import WhatsAppButton from '@/components/WhatsAppButton';

// Layout component that includes ScrollToTop and WhatsApp button
function Layout() {
  return (
    <>
      <ScrollToTop />
      <Outlet />
      <WhatsAppButton />
    </>
  );
}

const router = createBrowserRouter([
  {
    path: "/",
    element: <Layout />,
    errorElement: <ErrorPage />,
    children: [
      {
        index: true,
        element: <HomePage />,
        routeMetadata: {
          pageIdentifier: 'home',
        },
      },
      {
        path: "about",
        element: <AboutPage />,
        routeMetadata: {
          pageIdentifier: 'about',
        },
      },
      {
        path: "products",
        element: <ProductsPage />,
        routeMetadata: {
          pageIdentifier: 'products',
        },
      },
      {
        path: "products/:id",
        element: <ProductDetailPage />,
        routeMetadata: {
          pageIdentifier: 'product-detail',
        },
      },
      {
        path: "applications",
        element: <ApplicationsPage />,
        routeMetadata: {
          pageIdentifier: 'applications',
        },
      },
      {
        path: "gallery",
        element: <GalleryPage />,
        routeMetadata: {
          pageIdentifier: 'gallery',
        },
      },
      {
        path: "dealer",
        element: <DealerPage />,
        routeMetadata: {
          pageIdentifier: 'dealer',
        },
      },
      {
        path: "contact",
        element: <ContactPage />,
        routeMetadata: {
          pageIdentifier: 'contact',
        },
      },
      {
        path: "*",
        element: <Navigate to="/" replace />,
      },
    ],
  },
], {
  basename: import.meta.env.BASE_NAME,
});

export default function AppRouter() {
  return (
    <MemberProvider>
      <RouterProvider router={router} />
    </MemberProvider>
  );
}
