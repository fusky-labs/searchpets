interface ChildrenNode {
	children?: React.ReactNode
}

interface ClickableUI {
	"aria-label"?: string
}

interface ClickableUI<T = undefined> extends ChildrenNode {
	className?: string
	onClick?: React.MouseEventHandler<T>

	/**
	 * This is for button components, links don't apply
	 */
	transparent?: boolean
	/**
	 * This is for button components, links don't apply
	 */
	disabled?: boolean
}