function fetchRestaurants(userId, town) {
  fetch("/getRestaurants", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      userId: userId,
      town: town,
    }),
  })
    .then((response) => response.json())
    .then((data) => {
      const { nearbyRestaurants, bestInTown, userFavorites } = data;

      if (Array.isArray(nearbyRestaurants)) {
        generateRestaurantCards(
          nearbyRestaurants,
          "nearby-restaurants",
          userId
        );
      } else {
        console.error("nearbyRestaurants is not an array:", nearbyRestaurants);
      }

      if (Array.isArray(bestInTown)) {
        generateRestaurantCards(bestInTown, "best-in-town", userId);
      } else {
        console.error("bestInTown is not an array:", bestInTown);
      }

      if (Array.isArray(userFavorites)) {
        generateRestaurantCards(userFavorites, "favorite-list", userId);
      } else {
        console.error("userFavorites is not an array:", userFavorites);
      }
    })
    .catch((error) => console.error("Error:", error));
}

async function generateCardContent(restaurant, userId) {
  const isFavorite = await isUserFavorite(restaurant.id, userId);
  const icon = isFavorite ? "myfav.svg" : "fav.svg";

  const cuisines =
    typeof restaurant.cuisine === "string"
      ? restaurant.cuisine.split(", ")
      : [];

  return `
    <div class="card-list__card-header">
      <span class="card-list__rating">
        ${restaurant.average_rating || 0}
        <span class="card-list__star">&#9733;</span>
        <span class="card-list__rating-count">(${
          restaurant.number_of_reviews
        })</span>
      </span>
      <img src="../../public/data/${icon}" class="card-list__favorite-icon" id="favorite-icon${
    restaurant.id
  }" data-restaurant-id="${restaurant.id}" data-user-id="${userId}" />
    </div>
    <img src="${
      restaurant.image_path
    }" alt="Restaurant Image" class="card-list__card-image" />
    <div class="card-list__card-body">
      <div class="card-list__restaurant-title">
        ${restaurant.name}<span class="card-list__verified-icon">&#10004;</span>
      </div>
      <div class="card-list__restaurant-location">${restaurant.address}, ${
    restaurant.city
  }</div>
      <div class="card-list__tags">
        ${cuisines
          .map((cuisine) => `<span class="card-list__tag">${cuisine}</span>`)
          .join("")}
      </div>
    </div>
  `;
}

async function generateRestaurantCards(restaurants, containerId, userId) {
  const container = document.querySelector(`#${containerId}`);
  container.innerHTML = "";

  for (const restaurant of restaurants) {
    const card = document.createElement("div");
    card.className = "card-list__card";
    card.dataset.restaurantId = restaurant.id;
    card.innerHTML = await generateCardContent(restaurant, userId);

    container.appendChild(card);
  }

  attachFavoriteIconListeners();
}

function attachFavoriteIconListeners() {
  document.querySelectorAll(".card-list__favorite-icon").forEach((icon) => {
    icon.removeEventListener("click", toggleFavorite);
    icon.addEventListener("click", toggleFavorite);
  });
}

function updateFavoriteList(restaurantId, isFavorite) {
  // const favoriteList = document.getElementById("favorite-list");
  const favoriteList = document.querySelector("#favorite-list");

  const restaurantCard = document.querySelector(
    `.card-list__card[data-restaurant-id="${restaurantId}"]`
  );

  if (restaurantCard) {
    if (isFavorite && !favoriteList.contains(restaurantCard)) {
      const clonedCard = restaurantCard.cloneNode(true);
      favoriteList.appendChild(clonedCard);
    } else if (!isFavorite) {
      const favoriteCard = document.querySelector(
        `#favorite-list .card-list__card[data-restaurant-id="${restaurantId}"]`
      );
      if (favoriteCard) {
        favoriteCard.parentNode.removeChild(favoriteCard);
      }
    }

    attachFavoriteIconListeners();
    favoriteList.innerHTML = favoriteList.innerHTML;
  }
}

function toggleFavorite(event) {
  event.preventDefault();

  const icon = event.currentTarget;
  const restaurantId = icon.dataset.restaurantId;
  const userId = icon.dataset.userId;

  fetch("/toggleFavorite", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ restaurant_id: restaurantId, user_id: userId }),
  })
    .then((response) => {
      if (!response.ok) {
        console.log("Response status:", response.status);
        console.log("Response text:", response.statusText);
      }
      icon.src = icon.src.includes("myfav.svg")
        ? "../../public/data/fav.svg"
        : "../../public/data/myfav.svg";
      document.querySelector("#favorite-icon" + restaurantId).src = icon.src;
      updateFavoriteList(restaurantId, icon.src.includes("myfav.svg"));
      return response.json();
    })
    .catch((error) => console.error("Error:", error));
}

