import { getAuth, signOut } from "firebase/auth";
import logoutIcon from "../../assets/icon-logout.svg";
import { useNavigate } from "react-router";
import { useAppDispatch, useAppSelector } from "../../hooks/redux/hooks";
import { logOutUser, selectAuth } from "../../store/features/auth/authSlice";
import { showNotification } from "../../store/features/notification/notificationSlice";

export default function LogOut() {
  const navigate = useNavigate();
  const dispatch = useAppDispatch();
  const { userInfo } = useAppSelector(selectAuth);

  async function handleLogOut() {
    const auth = getAuth();
    if (!userInfo) return;
    try {
      await signOut(auth);
      dispatch(showNotification(`Goodbye ${userInfo?.name}`));
      dispatch(logOutUser());
      navigate("/login");
    } catch (e) {
      console.log(e);
    }
  }

  return (
    <button
      className="cursor-pointer p-4 lg:relative lg:left-0.5"
      onClick={handleLogOut}
    >
      <span className="sr-only">logout</span>
      <img src={logoutIcon} alt="" width={25} height={25} />
    </button>
  );
}
