import { useEffect, memo, useCallback } from "react";
import Container from "../ui/Container";
import Settings from "../components/Settings";
import { Outlet, useNavigate } from "react-router";
import Notification from "../components/Notification";
import { useAppDispatch, useAppSelector } from "../hooks/redux/hooks";
import {
  resetNotification,
  selectNotification,
} from "../store/features/notification/notificationSlice";
import { AnimatePresence } from "motion/react";
import { getAuth } from "firebase/auth";
import { authenticateUser } from "../store/features/auth/authSlice";

const AppLayout = memo(function AppLayout() {
  const { message, shown } = useAppSelector(selectNotification);
  const dispatch = useAppDispatch();
  const auth = getAuth();
  const navigate = useNavigate();

  const handleNotificationTimeout = useCallback(() => {
    const timeoutId = setTimeout(() => {
      dispatch(resetNotification());
    }, 2000);
    return () => clearTimeout(timeoutId);
  }, [dispatch]);

  useEffect(() => {
    handleNotificationTimeout();
  }, [shown, dispatch, handleNotificationTimeout]);

  useEffect(() => {
    const checkAuth = async () => {
      await auth.authStateReady();
      if (auth.currentUser) {
        dispatch(
          authenticateUser({
            id: auth.currentUser.uid,
            email: auth.currentUser.email,
            name: auth.currentUser.displayName!,
          })
        );
        navigate(`${auth.currentUser.uid}/invoices`);
      } else {
        navigate("/login");
      }
    };

    checkAuth();
  }, [dispatch, auth, navigate]);

  return (
    <Container>
      <AnimatePresence>
        {shown && <Notification message={message!} />}
      </AnimatePresence>
      <Settings />
      <main className="lg:w-[730px] lg:mx-auto grow flex flex-col">
        <Outlet />
      </main>
    </Container>
  );
});

export default AppLayout;
