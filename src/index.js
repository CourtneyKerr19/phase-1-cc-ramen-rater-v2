 // index.js

// Callbacks
const handleClick = (ramen) => {
  const detailImg = document.querySelector("#ramen-detail > .detail-image");
  const detailName = document.querySelector("#ramen-detail > .name");
  const detailRestaurant = document.querySelector("#ramen-detail > .restaurant");
  const detailsRating = document.getElementById("rating-display");
  const detailsComment = document.getElementById("comment-display");

  detailImg.src = ramen.image;
  detailName.textContent = ramen.name;
  detailRestaurant.textContent = ramen.restaurant;
  detailsRating.textContent = ramen.rating;
  detailsComment.textContent = ramen.comment;
};

const addSubmitListener = () => {
  const ramenForm = document.getElementById('new-ramen');
  ramenForm.addEventListener('submit', event => {
    event.preventDefault();
    const formData = new FormData(ramenForm);
    const newRamen = {
      name: formData.get('name'),
      restaurant: formData.get('restaurant'),
      image: formData.get('image'),
      rating: formData.get('rating'),
      comment: formData.get('new-comment')
    };
    displayNewRamen(newRamen);
    ramenForm.reset();
  });
};

const displayNewRamen = (ramen) => {
  const ramenMenuDiv = document.getElementById('ramen-menu');
  const img = document.createElement('img');
  img.src = ramen.image;
  img.alt = ramen.name;
  img.addEventListener('click', () => handleClick(ramen));
  ramenMenuDiv.appendChild(img);
};

const displayRamens = async () => {
  try {
    const response = await fetch('http://localhost:3000/ramens');
    if (!response.ok) {
      throw new Error('Failed to fetch ramens');
    }
    const ramens = await response.json();
    const ramenMenuDiv = document.getElementById('ramen-menu');
    ramenMenuDiv.innerHTML = '';
    ramens.forEach(ramen => {
      const img = document.createElement('img');
      img.src = ramen.image;
      img.alt = ramen.name;
      img.addEventListener('click', () => handleClick(ramen));
      ramenMenuDiv.appendChild(img);
    });
  } catch (error) {
    console.error('Error fetching ramens:', error);
  }
};

const main = () => {
  displayRamens();
  addSubmitListener(); // Move addSubmitListener invocation here
};

// Ensure main function is invoked after DOM has fully loaded
document.addEventListener('DOMContentLoaded', main);

// Export functions for testing
export {
  displayRamens,
  addSubmitListener,
  handleClick,
  main,
};
