import { useSelector } from "react-redux";
import Store from "../Store/Store";
import axios from "axios";
export const Header = () => {
  const isLoggedIn = useSelector((state) => state.User.LoggedIn);

  const logOut = async ()=>{
    const response= await axios.get("/api/v1/users/signout");
    if (response.status === 200) {
        Store.dispatch({ type: "User/logUser", payload: false });
        Store.dispatch({ type: "User/setUser", payload: null });
    }
  };
  return (
    <div
      className="relative flex size-full max-h-fit flex-col bg-white group/design-root overflow-x-hidden"
      style={{ fontFamily: 'Inter, "Noto Sans", sans-serif' }}
    >
      <div className="layout-container flex h-full grow flex-col">
        <header className="flex items-center justify-between whitespace-nowrap border-b border-solid border-b-[#f0f4f4] px-10 py-3">
          <div className="flex items-center gap-4 text-[#111817]">
            <div className="size-4">
              <svg
                viewBox="0 0 48 48"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  d="M6 6H42L36 24L42 42H6L12 24L6 6Z"
                  fill="currentColor"
                ></path>
              </svg>
            </div>
            <h2 className="text-[#111817] text-lg font-bold leading-tight tracking-[-0.015em]">
              TicketSwap
            </h2>
          </div>

          <div className="flex flex-1 justify-end gap-8">
            <div className="flex items-center gap-9">
              <a
                className="text-[#111817] text-sm font-medium leading-normal"
                href="#"
              >
                Home
              </a>
              <a
                className="text-[#111817] text-sm font-medium leading-normal"
                href="#"
              >
                Events
              </a>
              <a
                className="text-[#111817] text-sm font-medium leading-normal"
                href="#"
              >
                Categories
              </a>
              <a
                className="text-[#111817] text-sm font-medium leading-normal"
                href="#"
              >
                Contact
              </a>
            </div>

            <div className="flex gap-2">
              {isLoggedIn ? (
                <button onClick={logOut} className="flex min-w-[84px] max-w-[480px] cursor-pointer items-center justify-center overflow-hidden rounded-full h-10 px-4 bg-[#f0f4f4] text-[#111817] text-sm font-bold leading-normal tracking-[0.015em]">
                  <span className="truncate">Logout</span>
                </button>
              ) : (
                <>
                <button className="flex min-w-[84px] max-w-[480px] cursor-pointer items-center justify-center overflow-hidden rounded-full h-10 px-4 bg-[#12e7c7] text-[#111817] text-sm font-bold leading-normal tracking-[0.015em]">
                  <a className="truncate" href="/signup">Sign Up</a>
                </button>
                <button className="flex min-w-[84px] max-w-[480px] cursor-pointer items-center justify-center overflow-hidden rounded-full h-10 px-4 bg-[#f0f4f4] text-[#111817] text-sm font-bold leading-normal tracking-[0.015em]">
                  <a className="truncate" href="/signin">Sign In</a>
                </button>
                </>
              )}
            </div>
          </div>
        </header>

        <div className="px-40 flex flex-1 justify-center py-5"></div>
      </div>
    </div>
  );
};
export default Header;
