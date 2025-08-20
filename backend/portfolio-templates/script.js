window.addEventListener("scroll", () => {
  const header = document.getElementById("header");
  if (window.scrollY > 100) {
    header.classList.add("header-active");
  } else {
    header.classList.remove("header-active");
  }
});

// Insert Footer Content Dynamically
const siteConfig = {
  name: "Ryan Fitzgerald",
  title: "Senior Software Engineer",
  accentColor: "#1d4ed8",
  social: {
    email: "your-email@example.com",
    linkedin: "https://linkedin.com/in/yourprofile",
    twitter: "https://x.com/rfitzio",
    github: "https://github.com/RyanFitzgerald",
  },
  projects: [{ name: "p1" }],
  experience: [{ name: "exp" }],
  education: [{ name: "edu" }],
};

document.getElementById("footer-name").textContent = siteConfig.name;
document.getElementById("footer-title").textContent = siteConfig.title;
document.getElementById(
  "footer-email"
).innerHTML = `<svg xmlns="http://www.w3.org/2000/svg" class="icon"><path d="M3 7l9 6l9-6"/></svg>`;
document.getElementById("footer-email").href = `mailto:${siteConfig.social.email}`;
document.getElementById(
  "footer-linkedin"
).innerHTML = `<svg xmlns="http://www.w3.org/2000/svg" class="icon"><path d="M8 11v5"/></svg>`;
document.getElementById("footer-linkedin").href = siteConfig.social.linkedin;
document.getElementById(
  "footer-twitter"
).innerHTML = `<svg xmlns="http://www.w3.org/2000/svg" class="icon"><path d="M4 4l11.7 16"/></svg>`;
document.getElementById("footer-twitter").href = siteConfig.social.twitter;
document.getElementById(
  "footer-github"
).innerHTML = `<svg xmlns="http://www.w3.org/2000/svg" class="icon"><path d="M9 19c-4.3 1.4..."/></svg>`;
document.getElementById("footer-github").href = siteConfig.social.github;

// Conditional Nav Links
const footerNav = document.getElementById("footer-nav");
footerNav.innerHTML = `
  <a href="#about">About</a>
  ${siteConfig.projects?.length ? `<a href="#projects">Projects</a>` : ""}
  ${siteConfig.experience?.length ? `<a href="#experience">Experience</a>` : ""}
  ${siteConfig.education?.length ? `<a href="#education">Education</a>` : ""}
`;

// Copyright
document.getElementById(
  "footer-copy"
).textContent = `© ${new Date().getFullYear()} ${siteConfig.name}. All rights reserved.`;
