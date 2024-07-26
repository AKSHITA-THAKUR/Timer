import React, { useState, useEffect } from "react";
import {CircularProgressbarWithChildren,buildStyles} from "react-circular-progressbar";
import "react-circular-progressbar/dist/styles.css";

const Timer: React.FC = () => {
	const [seconds, setSeconds] = useState(0);
	const [minutes, setMinutes] = useState(2);
	const [initialMinutes, setInitialMinutes] = useState(2);
	const [isRunning, setIsRunning] = useState(false);
	const [value, setValue] = useState(0);

	useEffect(() => {

		if (!isRunning || (minutes === 0 && seconds === 0)) return ;

		const totalSeconds = initialMinutes * 60;
		const currentSeconds = minutes * 60 + seconds;

		setValue(((totalSeconds - currentSeconds) / totalSeconds) * 100);

		const timer = setInterval(() => {
			if (seconds === 0) {
				if (minutes !== 0) {
					setMinutes(minutes - 1);
					setSeconds(59);
				}
			} else {
				setSeconds(seconds - 1);
			}

			const updatedCurrentSeconds = minutes * 60 + seconds - 1;

			setValue(
				((totalSeconds - updatedCurrentSeconds) / totalSeconds) * 100
			);
		}, 1000);

		return () => clearInterval(timer);
	}, [seconds, minutes, isRunning]);

	const handleStart = () => {
		setMinutes(initialMinutes);
		setSeconds(0);
		setIsRunning(true);
	};



	const handleStop = () => {
		setIsRunning(false);
	};

	const handleReset = () => {
		setIsRunning(false);
		setMinutes(initialMinutes);
		setSeconds(0);
		setValue(0);
	};

	return (
		<div className="">
			<h1 className="text-4xl mb-4">Timer</h1>
			<div className="mb-4">
				<label className="mr-2">Set Minutes:</label>
				<input
					type="number"
					value={initialMinutes}
					onChange={(e) =>
						setInitialMinutes(parseInt(e.target.value))
					}
					className="p-2 border rounded"
				/>
        {/* <button className="w-[100px] bg-green-300 ml-5" onClick={handleReset}>Reset</button> */}
			</div>

			<div className="w-[400px] h-[400px] mt-10 mx-auto">
				<CircularProgressbarWithChildren
					strokeWidth={9}
					value={value}
					text={`${minutes < 10 ? "0" + minutes : minutes}:${
						seconds < 10 ? "0" + seconds : seconds
					}`}
					styles={buildStyles({
						pathColor: "#81C784",
						trailColor: "",
					})}
				>
					{!isRunning || minutes===0 && seconds===0 ? (
						<button className="w-[100px] bg-white mt-28" onClick={handleStart}>Start</button>
					) : (
						<button
							className="w-[100px] bg-white  mt-28"onClick={handleStop}>Stop</button>
					)}
				</CircularProgressbarWithChildren>
			</div>
		</div>
	);
};

export default Timer;
