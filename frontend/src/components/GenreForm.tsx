import { FormEvent } from "react";

const GenreForm: React.FC<{
	value: string;
	setValue: (arg: string) => void;
	handleSubmit: (event: FormEvent<HTMLFormElement>) => Promise<void>;
	handleDelete?: () => void;
	buttonText?: string;
}> = ({
	value = "",
	setValue,
	handleSubmit,
	handleDelete,
	buttonText = "Submit",
}) => {
	return (
		<div className="p-3">
			<form action="" onClick={(event)=> handleSubmit(event)} className="space-y-3">
				<input
					type="text"
					className="py-3 px-4 border rounded-lg w-[60rem]"
					placeholder="write genre name"
					value={value}
					onChange={(event) => setValue(event.target.value)}
				/>
				<div className="flex justify-between">
					<button type="submit" className="bg-teal-500 text-white py-2 px-4 rounded-lg hover:bg-teal-600 focus:outline-none focus:ring-2 focus:ring-teal-500 focus:ring-opacity-50">
						{buttonText}
					</button>
					{handleDelete && (
						<button onClick={handleDelete}>
							<button className="bg-teal-500 text-white py-2 px-4 rounded-lg hover:bg-teal-600 focus:outline-none focus:ring-2 focus:ring-teal-500 focus:ring-opacity-50">
								Delete
							</button>
						</button>
					)}
				</div>
			</form>
		</div>
	);
};

export default GenreForm;
