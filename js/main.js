/**
 * ODISHA IT LEARNERS - Core Interactive Client JavaScript
 * .NET & Angular Specialized Training Hub
 */

document.addEventListener("DOMContentLoaded", () => {
  initTheme();
  initCountdownTimer();
  initAnimatedCounters();
  initCourseFiltering();
  initEmiCalculator();
  initInquiryForm();
  initNavbarScroll();
  initBackToTop();
  initSyllabusModal();
  initExcelExport();
});

/* ==========================================================================
   1. Theme Management (Light / Dark Mode)
   ========================================================================== */
function initTheme() {
  const themeToggleBtn = document.getElementById("themeToggleBtn");
  const themeIcon = document.getElementById("themeIcon");
  const brandLogos = document.querySelectorAll(".brand-logo-img");

  const savedTheme =
    localStorage.getItem("oit-theme") ||
    (window.matchMedia("(prefers-color-scheme: dark)").matches
      ? "dark"
      : "light");

  applyTheme(savedTheme);

  if (themeToggleBtn) {
    themeToggleBtn.addEventListener("click", () => {
      const currentTheme =
        document.documentElement.getAttribute("data-bs-theme");
      const newTheme = currentTheme === "dark" ? "light" : "dark";
      applyTheme(newTheme);
      localStorage.setItem("oit-theme", newTheme);
    });
  }

  function applyTheme(theme) {
    document.documentElement.setAttribute("data-bs-theme", theme);
    if (themeIcon) {
      if (theme === "dark") {
        themeIcon.className = "bi bi-sun-fill text-warning";
      } else {
        themeIcon.className = "bi bi-moon-stars-fill text-secondary";
      }
    }
    brandLogos.forEach((img) => {
      if (theme === "dark") {
        img.src = "assets/images/logo-dark.svg";
      } else {
        img.src = "assets/images/logo.svg";
      }
    });
  }
}

/* ==========================================================================
   2. Next Upcoming Batch Countdown Timer (Target: 26th October)
   ========================================================================== */
function initCountdownTimer() {
  const daysEl = document.getElementById("cdDays");
  const hoursEl = document.getElementById("cdHours");
  const minsEl = document.getElementById("cdMins");
  const secsEl = document.getElementById("cdSecs");

  if (!daysEl || !hoursEl || !minsEl || !secsEl) return;

  // Exact target date: 26th October 2026, 6:30 AM IST
  const targetDate = new Date("2026-10-26T06:30:00+05:30");

  function updateTimer() {
    const now = new Date().getTime();
    const distance = targetDate.getTime() - now;

    if (distance <= 0) {
      daysEl.textContent = "00";
      hoursEl.textContent = "00";
      minsEl.textContent = "00";
      secsEl.textContent = "00";
      return;
    }

    const days = Math.floor(distance / (1000 * 60 * 60 * 24));
    const hours = Math.floor(
      (distance % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60),
    );
    const mins = Math.floor((distance % (1000 * 60 * 60)) / (1000 * 60));
    const secs = Math.floor((distance % (1000 * 60)) / 1000);

    daysEl.textContent = String(days).padStart(2, "0");
    hoursEl.textContent = String(hours).padStart(2, "0");
    minsEl.textContent = String(mins).padStart(2, "0");
    secsEl.textContent = String(secs).padStart(2, "0");
  }

  updateTimer();
  setInterval(updateTimer, 1000);
}

/* ==========================================================================
   3. Animated Counters on Scroll
   ========================================================================== */
