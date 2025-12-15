export interface InputAction {
	type: InputType;
	field: string;
	payload: string | number;
}

export enum InputType {
	TEXT = "text",
	NUMBER = "number",
	TOGGLE = "toggle",
}
