import { type InputAction, InputType } from "../models/input_models";

const formReducer = (formState: any, inputAction: InputAction) => {
	if (inputAction.type === InputType.NUMBER && Number.isFinite(inputAction.payload)) {
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
