/// <reference types="../@types/jquery" />

// side bar

let sideInnerWidth = $(".side-inner").innerWidth();

$(".sideBar").animate({ left: -sideInnerWidth }, 0);
$("a.icon").click(function () {
  let sideBarLeftValue = $(".sideBar").css("left");
  if (sideBarLeftValue == "-300px") {
    $(".sideBar").animate({ left: 0 }, 1000);
    $("a.icon").html(`<i class="fa-solid fa-close text-black me-1"></i> `);
    $(".side-inner ul.nav").slideDown(1600);
  } else {
    $(".sideBar").animate({ left: "-300px" }, 1000);
    $("a.icon").html(`<i class="fa-solid fa-bars  me-1"></i> `);
    $(".side-inner ul.nav").slideUp(1600);
  }
});
$(".fa-close").click(function () {
  $(".sideBar").animate({ left: "-300px" }, 1000);
  $("a.icon").html(`<i class="fa-solid fa-bars  me-1"></i> `);
});

// loading screen

(function () {
  $(".sk-chase").slideUp(2000, function () {
    $(".loading").fadeOut(1400, function () {
      $("body").css("overflow", "visible");
      $(".loading").remove();
    });
  });
})();

//  logic

// api for categories
async function categories() {
  try {
    let res = await fetch(
      "https://www.themealdb.com/api/json/v1/1/categories.php"
    );
    let data = await res.json();
    displayCategory(data.categories);
  } catch (error) {
    console.log(error);
  }
}

if (location.pathname.includes("/Categories.html")) {
  categories();
}

function displayCategory(arr) {
  let x = ``;
  for (let i = 0; i < arr.length; i++) {
    x += `
                     <div class="col-md-3 category " id=${arr[i].idCategory}>
                    <div class="inner position-relative  overflow-hidden">
                        <img src="${arr[i].strCategoryThumb}" class="w-100 rounded-2" alt="">
                        <div class="lear rounded-2 position-absolute  text-center ">
                            <h2 class="ps-2">${arr[i].strCategory}</h2>
                            <p class="clamped-lines">${arr[i].strCategoryDescription}</p>
                        </div>
                    </div>
                </div>
     `;
  }
  //  for display categorys
  if (document.querySelector("#cats")) {
    document.querySelector("#cats").innerHTML = x;
  }

  let allCat = document.querySelectorAll(".category");

  for (let i = 0; i < allCat.length; i++) {
    allCat[i].addEventListener("click", function () {
      localStorage.setItem("categoryId", allCat[i].getAttribute("id"));
      localStorage.setItem(
        "categoryName",
        allCat[i].querySelector(".inner h2").innerHTML
      );
      location.pathname = "../displayCategoryMeals.html";
      categoryMeals();
    });
  }
}

async function categoryMeals() {
  try {
    let res = await fetch(
      `https://www.themealdb.com/api/json/v1/1/filter.php?c=${localStorage.getItem(
        "categoryName"
      )}`
    );
    let data = await res.json();
    let x = data.meals;
    const items = x.slice(0, 20);
    displayCategoryMeals(items);
  } catch (error) {
    console.log(error);
  }
}

if (location.pathname.includes("/displayCategoryMeals.html")) {
  categoryMeals();
}

function displayCategoryMeals(arr) {
  let x = ``;
  for (let i = 0; i < arr.length; i++) {
    x += `
     
                  <div class="col-md-3 meal" id=${arr[i].idMeal}>
                    <div class="inner position-relative  overflow-hidden">
                        <img src="${arr[i].strMealThumb}" class="w-100 rounded-2" alt="">
                        <div class="lear rounded-2 position-absolute d-flex align-items-center ">
                            <h2 class="ps-2">${arr[i].strMeal}</h2>
                        </div>
                    </div>
                </div>
     
     
     
     `;
  }
  // display categories of meals
  if (document.querySelector("#cat_meals")) {
    document.querySelector("#cat_meals").innerHTML = x;
  }
  if (document.querySelector("#searched_Meal")) {
    document.querySelector("#searched_Meal").innerHTML = x;
  }
  if (document.querySelector("#rowRcipes")) {
    document.querySelector("#rowRcipes").innerHTML = x;
  }
  if (document.querySelector("#areaMeals")) {
    document.querySelector("#areaMeals").innerHTML = x;
  }

  if (document.querySelector("#gridItems")) {
    document.querySelector("#gridItems").innerHTML = x;
  }

  // show meal by id
  let meals = document.querySelectorAll(".meal");
  for (let i = 0; i < meals.length; i++) {
    meals[i].addEventListener("click", () => {
      localStorage.setItem("mealId", meals[i].getAttribute("id"));
      location.pathname = "../mealDetails.html";
      // displayMealData()
    });
  }
}

