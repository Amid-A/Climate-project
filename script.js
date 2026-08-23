// 1. Array of Climate Projects Data
const projects = [
  {
    id: 1,
    title: "Rainforest Canopy Restoration",
    location: "Lagos, Nigeria",
    category: "Forestry",
    // Fixed: Rainforest canopy photo
    image: "https://images.unsplash.com/photo-1448375240586-882707db888b?w=600&auto=format&fit=crop",
    description: "Restoring native tree cover to expand indigenous biodiversity corridors and capture atmospheric carbon."
  },
  {
    id: 2,
    title: "E-waste Recovery Hub",
    location: "Kigali, Rwanda",
    category: "E-waste",
    image: "https://images.unsplash.com/photo-1532996122724-e3c354a0b15b?auto=format&fit=crop&w=400&q=80",
    description: "Collecting, repairing, and safely recycling electronic hardware to prevent environmental toxicity."
  },
  {
    id: 3,
    title: "Community Solar Microgrid",
    location: "Mombasa, Kenya",
    category: "Renewables",
    image: "https://images.unsplash.com/photo-1508514177221-188b1cf16e9d?auto=format&fit=crop&w=600&q=80",
    description: "Empowering coastal communities with clean, reliable solar electricity to replace diesel generators."
  },
  {
    id: 4,
    title: "Mangrove Shield Project",
    location: "Lagos, Nigeria",
    category: "Forestry",
    image: "https://images.unsplash.com/photo-1544551763-46a013bb70d5?w=600&auto=format&fit=crop",
    description: "Replanting coastal mangroves to buffer against rising sea levels and support local marine wildlife."
  }
];

// 2. Application State Variables
let activeCategory = "All";
let searchQuery = "";

// 3. DOM Elements Selection
const projectsGrid = document.getElementById("projectsGrid");
const searchInput = document.getElementById("searchInput");
const filterContainer = document.getElementById("filterContainer");

const modal = document.getElementById("projectModal");
const closeModalBtn = document.getElementById("closeModal");
const modalBody = document.getElementById("modalBody");

const form = document.getElementById("interestForm");
const nameInput = document.getElementById("fullName");
const emailInput = document.getElementById("email");
const nameError = document.getElementById("nameError");
const emailError = document.getElementById("emailError");
const successMsg = document.getElementById("successMsg");

// 4. Render Function (Array Mapping to HTML Cards)
function renderProjects() {
  projectsGrid.innerHTML = "";

  // Filter based on active category & search query
  const filteredProjects = projects.filter(project => {
    const matchesSearch = project.title.toLowerCase().includes(searchQuery) || 
                          project.location.toLowerCase().includes(searchQuery);
    const matchesCategory = activeCategory === "All" || project.category === activeCategory;
    
    return matchesSearch && matchesCategory;
  });

  if (filteredProjects.length === 0) {
    projectsGrid.innerHTML = `<p style="grid-column: 1/-1; text-align: center; color: #666;">No projects found matching your criteria.</p>`;
    return;
  }

  // Create card DOM elements dynamically
  filteredProjects.forEach(project => {
    const card = document.createElement("article");
    card.className = "card";
    card.innerHTML = `
      <img src="${project.image}" alt="${project.title}" class="card-img" />
      <div class="card-body">
        <div class="card-location">${project.location}</div>
        <h3 class="card-title">${project.title}</h3>
        <button class="view-btn" onclick="openModal(${project.id})">View Project</button>
      </div>
    `;
    projectsGrid.appendChild(card);
  });
}

// 5. Search & Filter Handlers
searchInput.addEventListener("input", (e) => {
  searchQuery = e.target.value.toLowerCase().trim();
  renderProjects();
});

filterContainer.addEventListener("click", (e) => {
  if (!e.target.classList.contains("filter-btn")) return;

  // Toggle active styling
  document.querySelectorAll(".filter-btn").forEach(btn => btn.classList.remove("active"));
  e.target.classList.add("active");

  activeCategory = e.target.dataset.category;
  renderProjects();
});

// 6. Project Modal Logic
function openModal(projectId) {
  const project = projects.find(p => p.id === projectId);
  if (!project) return;

  modalBody.innerHTML = `
    <h2 style="color: var(--primary); margin-bottom: 0.25rem;">${project.title}</h2>
    <p style="color: var(--text-muted); font-size: 0.85rem; margin-bottom: 1rem;">${project.location} &bull; <strong>${project.category}</strong></p>
    <p>${project.description}</p>
  `;

  // Reset modal form state
  form.reset();
  nameError.textContent = "";
  emailError.textContent = "";
  successMsg.textContent = "";

  modal.classList.add("open");
}

closeModalBtn.addEventListener("click", () => modal.classList.remove("open"));
modal.addEventListener("click", (e) => {
  if (e.target === modal) modal.classList.remove("open");
});

// 7. Form Validation Logic
form.addEventListener("submit", (e) => {
  e.preventDefault();
  let isValid = true;

  // Clear previous errors
  nameError.textContent = "";
  emailError.textContent = "";
  successMsg.textContent = "";

  // Validate Full Name
  if (nameInput.value.trim() === "") {
    nameError.textContent = "Please enter your name.";
    isValid = false;
  }

  // Validate Email Regex pattern
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  if (!emailRegex.test(emailInput.value.trim())) {
    emailError.textContent = "Please enter a valid email address.";
    isValid = false;
  }

  if (isValid) {
    successMsg.textContent = "Thank you! Your interest has been submitted.";
    form.reset();
  }
});

// Initial Render on page load
renderProjects();