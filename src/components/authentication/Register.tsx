import GoBack from "../../ui/navigation/GoBack";
import { FormEvent, ChangeEvent, useEffect } from "react";
import { useState } from "react";
import { registerUser } from "../../store/features/auth/authActions";
import { selectAuth } from "../../store/features/auth/authSlice";
import { useAppDispatch, useAppSelector } from "../../hooks/redux/hooks";
import { useNavigate } from "react-router";
import { showNotification } from "../../store/features/notification/notificationSlice";

export default function Signup() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [displayName, setDisplayName] = useState("");

  const { loading, userInfo, error, success } = useAppSelector(selectAuth);
  const dispatch = useAppDispatch();
  const navigate = useNavigate();

  function resetInputs() {
    setEmail("");
    setPassword("");
    setDisplayName("");
  }

  function handleSignUp(e: FormEvent) {
    e.preventDefault();
    dispatch(registerUser({ email, password, displayName }));
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
  }, [loading, userInfo, error, success, navigate, dispatch, displayName]);

  const formControl = "grid grid-cols-2 items-center";
  const labelStyle = "col-start-1 text-[#373B53] dark:text-white transition";
  const inputStyle =
    "py-3 px-4 border border-[#373B53] rounded-sm text-base font-bold leading-[15px] -tracking-0.25px text-[#0C0E16] dark:bg-[#1E2139] dark:text-white dark:border-[#252945] focus:border-[#9277FF] focus-visible:border-[#9277FF] focus-visible:outline-none";
  const buttonsControl = "mt-4 flex gap-2";
  const buttonStyle =
    "cursor-pointer border border-[#373B53] text-[#373B53] px-4 py-1.5 rounded-sm hover:text-[#7C5DFA] hover:border-[#7C5DFA] dark:border-[#DFE3FA] dark:text-[#DFE3FA] transition";
  return (
    <>
      <GoBack href="/login" />
      <section className="grow flex justify-center items-center">
        <form
          action=""
          className="grid gap-y-2 -mt-[188px] lg:-mt-[112px]"
          onSubmit={handleSignUp}
          noValidate
        >
          <div className={formControl}>
            <label htmlFor="name" className={labelStyle}>
              Name
            </label>
            <input
              type="text"
              id="name"
              className={inputStyle}
              onChange={(event: ChangeEvent<HTMLInputElement>) => {
                setDisplayName(event.target.value);
              }}
              value={displayName}
              autoComplete="given-name"
            />
          </div>
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
            />
          </div>
          <div className={buttonsControl}>
            <button
              className={buttonStyle}
              disabled={loading}
              style={{ cursor: loading ? "not-allowed" : "pointer" }}
            >
              {loading ? "Loading..." : "Register"}
            </button>
          </div>
        </form>
      </section>
    </>
  );
}
