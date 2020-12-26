import {
  FormControlLabel,
  FormGroup,
  makeStyles,
  Switch,
} from "@material-ui/core"
import clsx from "clsx"
import { readonlyRecord as RC } from "fp-ts"
import { pipe } from "fp-ts/lib/function"
import * as React from "react"
import * as lib from "../lib"

const useStyles = makeStyles((theme) => ({
  formgroup: {
    backgroundColor: theme.palette.grey[200],
    borderRadius: theme.shape.borderRadius,
    padding: theme.spacing(0, 2),
  },
}))

export interface LanguageSwitchesProps {
  className?: string
  stateCheckboxes: lib.UseFunctionalState<RC.ReadonlyRecord<string, boolean>>
}

export const LanguageSwitches: React.FC<LanguageSwitchesProps> = ({
  stateCheckboxes: [checkboxes, checkboxesSet],
  className,
}) => {
  const classes = useStyles()
  return (
    <FormGroup className={clsx(className, classes.formgroup)} row>
      {pipe(
        checkboxes,
        RC.collect((language, isChecked) => (
          <FormControlLabel
            key={language}
            label={pipe(language, lib.lowercase, lib.capitalize)}
            control={
              <Switch
                color="primary"
                checked={isChecked}
                onChange={(e) =>
                  checkboxesSet(RC.insertAt(language, e.target.checked))()
                }
              />
            }
          />
        ))
      )}
    </FormGroup>
  )
}
