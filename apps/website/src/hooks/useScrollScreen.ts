import { useEffect, useState } from "react";

interface ScrollScreenProps {
	value: number
}

export default function useScrollScreen({ value }: ScrollScreenProps) {
	const [scroll, setScroll] = useState(false);

	useEffect(() => {
		const handleScroll = () => {
			window.scrollY > value ? setScroll(true) : setScroll(false)
		}

		window.addEventListener("scroll", handleScroll)
		return () => window.removeEventListener("scroll", handleScroll)
	}, [value])

	return scroll
}