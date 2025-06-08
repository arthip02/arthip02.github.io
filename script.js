document.addEventListener("DOMContentLoaded", () => {
  setupNameReveal();
  lazyLoadChart();
  setupContactForm();
});

function lazyLoadChart() {
  const chartCanvas = document.getElementById("skillsChart");
  if (!chartCanvas) return;

  const observer = new IntersectionObserver((entries, obs) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        renderSkillsChart();
        obs.disconnect();
      }
    });
  });

  observer.observe(chartCanvas);
}

function renderSkillsChart() {
  const ctx = document.getElementById("skillsChart");
  if (!ctx) return;

  new Chart(ctx, {
    type: "bar",
    data: {
      labels: ["Java", "SQL", "DBMS", "Algorithms"],
      datasets: [
        {
          label: "Skill Level",
          data: [85, 90, 80, 75],
          backgroundColor: [
            "rgba(13, 110, 253, 0.7)",
            "rgba(108, 117, 125, 0.7)",
            "rgba(13, 110, 253, 0.7)",
            "rgba(108, 117, 125, 0.7)",
          ],
          borderRadius: 5,
        },
      ],
    },
    options: {
      animation: false,
      scales: {
        y: {
          beginAtZero: true,
          max: 100,
        },
      },
    },
  });
}

function setupContactForm() {
  const form = document.getElementById("contact-form");
  if (!form) return;

  form.addEventListener("submit", (e) => {
    e.preventDefault();

    const name = form.name.value.trim();
    const email = form.email.value.trim();
    const message = form.message.value.trim();

    if (!name || !email || !message) {
      alert("Please fill in all fields.");
      return;
    }

    const formData = {
      name,
      email,
      message,
      timestamp: new Date().toISOString(),
    };

    const submissions =
      JSON.parse(localStorage.getItem("contactSubmissions")) || [];
    submissions.push(formData);
    localStorage.setItem("contactSubmissions", JSON.stringify(submissions));

    console.log("✅ Contact Form Submitted:", formData);
    alert("Thanks for contacting me! I’ll respond soon.");
    form.reset();
  });
}

function setupNameReveal() {
  const clickableName = document.getElementById("clickable-name");
  const bio = document.getElementById("extended-bio");

  if (clickableName && bio) {
    clickableName.addEventListener("click", () => {
      bio.classList.remove("d-none");
      bio.classList.add("alert", "alert-info");

      clickableName.classList.add("bg-warning", "text-dark", "px-2", "rounded");
      setTimeout(() => {
        clickableName.classList.remove(
          "bg-warning",
          "text-dark",
          "px-2",
          "rounded"
        );
      }, 1200);
    });
  }
}