function initAnimatedCounters() {
  const statNumbers = document.querySelectorAll(".stat-number[data-target]");
  if (!statNumbers.length) return;

  let animated = false;

  const observer = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting && !animated) {
          animated = true;
          statNumbers.forEach((el) => {
            const target = parseInt(el.getAttribute("data-target"), 10);
            const prefix = el.getAttribute("data-prefix") || "";
            const suffix = el.getAttribute("data-suffix") || "";
            const duration = 1800;
            const stepTime = 25;
            const totalSteps = duration / stepTime;
            let currentStep = 0;

            const counter = setInterval(() => {
              currentStep++;
              const progress = currentStep / totalSteps;
              const easeOutProgress = 1 - Math.pow(1 - progress, 3);
              const currentVal = Math.round(target * easeOutProgress);

              el.textContent = `${prefix}${currentVal.toLocaleString()}${suffix}`;

              if (currentStep >= totalSteps) {
                clearInterval(counter);
                el.textContent = `${prefix}${target.toLocaleString()}${suffix}`;
              }
            }, stepTime);
          });
        }
      });
    },
    { threshold: 0.3 },
  );

  const statsSection = document.getElementById("statsSection");
  if (statsSection) {
    observer.observe(statsSection);
  }
}

/* ==========================================================================
   4. Course Filtering & Live Search
   ========================================================================== */
function initCourseFiltering() {
  const filterButtons = document.querySelectorAll("[data-course-filter]");
  const searchInput = document.getElementById("courseSearchInput");
  const courseCards = document.querySelectorAll(".course-item-col");
  const emptyState = document.getElementById("noCoursesFound");

  let activeCategory = "all";
  let searchTerm = "";

  function applyFilter() {
    let visibleCount = 0;

    courseCards.forEach((col) => {
      const category = col.getAttribute("data-category") || "";
      const title = (
        col.querySelector(".course-title")?.textContent || ""
      ).toLowerCase();
      const tags = (
        col.querySelector(".course-tags-wrapper")?.textContent || ""
      ).toLowerCase();

      const matchCategory =
        activeCategory === "all" || category === activeCategory;
      const matchSearch =
        !searchTerm || title.includes(searchTerm) || tags.includes(searchTerm);

      if (matchCategory && matchSearch) {
        col.style.display = "";
        visibleCount++;
      } else {
        col.style.display = "none";
      }
    });

    if (emptyState) {
      emptyState.style.display = visibleCount === 0 ? "block" : "none";
    }
  }

  filterButtons.forEach((btn) => {
    btn.addEventListener("click", (e) => {
      e.preventDefault();
      filterButtons.forEach((b) =>
        b.classList.remove("active", "btn-oit-primary"),
      );
      filterButtons.forEach((b) => b.classList.add("btn-oit-outline"));

      btn.classList.remove("btn-oit-outline");
      btn.classList.add("active", "btn-oit-primary");

      activeCategory = btn.getAttribute("data-course-filter");
      applyFilter();
    });
  });

  if (searchInput) {
    searchInput.addEventListener("input", (e) => {
      searchTerm = e.target.value.trim().toLowerCase();
      applyFilter();
    });
  }
}

/* ==========================================================================
   5. Fee & Offer Calculator (.NET Full Stack: 15k -> 12k offer)
   ========================================================================== */
