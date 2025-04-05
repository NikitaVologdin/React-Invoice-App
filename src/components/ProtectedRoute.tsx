import { useNavigate } from "react-router-dom";
import { getAuth, onAuthStateChanged } from "firebase/auth";
import { useAppDispatch } from "../hooks/redux/hooks";
import { showNotification } from "../store/features/notification/notificationSlice";

type props = {
  children: React.ReactNode;
};

export default function ProtectedRoute({ children }: props) {
  const auth = getAuth();
  const navigate = useNavigate();
  const dispatch = useAppDispatch();
  onAuthStateChanged(auth, (user) => {
    if (!user) {
      dispatch(showNotification("Please login"));
      navigate("/login");
    }
  });
  return <>{children}</>;
}
