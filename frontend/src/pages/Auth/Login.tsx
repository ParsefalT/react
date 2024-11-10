import { setCredentials } from "../../redux/features/auth/authSlice";
import { toast } from "react-toastify";
import { useLoginMutation } from "../../redux/api/user";
import { FormEvent, useEffect, useState } from "react";
import { useAppDispatch, useAppSelector } from "../../redux/store";
import { useLocation, useNavigate } from "react-router";
import { Link } from "react-router-dom";

const Login = () => {
    const [email, setEmail] = useState<string>("");
    const [password, setPassword] = useState<string>("");

    const dispatch = useAppDispatch();
    const navigate = useNavigate();

    const [login, { isLoading }] = useLoginMutation();
    const { userInfo } = useAppSelector((state) => state.auth);

    const { search } = useLocation();
    const sp = new URLSearchParams(search);
    const redirect = sp.get("redirect") || "/";

    useEffect(() => {
        if (userInfo) {
            navigate(redirect);
        }
    }, [navigate, redirect, userInfo]);

    const submitHandler = async (event: FormEvent) => {
        event.preventDefault();

        if (!password && !email) {
            toast.error("password not fields");
        } else {
            try {
                const res = await login({
                    email,
                    password,
                }).unwrap();
                dispatch(setCredentials({ ...res }));
                navigate("/");
                toast.success("login success");
            } catch (error: unknown) {
                if (error instanceof Error) {
                    console.log(error);
                    toast.error(error.message);
                }
            }
        }
    };

    return (
        <div className="pl-[10rem] flex flex-wrap">
            <div className="mt-[5rem] w-full">
                <h1 className="text-2xl font-semibold mb-4">Login</h1>

                <form action="" onSubmit={submitHandler}>
                    <div className="my-[2rem] max-w-[400px]">
                        <label
                            htmlFor="email"
                            className="cursor-pointer block text-sm font-semibold"
                        >
                            Email:
                        </label>
                        <input
                            type="text"
                            id="email"
                            placeholder="email"
                            className="mt-1 border rounded-md w-full px-2.5 py-1.5 placeholder:text-green-500"
                            value={email}
                            onChange={(event) => setEmail(event.target.value)}
                        />
                    </div>
                    <div className="my-[2rem] max-w-[400px]">
                        <label
                            htmlFor="password"
                            className="cursor-pointer block text-sm font-semibold"
                        >
                            Password:
                        </label>
                        <input
                            type="text"
                            id="password"
                            placeholder="password"
                            className="mt-1 border rounded-md w-full px-2.5 py-1.5 placeholder:text-green-500"
                            value={password}
                            onChange={(event) =>
                                setPassword(event.target.value)
                            }
                        />
                    </div>
                    {/* {isLoading && <Loader />} */}
                    <button
                        disabled={isLoading}
                        type="submit"
                        className="bg-teal-500 px-4 py-2 rounded cursor-pointer hover:bg-teal-900 transform transition-all"
                    >
                        {isLoading ? "registering" : "register"}
                    </button>
                </form>

                <div className="mt-2">
                    <p>
                        already account
                        <Link
                            to={
                                redirect
                                    ? `/login?redirect=${redirect}`
                                    : "/login"
                            }
                            className="text-teal-600 ml-3"
                        >
                            Login
                        </Link>
                    </p>
                </div>
            </div>
        </div>
    );
};

export default Login;
