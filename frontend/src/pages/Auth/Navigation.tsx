import {
    AiOutlineHome,
    AiOutlineLogin,
    AiOutlineUserAdd,
} from "react-icons/ai";

import { MdOutlineLocalMovies } from "react-icons/md";
import { Link } from "react-router-dom";
import { useNavigate } from "react-router-dom";

import { useLogoutMutation } from "../../redux/api/user";
import { logout } from "../../redux/features/auth/authSlice";
import { useAppDispatch, useAppSelector } from "../../redux/store";
import { useState } from "react";
import { toast } from "react-toastify";

const Navigation = () => {
    const { userInfo } = useAppSelector((state) => state.auth);
    const [dropDownOpen, setDropDownOpen] = useState<boolean>(false);

    const toggleDropDown = () => {
        setDropDownOpen(!dropDownOpen);
    };

    const dispatch = useAppDispatch();
    const navigate = useNavigate();

    const [logoutApiCall] = useLogoutMutation();

    const logoutHandler = async () => {
        try {
            await logoutApiCall("").unwrap();
            dispatch(logout());
            navigate("/");
            toast.warning("Logout")
        } catch (error: unknown) {
            if (error instanceof Error) {
                toast.error(error.message);
            }
        }
    };

    return (
        <div className="fixed bottom-10 left-[50%] translate-x-[-50%] transform translate-y-1/2 z-50 bg-[#0f0f0f] border w-[450px] px-[4rem] mb-[2rem] rounded-lg">
            <section className="flex justify-between items-center py-[2rem]">
                <div className="flex items-center">
                    <Link
                        to="/"
                        className="flex transition-transform mr-[2rem] transform hover:scale-110"
                    >
                        <AiOutlineHome className="" size={26} color="white" />
                        <span className="text-white hidden nav-item-name mt-[3rem]">
                            Home
                        </span>
                    </Link>
                    <Link
                        to="/movies"
                        className="flex transition-transform transform hover:scale-110"
                    >
                        <MdOutlineLocalMovies
                            className=""
                            size={26}
                            color="white"
                        />
                        <span className="text-white hidden nav-item-name mt-[3rem]">
                            Movies
                        </span>
                    </Link>
                </div>

                <div className="flex items-center">
                    <button
                        onClick={toggleDropDown}
                        className="text-gray-800 focus:outline-none"
                    >
                        {userInfo ? (
                            <span className="text-red-500 hover:text-red-800">
                                {userInfo.username}
                            </span>
                        ) : (
                            <></>
                        )}
                        {/* {userInfo && (<b className="text-white">Gamardgebas</b>)} */}
                    </button>

                    {dropDownOpen && userInfo && (
                        <ul
                            className={`absolute right-0 top-[-88px] mr-14 w-[10rem] space-y-2 bg-black text-gray-600 ${
                                !userInfo.isAdmin ? "-top-20" : "-top-24"
                            }`}
                        >
                            {userInfo.isAdmin && (
                                <>
                                    <li>
                                        <Link
                                            to="/admin/movies/dashboard"
                                            className="block px-4 py-2 hover:bg-gray-100"
                                        >
                                            Dashboard
                                        </Link>
                                    </li>
                                </>
                            )}
                            <li>
                                <Link
                                    to="/profile"
                                    className="block px-4 py-2 hover:bg-gray-300"
                                >
                                    Profile
                                </Link>
                            </li>
                            <li>
                                <button
                                    onClick={logoutHandler}
                                    className="block px-4 py-2 hover:bg-gray-300 w-full text-left"
                                >
                                    Logout
                                </button>
                            </li>
                        </ul>
                    )}

                    {!userInfo && (
                        <div className="flex items-center">
                            <Link
                                to="/login"
                                className="flex transition-transform mr-[2rem] transform hover:scale-110"
                            >
                                <AiOutlineLogin
                                    className=""
                                    size={26}
                                    color="white"
                                />
                                <span className="text-white hidden nav-item-name mt-[3rem]">
                                    Login
                                </span>
                            </Link>
                            <Link
                                to="/register"
                                className="flex transition-transform transform hover:scale-110"
                            >
                                <AiOutlineUserAdd
                                    className=""
                                    size={26}
                                    color="white"
                                />
                                <span className="text-white hidden nav-item-name mt-[3rem]">
                                    Register
                                </span>
                            </Link>
                        </div>
                    )}
                </div>
            </section>
        </div>
    );
};

export default Navigation;
