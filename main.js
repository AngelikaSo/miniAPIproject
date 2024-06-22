const searchButton = document.getElementById("button");
const mealContainer = document.getElementById("meal-container");

searchButton.addEventListener("click", function () {
  const searchInput = document.getElementById("search").value;
  const url = `https://www.themealdb.com/api/json/v1/1/search.php?s=${searchInput}`;

  fetch(url)
    .then((response) => {
      if (!response.ok) {
        throw new Error("Network not ok");
      }
      return response.json();
    })
    .then((data) => {
      console.log(data);
      displayMeals(data.meals);
    })
    .catch((error) => console.error("error gwetting error", error));
});

function displayMeals(meals) {
  mealContainer.innerHTML = "";

  if (!meals) {
    mealContainer.innerHTML = "<p>No meals found.</p>";
    return;
  }

  meals.forEach((meal) => {
    const mealDiv = document.createElement("div");
    mealDiv.className = "meal";

    const mealName = document.createElement("h2");
    mealName.innerHTML = meal.strMeal;

    const mealImage = document.createElement("img");
    mealImage.src = meal.strMealThumb;

    const mealReciepe = document.createElement("p");
    mealReciepe.innerHTML = `<strong>Reciepe:</strong> ${meal.strInstructions}`;

    mealDiv.appendChild(mealName);
    mealDiv.appendChild(mealImage);
    mealDiv.appendChild(mealReciepe);
    mealContainer.appendChild(mealDiv);
  });
}
