import { useNavigate } from "react-router";
import { getAuth, onAuthStateChanged } from "firebase/auth";
import { useAppDispatch } from "../hooks/redux/hooks";
import { showNotification } from "../store/features/notification/notificationSlice";
import { useEffect } from "react";

type props = {
  children: React.ReactNode;
};

export default function ProtectedRoute({ children }: props) {
  const auth = getAuth();
  const navigate = useNavigate();
  const dispatch = useAppDispatch();

  useEffect(() => {
    onAuthStateChanged(auth, (user) => {
      if (!user) {
        dispatch(showNotification("Please login"));
        navigate("/login");
      }
    });
  }, [auth, dispatch, navigate]);

  return <>{children}</>;
}
