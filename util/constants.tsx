interface Measurement {
  unit: string;
  label: string;
}

export const measurementOpt: Measurement[] = [
  { unit: "g", label: "Grams" },
  { unit: "kg", label: "Kilograms" },
  { unit: "oz", label: "Ounces" },
  { unit: "lb", label: "pounds" },
  { unit: "tsp", label: "teaspoons" },
  { unit: "tbsp", label: "tablespoons" },
];
