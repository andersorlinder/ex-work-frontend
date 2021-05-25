interface ErrorTextProps {
    label: string;
}

export const ErrorText = (props: ErrorTextProps) => {
    const { label } = props;
    return (
        <p className="red-text">{label}</p>
    )
}