function initEmiCalculator() {
  const courseSelect = document.getElementById("emiCourseSelect");
  const tenureRange = document.getElementById("emiTenureRange");
  const tenureLabel = document.getElementById("emiTenureLabel");
  const couponInput = document.getElementById("emiCouponInput");
  const applyCouponBtn = document.getElementById("applyCouponBtn");

  const courseFeeDisplay = document.getElementById("calcCourseFee");
  const discountDisplay = document.getElementById("calcDiscount");
  const monthlyEmiDisplay = document.getElementById("calcMonthlyEmi");
  const totalPayableDisplay = document.getElementById("calcTotalPayable");

  if (!courseSelect || !tenureRange) return;

  const courseFees = {
    "dotnet-fullstack": 15000, // Original ₹15,000, Offer price ₹12,000
    "angular-mastery": 3500, // ₹3,500 (1.5 Month Course)
    "dotnet-ai": 14000, // .NET with AI
    "dotnet-azure": 11000, // .NET with Azure Cloud & DevOps
  };

  let instantDiscountAmount = 3000; // Flat ₹3,000 offer discount on .NET Full Stack (15k -> 12k)

  function calculate() {
    const selectedCourse = courseSelect.value;
    const baseFee = courseFees[selectedCourse] || 15000;
    const tenureMonths = parseInt(tenureRange.value, 10);

    let effectiveTenure = tenureMonths;
    if (selectedCourse === "angular-mastery") {
      effectiveTenure = Math.min(2, tenureMonths);
      if (tenureLabel) {
        tenureLabel.textContent = `${effectiveTenure} Months Plan`;
      }
    } else {
      if (tenureLabel) {
        tenureLabel.textContent = `${effectiveTenure} Months (No-Cost EMI)`;
      }
    }

    let discount =
      selectedCourse === "dotnet-fullstack"
        ? instantDiscountAmount
        : selectedCourse === "angular-mastery"
          ? 0
          : 2000;

    const finalFee = Math.max(0, baseFee - discount);
    const monthlyEmi = Math.round(finalFee / effectiveTenure);

    if (courseFeeDisplay)
      courseFeeDisplay.textContent = `₹${baseFee.toLocaleString("en-IN")}`;
    if (discountDisplay)
      discountDisplay.textContent = `- ₹${discount.toLocaleString("en-IN")}`;
    if (totalPayableDisplay)
      totalPayableDisplay.textContent = `₹${finalFee.toLocaleString("en-IN")}`;
    if (monthlyEmiDisplay)
      monthlyEmiDisplay.textContent = `₹${monthlyEmi.toLocaleString("en-IN")}`;
  }

  courseSelect.addEventListener("change", calculate);
  tenureRange.addEventListener("input", calculate);

  if (applyCouponBtn && couponInput) {
    applyCouponBtn.addEventListener("click", () => {
      const code = couponInput.value.trim().toUpperCase();
      if (code === "OCT26" || code === "ODISHAIT" || code === "DOTNET12K") {
        instantDiscountAmount = 3000;
        showToast(
          "Offer Applied!",
          "🎉 26th October Special Offer: Course fee reduced from ₹15k to ₹12k!",
          "success",
        );
        couponInput.classList.add("is-valid");
      } else {
        showToast(
          "Valid Coupon",
          "Special batch offer ₹3,000 already active!",
          "info",
        );
      }
      calculate();
    });
  }

  calculate();
}

/* ==========================================================================
   6. Automatic Lead Saving (Local Excel / CSV Storage & Google Sheet Webhook)
   ========================================================================== */
// Optional: Paste your free Google Sheets Webhook URL here to automatically sync rows into a live Google Sheet!
const GOOGLE_SHEET_WEBHOOK_URL =
  "https://script.google.com/macros/s/AKfycbzOvCU3Qks-93I1uT5v72iWnUkg9ttIfcz04NYIl2s3GpNyF4CLDW2hXba6LKaLnfl3/exec";

function saveLeadToExcelStorage(leadData) {
  try {
    const existingLeads = JSON.parse(
      localStorage.getItem("oit_leads_excel") || "[]",
    );
    existingLeads.unshift(leadData); // Add latest lead to the top
    localStorage.setItem("oit_leads_excel", JSON.stringify(existingLeads));
    updateExportLeadCount();

    // Stream lead to live Google Sheet Webhook
    if (GOOGLE_SHEET_WEBHOOK_URL) {
      fetch(GOOGLE_SHEET_WEBHOOK_URL, {
        method: "POST",
        mode: "no-cors",
        headers: { "Content-Type": "text/plain;charset=utf-8" },
        body: JSON.stringify(leadData),
      })
      .then(() => console.log("Lead synced to Google Sheet successfully"))
      .catch((err) => console.log("Sheet sync status:", err));
    }
  } catch (e) {
    console.error("Lead storage error:", e);
  }
}

function updateExportLeadCount() {
  const countBadge = document.getElementById("excelLeadCount");
  if (countBadge) {
    const leads = JSON.parse(localStorage.getItem("oit_leads_excel") || "[]");
    countBadge.textContent = leads.length;
  }
}

