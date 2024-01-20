// For managing the theme
const moon = document.querySelector("#moon");
const sun = document.querySelector("#sun");
// Project Title
const title = document.querySelector(".title");
// Theme text: "Dark Mode"
const themeText = document.querySelector(".theme-text");
// Input Field
const input = document.querySelector("#user");
// Search Button
const button = document.querySelector(".btn");
const cards = document.querySelectorAll(".card");
// User's Profile Image
const avatarMobile = document.querySelector(".avatar-mobile");
const avatarDesktop = document.querySelector(".avatar-desktop");
// User's Profile Link
const userProfile = document.querySelector(".user-profile");
// User's Full Name
const nameElement = document.querySelector(".name");
// User's Username
const login = document.querySelector(".login");
// User's Joining Date
const joinDate = document.querySelector(".join-date");
// User's Bio
const bio = document.querySelector(".bio");
// User's Repo Count
const repos = document.querySelector("#repos");
// User's Followers Count
const followers = document.querySelector("#followers");
// User's Following Count
const following = document.querySelector("#following");
// User's Location
const city = document.querySelector("#city");
// User's Blog link
const blog = document.querySelector("#blog");
// User's Twitter Username
const twitter = document.querySelector("#twitter");
// User's Company
const company = document.querySelector("#company");
// To show Error (if given github id donot exists)
const errorElement = document.querySelector(".error");
// To show User's Stats
const stats = document.querySelector(".stats");
// Repo Name
const repoTitle = document.querySelector(".repo-title");
// Repo Description
const repoDesc = document.querySelector(".repo-desc");
// Repo Language
const repoLang = document.querySelector(".lang");
// Repo Stars
const repoStars = document.querySelector(".stars");
// Complete List of Repositories
const repoList = document.getElementById("repository");
// For Loading More Repositories
const loadMoreBtn = document.getElementById("loadMoreBtn");

// Displayed Repos Count
let displayedRepoCount = 0;
// Keep track of the current page number
let currentPage = 1;
// Keep track of the total public repos
let totalPublicRepos = 0;
// To manage the user's detail in all functions
let USER;

// Dummy Values
const dummy = {
  avatar_url:
    "https://res.cloudinary.com/djdgo0syl/image/upload/v1690133806/eqgum8p7hd3imbn3d5yy.png",
  bio: "BIO",
  blog: "https://github.blog",
  company: "@GITHUB",
  created_at: "2001-01-01T01:01:01Z",
  followers: 99,
  following: 99,
  html_url: "https://github.com",
  location: "Location",
  login: "DemoUsername",
  name: "John Doe",
  public_repos: 99,
  twitter_username: "Twitter",
};

// Resetting the Error
input.addEventListener("input", () => {
  errorElement.textContent = "";
});

// ============================================= Date Transformer funtion
const dateTransformer = (date) => {
  const dateObj = new Date(date);
  const dateString = dateObj.toDateString();
  const [weekday, month, day, year] = dateString.split(" ");
  return `${day} ${month} ${year}`;
};

// ============================================= To Shorten the description
const shortenDescription = (description) => {
  if (description.length > 55) {
    return description.substring(0, 50) + "";
  }
  return description;
};

// ============================================= Display USER'S INFO
const displayInfo = (user) => {
  // User's Profile Picture
  avatarMobile.src = user.avatar_url;
  avatarDesktop.src = user.avatar_url;

  // User's Fullname
  nameElement.textContent = user.name;

  // User's Username
  login.textContent = "@" + user.login;

  // Joining Date
  const date = dateTransformer(user.created_at);
  joinDate.textContent = "Joined GitHub on: " + date;

  // User's Bio
  bio.textContent = user.bio || "Bio Not Available";

  // User's Public Repo Count
  repos.textContent = user.public_repos;

  // User's Followers Count
  followers.textContent = user.followers;

  // User's Following Count
  following.textContent = user.following;

  // User's Location
  if (user.location) {
    city.textContent = user.location;
  } else {
    city.textContent = "Not Available";
    city.parentElement.style.opacity = 0.5;
  }

  // User's Profile Link
  if (user.html_url) {
    userProfile.href = user.html_url;
    userProfile.target = "blank";
  } else {
    userProfile.href = "#";
  }

  // User's Twitter Username
  if (user.twitter_username) {
    twitter.textContent = user.twitter_username;
  } else {
    twitter.textContent = "Not Available";
    twitter.parentElement.style.opacity = 0.5;
  }

  // User's Blog URL
  if (user.blog) {
    blog.textContent = user.blog;
    blog.href = user.blog;
    blog.target = "blank";
  } else {
    blog.textContent = "Not Available";
    blog.href = "#";
    blog.parentElement.style.opacity = 0.5;
  }

  // User's Company
  if (user.company) {
    company.textContent = user.company;
  } else {
    company.textContent = "Not Available";
    company.parentElement.style.opacity = 0.5;
  }
};

