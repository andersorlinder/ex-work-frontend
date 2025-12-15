export interface InputAction {
    type: InputType;
    field: string;
    payload: any;
}

export enum InputType {
    TEXT = "text",
    NUMBER = "number",
    TOGGLE = "toggle",
}