import {
  Divider,
  Drawer,
  IconButton,
  List,
  ListItem,
  ListItemIcon,
  ListItemText,
} from "@material-ui/core"
import { useTheme } from "@material-ui/core/styles"
import { ChevronLeft, ChevronRight, Mail } from "@material-ui/icons"
import * as React from "react"
import { useStyles } from "./use-styles"
import * as lib from "../../lib"
import { pipe } from "fp-ts/lib/function"
import { array } from "fp-ts"
import Link from "next/link"

export interface NavLinkProps {
  text: string
  href: string
  Icon: React.ComponentType
}

export const NavLinkStyled: React.FC<NavLinkProps> = ({ text, Icon, href }) => {
  return (
    <Link href={href}>
      <ListItem button key={text}>
        <ListItemIcon>
          <Icon />
        </ListItemIcon>
        <ListItemText primary={text} />
      </ListItem>
    </Link>
  )
}

export const NavDrawer: React.FC<{ stateOpen: lib.UseState<boolean> }> = ({
  stateOpen: [open, setOpen],
}) => {
  const classes = useStyles()
  const theme = useTheme()

  return (
    <Drawer
      className={classes.drawer}
      variant="persistent"
      anchor="left"
      open={open}
      classes={{
        paper: classes.drawerPaper,
      }}
    >
      <div className={classes.drawerHeader}>
        <IconButton onClick={() => setOpen((a) => !a)}>
          {theme.direction === "ltr" ? <ChevronLeft /> : <ChevronRight />}
        </IconButton>
      </div>
      <Divider />
      <List>
        {pipe(
          [
            { href: "/", text: "Home", Icon: Mail },
            { href: "/statements", text: "Statements", Icon: Mail },
          ] as Array<NavLinkProps>,
          array.map((a) => <NavLinkStyled key={a.text} {...a} />)
        )}
      </List>
    </Drawer>
  )
}
