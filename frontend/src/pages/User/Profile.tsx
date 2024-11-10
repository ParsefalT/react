import { setCredentials } from "../../redux/features/auth/authSlice";
import { toast } from "react-toastify";
import { useProfileMutation } from "../../redux/api/user";
import { FormEvent, useEffect, useState } from "react";
import { useAppDispatch, useAppSelector } from "../../redux/store";

const Profile = () => {
	const [username, setUsername] = useState<string>("");
	const [email, setEmail] = useState<string>("");
	const [password, setPassword] = useState<string>("");
	const [confirmPassword, setConfirmPassword] = useState<string>("");

	const dispatch = useAppDispatch();
	// const navigate = useNavigate();

	const { userInfo } = useAppSelector((state) => state.auth);
	const [updateProfile] = useProfileMutation();

	// const { search } = useLocation();
	// const sp = new URLSearchParams(search);
	// const redirect = sp.get("redirect") || "/";

	useEffect(() => {
		setUsername(userInfo!.username);
		setEmail(userInfo!.email);
	}, [userInfo!.email, userInfo!.username]);

	const submitHandler = async (event: FormEvent) => {
		event.preventDefault();

		if (
			password !== confirmPassword ||
			password.trim() == "" ||
			confirmPassword.trim() == ""
		) {
			toast.error("password not match");
		} else {
			try {
				const res = await updateProfile({
					username,
					email,
					password,
				}).unwrap();
				dispatch(setCredentials({ ...res }));
				toast.success("update success");
				setUsername("");
				setEmail("");
				setPassword("");
				setConfirmPassword("");
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
				<h1 className="text-2xl font-semibold mb-4">Register</h1>

				<form action="" onSubmit={submitHandler} className="w-[400px]">
					<div className="my-[2rem] max-w-[400px]">
						<label
							htmlFor="name"
							className="cursor-pointer block text-sm font-semibold"
						>
							Name:
						</label>
						<input
							type="text"
							id="name"
							placeholder="name"
							className="mt-1 border rounded-md w-full px-2.5 py-1.5 placeholder:text-green-500"
							value={username}
							onChange={(event) =>
								setUsername(event.target.value)
							}
						/>
					</div>
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
					<div className="my-[2rem] max-w-[400px]">
						<label
							htmlFor="confirmPassword"
							className="cursor-pointer block text-sm font-semibold"
						>
							Confirm password:
						</label>
						<input
							type="text"
							id="confirmPassword"
							placeholder="confirm password"
							className="mt-1 border rounded-md w-full px-2.5 py-1.5 placeholder:text-green-500"
							value={confirmPassword}
							onChange={(event) =>
								setConfirmPassword(event.target.value)
							}
						/>
					</div>

					{/* {isLoading && <Loader />} */}
					<button className="bg-teal-500 w-full mt-[2rem] font-bold text-white py-2 px-4 rounded hover:bg-teal-600">
						Update
					</button>
				</form>
			</div>
		</div>
	);
};

export default Profile;
