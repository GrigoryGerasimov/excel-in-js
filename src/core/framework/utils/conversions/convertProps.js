export const convertProps = (props = "") => {
    if (!props) return "";
    return typeof props === "string" ? props : Array.isArray(props) ? props.join(" ") : props.toString();
};
