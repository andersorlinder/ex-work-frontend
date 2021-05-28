interface StatusTextProps {
    status: StatusType;
    label: string;
}

export enum StatusType {
    APPROVED = "approved",
    FAIL = "fail"
}

const StatusText = (props: StatusTextProps) => {
    const { status, label } = props;
    return (
        <h4 className={status}>{label}</h4>
    )
}

export default StatusText;