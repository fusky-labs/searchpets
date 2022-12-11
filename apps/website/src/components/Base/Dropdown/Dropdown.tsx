import { motion } from "framer-motion"
import items from "./Items"
import styles from "./Dropdown.module.scss"

export function Dropdown({ dropdownShown }: DropdownUI) {
  const anim = {
    hide: { y: 10, opacity: 0 },
    show: { opacity: 1 }
  }

  return (
    <motion.div
      className={styles["wrapper"]}
      animate={dropdownShown ? anim.show : anim.hide}
      style={{ pointerEvents: dropdownShown ? "all" : "none" }}
      transition={{ duration: 0.25, type: "keyframes" }}
    >
      {items.map((item, i) => (
        <>
          {item.sectionHeading && (
            <h2 key={i} className="font-bold text-2xl px-3 font-inter">
              {item.sectionHeading}
            </h2>
          )}
          {item.heading && (
            <div key={i} className="hover:bg-gray-200 px-3 py-2 rounded-md">
              <h3 className="font-bold text-xl font-inter">{item.heading}</h3>
              <p>{item.description}</p>
            </div>
          )}
        </>
      ))}
    </motion.div>
  )
}
