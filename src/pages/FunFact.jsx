import "./FunFact.css";
import Navbar from "../components/shared/Navbar";
import { useState } from "react";
import axios from "axios";

const FunFact = () => {
  const [result, setResult] = useState('""');

  const onSubmit = async () => {
    try {
      const completion = await axios({
        method: "POST",
        url: "https://api.openai.com/v1/chat/completions",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${process.env.REACT_APP_OPENAI_API_KEY}`,
        },
        data: {
          model: "gpt-3.5-turbo",
          messages: [
            {
              role: "user",
              content: "Fiona is a pig, create a 2-sentence story",
            },
          ],
          temperature: 1.5,
          max_tokens: 100,
        },
      });

      const text = completion.data.choices[0].message.content;
      console.log(text);
      setResult(text);
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div className="fun-container">
      <Navbar />
      <div className="fun-content">
        <h2>{result}</h2>
      </div>
      <div className="fun-button">
        <button onClick={onSubmit}>Generate a fun fact</button>
      </div>
    </div>
  );
};
export default FunFact;
