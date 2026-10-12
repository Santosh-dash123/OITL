/**
 * ODISHA IT LEARNERS - Admin Portal & Batch Registration Details Logic
 * Protected access with static credentials:
 * Username: odishaitlearners@gmail.com
 * Password: Oitl@123
 */

document.addEventListener('DOMContentLoaded', () => {
  initAdminAuth();
  initPasswordToggle();
});

const STATIC_ADMIN_EMAIL = 'odishaitlearners@gmail.com';
const STATIC_ADMIN_PASS = 'Oitl@123';

// Seed sample registrations if storage is completely empty so Admin has immediate data to preview
function seedInitialLeadsIfEmpty() {
  const existing = JSON.parse(localStorage.getItem('oit_leads_excel') || '[]');
  if (existing.length === 0) {
    const defaultLeads = [
      {
        date: '12/10/2026, 09:30 AM',
        name: 'Omm Prakash Pani',
        phone: '9861234567',
        email: 'omm.pani@gmail.com',
        course: '.NET Full Stack (ASP.NET Core, Web API, SQL Server, Angular)',
        slot: '6:30 AM – 7:30 AM (Morning)',
        mode: 'Online Batch Only',
        location: 'Bhubaneswar'
      },
      {
        date: '12/10/2026, 11:15 AM',
        name: 'Binayak Moharana',
        phone: '7978123456',
        email: 'binayak.m@gmail.com',
        course: 'Angular Mastery Course (1.5 Months - ₹3,500)',
        slot: '8:00 PM – 9:00 PM (Night)',
        mode: 'Online Batch Only',
        location: 'Cuttack'
      },
      {
        date: '12/10/2026, 01:45 PM',
        name: 'Satyajit Rout',
        phone: '9437890123',
        email: 'satyajit.rout@yahoo.com',
        course: '.NET Full Stack (26th Oct Batch - ₹12,000 Offer)',
        slot: '7:30 AM – 8:30 AM (Morning)',
        mode: 'Online Batch Only',
        location: 'Rourkela'
      }
    ];
    localStorage.setItem('oit_leads_excel', JSON.stringify(defaultLeads));
  }
}

function initAdminAuth() {
  const loginSection = document.getElementById('adminLoginSection');
  const dashboardSection = document.getElementById('adminDashboardSection');
  const loginForm = document.getElementById('adminLoginForm');
  const loginAlert = document.getElementById('loginAlertBox');
  const logoutBtn = document.getElementById('adminLogoutBtn');

  // Check if session is already active
  const isLoggedIn = sessionStorage.getItem('oit_admin_logged_in') === 'true';

  if (isLoggedIn) {
    showDashboard();
  } else {
    showLogin();
  }

  // Handle Login Submit
  if (loginForm) {
    loginForm.addEventListener('submit', (e) => {
      e.preventDefault();
      const email = document.getElementById('adminEmail')?.value.trim();
      const password = document.getElementById('adminPassword')?.value;

      if (email.toLowerCase() === STATIC_ADMIN_EMAIL.toLowerCase() && password === STATIC_ADMIN_PASS) {
        sessionStorage.setItem('oit_admin_logged_in', 'true');
        loginAlert.classList.add('d-none');
        showDashboard();
        showToast('Access Granted', 'Welcome to Odisha IT Learners Batch Registration Portal.', 'success');
      } else {
        loginAlert.classList.remove('d-none');
      }
    });
  }

  // Handle Logout
  if (logoutBtn) {
    logoutBtn.addEventListener('click', () => {
      sessionStorage.removeItem('oit_admin_logged_in');
      showLogin();
      showToast('Logged Out', 'You have been signed out from the admin portal.', 'info');
    });
  }

  function showDashboard() {
    loginSection.classList.add('d-none');
    dashboardSection.classList.remove('d-none');
    logoutBtn.classList.remove('d-none');
    seedInitialLeadsIfEmpty();
    renderBatchRegistrations();
  }

  function showLogin() {
    loginSection.classList.remove('d-none');
    dashboardSection.classList.add('d-none');
    logoutBtn.classList.add('d-none');
  }
}

