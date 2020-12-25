import { FormControlLabel, FormGroup, Switch } from "@material-ui/core"
import { readonlyRecord as RC } from "fp-ts"
import { pipe } from "fp-ts/lib/function"
import * as React from "react"
import * as lib from "../lib"

export interface LanguageSwitchesProps {
  stateCheckboxes: lib.UseFunctionalState<RC.ReadonlyRecord<string, boolean>>
}

export const LanguageSwitches: React.FC<LanguageSwitchesProps> = ({
  stateCheckboxes: [checkboxes, checkboxesSet],
}) => (
  <FormGroup row>
    {pipe(
      checkboxes,
      RC.collect((language, isChecked) => (
        <FormControlLabel
          label={pipe(language, lib.lowercase, lib.capitalize)}
          control={
            <Switch
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
