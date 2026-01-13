"use client";

import { Typography } from "@mui/material";
import NumberSpinner from "../number-spinner/number-spinner";
import { Ingredient } from "@/app/lib/definitions";
import { useMemo, useState } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCheck } from "@fortawesome/free-solid-svg-icons";

import "./preparation-card.scss";

interface PreparationCardProps {
  ingredients: Ingredient[];
  numberOfPortions: number;
}

/**
 * Calculated the amounts of the ingredients when the number of portions are changed.
 */
const calculateIngredients = (
  ingredients: Ingredient[],
  portions: number,
  numberOfPortions: number
): Ingredient[] =>
  ingredients.map((value) => {
    const percentage = portions / numberOfPortions;
    const [amount, ...unit] = value.amount.split(" ");
    const portionAmount = Number(amount) * percentage;
    const unitLabel = unit.join(" ");

    return {
      ...value,
      amount: `${Math.round(portionAmount)} ${unitLabel}`,
    };
  });

const PreparationCard: React.FC<PreparationCardProps> = ({
  ingredients,
  numberOfPortions,
}) => {
  const [portions, setPortions] = useState(numberOfPortions);
  const ingredientsPerPortion = useMemo(
    () => calculateIngredients(ingredients, portions, numberOfPortions),
    [portions, ingredients, numberOfPortions]
  );

  return (
    <div className="min-w-110 contrast p-7 rounded-sm preparation-card">
      <div className="mb-1">
        <Typography variant="h6" component="h3">
          Ingrediënten
        </Typography>
      </div>
      <Typography
        variant="body1"
        sx={{ color: "text.secondary" }}
        className="label"
      >
        <label htmlFor="numberspinner">Aantal personen</label>
      </Typography>

      <NumberSpinner
        id="numberspinner"
        size="small"
        min={1}
        max={50}
        value={portions}
        onValueChange={(event) => setPortions(event ?? 0)}
      />

      {ingredientsPerPortion.map((ingredient, key) => (
        <div className="flex mt-4" key={key}>
          <div className="icon-wrapper mr-4">
            <FontAwesomeIcon className="icon" icon={faCheck} />
          </div>
          <Typography variant="body1" sx={{ color: "text.secondary" }}>
            {ingredient.amount} {ingredient.label}
          </Typography>
        </div>
      ))}
    </div>
  );
};

export default PreparationCard;
