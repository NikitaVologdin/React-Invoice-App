import { createBrowserRouter, Link, useRouteError } from "react-router";
import AppLayout from "../layouts/App";
import InvoicesLayout from "../layouts/Invoices";
import Invoices from "../components/invoices/Invoices";
import Invoice from "../components/invoices/invoice/Invoice";
import { invoicesLoader, invoiceLoader } from "./loaders";
import Login from "../components/authentication/Login";
import Register from "../components/authentication/Register";
import ProtectedRoute from "../components/ProtectedRoute";
import NewInvoicePage from "../pages/NewInvoice";
import EditInvoicePage from "../pages/EditInvoice";
import { Suspense } from "react";

function RootErrorBoundary() {
  const error = useRouteError();

  return (
    <div className="min-h-screen min-w-screen flex justify-center items-center flex-col">
      <h1>Something went wrong!</h1>
      <p>
        {error instanceof Error ? error.message : "Unknown error occurred."}
      </p>
      <div className="mt-4 flex">
        <Link to={"/"} className="text-[#9277FF]">
          Back to home
        </Link>
      </div>
    </div>
  );
}

function LoadingFallback() {
  return (
    <div className="relative min-h-screen">
      <div className="absolute left-1/2 -translate-x-1/2 top-1/2 -translate-y-1/2">
        Loading...
      </div>
    </div>
  );
}

const router = createBrowserRouter([
  {
    element: <AppLayout />,
    path: "/",
    errorElement: <RootErrorBoundary />,
    children: [
      {
        path: "/register",
        element: <Register />,
      },
      {
        path: "/login",
        element: <Login />,
      },
      {
        path: "/:userId",
        children: [
          {
            element: (
              <ProtectedRoute>
                <InvoicesLayout />
              </ProtectedRoute>
            ),
            children: [
              {
                path: "invoices",
                loader: ({ params }) =>
                  invoicesLoader(params as { userId: string }),
                hydrateFallbackElement: <LoadingFallback />,
                element: (
                  <Suspense fallback={<LoadingFallback />}>
                    <Invoices />
                  </Suspense>
                ),
                children: [],
              },
              {
                path: "invoices/new",
                element: <NewInvoicePage />,
              },
              {
                path: "invoices/:invoiceId",
                element: <Invoice />,
                hydrateFallbackElement: <LoadingFallback />,

                loader: ({ params }) =>
                  invoiceLoader(
                    params as { invoiceId: string; userId: string }
                  ),
              },
              {
                path: "invoices/:invoiceId/edit",
                element: (
                  <Suspense fallback={<LoadingFallback />}>
                    <EditInvoicePage />
                  </Suspense>
                ),
              },
            ],
          },
        ],
      },
    ],
  },
]);

export default router;
