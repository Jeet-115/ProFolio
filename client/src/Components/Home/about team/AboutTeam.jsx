import React from "react";
import { motion } from "framer-motion";
import Jeet from "./Jeet.jsx";
import Maanav from "./Maanav.jsx";
import Dev from "./Dev.jsx";
import Dharmik from "./Dharmik.jsx";

const popUp = {
	hidden: { opacity: 0, y: 16 },
	visible: { opacity: 1, y: 0, transition: { duration: 0.5, ease: "easeOut" } }
};

const AboutTeam = () => {
	return (
		<motion.section
			className="p-8 bg-white/10 backdrop-blur-md rounded-2xl shadow-lg mt-[20px]"
			initial="hidden"
			whileInView="visible"
			viewport={{ once: false, amount: 0.2 }}
			variants={popUp}
		>
			<div className="text-center mb-6">
				<h2 className="text-3xl font-semibold text-white">About the Team</h2>
				<p className="mt-2 text-white max-w-2xl mx-auto">
				We’re just four friends building something to make showcasing your talent effortless.
				</p>
			</div>
			<div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
				<Jeet />
				<Maanav />
				<Dev />
				<Dharmik />
			</div>
		</motion.section>
	);
};

export default AboutTeam;