// ============================================= Display User's REPO Info
const displayRepo = (repo) => {
  // A repo element
  const li = document.createElement("li");
  li.className = "repo";
  // Add the 'dark' class if dark mode is active
  if (document.body.classList.contains("dark")) {
    li.classList.add("dark");
  }

  // For RepoBody
  const repoBody = document.createElement("div");
  repoBody.className = "repo-body";

  // For Repo Title
  const title = document.createElement("h3");
  title.className = "repo-title";
  // Adding Link to the Repo Title
  const titleLink = document.createElement("a");
  titleLink.href = repo.html_url;
  titleLink.target = "blank";
  titleLink.textContent = repo.name;
  title.appendChild(titleLink);

  // For Repo Description
  const desc = document.createElement("p");
  desc.className = "repo-desc";
  let description;
  if (repo.description) {
    description = shortenDescription(repo.description);
  }
  desc.textContent = description
    ? `${description}...`
    : "No Description Available";

  // For Lang and Stars Info
  const info = document.createElement("p");
  info.className = "repo-info";
  // Language Used
  const lang = document.createElement("span");
  lang.className = "lang";
  lang.textContent = repo.language ? `🗣️${repo.language}    ` : "";
  // Stars Count
  const stars = document.createElement("span");
  stars.className = "stars";
  stars.textContent = `⭐${repo.stargazers_count}`;
  info.appendChild(lang);
  info.appendChild(stars);

  // Append elements to the DOM
  repoBody.appendChild(title);
  repoBody.appendChild(desc);
  repoBody.appendChild(info);

  // Appending repoBody to the repo element
  li.appendChild(repoBody);
  // Adding repo element to the list
  repoList.appendChild(li);
};

// ============================================= Changing the THEME of the application
const flipTheme = (theme) => {
  if (theme === "dark") {
    moon.style.display = "none";
    sun.style.display = "block";
    document.body.style.backgroundColor = "#141D2F";
  } else {
    moon.style.display = "block";
    sun.style.display = "none";
    document.body.style.backgroundColor = "#f6f8ff";
  }

  // Handling the classes of components to be targeted
  title.classList.toggle("dark");
  themeText.classList.toggle("dark");
  input.classList.toggle("dark");
  Array.from(cards).forEach((card) => card.classList.toggle("dark"));
  blog.classList.toggle("dark");
  login.style.color = "var(--electric)";
  stats.classList.toggle("dark");

  // A Repo Component
  const repo = document.querySelectorAll(".repo");
  Array.from(repo).forEach((r) => r.classList.toggle("dark"));
  // repo.forEach((repoItem) => repoItem.classList.toggle("dark"));
};

// ============================================= Modify your 'loadMoreBtn' event listener
loadMoreBtn.addEventListener("click", async () => {
  try {
    // Increment the current page for the next batch
    currentPage++;

    // Fetch the next batch of repositories (10 repositories per page)
    const repositories = await axios.get(
      `https://api.github.com/users/${USER}/repos?per_page=10&page=${currentPage}`
    );

    // Display each repository
    if (repositories && repositories.data.length > 0) {
      repositories.data.forEach((repo) => {
        // Showing each repo's details
        displayRepo(repo);
      });

      // Increment the displayed repository count
      displayedRepoCount += repositories.data.length;

      // If there are no more repositories, hide the "Load More" button
      if (displayedRepoCount >= totalPublicRepos) {
        loadMoreBtn.style.display = "none";
      }
    } else {
      // If there are no more repositories, hide the "Load More" button
      loadMoreBtn.style.display = "none";
    }
  } catch (error) {
    console.error("Error fetching repositories:", error);
  }
});

// Called Initially
displayInfo(dummy);

moon.addEventListener("click", () => flipTheme("dark"));
sun.addEventListener("click", () => flipTheme("light"));

// ============================================= On Searching the user's Profile
button.addEventListener("click", async (event) => {
  event.preventDefault();
  try {
    // Reset the current page when a new search is performed
    currentPage = 1;
    displayedRepoCount = 0;

    USER = input.value;

    // Finding the User's Github Profile
    const response = await axios.get(`https://api.github.com/users/${USER}`);
    // Fetching the required data only
    const user = response.data;
    // Total public repos
    totalPublicRepos = user.public_repos;

    // Show the user's details
    displayInfo(user);

    // Finding User's Public Repositories (first batch)
    const repositories = await axios.get(
      `https://api.github.com/users/${USER}/repos?per_page=10&page=${currentPage}`
    );

    repoList.innerHTML = "";

    // Display each repository
    if (repositories && repositories.data.length > 0) {
      repositories.data.forEach((repo) => {
        // Showing each repo's details
        displayRepo(repo);
      });

      // Increment the displayed repository count
      displayedRepoCount += repositories.data.length;

      // If there are more than 10 repos, show the "Load More" button
      if (totalPublicRepos > 10) {
        loadMoreBtn.style.display = "block";
      }
    } else {
      // If there are no repositories, hide the "Load More" button
      loadMoreBtn.style.display = "none";
    }

    // Resetting the search input value
    input.value = "";
  } catch (error) {
    errorElement.textContent = "NO RESULT";
  }
});
