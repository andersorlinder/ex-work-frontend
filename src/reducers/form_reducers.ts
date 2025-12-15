import { InputAction, InputType } from "../models/input_models";

const formReducer = (formState: any, inputAction: InputAction) => {
    console.log(typeof inputAction.payload);
    if (inputAction.type === InputType.NUMBER && isFinite(inputAction.payload)) {
        return {
            ...formState,
            [inputAction.field]: Number(inputAction.payload),
        };
    }
    if (inputAction.type === InputType.TEXT) {
        return {
            ...formState,
            [inputAction.field]: inputAction.payload,
        };
    }
    return formState;
};

export default formReducer;