function initExcelExport() {
  updateExportLeadCount();

  const exportBtn = document.getElementById("exportExcelBtn");
  if (!exportBtn) return;

  exportBtn.addEventListener("click", () => {
    const leads = JSON.parse(localStorage.getItem("oit_leads_excel") || "[]");
    if (!leads.length) {
      showToast(
        "No Inquiries Yet",
        "Excel sheet is ready. When a student submits the form, it will record here.",
        "info",
      );
      return;
    }

    // Generate CSV content formatted for Microsoft Excel
    const headers = [
      "Registration Date",
      "Student Name",
      "Mobile / WhatsApp",
      "Email",
      "Course",
      "Batch Slot",
      "Mode",
      "Location",
    ];
    const rows = leads.map((l) => [
      `"${l.date || ""}"`,
      `"${l.name || ""}"`,
      `"${l.phone || ""}"`,
      `"${l.email || ""}"`,
      `"${l.course || ""}"`,
      `"${l.slot || ""}"`,
      `"${l.mode || "Online Only"}"`,
      `"${l.location || ""}"`,
    ]);

    const csvContent =
      "\uFEFF" +
      [headers.join(","), ...rows.map((r) => r.join(","))].join("\r\n");
    const blob = new Blob([csvContent], { type: "text/csv;charset=utf-8;" });
    const url = URL.createObjectURL(blob);
    const link = document.createElement("a");
    link.setAttribute("href", url);
    link.setAttribute(
      "download",
      `Odisha_IT_Learners_Inquiries_${new Date().toISOString().slice(0, 10)}.csv`,
    );
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);

    showToast(
      "Excel Downloaded",
      "📊 Downloaded latest student inquiries spreadsheet successfully!",
      "success",
    );
  });
}

/* ==========================================================================
   7. Admission Inquiry Form & WhatsApp Sync (+91 8658754026 & HR 7846890323)
   ========================================================================== */
function initInquiryForm() {
  const form = document.getElementById("admissionInquiryForm");
  if (!form) return;

  form.addEventListener("submit", (e) => {
    e.preventDefault();

    const name = document.getElementById("inqName")?.value.trim();
    const phone = document.getElementById("inqPhone")?.value.trim();
    const email = document.getElementById("inqEmail")?.value.trim();
    const course = document.getElementById("inqCourse")?.value;
    const timingSlot =
      document.querySelector('input[name="timingSlot"]:checked')?.value ||
      "6:30 AM - 7:30 AM";
    const city = document.getElementById("inqCity")?.value.trim() || "Odisha";

    if (!name || !phone) {
      showToast(
        "Attention",
        "Please provide your name and WhatsApp contact number.",
        "warning",
      );
      return;
    }

    // Lead object to automatically store in Excel/localStorage
    const leadData = {
      date: new Date().toLocaleString("en-IN"),
      name: name,
      phone: phone,
      email: email || "N/A",
      course: course,
      slot: timingSlot,
      mode: "Online Batch Only",
      location: city,
    };

    // Auto-save lead in Excel/CSV system
    saveLeadToExcelStorage(leadData);

    const submitBtn = form.querySelector('button[type="submit"]');
    const originalText = submitBtn.innerHTML;
    submitBtn.disabled = true;
    submitBtn.innerHTML =
      '<span class="spinner-border spinner-border-sm me-2"></span>Saving to Database & Excel...';

    setTimeout(() => {
      submitBtn.disabled = false;
      submitBtn.innerHTML = originalText;
      form.reset();

      const confirmationModalEl = document.getElementById(
        "inquirySuccessModal",
      );
      if (confirmationModalEl) {
        const modal = new bootstrap.Modal(confirmationModalEl);
        document.getElementById("modalStudentName").textContent = name;
        document.getElementById("modalStudentCourse").textContent =
          `${course} (${timingSlot}) - Online Batch`;

        // Prepare pre-filled WhatsApp link for HR Arpita Pani
        const hrWaLink = document.getElementById("modalHrWhatsAppBtn");
        if (hrWaLink) {
          const text = encodeURIComponent(
            `Hello Arpita Ma'am (HR), I am ${name}. I registered for the 26th Oct .NET batch (${timingSlot}). Mobile: ${phone}`,
          );
          hrWaLink.href = `https://wa.me/917846890323?text=${text}`;
        }

        modal.show();
      } else {
        showToast(
          "Lead Saved!",
          `Johar ${name}! Saved to Excel sheet. Our team will contact you.`,
          "success",
        );
      }
    }, 1000);
  });
}

