const loggedInUser = localStorage.getItem("loggedInUser");
if (!loggedInUser) {
  alert("Please log in to access the gallery.");
  window.location.href = "index.html"; // بازگشت به صفحه ورود
}

const foldersContainer = document.getElementById("folders-container");
const addFolderBtn = document.getElementById("add-folder-btn");
const changeBgBtn = document.getElementById("change-bg-btn");
const lightbox = document.getElementById("lightbox");
const lightboxImg = document.getElementById("lightbox-img");
const lightboxCaption = document.getElementById("lightbox-caption");
const closeLightbox = document.getElementById("close-lightbox");

let folderCount = 0;
const themes = [
  "theme-navy-cream",
  "theme-red-white",
  "theme-yellow-orange",
  "theme-green-cream",
  "theme-colorful",
  "theme-black-white",
  "theme-gray-burgundy",
];

// Function to create a new folder
function createFolder() {
  const folderName = prompt("Enter folder name:");
  if (!folderName) return;

  folderCount++;
  const folder = document.createElement("div");
  folder.classList.add("folder");

  folder.innerHTML = `
    <h3>${folderName}</h3>
    <div class="images-container"></div>
    <button onclick="addImageToFolder(${folderCount})" class="cute-btn add-img-btn">+</button>
    <button onclick="changeFolderTheme(${folderCount})" class="cute-btn change-theme-btn">🎨</button>
    <button onclick="deleteFolder(${folderCount})" class="cute-btn delete-btn">🗑️</button>
  `;

  folder.dataset.id = folderCount;
  foldersContainer.appendChild(folder);
}

// Function to change folder theme
function changeFolderTheme(folderId) {
  const folder = document.querySelector(`[data-id='${folderId}']`);
  const currentTheme = Array.from(folder.classList).find((cls) => cls.startsWith("theme-"));
  const currentIndex = themes.indexOf(currentTheme);
  const nextIndex = (currentIndex + 1) % themes.length;
  folder.classList.remove(currentTheme);
  folder.classList.add(themes[nextIndex]);
}

// Function to add an image to a folder
function addImageToFolder(folderId) {
  const folder = document.querySelector(`[data-id='${folderId}']`);
  
  const imageUrl = prompt("Enter image URL:");
  if (!imageUrl) return;
  
  const imageCaption = prompt("Enter image caption:");
  
  const img = document.createElement("img");
  img.src = imageUrl;
  img.alt = "Image in Folder";
  
  const caption = document.createElement("p");
  caption.textContent = imageCaption ? imageCaption : "No caption provided";
  
  img.addEventListener("click", () => {
    lightboxImg.src = imageUrl;
    lightboxCaption.textContent = imageCaption ? imageCaption : "No caption provided";
    lightbox.classList.remove("hidden");
  });

  const imagesContainer = folder.querySelector(".images-container");
  imagesContainer.appendChild(img);
  imagesContainer.appendChild(caption);

  const deleteImgBtn = document.createElement("button");
  deleteImgBtn.textContent = "❌";
  deleteImgBtn.classList.add("delete-img-btn");
  deleteImgBtn.onclick = () => {
    img.remove();
    caption.remove();
    deleteImgBtn.remove();
  };
  folder.appendChild(deleteImgBtn);
}

// Function to delete folder
function deleteFolder(folderId) {
  const folder = document.querySelector(`[data-id='${folderId}']`);
  folder.remove();
}

// Function to change background
function changeBackground() {
  const imageUrl = prompt("Enter background image URL:");
  if (imageUrl) {
    document.body.style.backgroundImage = `url(${imageUrl})`;
    document.body.style.backgroundSize = "cover";
    document.body.style.backgroundPosition = "center";
  }
}

// Event listeners
addFolderBtn.addEventListener("click", createFolder);
changeBgBtn.addEventListener("click", changeBackground);
closeLightbox.addEventListener("click", () => {
  lightbox.classList.add("hidden");
});
