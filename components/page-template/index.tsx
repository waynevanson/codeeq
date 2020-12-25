import clsx from "clsx"
import * as React from "react"
import { NavDrawer } from "./nav-drawer"
import { TopBar } from "./top-bar"
import { useStyles } from "./use-styles"

export const PageTemplate: React.FC = ({ children }) => {
  const stateOpen = React.useState(true)
  const [open] = stateOpen
  const props = { stateOpen }
  const classes = useStyles()

  return (
    <div className={classes.root}>
      <TopBar {...props} />
      <NavDrawer {...props} />
      <main
        className={clsx(classes.content, {
          [classes.contentShift]: open,
        })}
      >
        <div className={classes.drawerHeader} />
        {children}
      </main>
    </div>
  )
}
