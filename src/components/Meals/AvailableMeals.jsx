import { useEffect, useState } from "react";

import "./AvailableMeals.css";

import { DUMMY_MEALS } from "../../utils/dummy-meals";
import Card from "../shared/Card";
import MealItem from "./MealItem";

const AvailableMeals = () => {
  const [meals, setMeals] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [httpError, setHttpError] = useState();

  useEffect(() => {
    const fetchMeals = async () => {
      const response = await fetch(
        "https://react-playground-387214-default-rtdb.firebaseio.com/meals.json"
      );

      if (!response.ok) {
        throw new Error("Something went wrong");
      }

      const responseData = await response.json();
      console.log(responseData);
      const loadedMeals = [];

      for (const key in responseData) {
        console.log(key);
        loadedMeals.push({
          id: key,
          name: responseData[key].name,
          description: responseData[key].description,
          price: responseData[key].price,
        });
      }

      setMeals(loadedMeals);
      setIsLoading(false);
    };

    fetchMeals().catch((error) => {
      console.log(error);
      setIsLoading(false);
      setHttpError(error.message);
    });
  }, []);

  if (isLoading) {
    return (
      <section className="meals-loading">
        <p>Loading...</p>
      </section>
    );
  }

  if (httpError) {
    return (
      <section className="meals-error">
        <p> {httpError} </p>
      </section>
    );
  }

  const mealsList = meals.map((meal) => (
    <MealItem key={meal.id} id={meal.id} {...meal} />
  ));

  return (
    <section className="meals-list">
      <Card>{mealsList}</Card>
    </section>
  );
};
export default AvailableMeals;
