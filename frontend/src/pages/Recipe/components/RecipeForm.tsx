import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import {
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Textarea } from "@/components/ui/textarea";
import { RecipeFormType, RecipeType } from "@/services/recipes/types";
import { useState } from "react";
import { Form, FormProvider, useFieldArray, useForm } from "react-hook-form";

type RecipeFormProps = {
  onSubmit: (data: RecipeFormType | RecipeType) => void;
  recipe?: Partial<RecipeType>;
};

export const RecipeForm = ({ recipe, onSubmit }: RecipeFormProps) => {
  const form = useForm<RecipeFormType>({
    defaultValues: {
      name: "",
      description: "",
      servings: 1,
      imageUrl: "",
      cookingTime: 0,
      ingredients: [{ name: "", quantity: "", unit: "" }],
      steps: [{ description: "" }],
      tags: [],
    },
  });

  const { control, register, handleSubmit, setValue, watch, reset } = form;

  const ingredientsArray = useFieldArray({
    control,
    name: "ingredients", // ← now uses IngredientFormType
  });

  const stepsArray = useFieldArray({
    control,
    name: "steps", // ← now uses StepFormType
  });

  const [tagInput, setTagInput] = useState("");
  const tags = watch("tags");

  const addTag = () => {
    if (tagInput && !tags.includes(tagInput)) {
      setValue("tags", [...tags, tagInput]);
      setTagInput("");
    }
  };

  const removeTag = (tag: string) => {
    setValue(
      "tags",
      tags.filter((t) => t !== tag)
    );
  };

  return (
    <FormProvider {...form}>
      <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
        <FormField
          name="name"
          control={control}
          render={({ field }) => (
            <FormItem>
              <FormLabel>Recipe Name</FormLabel>
              <FormControl>
                <Input placeholder="Enter recipe name" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        <FormField
          name="description"
          control={control}
          render={({ field }) => (
            <FormItem>
              <FormLabel>Description</FormLabel>
              <FormControl>
                <Textarea placeholder="Describe your recipe..." {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        <FormField
          name="imageUrl"
          control={control}
          render={({ field }) => (
            <FormItem>
              <FormLabel>Image URL</FormLabel>
              <FormControl>
                <Input placeholder="https://example.com/image.jpg" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        <FormField
          name="cookingTime"
          control={control}
          render={({ field }) => (
            <FormItem>
              <FormLabel>Cooking Time (in minutes)</FormLabel>
              <FormControl>
                <Input type="number" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        <FormField
          name="servings"
          control={control}
          render={({ field }) => (
            <FormItem>
              <FormLabel>Servings</FormLabel>
              <Select
                onValueChange={(val) => field.onChange(parseInt(val))}
                value={field.value.toString()}
              >
                <FormControl>
                  <SelectTrigger>
                    <SelectValue placeholder="Select servings" />
                  </SelectTrigger>
                </FormControl>
                <SelectContent>
                  {[1, 2, 4, 6, 8, 10].map((num) => (
                    <SelectItem key={num} value={num.toString()}>
                      {num}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
              <FormMessage />
            </FormItem>
          )}
        />

        <div className="space-y-2">
          <FormLabel>Ingredients</FormLabel>
          {ingredientsArray.fields.map((item, index) => (
            <div key={item.id} className="flex gap-2 items-center">
              <Input
                placeholder="Name"
                {...register(`ingredients.${index}.name`)}
              />
              <Input
                placeholder="Qty"
                {...register(`ingredients.${index}.quantity`)}
              />
              <Input
                placeholder="Unit"
                {...register(`ingredients.${index}.unit`)}
              />
              <Button
                type="button"
                variant="destructive"
                onClick={() => ingredientsArray.remove(index)}
              >
                Remove
              </Button>
            </div>
          ))}
          <Button
            type="button"
            onClick={() =>
              ingredientsArray.append({ name: "", quantity: "", unit: "" })
            }
            className="text-slate-800"
          >
            Add Ingredient
          </Button>
        </div>

        <div className="space-y-2">
          <FormLabel>Steps</FormLabel>
          {stepsArray.fields.map((item, index) => (
            <div key={item.id} className="flex gap-2 items-start">
              <Textarea
                placeholder={`Step ${index + 1}`}
                {...register(`steps.${index}.description`)}
              />
              <Button
                type="button"
                variant="destructive"
                onClick={() => stepsArray.remove(index)}
              >
                Remove
              </Button>
            </div>
          ))}
          <Button
            type="button"
            onClick={() => stepsArray.append({ description: "" })}
            className="text-slate-800"
          >
            Add Step
          </Button>
        </div>

        <div className="space-y-2">
          <FormLabel>Tags</FormLabel>
          <div className="flex gap-2">
            <Input
              placeholder="Enter tag"
              value={tagInput}
              onChange={(e) => setTagInput(e.target.value)}
              onKeyDown={(e) => {
                if (e.key === "Enter") {
                  e.preventDefault();
                  addTag();
                }
              }}
            />
            <Button type="button" onClick={addTag} className="text-slate-800">
              Add Tag
            </Button>
          </div>
          <div className="flex flex-wrap gap-2">
            {tags.map((tag) => (
              <Badge
                key={tag}
                className="cursor-pointer text-slate-800"
                onClick={() => removeTag(tag)}
              >
                {tag} ×
              </Badge>
            ))}
          </div>
        </div>

        <Button type="submit" className="w-full text-slate-800">
          Submit Recipe
        </Button>
      </form>
    </FormProvider>
  );
};
