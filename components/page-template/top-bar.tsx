import { AppBar, IconButton, Toolbar, Typography } from "@material-ui/core"
import { Menu } from "@material-ui/icons"
import clsx from "clsx"
import * as React from "react"
import { useStyles } from "./use-styles"
import * as lib from "../../lib"

export const TopBar: React.FC<{ stateOpen: lib.UseState<boolean> }> = ({
  stateOpen: [open, openSet],
}) => {
  const [title] = lib.useTitle()

  const classes = useStyles()
  return (
    <AppBar
      position="fixed"
      className={clsx(classes.appBar, {
        [classes.appBarShift]: open,
      })}
    >
      <Toolbar>
        <IconButton
          color="inherit"
          aria-label="open drawer"
          onClick={() => openSet((a) => !a)}
          edge="start"
          className={clsx(classes.menuButton, open && classes.hide)}
        >
          <Menu />
        </IconButton>
        <Typography key={title} variant="h6" noWrap>
          {title}
        </Typography>
      </Toolbar>
    </AppBar>
  )
}