function initPasswordToggle() {
  const toggleBtn = document.getElementById('togglePasswordBtn');
  const passInput = document.getElementById('adminPassword');
  if (toggleBtn && passInput) {
    toggleBtn.addEventListener('click', () => {
      const type = passInput.getAttribute('type') === 'password' ? 'text' : 'password';
      passInput.setAttribute('type', type);
      toggleBtn.innerHTML = type === 'password' ? '<i class="bi bi-eye"></i>' : '<i class="bi bi-eye-slash"></i>';
    });
  }
}

/* ==========================================================================
   BATCH REGISTRATIONS TABLE RENDERING, SEARCH & EXPORT
   ========================================================================== */
function renderBatchRegistrations() {
  const tbody = document.getElementById('leadsTableBody');
  const emptyMsg = document.getElementById('emptyLeadsMessage');
  const searchInput = document.getElementById('searchLeadInput');
  const filterCourse = document.getElementById('filterCourseSelect');
  const filterSlot = document.getElementById('filterSlotSelect');
  const exportBtn = document.getElementById('adminExportCsvBtn');
  const refreshBtn = document.getElementById('refreshLeadsBtn');
  const clearBtn = document.getElementById('clearLeadsBtn');

  // Stats Counters
  const totalCountEl = document.getElementById('statTotalCount');
  const dotnetCountEl = document.getElementById('statDotnetCount');
  const angularCountEl = document.getElementById('statAngularCount');
  const todayCountEl = document.getElementById('statTodayCount');
  const counterBadge = document.getElementById('leadCounterBadge');

  function getLeads() {
    return JSON.parse(localStorage.getItem('oit_leads_excel') || '[]');
  }

  function updateView() {
    const allLeads = getLeads();
    const query = (searchInput?.value || '').toLowerCase().trim();
    const courseFilter = filterCourse?.value || 'all';
    const slotFilter = filterSlot?.value || 'all';

    // Calculate overall stats
    let total = allLeads.length;
    let dotnetCount = 0;
    let angularCount = 0;

    allLeads.forEach(l => {
      const c = (l.course || '').toLowerCase();
      if (c.includes('.net')) dotnetCount++;
      if (c.includes('angular')) angularCount++;
    });

    if (totalCountEl) totalCountEl.textContent = total;
    if (dotnetCountEl) dotnetCountEl.textContent = dotnetCount;
    if (angularCountEl) angularCountEl.textContent = angularCount;
    if (todayCountEl) todayCountEl.textContent = total;
    if (counterBadge) counterBadge.textContent = `${total} Total Leads`;

    // Filter leads
    const filtered = allLeads.filter(l => {
      const matchesSearch = !query || 
        (l.name || '').toLowerCase().includes(query) ||
        (l.phone || '').toLowerCase().includes(query) ||
        (l.location || '').toLowerCase().includes(query);

      const matchesCourse = courseFilter === 'all' || 
        (l.course || '').toLowerCase().includes(courseFilter.toLowerCase());

      const matchesSlot = slotFilter === 'all' || 
        (l.slot || '').toLowerCase().includes(slotFilter.toLowerCase());

      return matchesSearch && matchesCourse && matchesSlot;
    });

    // Populate Table
    tbody.innerHTML = '';

    if (filtered.length === 0) {
      emptyMsg.classList.remove('d-none');
    } else {
      emptyMsg.classList.add('d-none');

      filtered.forEach((lead, idx) => {
        const tr = document.createElement('tr');
        const cleanPhone = (lead.phone || '').replace(/\D/g, '');
        const waMsg = encodeURIComponent(`Hello ${lead.name || 'Learner'}, regarding your registration for Odisha IT Learners .NET Full Stack batch starting 26th October:`);

        tr.innerHTML = `
          <td class="fw-bold text-muted">${idx + 1}</td>
          <td><span class="small text-secondary">${lead.date || 'Recent'}</span></td>
          <td>
            <div class="fw-bold">${escapeHtml(lead.name || 'N/A')}</div>
            <div class="small text-muted">${escapeHtml(lead.email || '')}</div>
          </td>
          <td>
            <span class="badge bg-light text-dark border font-monospace px-2 py-1 fs-6">${escapeHtml(lead.phone || '')}</span>
          </td>
          <td>
            <span class="badge bg-primary-subtle text-primary border border-primary px-2 py-1 small">${escapeHtml(lead.course || '.NET Full Stack')}</span>
          </td>
          <td>
            <span class="badge bg-warning-subtle text-dark border px-2 py-1 small">${escapeHtml(lead.slot || '6:30 AM')}</span>
          </td>
          <td><span class="small text-secondary">${escapeHtml(lead.location || 'Odisha')}</span></td>
          <td class="text-end">
            <div class="btn-group btn-group-sm">
              <a href="tel:${cleanPhone}" class="btn btn-outline-primary" title="Call Student">
                <i class="bi bi-telephone-fill"></i>
              </a>
              <a href="https://wa.me/91${cleanPhone}?text=${waMsg}" target="_blank" class="btn btn-success" title="WhatsApp Student">
                <i class="bi bi-whatsapp"></i>
              </a>
              <button class="btn btn-outline-danger delete-lead-btn" data-index="${idx}" title="Delete Record">
                <i class="bi bi-trash"></i>
              </button>
            </div>
          </td>
        `;
        tbody.appendChild(tr);
      });

      // Bind delete actions
      document.querySelectorAll('.delete-lead-btn').forEach(btn => {
        btn.addEventListener('click', (e) => {
          const index = parseInt(btn.getAttribute('data-index'), 10);
          if (confirm('Are you sure you want to delete this student registration?')) {
            const current = getLeads();
            current.splice(index, 1);
            localStorage.setItem('oit_leads_excel', JSON.stringify(current));
            updateView();
            showToast('Deleted', 'Student record removed from registrations.', 'info');
          }
        });
      });
    }
  }

  // Filter Event Listeners
  searchInput?.addEventListener('input', updateView);
  filterCourse?.addEventListener('change', updateView);
  filterSlot?.addEventListener('change', updateView);
  refreshBtn?.addEventListener('click', () => {
    updateView();
    showToast('Refreshed', 'Registrations refreshed with latest records.', 'success');
  });

  clearBtn?.addEventListener('click', () => {
    if (confirm('Clear all local registration records? (Warning: This cannot be undone)')) {
      localStorage.setItem('oit_leads_excel', JSON.stringify([]));
      updateView();
      showToast('Cleared', 'All registration records cleared.', 'warning');
    }
  });

  // Admin Export to Excel CSV
  if (exportBtn) {
    exportBtn.addEventListener('click', () => {
      const leads = getLeads();
      if (!leads.length) {
        showToast('Empty', 'No registration leads available to export.', 'warning');
        return;
      }

      const headers = ['Registration Date', 'Student Name', 'Mobile / WhatsApp', 'Email ID', 'Course Program', 'Batch Timing Slot', 'Mode', 'Location'];
      const rows = leads.map(l => [
        `"${l.date || ''}"`,
        `"${l.name || ''}"`,
        `"${l.phone || ''}"`,
        `"${l.email || ''}"`,
        `"${l.course || ''}"`,
        `"${l.slot || ''}"`,
        `"${l.mode || 'Online Batch Only'}"`,
        `"${l.location || ''}"`
      ]);

      const csvContent = '\uFEFF' + [headers.join(','), ...rows.map(r => r.join(','))].join('\r\n');
      const blob = new Blob([csvContent], { type: 'text/csv;charset=utf-8;' });
      const url = URL.createObjectURL(blob);
      const link = document.createElement('a');
      link.setAttribute('href', url);
      link.setAttribute('download', `Odisha_IT_Learners_Batch_Registrations_${new Date().toISOString().slice(0, 10)}.csv`);
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);

      showToast('Excel Exported', '📊 Downloaded Batch Registrations Excel Spreadsheet successfully!', 'success');
    });
  }

  updateView();
}

function escapeHtml(text) {
  const map = { '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&#039;' };
  return String(text).replace(/[&<>"']/g, m => map[m]);
}
