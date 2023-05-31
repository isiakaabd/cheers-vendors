import { Grid } from "@mui/material";
import Accordions from "./Accordions";

const SupportFAQ = () => {
  const cc = Array(8)
    .fill(undefined)
    .map((item, idx) => {
      return {
        topic: "What does Cheers do?",
        summary:
          "Nulla facilisi. Phasellus sollicitudin nulla et quam mattis feugiat.    Aliquam eget maximus est, id dignissim quam.",
      };
    });
  return (
    <Grid item container px={2} py={8} gap={4}>
      <Accordions arr={[...cc]} />
    </Grid>
  );
};

export default SupportFAQ;
