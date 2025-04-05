import { FormEvent, ChangeEvent } from "react";
import { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useAppDispatch, useAppSelector } from "../../hooks/redux/hooks";
import { loginUser } from "../../store/features/auth/authActions";
import { selectAuth } from "../../store/features/auth/authSlice";
import { showNotification } from "../../store/features/notification/notificationSlice";

export default function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const { loading, userInfo, error, success } = useAppSelector(selectAuth);

  const dispatch = useAppDispatch();
  const navigate = useNavigate();

  function resetInputs() {
    setEmail("");
    setPassword("");
  }

  function handleLogin(event: FormEvent) {
    event.preventDefault();
    resetInputs();
    dispatch(loginUser({ email, password }));
  }

  useEffect(() => {
    if (success && userInfo) {
      resetInputs();
      navigate(`/${userInfo.id}/invoices`);
      dispatch(showNotification(`Nice to see you ${userInfo.name}`));
    }
    if (error) {
      dispatch(showNotification(error));
    }
  }, [success, error, navigate, userInfo, dispatch]);

  const formControl = "grid grid-cols-2 items-center";
  const labelStyle = "col-start-1 text-[#373B53] dark:text-white transition";
  const inputStyle =
    "py-3 px-4 border border-[#373B53] rounded-sm text-base font-bold leading-[15px] -tracking-0.25px text-[#0C0E16] dark:bg-[#1E2139] dark:text-white dark:border-[#252945] focus:border-[#9277FF] focus-visible:border-[#9277FF] focus-visible:outline-none";
  const buttonsControl = "mt-4 flex gap-2";
  const buttonStyle =
    "cursor-pointer border border-[#373B53] text-[#373B53] px-4 py-1.5 rounded-sm hover:text-[#7C5DFA] hover:border-[#7C5DFA] dark:border-[#DFE3FA] dark:text-[#DFE3FA] transition";
  return (
    <div className="h-screen flex justify-center items-center">
      <form className="grid gap-y-2" onSubmit={handleLogin}>
        <div className={formControl}>
          <label htmlFor="email" className={labelStyle}>
            Email
          </label>
          <input
            type="email"
            id="email"
            className={inputStyle}
            onChange={(event: ChangeEvent<HTMLInputElement>) => {
              setEmail(event.target.value);
            }}
            value={email}
            autoComplete="email"
          />
        </div>
        <div className={formControl}>
          <label htmlFor="password" className={labelStyle}>
            Password
          </label>
          <input
            id="password"
            type="password"
            className={inputStyle}
            onChange={(event: ChangeEvent<HTMLInputElement>) => {
              setPassword(event.target.value);
            }}
            value={password}
            autoComplete="on"
          />
        </div>
        <div className={buttonsControl}>
          <button className={buttonStyle} type="submit">
            {loading ? "Loading" : "Log in"}
          </button>
          <Link className={buttonStyle} to={"/register"}>
            Sign Up
          </Link>
        </div>
      </form>
    </div>
  );
}