/* ==========================================================================
   8. Syllabus Modal Dynamic Population
   ========================================================================== */
const syllabusData = {
  "dotnet-fullstack": {
    title: ".NET Full Stack Development Course (Batch: 26th October)",
    duration:
      "3 Months (Price: ₹15,000 | Special Offer: ₹12,000) • Online Batch Only",
    prerequisites:
      "Basic Programming / C or C++ / Freshers & Working Professionals",
    modules: [
      "Month 1: C# 13 Core & Advanced OOPs, LINQ, Collections, Generics, Multithreading & Memory Management",
      "Month 1.5: ASP.NET Core 9 Architecture, Dependency Injection, Middleware, RESTful Web APIs, Swagger/OpenAPI",
      "Month 2: Entity Framework Core 9 (Code-First Migrations, Linq-to-Entities) & SQL Server Database Tuning (Stored Procedures, Indexing)",
      "Month 2.5: Angular 18/19 Frontend Specialization: Standalone Components, Directives, Services, RxJS & Reactive Forms",
      "⭐ LAST 1 MONTH: Full Time Working on Real Industry-Standard Enterprise Project (Clean Architecture & CQRS)",
      "⭐ SERVER KNOWLEDGE: Hosting on IIS, Linux Ubuntu Server, Docker Containerization, Reverse Proxy (Nginx) & Production Deployment",
    ],
  },
  "angular-mastery": {
    title: "Angular Mastery Course (Frontend Specialization)",
    duration: "1.5 Month Course (Fee: ₹3,500) • Online Batch Only",
    prerequisites: "Basic HTML, CSS & JavaScript Fundamentals",
    modules: [
      "Modern TypeScript: Interfaces, Generics, Decorators, ES6+ Features",
      "Angular Architecture: Modules, Standalone Components, Data Binding & Directives",
      "Angular Routing: Route Guards, Lazy Loading, Child Routes & Path Parameters",
      "Reactive Forms & Validation: Custom Validators, Dynamic Form Controls",
      "HTTP Client & REST APIs: RxJS Operators, Subjects, Interceptors, Error Handling",
      "Real Project: Enterprise Dashboard with Bootstrap & Live Backend APIs",
    ],
  },
  "dotnet-ai": {
    title: ".NET with Artificial Intelligence (AI) Course",
    duration: "2.5 Months (Fee: ₹14,000) • Online Batch Only",
    prerequisites: "Knowledge of C# & .NET Basics",
    modules: [
      "Introduction to Generative AI, LLMs & OpenAI in the .NET Ecosystem",
      "Microsoft Semantic Kernel: Connecting .NET to GPT-4o, Claude & Local Models",
      "Embeddings & Vector Search: SQL Server Vector Extensions & Qdrant/Pinecone",
      "Retrieval-Augmented Generation (RAG): Building Enterprise Copilots in C#",
      "Function Calling & Plugins: Enabling AI to query SQL databases and trigger C# APIs",
      "Live Project: AI-Powered Customer Support & Document Search Chatbot in .NET",
    ],
  },
  "dotnet-azure": {
    title: ".NET with Azure Cloud & DevOps",
    duration: "2.5 Months (Fee: ₹11,000) • Online Batch Only",
    prerequisites: "ASP.NET Core & Web API knowledge",
    modules: [
      "Azure Cloud Fundamentals: Azure App Services, Azure Functions (Serverless)",
      "Azure SQL Database & Cosmos DB: Setup, High Availability, Connection Strings",
      "Docker Containerization for ASP.NET Core & Angular",
      "Azure DevOps: Git Repos, Build Pipelines (CI), Release Pipelines (CD)",
      "Azure Key Vault, Managed Identities & Secure Application Secrets",
      "Live Deployment: Zero-Downtime Microservice Deployment to Azure Container Apps",
    ],
  },
};

