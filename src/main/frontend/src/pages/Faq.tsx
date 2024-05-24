// src/components/FAQ.tsx
import React from "react";
import {
  Accordion,
  AccordionSummary,
  AccordionDetails,
  Typography,
  Container,
} from "@mui/material";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";

const faqs = [
  {
    question: "How do I find a restaurant in my city?",
    answer:
      "You can use the geolocation. The app will show you a list of restaurants available in your city.",
  },
  {
    question: "Can I search for restaurants by cuisine type?",
    answer:
      "Yes, you can filter restaurants by selecting the cuisine type from the filter options available on the main screen.",
  },
  {
    question: "Is my personal information safe?",
    answer:
      "We take your privacy very seriously. Your personal information is stored securely and is never shared with third parties without your consent.",
  },
  {
    question: "How does the app use my location?",
    answer:
      "The app uses your location to provide more accurate search results. You can choose to allow or deny location access when prompted.",
  },
  {
    question: "Can I leave reviews for restaurants?",
    answer:
      "Yes, you can leave reviews for restaurants you have visited. Simply go to the restaurant's page and click on 'Leave a Review'.",
  },
];

const FAQ: React.FC = () => {
  return (
    <Container sx={{ marginTop: "15vh", marginBottom: 4 }}>
      <Typography variant="h4" component="h1" gutterBottom>
        Frequently Asked Questions
      </Typography>
      {faqs.map((faq, index) => (
        <Accordion key={index}>
          <AccordionSummary expandIcon={<ExpandMoreIcon />}>
            <Typography variant="h6">{faq.question}</Typography>
          </AccordionSummary>
          <AccordionDetails>
            <Typography>{faq.answer}</Typography>
          </AccordionDetails>
        </Accordion>
      ))}
    </Container>
  );
};

export default FAQ;