// search by name input
const sNameInp = document.querySelector("#sNameInp");
// search by leeter
const sLettInp = document.querySelector("#sLettInp");

if (location.pathname.includes("/searchMeal.html")) {
  sNameInp.addEventListener("input", () => {
    if (sNameInp.value !== "") {
      searchByName(sNameInp.value);
    }
  });
  sLettInp.addEventListener("input", () => {
    if (sLettInp.value !== "") {
      searchByletter(sLettInp.value);
  });
}

// www.themealdb.com/api/json/v1/1/search.php?s=Arrabiata
//www.themealdb.com/api/json/v1/1/search.php?f=a

async function searchByName(ele) {
  
  try {
    let res = await fetch(
      `https://www.themealdb.com/api/json/v1/1/search.php?s=${ele}`
    );
    let data = await res.json();
    displayCategoryMeals(data.meals);
  } catch (error) {
    console.log(error);
    
  }
}

async function searchByletter(e) {
  try {
    let res = await fetch(
      `https://www.themealdb.com/api/json/v1/1/search.php?f=${e}`
    );
    let data = await res.json();
    displayCategoryMeals(data.meals);
  } catch (error) {
    console.log(error);
     
  }
}

async function randomMeals() {
  try {
    let res = await fetch(
      `https://www.themealdb.com/api/json/v1/1/search.php?s=`
    );
    let data = await res.json();
    displayCategoryMeals(data.meals);
  } catch (error) {
    console.log(error);
    
  }
}

if (location.pathname.includes("/index.html")) {
  randomMeals();
}

// show all area

//www.themealdb.com/api/json/v1/1/list.php?i=list

async function showAreas() {
  try {
    let res = await fetch(
      `https://www.themealdb.com/api/json/v1/1/list.php?a=list`
    );
    let data = await res.json();
    displayAreas(data.meals);
  } catch (error) {
    console.log(error);
    
  }
}
if (location.pathname.includes("/area.html")) {
  showAreas();
}

function displayAreas(arr) {
  let x = ``;
  for (let i = 0; i < arr.length; i++) {
    x += `
              <div class="col-md-3 area">
                <div class="inner text-center">
                   <i class="fa-solid fa-house-laptop text-white fa-4x"></i>
                    <h1 class="text-white">${arr[i].strArea}</h1>
                </div>
            </div>
    `;
  }
  document.getElementById("areas").innerHTML = x;
  let allAreas = document.querySelectorAll(".area");
  for (let i = 0; i < allAreas.length; i++) {
    allAreas[i].addEventListener("click", () => {
      localStorage.setItem(
        "areaName",
        allAreas[i].querySelector(".inner h1").innerHTML
      );
      location.pathname = "../areasMeals.html";
    });
  }
}

//www.themealdb.com/api/json/v1/1/filter.php?a=Canadian

async function areasMeals() {
  try {
    let res = await fetch(
      `https://www.themealdb.com/api/json/v1/1/filter.php?a=${localStorage.getItem(
        "areaName"
      )}`
    );
    let data = await res.json();
    displayCategoryMeals(data.meals);
  } catch (error) {
      console.log(error); 
  }
}

if (location.pathname.includes("/areasMeals.html")) {
  areasMeals();
}

//www.themealdb.com/api/json/v1/1/lookup.php?i=52772

async function displayMealData() {
  try {
    let res = await fetch(
      `https://www.themealdb.com/api/json/v1/1/lookup.php?i=${localStorage.getItem(
        "mealId"
      )}`
    );
    let data = await res.json();
    console.log(data.meals);
    displayMealDetails(data.meals);
  } catch (error) {
    console.log(error);
  }
}

if (location.pathname.includes("/mealDetails.html")) {
  displayMealData();
}
function displayMealDetails(arr) {
  let x = ``;
  for (let i = 0; i < arr.length; i++) {
    let m = arr[i]?.strTags || "";
    console.log(m);

    let tgs = m && m.trim() !== "" ? m.split(",") : [];

    x = `
       
      
                          <div class="col-md-5 text-white">
                        <img src="${
                          arr[i].strMealThumb
                        }" class="w-100 rounded" alt="">
                        <h2>${arr[i].strMeal}</h2>
                    </div>
                    <div class="col-md-7 text-white">
                        <h2>Instructions </h2>
                        <p class="py-2">${arr[i].strInstructions}</p>
                        <h3>Area : ${arr[i].strArea} </h3>
                        <h3>Category : ${arr[i].strCategory} </h3>
                        <h3>Recipes : </h3>
                        <p>
                         <span > ${
                           arr[i].strMeasure1 != null &&
                           arr[i].strMeasure1 &&
                           arr[i].strIngredient1 != null &&
                           arr[i].strIngredient1 != ""
                             ? `<span class="btn btn-light me-3 mb-3">${arr[i].strMeasure1} ${arr[i].strIngredient1}</span>`
                             : `<h2 class='d-none'></h2>`
                         }</span>
                         <span > ${
                           arr[i].strMeasure2 != null &&
                           arr[i].strMeasure2 &&
                           arr[i].strIngredient2 != null &&
                           arr[i].strIngredient2 != ""
                             ? `<span class="btn btn-light me-3 mb-3">${arr[i].strMeasure2} ${arr[i].strIngredient2}</span>`
                             : `<h2 class='d-none'></h2>`
                         }</span>
                         <span > ${
                           arr[i].strMeasure3 != null &&
                           arr[i].strMeasure3 &&
                           arr[i].strIngredient3 != null &&
                           arr[i].strIngredient3 != ""
                             ? `<span class="btn btn-light me-3 mb-3">${arr[i].strMeasure3} ${arr[i].strIngredient3}</span>`
                             : `<h2 class='d-none'></h2>`
                         }</span>
                         <span > ${
                           arr[i].strMeasure4 != null &&
                           arr[i].strMeasure4 &&
                           arr[i].strIngredient4 != null &&
                           arr[i].strIngredient4 != ""
                             ? `<span class="btn btn-light me-3 mb-3">${arr[i].strMeasure4} ${arr[i].strIngredient4}</span>`
                             : `<h2 class='d-none'></h2>`
                         }</span>
                         <span > ${
                           arr[i].strMeasure5 != null &&
                           arr[i].strMeasure5 &&
                           arr[i].strIngredient5 != null &&
                           arr[i].strIngredient5 != ""
                             ? `<span class="btn btn-light me-3 mb-3">${arr[i].strMeasure5} ${arr[i].strIngredient5}</span>`
                             : `<h2 class='d-none'></h2>`
                         }</span>
                         <span > ${
                           arr[i].strMeasure6 != null &&
                           arr[i].strMeasure6 &&
                           arr[i].strIngredient6 != null &&
                           arr[i].strIngredient6 != ""
                             ? `<span class="btn btn-light me-3 mb-3">${arr[i].strMeasure6} ${arr[i].strIngredient6}</span>`
                             : `<h2 class='d-none'></h2>`
                         }</span>
                         <span > ${
                           arr[i].strMeasure7 != null &&
                           arr[i].strMeasure7 &&
                           arr[i].strIngredient7 != null &&
                           arr[i].strIngredient7 != ""
                             ? `<span class="btn btn-light me-3 mb-3">${arr[i].strMeasure7} ${arr[i].strIngredient7}</span>`
                             : `<h2 class='d-none'></h2>`
                         }</span>
                         <span > ${
                           arr[i].strMeasure8 != null &&
                           arr[i].strMeasure8 &&
                           arr[i].strIngredient8 != null &&
                           arr[i].strIngredient8 != ""
                             ? `<span class="btn btn-light me-3 mb-3">${arr[i].strMeasure8} ${arr[i].strIngredient8}</span>`
                             : `<h2 class='d-none'></h2>`
                         }</span>
                         <span > ${
                           arr[i].strMeasure9 != null &&
                           arr[i].strMeasure9 &&
                           arr[i].strIngredient9 != null &&
                           arr[i].strIngredient9 != ""
                             ? `<span class="btn btn-light me-3 mb-3">${arr[i].strMeasure9} ${arr[i].strIngredient9}</span>`
                             : `<h2 class='d-none'></h2>`
                         }</span>
                         <span > ${
                           arr[i].strMeasure10 != null &&
                           arr[i].strMeasure10 &&
                           arr[i].strIngredient10 != null &&
                           arr[i].strIngredient10 != ""
                             ? `<span class="btn btn-light me-3 mb-3">${arr[i].strMeasure10} ${arr[i].strIngredient10}</span>`
                             : `<h2 class='d-none'></h2>`
                         }</span>
                         <span > ${
                           arr[i].strMeasure11 != null &&
                           arr[i].strMeasure11 &&
                           arr[i].strIngredient11 != null &&
                           arr[i].strIngredient11 != ""
                             ? `<span class="btn btn-light me-3 mb-3">${arr[i].strMeasure11} ${arr[i].strIngredient11}</span>`
                             : `<h2 class='d-none'></h2>`
                         }</span>
                         <span > ${
                           arr[i].strMeasure12 != null &&
                           arr[i].strMeasure12 &&
                           arr[i].strIngredient12 != null &&
                           arr[i].strIngredient12 != ""
                             ? `<span class="btn btn-light me-3 mb-3">${arr[i].strMeasure12} ${arr[i].strIngredient12}</span>`
                             : `<h2 class='d-none'></h2>`
                         }</span>
                         <span > ${
                           arr[i].strMeasure13 != null &&
                           arr[i].strMeasure13 &&
                           arr[i].strIngredient13 != null &&
                           arr[i].strIngredient13 != ""
                             ? `<span class="btn btn-light me-3 mb-3">${arr[i].strMeasure13} ${arr[i].strIngredient13}</span>`
                             : `<h2 class='d-none'></h2>`
                         }</span>
                         <span > ${
                           arr[i].strMeasure14 != null &&
                           arr[i].strMeasure14 &&
                           arr[i].strIngredient14 != null &&
                           arr[i].strIngredient14 != ""
                             ? `<span class="btn btn-light me-3 mb-3">${arr[i].strMeasure14} ${arr[i].strIngredient14}</span>`
                             : `<h2 class='d-none'></h2>`
                         }</span>
                         <span > ${
                           arr[i].strMeasure15 != null &&
                           arr[i].strMeasure15 &&
                           arr[i].strIngredient15 != null &&
                           arr[i].strIngredient15 != ""
                             ? `<span class="btn btn-light me-3 mb-3">${arr[i].strMeasure15} ${arr[i].strIngredient15}</span>`
                             : `<h2 class='d-none'></h2>`
                         }</span>
                         <span > ${
                           arr[i].strMeasure16 != null &&
                           arr[i].strMeasure16 &&
                           arr[i].strIngredient16 != null &&
                           arr[i].strIngredient16 != ""
                             ? `<span class="btn btn-light me-3 mb-3">${arr[i].strMeasure16} ${arr[i].strIngredient16}</span>`
                             : `<h2 class='d-none'></h2>`
                         }</span>
                   
                        </p>
          

                        <h3>Tags :</h3>
                        <p> 
                        
                              <span>
                                ${
                                  tgs.length > 0
                                    ? tgs
                                        .map(
                                          (tag) =>
                                            `<span class="btn btn-light mt-2 me-3">${tag}</span>`
                                        )
                                        .join(" ")
                                    : `<span class='d-none'></span>`
                                }
                              
                              </span>
                              
                        </p>
                          <a class="btn btn-success me-3" href="${
                            arr[i].strSource
                          }">Source</a>   <a href="${
      arr[i].strYoutube
    }" class="btn btn-danger">Youtube</a>
                    </div>
      
      
      `;
  }
  if (document.getElementById("proDetails")) {
    document.getElementById("proDetails").innerHTML = x;
  }
}

// www.themealdb.com/api/json/v1/1/list.php?i=list

async function gradients() {
  try {
    let res = await fetch(
      `https://www.themealdb.com/api/json/v1/1/list.php?i=list`
    );
    let data = await res.json();
    console.log(data);
    const targetMeals = data.meals.slice(0, 20);
    displayGradients(targetMeals);
  } catch (error) {
    console.log(error);
  }
}

if (location.pathname.includes("/gradients.html")) {
  gradients();
}

function displayGradients(arr) {
  let x = ``;
  for (let i = 0; i < arr.length; i++) {
    x += `
  
    <div class="col-md-3 gradient">
    <div class="inner text-center">
      <i class="fa-solid fa-drumstick-bite text-white fa-4x"></i>
        <h1 class="text-white">${arr[i].strIngredient}</h1>
    </div>
</div>


`;
  }

  if (document.getElementById("allGrid")) {
    document.getElementById("allGrid").innerHTML = x;
  }
  let allgradient = document.querySelectorAll(".gradient");
  console.log(allgradient);
  for (let i = 0; i < allgradient.length; i++) {
    allgradient[i].addEventListener("click", function () {
      console.log(
        allgradient[i].querySelector(".gradient .inner h1").innerHTML
      );
      localStorage.setItem(
        "allGradient",
        allgradient[i].querySelector(".gradient .inner h1").innerHTML
      );
      location.pathname = "../gradientsMeals.html";
    });
  }
}

async function allgradient() {
  try {
    let res = await fetch(
      `https://www.themealdb.com/api/json/v1/1/filter.php?i=${localStorage.getItem(
        "allGradient"
      )}`
    );
    let data = await res.json();
  
    displayCategoryMeals(data.meals);
  } catch (error) {
    console.log(error);
    
  }
}
if (location.pathname.includes("/gradientsMeals.html")) {
  allgradient();
}

// validate
let nameInput = document.getElementById("name");
let emailInput = document.getElementById("email");
let phoneInput = document.getElementById("phone");
let ageInput = document.getElementById("age");
let passwordInput = document.getElementById("password");
let repasswordInput = document.getElementById("repassword");
let subBtn = document.getElementById("subBtn");

function validateInp(ele) {
  let regx = {
    name: /^\w{3,8}( )?([A-Z]?[a-z]{3,8})?$/gm,
    email: /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/gm,
    phone: /^([0|\+[0-9]{1,5})?([0-9]{10})$/,
    age: /^[1-9]([0-9]?[0-9])?$/,
    password: /^(?=.*[A-Za-z])(?=.*\d)[A-Za-z\d@$!%*?&]{8,}$/,
    repassword: /^(?=.*[A-Za-z])(?=.*\d)[A-Za-z\d@$!%*?&]{8,}$/,
  };

  if (regx[ele.id].test(ele.value)) {
    ele.classList.add("is-valid");
    ele.classList.remove("is-invalid");
    ele.nextElementSibling.classList.replace("d-block", "d-none");
    if (regx[ele] == regx[ele]) {
      ele.classList.add("is-valid");

      updateSubmitButtonState();
    }
  } else {
    ele.nextElementSibling.classList.replace("d-none", "d-block");
    ele.classList.add("is-invalid");
    ele.classList.remove("is-valid");
  }
  if (
    passwordInput.value === repasswordInput.value &&
    repasswordInput.value !== ""
  ) {
    repasswordInput.classList.add("is-valid");
    repasswordInput.classList.remove("is-invalid");
  } else {
    repasswordInput.classList.add("is-invalid");
    repasswordInput.classList.remove("is-valid");
  }
}

function updateSubmitButtonState() {
  // Check if all inputs are valid
  if (
    nameInput.classList.contains("is-valid") &&
    emailInput.classList.contains("is-valid") &&
    ageInput.classList.contains("is-valid") &&
    phoneInput.classList.contains("is-valid") &&
    passwordInput.classList.contains("is-valid") &&
    repasswordInput.classList.contains("is-valid")
  ) {
    subBtn.removeAttribute("disabled");
  } else {
    subBtn.setAttribute("disabled", true);
  }
}

if (performance.navigation.type === performance.navigation.TYPE_RELOAD) {
  window.location.href = "../index.html";
}
