import "./AvailableMeals.css";

import { DUMMY_MEALS } from "../../utils/dummy-meals";
import Card from "../shared/Card";
import MealItem from "./MealItem";

const AvailableMeals = () => {
  const mealsList = DUMMY_MEALS.map((meal) => (
    <MealItem key={meal.id} id={meal.id} {...meal} />
  ));

  return (
    <section className="meals-list">
      <Card>{mealsList}</Card>
    </section>
  );
};
export default AvailableMeals;
