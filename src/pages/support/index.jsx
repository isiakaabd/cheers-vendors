import { QuestionAnswerOutlined, SupportAgentSharp } from "@mui/icons-material";
import { Grid } from "@mui/material";
import { SupportCard } from "components";

const Support = () => {
  return (
    <Grid item container justifyContent={"space-between"}>
      <Grid item md={5} xs={10}>
        <SupportCard
          Icon={QuestionAnswerOutlined}
          heading={"Check FAQs"}
          to={"faq"}
          subHeading={"Browse our extensive Help Articles"}
        />
      </Grid>
      <Grid item md={5} xs={10}>
        <SupportCard
          Icon={SupportAgentSharp}
          to={"form"}
          heading={"Contact Customer Support"}
          subHeading={"Seek help from  our Support Team"}
        />
      </Grid>
    </Grid>
  );
};

export default Support;