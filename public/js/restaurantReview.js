document.addEventListener("DOMContentLoaded", (event) => {
  const reviewForm = document.querySelector("#reviewForm");

  function toggleReviewForm() {
    reviewForm.classList.toggle("expanded");
  }

  reviewForm.addEventListener("click", function () {
    toggleReviewForm();
  });

  reviewForm.querySelector("form").addEventListener("click", function (event) {
    event.stopPropagation();
  });

  document.addEventListener("click", function (event) {
    if (
      reviewForm.classList.contains("expanded") &&
      !reviewForm.contains(event.target)
    ) {
      toggleReviewForm();
    }
  });
});
