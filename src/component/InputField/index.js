import React from 'react';
import {TextField} from "@mui/material";
import {debounce} from 'lodash';
import {Controller} from "react-hook-form";

function InputField({form, id, value = '', label, multiline = false, name, disabled = false, readOnly = false, type = 'text', onChange, debounceTime = 0, ...props}) {

    const callDebounce = debounce(e => {
        onChange(e);
    }, debounceTime)

    return (
        <Controller
            name={name}
            control={form.control}
            render={({field, fieldState: {isDirty, invalid, isTouched, error}}) => {
                let InputProps = {
                    readOnly: readOnly,
                }

                if (props.InputProps) {
                    InputProps = {
                        ...props.InputProps,
                        ...InputProps,
                    }
                }

                return <TextField fullWidth={true}
                               id={id}
                               {...field}
                               error={invalid}
                               label={label}
                               onChange={(e) => {
                                   field.onChange(e);
                                   onChange && callDebounce(e);
                               }}
                               multiline={multiline}
                               disabled={disabled}
                               helperText={error?.message || ''}
                               type={type}
                               value={field.value ?? value}
                               variant="standard"
                               {...props}
                               InputProps={InputProps}
             />
            }}
        />
    );
}

export default InputField;
