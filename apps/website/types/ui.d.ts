interface ChildrenSlot {
	children?: React.ReactNode
}

interface ClickableUI {
	"aria-label"?: string
}

interface ClickableUI<T = HTMLElement> extends ChildrenSlot {
	className?: string
	onClick?: React.MouseEventHandler<T>
	/** This is for a button component, link components don't apply */
	transparent?: boolean
	/** This is for a button component, link components don't apply */
	disabled?: boolean
}

interface DropdownUI extends ChildrenSlot {
	dropdownShown?: boolean
}