const categories = ['Pizza', 'Salad', 'Pasta', 'Beef'];
const categoryBar = document.getElementById('categoryBar');
const loader = document.getElementById('loader');
const cardsContainer = document.getElementById('cardsContainer');
function renderCategories() {
  categories.forEach(cat => {
    const btn = document.createElement('button');
    btn.textContent = cat;
    btn.className = 'category-btn';
    btn.addEventListener('click', () => handleCategoryClick(cat, btn));
    categoryBar.appendChild(btn);
  });
}

async function handleCategoryClick(category, btn) {
  document.querySelectorAll('.category-btn').forEach(b => b.classList.remove('active'));
  btn.classList.add('active');

  cardsContainer.innerHTML = '';
  loader.style.display = 'block';

  try {
    const response = await fetch(`https://forkify-api.herokuapp.com/api/search?q=${category}`);
    const data = await response.json();

    loader.style.display = 'none';
    displayCards(data.recipes.slice(0, 9));
  } catch (error) {
    loader.style.display = 'none';
    cardsContainer.innerHTML = `<p style="color:red;">Error loading data</p>`;
  }
}

function displayCards(items) {
  cardsContainer.innerHTML = '';
  items.forEach(item => {
    const card = document.createElement('div');
    card.className = 'card';
    card.innerHTML = `
          <img src="${item.image_url}" alt="${item.title}">
          <h3>${item.title}</h3>
          <p class="publisher">${item.publisher}</p>
        `;
    cardsContainer.appendChild(card);
  });
}

renderCategories();