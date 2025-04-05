import { createBrowserRouter, useRouteError } from "react-router-dom";
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

function ErrorBoundary() {
  const error = useRouteError();
  console.log(error);
  return (
    <div className="error-boundary">
      <h1>Something went wrong!</h1>
      <p>
        {error instanceof Error ? error.message : "Unknown error occurred."}
      </p>
    </div>
  );
}

const router = createBrowserRouter([
  {
    element: <AppLayout />,
    children: [
      {
        path: "/",
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
                    hydrateFallbackElement: <div>Loading...</div>,
                    element: <Invoices />,
                    errorElement: <ErrorBoundary />,
                    children: [],
                  },
                  {
                    path: "invoices/new",
                    element: <NewInvoicePage />,
                  },
                  {
                    path: "invoices/:invoiceId",
                    element: <Invoice />,
                    loader: ({ params }) =>
                      invoiceLoader(
                        params as { invoiceId: string; userId: string }
                      ),
                    hydrateFallbackElement: <div>Loading...</div>,
                  },
                  {
                    path: "invoices/:invoiceId/edit",
                    element: <EditInvoicePage />,
                  },
                ],
              },
            ],
          },
        ],
      },
    ],
  },
]);

export default router;
