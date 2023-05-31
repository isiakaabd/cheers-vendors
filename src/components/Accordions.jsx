import {
  Accordion,
  AccordionSummary,
  Typography,
  AccordionDetails,
  Grid,
  IconButton,
} from "@mui/material";
import { useState } from "react";
import { AddOutlined } from "@mui/icons-material";

export default function Accordions({ arr }) {
  return (
    <Grid item md={8} xs={10} sx={{ margin: "auto" }}>
      <Grid
        item
        container
        gap={2}
        sx={{
          display: "grid",
          gridTemplateColumns: { xs: "1fr" },
        }}
      >
        {arr.map((item, idx) => (
          <Grid item key={idx}>
            <Accord item={item} />
          </Grid>
        ))}
      </Grid>
    </Grid>
  );
}
function Accord({ item }) {
  const [expanded, setExpanded] = useState(false);

  const handleChange = (panel) => (event, isExpanded) => {
    setExpanded(isExpanded ? panel : false);
  };
  return (
    <Accordion
      expanded={expanded === "panel1"}
      onChange={handleChange("panel1")}
    >
      <AccordionSummary
        expandIcon={
          <IconButton
            sx={{
              backgroundColor: "#a80a69",
              "&:hover": { backgroundColor: "#a80a69" },
              color: "#fff",
            }}
          >
            <AddOutlined />
          </IconButton>
        }
        aria-controls="panel1a-content"
        id="panel1a-header"
      >
        <Typography variant="h5" color={"secondary"}>
          {item.topic}
        </Typography>
      </AccordionSummary>
      <AccordionDetails>
        <Typography color="info">{item.summary} </Typography>
      </AccordionDetails>
    </Accordion>
  );
}