function isUserFavorite(restaurantId, userId) {
  return fetch(
    "/isFavorite?restaurant_id=" + restaurantId + "&user_id=" + userId
  )
    .then((response) => {
      if (!response.ok) {
        throw new Error("Network response was not ok");
      }
      return response.text();
    })
    .then((text) => {
      return JSON.parse(text);
    })
    .then((data) => data.isFavorite)
    .catch((error) => {
      console.error("Error:", error);
      return false;
    });
}

function handleSearchInput(userId) {
  const searchInput = document.querySelector(".search__input");

  searchInput.addEventListener("input", function () {
    const restaurantName = this.value;

    fetch("/getRestaurantByName", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        name: restaurantName,
      }),
    })
      .then((response) => response.json())
      .then(async (restaurants) => {
        console.log("Restaurants: ", restaurants);
        const searchResults = document.querySelector("#search-results");
        searchResults.innerHTML = "";

        if (!restaurants || !restaurants.length) {
          searchResults.innerHTML = "";
          return;
        }

        for (const restaurant of restaurants) {
          const cardContent = await generateCardContent(restaurant, userId);
          searchResults.innerHTML += `<div class="card-list__card" style="margin: 0 auto;">${cardContent}</div>`;
        }

        attachFavoriteIconListeners();
      })
      .catch((error) => {
        console.error("Error:", error);
      });
  });
}
function handleFoodFilterClick(userId) {
  const foodFilterItems = document.querySelectorAll(".foodfilter-item");

  foodFilterItems.forEach(function (foodFilterItem) {
    foodFilterItem.addEventListener("click", function () {
      const cuisineType = this.querySelector("span").textContent;

      fetch("/getRestaurantsByCuisine", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          cuisine_types: cuisineType,
        }),
      })
        .then((response) => response.json())
        .then((restaurants) => {
          const cardList = document.querySelector(".cardlist");
          cardList.innerHTML = "";

          if (!restaurants || !restaurants.length) {
            cardList.innerHTML =
              '<div></div><div class="no-restaurant-found">No restaurants found for the selected cuisine type.</div>';
            console.log("No restaurants found for the selected cuisine type.");
            return;
          }

          restaurants.forEach(function (restaurant) {
            if (restaurant.cuisine) {
              const cuisines = restaurant.cuisine.split(", ");
              const cuisineTags = cuisines
                .map(function (cuisine) {
                  return '<span class="tag">' + cuisine + "</span>";
                })
                .join("");

              isUserFavorite(restaurant.id, userId).then((isFavorite) => {
                const icon = isFavorite ? "myfav.svg" : "fav.svg";

                const cardHTML =
                  '<div class="card">' +
                  '<div class="card-header">' +
                  '<span class="rating">' +
                  (restaurant.average_rating || 0) +
                  '<span class="star">&#9733;</span>' +
                  '<span class="rating-count">(' +
                  restaurant.number_of_reviews +
                  "+)</span>" +
                  "</span>" +
                  '<img src="../../public/data/' +
                  icon +
                  '" class="favorite-icon" id="favorite-icon' +
                  restaurant.id +
                  '" data-restaurant-id="' +
                  restaurant.id +
                  '" data-user-id="' +
                  userId +
                  '" />' +
                  "</div>" +
                  '<img src="' +
                  restaurant.image_path +
                  '" alt="Restaurant Image" class="card-image" />' +
                  '<div class="card-body">' +
                  '<div class="restaurant-title">' +
                  restaurant.name +
                  '<span class="verified-icon">&#10004;</span>' +
                  "</div>" +
                  '<div class="restaurant-location">' +
                  restaurant.address +
                  ", " +
                  restaurant.city +
                  "</div>" +
                  '<div class="tags">' +
                  cuisineTags +
                  "</div>" +
                  "</div>" +
                  "</div>";

                const cardElement = document.createElement("div");
                cardElement.innerHTML = cardHTML;
                const favoriteIcon = cardElement.querySelector(
                  `.favorite-icon[data-restaurant-id="${restaurant.id}"]`
                );
                favoriteIcon.addEventListener("click", toggleFavorite);

                cardList.appendChild(cardElement);
              });
            } else {
              console.log(
                "Restaurant object does not have a cuisineTypes property:",
                restaurant
              );
            }
          });
        })
        .catch((error) => {
          console.error("Error:", error);
        });

      foodFilterItems.forEach(function (item) {
        item.classList.remove("active");
      });
      this.classList.add("active");
    });
  });
}

function isUserFavorite(restaurantId, userId) {
  return fetch(
    "/isFavorite?restaurant_id=" + restaurantId + "&user_id=" + userId
  )
    .then((response) => {
      if (!response.ok) {
        throw new Error("Network response was not ok");
      }
      return response.text();
    })
    .then((text) => {
      console.log("Response text:", text);
      return JSON.parse(text);
    })
    .then((data) => data.isFavorite)
    .catch((error) => {
      console.error("Error:", error);
      return false;
    });
}
