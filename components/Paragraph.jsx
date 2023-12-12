import { Typography } from "@/components/mui";

const Paragraph = ({ children, ...props }) => {
    return (
        <Typography paragraph {...props}>
            {children}
        </Typography>
    );
};

export default Paragraph;