import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import Footer from "./Footer";
import "./Welcome.css";
import "./Voting-system.css";
import votingIllustration from "../Assets/landingpage_banner.png";

const accordionData = [
	{
		title: "Ensure You're in a Private Environment",
		content:
			"Make sure you are alone and in a secure environment before starting the voting process.",
	},
	{
		title: "Get to Know our Anti-Coercion Measures",
		content:
			"Our system includes measures to prevent coercion and ensure your vote is confidential.",
	},
	{
		title: "Authentication Requirements",
		content:
			"You will need your NemID/MitID or another approved authentication method to log in.",
	},
	{
		title: "System Requirements",
		content:
			"Please use an updated browser and ensure your internet connection is stable.",
	},
	{
		title: "Need Help?",
		content: "Visit our Help section or contact support for assistance.",
	},
];

const Welcome = () => {
	const [openItems, setOpenItems] = useState({});
	const navigate = useNavigate();

	useEffect(() => {
		window.scrollTo(0, 0);
	}, []);

	const toggleAccordion = (idx) => {
		setOpenItems((prev) => ({ ...prev, [idx]: !prev[idx] }));
	};

	return (
		<div className="page-wrapper">
			<main className="welcome-main">
				<h1>Welcome to Denmark's Online Voting Portal</h1>
				<div className="text-main text-welcome-main">
					Your secure platform for participating in democratic decision-making
				</div>
				
				<div className="welcome-illustration">
					<img
						src={votingIllustration}
						alt="Voting illustration"
						style={{ width: "100%", borderRadius: "8px" }}
					/>
				</div>
				<section className="card" style={{ width: "500px" }}>
					<h2>Before You Vote:</h2>
					<div className="accordion">
						{accordionData.map((item, idx) => (
							<div key={idx} className="accordion-item">
								<button
									className="accordion-title"
									onClick={() => toggleAccordion(idx)}
								aria-expanded={openItems[idx]}
							>
								{item.title}
								<span className="accordion-arrow">
									{openItems[idx] ? "▲" : "▼"}
								</span>
							</button>
							<div className={`accordion-content ${!openItems[idx] ? 'collapsed' : ''}`}>
								{item.content}
							</div>
							</div>
						))}
					</div>
				</section>
				<button
				style={{ marginTop: "32px" }}
					className="button"
					onClick={() => navigate("/private-mode")}
				>
					Login to Vote
				</button>
			</main>
			<Footer />
		</div>
	);
};

export default Welcome;
