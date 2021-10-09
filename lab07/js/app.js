//Query Object from html
const recipeForm = document.querySelector('#recipe-form');
const recipeContainer = document.querySelector('#recipe-container');

let lisItems = [];

function handlerFormSubmit(e) {
    e.preventDefault(); //chặn k cho submit
    const name = recipeForm.name.value;
    const method = recipeForm.method.value;
    const note = recipeForm.note.value;

    const newRecipe = { name, method, note, id: Date.now() };
    lisItems.push(newRecipe);
    e.target.reset();
    recipeForm.name.focus();
    recipeContainer.dispatchEvent(new CustomEvent('refreshRecipes'));
}

const handlerRefreshRecipes = () => {
        const tempRecipeUI = lisItems.map(recipe => `
        <div class="col">
            <div class="card mb-4 rounded-3 shadow-sm border-success">
                <div class="card-header py-3 text-while bg-success border-success">
                    <h4 class="my-0">${recipe.name}</h4>
                </div>
                <div class="card-body">
                    <ul class="text-start">
                        <li><strong>Method :</strong>${recipe.method}</li>
                        ${!recipe.note.length ? "" :`<li><strong>Note :</strong>${recipe.note}</li>`}
                    </ul>
                </div>
            </div>
        </div>

    `).join('');
    recipeContainer.innerHTML = tempRecipeUI;
}


recipeForm.addEventListener('submit', handlerFormSubmit);
recipeContainer.addEventListener('refreshRecipes', handlerRefreshRecipes);