import React from "react";
import { motion } from "framer-motion";

const getInitials = (name) => {
	return name
		.split(" ")
		.filter(Boolean)
		.map((n) => n[0])
		.join("")
		.toUpperCase();
};

const TeamMemberCard = ({ name, role, bio, imageSrc, delay = 0 }) => {
	return (
		<motion.div
			className="bg-white/10 rounded-xl p-5 border border-white/10 hover:border-white/20 transition-colors"
			initial={{ opacity: 0, y: 12 }}
			whileInView={{ opacity: 1, y: 0 }}
			viewport={{ once: false, amount: 0.2 }}
			transition={{ duration: 0.4, delay }}
		>
			{imageSrc ? (
				<img
					src={imageSrc}
					alt={`${name} avatar`}
					className="w-14 h-14 rounded-full object-cover shadow-md"
				/>
			) : (
				<div className="w-14 h-14 rounded-full bg-teal-500/80 text-white flex items-center justify-center text-lg font-bold shadow-md">
					{getInitials(name)}
				</div>
			)}
			<h3 className="mt-4 text-white font-medium text-lg">{name}</h3>
			<p className="text-teal-100/90 text-sm">{role}</p>
			<p className="mt-3 text-white/80 text-sm leading-relaxed">{bio}</p>
		</motion.div>
	);
};

export default TeamMemberCard;


