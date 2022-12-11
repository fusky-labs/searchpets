import { faMobileScreen, faMoon, faSun } from "@fortawesome/free-solid-svg-icons"

const items = [
	{ sectionHeading: "Appearance" },
	{
		heading: "Theme",
		description: "Your mom",
		multiSelect: [
			{ icon: faMoon, name: "Dark" },
			{ icon: faSun, name: "Light" },
			{ icon: faMobileScreen, name: "System Default" },
		]
	},
	{
		heading: "Results column",
		description: "results description"
	},
	{
		heading: "Hide chapter names",
		description: "for potential spoilers"
	},
	{ sectionHeading: "Accessibility" },
	{
		heading: "Animations",
		description: "Go suck a fat one"
	},
]

export default items