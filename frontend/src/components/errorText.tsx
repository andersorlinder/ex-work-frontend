interface ErrorTextProps {
    label: string;
}

export const ErrorText = (props: ErrorTextProps) => {
    const { label } = props;
    return (
        <h4 className="red-text">{label}</h4>
    )
}