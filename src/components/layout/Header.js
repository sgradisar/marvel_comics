import React, { useState, useEffect } from "react";
import { gsap } from "gsap";
import "./Header.css";

const Header = ({ formats, setSelectedFormat }) => {
	const [activeFormat, setActiveFormat] = useState("All");
	const [isActive, setIsActive] = useState(false);
	const [isScrolled, setIsScrolled] = useState(false);

	// function to handle click events on the format buttons
	const handleClick = (event, format) => {
		event.preventDefault();
		setSelectedFormat(format);
		setActiveFormat(format);
		window.scrollTo({ top: 0, behavior: "smooth" });

		// if the window width is less than 640px
		if (window.innerWidth < 640) {
			const filters = document.querySelector(".filters");
			const buttons = filters.querySelectorAll(".btn-filter");

			const tl = gsap.timeline();

			// add a fade out animation for the filter buttons
			tl.to(buttons, {
				autoAlpha: 0,
				duration: 0.5,
				ease: "power1.out",
				stagger: -0.1,
			}).to(filters, {
				height: "0px",
				duration: 0.5,
				ease: "power1.out",
			});

			setIsActive(false);
		}
	};

	const resetFilter = () => {
		setSelectedFormat("All");
		setActiveFormat("All");
	};

	// toggle the filters on mobile with a slide down animation
	const toggleFilters = () => {
		const filters = document.querySelector(".filters");
		const buttons = filters.querySelectorAll(".btn-filter");

		setIsActive(!isActive);

		const tl = gsap.timeline();

		if (isActive) {
			tl.to(buttons, {
				opacity: 0,
				visibility: "hidden",
				duration: 0.5,
				ease: "power1.out",
				stagger: -0.1,
			}).to(filters, {
				height: "0px",
				duration: 0.5,
				ease: "power1.out",
			});

			// added resize event listener so that the filters and buttons are shown again when the window is resized to a width greater than or equal to 640px
			window.addEventListener("resize", () => {
				if (window.innerWidth >= 640) {
					tl.to(filters, {
						height: "auto",
						duration: 0,
						ease: "none",
					}).to(buttons, {
						opacity: 1,
						visibility: "visible",
						duration: 0,
						ease: "none",
						stagger: 0,
					});
				} else {
					// if the window is resized to a width less than 640px, we hide the filters and buttons again
					tl.to(buttons, {
						opacity: 0,
						visibility: "hidden",
						duration: 0.5,
						ease: "power1.out",
						stagger: -0.1,
					}).to(filters, {
						height: "0px",
						duration: 0.5,
						ease: "power1.out",
					});
				}
			});
		} else {
			tl.to(filters, {
				height: "auto",
				duration: 0.5,
				ease: "power1.out",
			}).to(buttons, {
				opacity: 1,
				visibility: "visible",
				duration: 0.5,
				ease: "power1.out",
				stagger: 0.1,
			});
		}
	};

	// fade in new filters when they are fetched
	useEffect(() => {
		if (isActive) {
			const filters = document.querySelector(".filters");
			const buttons = filters.querySelectorAll(".btn-filter");

			gsap.to(buttons, {
				autoAlpha: 1,
				duration: 0.5,
				ease: "power1.out",
				stagger: 0.1,
			});
		}
	}, [formats, isActive]);

	useEffect(() => {
		const handleScroll = () => {
			const isScrolled = window.scrollY > 50;
			setIsScrolled(isScrolled);
		};

		window.addEventListener("scroll", handleScroll);

		return () => {
			window.removeEventListener("scroll", handleScroll);
		};
	}, []);

	return (
		<header className={`header ${isScrolled ? "scrolled" : ""}`}>
			<div className="header--container">
				<div className="logo" onClick={resetFilter}>
					<div className="logo--container">
						<img
							src={process.env.PUBLIC_URL + "/marvel-logo.png"}
							alt="Marvel"
						/>
					</div>
				</div>
				<div className="filters">
					{formats.map(
						(format, index) =>
							format && (
								<button
									className={`btn-filter ${
										format === activeFormat ? "active" : ""
									}`}
									key={index}
									onClick={(event) => handleClick(event, format)}
								>
									{format}
								</button>
							)
					)}
				</div>

				<button
					className={`btn-hamburger ${isActive ? "active" : ""}`}
					onClick={toggleFilters}
				>
					<span></span>
				</button>
			</div>
		</header>
	);
};

export default Header;
