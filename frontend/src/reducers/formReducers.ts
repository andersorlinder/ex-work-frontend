interface ActionData {
    type: InputType,
    field: string,
    payload: any,
}

export enum InputType {
    TEXT = "text",
    NUMBER = "number",
    TOGGLE = "toggle",
}

const formReducer = (state: any, action: ActionData) => {
    if (action.type === InputType.NUMBER && isFinite(action.payload)) {
        return {
            ...state,
            [action.field]: Number(action.payload),
        };
    }
    if (action.type === InputType.TEXT) {
        return {
            ...state,
            [action.field]: action.payload,
        };
    }
    return state;
}

export default formReducer;