function initSyllabusModal() {
  const modalEl = document.getElementById("syllabusDetailModal");
  if (!modalEl) return;

  modalEl.addEventListener("show.bs.modal", (e) => {
    const triggerBtn = e.relatedTarget;
    const courseKey =
      triggerBtn?.getAttribute("data-course-key") || "dotnet-fullstack";
    const course = syllabusData[courseKey] || syllabusData["dotnet-fullstack"];

    document.getElementById("modalSyllabusTitle").textContent = course.title;
    document.getElementById("modalSyllabusDuration").textContent =
      course.duration;
    document.getElementById("modalSyllabusPrereq").textContent =
      course.prerequisites;

    const moduleList = document.getElementById("modalSyllabusModules");
    moduleList.innerHTML = "";
    course.modules.forEach((mod, idx) => {
      const li = document.createElement("li");
      li.className =
        "list-group-item d-flex align-items-start gap-3 bg-transparent border-0 px-0 py-2";
      li.innerHTML = `
        <span class="badge rounded-pill bg-success-subtle text-success border border-success px-2 py-1">Part ${idx + 1}</span>
        <span class="text-body">${mod}</span>
      `;
      moduleList.appendChild(li);
    });
  });

  const downloadBtn = document.getElementById("downloadSyllabusPdfBtn");
  if (downloadBtn) {
    downloadBtn.addEventListener("click", () => {
      showToast(
        "Downloading",
        "📥 Odisha IT Learners .NET Syllabus PDF is downloading...",
        "info",
      );
      setTimeout(() => {
        showToast(
          "Complete",
          "✅ .NET & Angular Curriculum downloaded. Contact HR Arpita Pani (7846890323) for doubt clearing.",
          "success",
        );
      }, 1500);
    });
  }
}

/* ==========================================================================
   9. Navbar Blur Effect & Back to Top Button
   ========================================================================== */
function initNavbarScroll() {
  const navbar = document.querySelector(".oit-navbar");
  if (!navbar) return;

  window.addEventListener("scroll", () => {
    if (window.scrollY > 40) {
      navbar.classList.add("scrolled");
    } else {
      navbar.classList.remove("scrolled");
    }
  });
}

function initBackToTop() {
  const backToTopBtn = document.getElementById("backToTopBtn");
  if (!backToTopBtn) return;

  window.addEventListener("scroll", () => {
    if (window.scrollY > 450) {
      backToTopBtn.classList.add("visible");
    } else {
      backToTopBtn.classList.remove("visible");
    }
  });

  backToTopBtn.addEventListener("click", () => {
    window.scrollTo({
      top: 0,
      behavior: "smooth",
    });
  });
}

/* ==========================================================================
   10. Floating Toast Notification
   ========================================================================== */
function showToast(title, message, type = "info") {
  let toastContainer = document.querySelector(".oit-toast-container");
  if (!toastContainer) {
    toastContainer = document.createElement("div");
    toastContainer.className = "oit-toast-container";
    document.body.appendChild(toastContainer);
  }

  const bgClass =
    type === "success"
      ? "text-bg-success"
      : type === "warning"
        ? "text-bg-warning"
        : type === "danger"
          ? "text-bg-danger"
          : "text-bg-primary";

  const toastId = "toast_" + Date.now();
  const toastHtml = `
    <div id="${toastId}" class="toast align-items-center ${bgClass} border-0 shadow-lg mb-2" role="alert" aria-live="assertive" aria-atomic="true">
      <div class="d-flex">
        <div class="toast-body">
          <strong>${title}:</strong> ${message}
        </div>
        <button type="button" class="btn-close btn-close-white me-2 m-auto" data-bs-dismiss="toast" aria-label="Close"></button>
      </div>
    </div>
  `;

  toastContainer.insertAdjacentHTML("beforeend", toastHtml);
  const toastElement = document.getElementById(toastId);
  const bsToast = new bootstrap.Toast(toastElement, { delay: 4000 });
  bsToast.show();

  toastElement.addEventListener("hidden.bs.toast", () => {
    toastElement.remove();
  });
}
