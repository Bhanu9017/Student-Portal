/* ═══════════════════════════════════════════════════════════════
   EDUPORTAL — app.js
   All data, utility functions, and application logic
   Requires: index.html  +  style.css
═══════════════════════════════════════════════════════════════ */

"use strict";

/* ═══════════════════════════════════════════════════════════════
   SECTION 1 — DATABASE  (sample data stored as JS objects)
═══════════════════════════════════════════════════════════════ */

/**
 * generateAttendance()
 * Builds a daily attendance record for a given year/month.
 * Weekends are marked as 'saturday' / 'sunday'.
 * Weekdays get 'present' (~82% chance) or 'absent'.
 */
function generateAttendance(year, month) {
  const daysInMonth = new Date(year, month + 1, 0).getDate();
  const record = {};
  for (let day = 1; day <= daysInMonth; day++) {
    const dayOfWeek = new Date(year, month, day).getDay();
    if (dayOfWeek === 0) { record[day] = 'sunday';    continue; }
    if (dayOfWeek === 6) { record[day] = 'saturday';  continue; }
    record[day] = Math.random() > 0.18 ? 'present' : 'absent';
  }
  return record;
}

/** Central data store — all students, teachers and notices */
const DB = {

  students: [
    {
      roll: "STU001", name: "Arjun Sharma", year: 2, branch: "Computer Science",
      parentName: "Rajesh Sharma", parentPhone: "98765-43210", parentEmail: "rajesh@email.com",
      marks: {
        "Data Structures":   { mid: 42, end: 78, total: 120, max: 150 },
        "Operating Systems": { mid: 38, end: 70, total: 108, max: 150 },
        "DBMS":              { mid: 45, end: 82, total: 127, max: 150 },
        "Computer Networks": { mid: 40, end: 74, total: 114, max: 150 },
        "Mathematics-III":   { mid: 35, end: 68, total: 103, max: 150 },
      },
      attendance: {
        daily:   generateAttendance(2024, 11),
        monthly: { Jan:92, Feb:88, Mar:76, Apr:95, May:85, Jun:90, Jul:78, Aug:82, Sep:89, Oct:93, Nov:87, Dec:75 }
      }
    },
    {
      roll: "STU002", name: "Priya Kapoor", year: 3, branch: "Electronics",
      parentName: "Sunita Kapoor", parentPhone: "91234-56789", parentEmail: "sunita@email.com",
      marks: {
        "Signal Processing":   { mid: 48, end: 85, total: 133, max: 150 },
        "VLSI Design":         { mid: 44, end: 80, total: 124, max: 150 },
        "Analog Circuits":     { mid: 50, end: 88, total: 138, max: 150 },
        "Digital Electronics": { mid: 46, end: 83, total: 129, max: 150 },
        "Electromagnetics":    { mid: 42, end: 79, total: 121, max: 150 },
      },
      attendance: {
        daily:   generateAttendance(2024, 11),
        monthly: { Jan:98, Feb:95, Mar:90, Apr:97, May:92, Jun:96, Jul:88, Aug:94, Sep:98, Oct:96, Nov:91, Dec:89 }
      }
    },
    {
      roll: "STU003", name: "Vikram Singh", year: 1, branch: "Mechanical",
      parentName: "Harjeet Singh", parentPhone: "87654-32109", parentEmail: "harjeet@email.com",
      marks: {
        "Engineering Maths":   { mid: 30, end: 55, total: 85,  max: 150 },
        "Physics":             { mid: 28, end: 50, total: 78,  max: 150 },
        "Chemistry":           { mid: 32, end: 60, total: 92,  max: 150 },
        "Engineering Drawing": { mid: 40, end: 72, total: 112, max: 150 },
        "Workshop Practice":   { mid: 45, end: 80, total: 125, max: 150 },
      },
      attendance: {
        daily:   generateAttendance(2024, 11),
        monthly: { Jan:65, Feb:70, Mar:60, Apr:72, May:68, Jun:75, Jul:62, Aug:69, Sep:73, Oct:71, Nov:65, Dec:60 }
      }
    },
    {
      roll: "STU004", name: "Neha Patel", year: 4, branch: "Civil",
      parentName: "Ramesh Patel", parentPhone: "96543-21087", parentEmail: "ramesh@email.com",
      marks: {
        "Structural Analysis": { mid: 46, end: 84, total: 130, max: 150 },
        "Geotechnics":         { mid: 43, end: 77, total: 120, max: 150 },
        "Fluid Mechanics":     { mid: 48, end: 86, total: 134, max: 150 },
        "Survey":              { mid: 47, end: 82, total: 129, max: 150 },
        "Transportation Engg": { mid: 44, end: 79, total: 123, max: 150 },
      },
      attendance: {
        daily:   generateAttendance(2024, 11),
        monthly: { Jan:85, Feb:82, Mar:88, Apr:90, May:83, Jun:87, Jul:84, Aug:89, Sep:91, Oct:88, Nov:86, Dec:82 }
      }
    },
    {
      roll: "STU005", name: "Rahul Gupta", year: 2, branch: "Computer Science",
      parentName: "Meena Gupta", parentPhone: "77654-32100", parentEmail: "meena@email.com",
      marks: {
        "Data Structures":   { mid: 36, end: 65, total: 101, max: 150 },
        "Operating Systems": { mid: 32, end: 60, total: 92,  max: 150 },
        "DBMS":              { mid: 38, end: 68, total: 106, max: 150 },
        "Computer Networks": { mid: 34, end: 62, total: 96,  max: 150 },
        "Mathematics-III":   { mid: 29, end: 55, total: 84,  max: 150 },
      },
      attendance: {
        daily:   generateAttendance(2024, 11),
        monthly: { Jan:78, Feb:74, Mar:80, Apr:76, May:82, Jun:79, Jul:75, Aug:77, Sep:81, Oct:83, Nov:79, Dec:74 }
      }
    }
  ],

  teachers: [
    { id:"TCH01", name:"Dr. Anita Bose",   subject:"Data Structures & Algorithms", dept:"CSE",   phone:"99887-76655", email:"anita.bose@college.edu",  password:"teach123" },
    { id:"TCH02", name:"Prof. R.K. Verma", subject:"Signal Processing",            dept:"ECE",   phone:"99776-65544", email:"rk.verma@college.edu",    password:"teach123" },
    { id:"TCH03", name:"Dr. Sanjay Mehta", subject:"Fluid Mechanics",              dept:"Civil", phone:"99665-54433", email:"sanjay.mehta@college.edu",password:"teach123" },
    { id:"TCH04", name:"Dr. Kavita Joshi", subject:"Engineering Mathematics",      dept:"Maths", phone:"99554-43322", email:"kavita.joshi@college.edu",password:"teach123" },
  ],

  notices: [
    { id:1, type:"exam",    title:"Mid-Term Examinations Schedule",           date:"2024-11-25", body:"Mid-term exams for all branches will commence from December 2nd. Download your hall tickets from the examination portal. Students must carry valid ID." },
    { id:2, type:"event",   title:"Annual Tech Fest — INNOVATE 2024",         date:"2024-11-20", body:"Our annual tech fest is back! Register your teams for hackathons, robotics, coding contests, and more. Last date for registration: November 28." },
    { id:3, type:"holiday", title:"Diwali Break Announcement",                date:"2024-11-05", body:"The college will remain closed from November 1–3 on account of Diwali. Regular classes resume on November 4th." },
    { id:4, type:"general", title:"Library Extended Hours",                   date:"2024-11-18", body:"The Central Library will be open until 10:00 PM on weekdays till December 15 for exam preparation." },
    { id:5, type:"exam",    title:"Practical Examinations – Batch Allotment", date:"2024-11-15", body:"Batch allotments for practical exams have been uploaded on the notice board. Students must report 15 minutes early." },
    { id:6, type:"event",   title:"Sports Day — Annual Athletics Meet",       date:"2024-11-10", body:"Annual Sports Day will be held on November 30. All students are encouraged to participate. Entries close on November 22." },
  ]
};


/* ═══════════════════════════════════════════════════════════════
   SECTION 2 — UTILITY FUNCTIONS
═══════════════════════════════════════════════════════════════ */

/** Shorthand for document.getElementById */
const $ = id => document.getElementById(id);

/**
 * el(tag, className, innerHTML)
 * Quick element factory.
 */
function el(tag, cls, html) {
  const node = document.createElement(tag);
  if (cls)             node.className = cls;
  if (html !== undefined) node.innerHTML = html;
  return node;
}

/**
 * getGrade(percentage)
 * Returns letter grade and CSS class based on percentage.
 */
function getGrade(pct) {
  if (pct >= 85) return { g: 'A+', cls: 'A' };
  if (pct >= 75) return { g: 'A',  cls: 'A' };
  if (pct >= 65) return { g: 'B',  cls: 'B' };
  if (pct >= 55) return { g: 'C',  cls: 'C' };
  if (pct >= 45) return { g: 'D',  cls: 'D' };
  return { g: 'F', cls: 'F' };
}

/**
 * avgAttendance(monthlyObj)
 * Calculates the average of all monthly attendance percentages.
 */
function avgAttendance(monthly) {
  const values = Object.values(monthly);
  return Math.round(values.reduce((sum, v) => sum + v, 0) / values.length);
}

/**
 * calcOverallPct(marksObj)
 * Calculates aggregate percentage across all subjects.
 */
function calcOverallPct(marks) {
  let total = 0, max = 0;
  Object.values(marks).forEach(m => { total += m.total; max += m.max; });
  return Math.round((total / max) * 100);
}

/**
 * attClass(pct)
 * Returns CSS class name for a progress bar based on attendance %.
 */
function attClass(pct) {
  if (pct >= 85) return 'good';
  if (pct >= 75) return 'average';
  return 'low';
}

/**
 * attBadge(pct)
 * Returns an HTML badge element string for attendance status.
 */
function attBadge(pct) {
  if (pct >= 85) return '<span class="badge ok">Good</span>';
  if (pct >= 75) return '<span class="badge warn">Average</span>';
  return '<span class="badge bad">Low</span>';
}

/**
 * barChart(container, labels, data, color)
 * Draws a simple SVG bar chart inside the given DOM element.
 * No external library required — pure DOM + SVG.
 */
function barChart(container, labels, data, color = '#6c63ff') {
  const max = Math.max(...data);
  const w   = container.clientWidth || 500;
  const h   = 160;
  const bw  = Math.floor((w - 40) / data.length) - 4;

  let svg = `<svg viewBox="0 0 ${w} ${h}" xmlns="http://www.w3.org/2000/svg" style="width:100%;height:${h}px">`;

  // Horizontal grid lines + Y-axis labels
  for (let i = 0; i <= 4; i++) {
    const y = 10 + (h - 40) * i / 4;
    svg += `<line x1="30" y1="${y}" x2="${w - 10}" y2="${y}" stroke="#2a2a3a" stroke-width="1"/>`;
    svg += `<text x="26" y="${y + 4}" fill="#7070a0" font-size="8" text-anchor="end">${Math.round(max * (4 - i) / 4)}%</text>`;
  }

  // Bars + labels
  data.forEach((val, i) => {
    const barH = ((h - 50) * val / max);
    const x    = 30 + i * (bw + 4);
    const y    = h - 30 - barH;
    const opacity = 0.5 + 0.5 * (val / max);

    svg += `<rect x="${x}" y="${y}" width="${bw}" height="${barH}" fill="${color}" opacity="${opacity}" rx="1"/>`;
    svg += `<text x="${x + bw / 2}" y="${h - 14}" fill="#7070a0" font-size="7" text-anchor="middle">${labels[i]}</text>`;
    svg += `<text x="${x + bw / 2}" y="${y - 4}" fill="#e8e8f0" font-size="8" text-anchor="middle" font-weight="bold">${val}</text>`;
  });

  svg += '</svg>';
  container.innerHTML = svg;
}


/* ═══════════════════════════════════════════════════════════════
   SECTION 3 — APPLICATION CONTROLLER
   Handles login, navigation, and all page rendering
═══════════════════════════════════════════════════════════════ */

const App = {

  role: 'student',   // Current selected login role
  user: null,        // Logged-in user object

  /* ─── LOGIN ─────────────────────────────────── */

  /** Switch the active role tab and re-render login fields */
  setRole(r) {
    this.role = r;
    document.querySelectorAll('.role-tab').forEach(tab =>
      tab.classList.toggle('active', tab.dataset.role === r)
    );
    this.renderLoginFields();
  },

  /** Inject appropriate input fields and demo hints for the selected role */
  renderLoginFields() {
    const fieldsEl  = $('login-fields');
    const hintEl    = $('demo-hint');

    if (this.role === 'student') {
      fieldsEl.innerHTML = `
        <div class="form-group">
          <label>Roll Number</label>
          <input id="f-roll" placeholder="e.g. STU001" />
        </div>
        <div class="form-group">
          <label>Password</label>
          <input id="f-pass" type="password" placeholder="••••••••" value="student123" />
        </div>`;
      hintEl.innerHTML = `<strong>Demo:</strong> Roll: STU001 to STU005 &nbsp;·&nbsp; Pass: student123`;

    } else if (this.role === 'parent') {
      fieldsEl.innerHTML = `
        <div class="form-group">
          <label>Student Roll Number</label>
          <input id="f-roll" placeholder="e.g. STU001" />
        </div>
        <div class="form-group">
          <label>Parent Password</label>
          <input id="f-pass" type="password" placeholder="••••••••" value="parent123" />
        </div>`;
      hintEl.innerHTML = `<strong>Demo:</strong> Roll: STU001 to STU005 &nbsp;·&nbsp; Pass: parent123`;

    } else {
      fieldsEl.innerHTML = `
        <div class="form-group">
          <label>Teacher ID</label>
          <input id="f-roll" placeholder="e.g. TCH01" />
        </div>
        <div class="form-group">
          <label>Password</label>
          <input id="f-pass" type="password" placeholder="••••••••" value="teach123" />
        </div>`;
      hintEl.innerHTML = `<strong>Demo:</strong> ID: TCH01 to TCH04 &nbsp;·&nbsp; Pass: teach123`;
    }
  },

  /** Validate credentials and launch the portal */
  login() {
    const roll    = ($('f-roll')?.value || '').trim().toUpperCase();
    const pass    = ($('f-pass')?.value || '').trim();
    const errEl   = $('login-error');
    errEl.style.display = 'none';

    if (this.role === 'student') {
      if (pass !== 'student123') { this.showError('Incorrect password.'); return; }
      const stu = DB.students.find(s => s.roll === roll);
      if (!stu) { this.showError(`No student found with roll number "${roll}".`); return; }
      this.user = { ...stu, role: 'student' };

    } else if (this.role === 'parent') {
      if (pass !== 'parent123') { this.showError('Incorrect password.'); return; }
      const stu = DB.students.find(s => s.roll === roll);
      if (!stu) { this.showError(`No student found with roll number "${roll}".`); return; }
      this.user = { ...stu, role: 'parent', loginName: stu.parentName };

    } else {
      const tch = DB.teachers.find(t => t.id === roll && t.password === pass);
      if (!tch) { this.showError('Invalid Teacher ID or password.'); return; }
      this.user = { ...tch, role: 'teacher' };
    }

    this.launchApp();
  },

  /** Display an error message in the login box */
  showError(msg) {
    const e = $('login-error');
    e.textContent = '⚠ ' + msg;
    e.style.display = 'block';
  },

  /** Hide login screen, show app shell, populate topbar and sidebar */
  launchApp() {
    $('login-screen').style.display = 'none';
    const appEl = $('app');
    appEl.style.display = 'flex';

    const u = this.user;
    $('topbar-name').textContent = u.loginName || u.name;

    const badge = $('topbar-role-badge');
    badge.textContent = u.role.charAt(0).toUpperCase() + u.role.slice(1);
    badge.className   = `role-badge ${u.role}`;

    this.buildNav();

    // Navigate to the default page for this role
    const defaultPage = {
      student: 'dashboard',
      parent:  'p-overview',
      teacher: 't-students'
    }[this.role];

    this.navigate(defaultPage);
  },

  /** Log out — reset state and return to login screen */
  logout() {
    this.user = null;
    $('app').style.display = 'none';
    $('login-screen').style.display = 'flex';
    $('login-error').style.display  = 'none';
    this.renderLoginFields();
  },


  /* ─── NAVIGATION ─────────────────────────────── */

  /** Build the sidebar navigation links for the current role */
  buildNav() {
    const navEl = $('sidebar');
    navEl.innerHTML = '';

    this.getNavPages().forEach(group => {
      const section = el('div', 'nav-section');
      section.innerHTML = `<div class="nav-section-label">${group.label}</div>`;

      group.items.forEach(item => {
        const link = el('div', 'nav-item', `<span class="nav-icon">${item.icon}</span>${item.title}`);
        link.dataset.page = item.id;
        link.onclick = () => this.navigate(item.id);
        section.appendChild(link);
      });

      navEl.appendChild(section);
    });
  },

  /** Returns the nav page config for the current role */
  getNavPages() {
    if (this.role === 'student') {
      return [
        { label: 'My Portal', items: [
          { id: 'dashboard',  icon: '⬛', title: 'Dashboard' },
          { id: 'marks',      icon: '📊', title: 'My Marks' },
          { id: 'attendance', icon: '📅', title: 'Attendance' },
        ]},
        { label: 'Campus', items: [
          { id: 'notices', icon: '📢', title: 'Notices' },
          { id: 'news',    icon: '🎯', title: 'News & Events' },
        ]}
      ];
    }

    if (this.role === 'parent') {
      return [
        { label: "Child's Info", items: [
          { id: 'p-overview',   icon: '👁',    title: 'Overview' },
          { id: 'p-marks',      icon: '📊',   title: 'Marks' },
          { id: 'p-attendance', icon: '📅',   title: 'Attendance' },
          { id: 'p-teachers',   icon: '👨‍🏫', title: 'Teacher Contacts' },
        ]}
      ];
    }

    return [
      { label: 'Teacher Panel', items: [
        { id: 't-students',    icon: '👥',  title: 'Student List' },
        { id: 't-performance', icon: '📈', title: 'Performance' },
        { id: 't-parents',     icon: '📞', title: 'Parent Contacts' },
        { id: 't-notices',     icon: '📢', title: 'Add Notice' },
      ]}
    ];
  },

  /** Switch to a page by ID — updates nav highlight and renders content */
  navigate(pageId) {
    // Update active state in sidebar
    document.querySelectorAll('.nav-item').forEach(n =>
      n.classList.toggle('active', n.dataset.page === pageId)
    );

    // Replace main content with a fresh page div
    const mc = $('main-content');
    mc.innerHTML = `<div class="page active" id="page-${pageId}"></div>`;

    const pageEl = $(`page-${pageId}`);
    this.renderPage(pageId, pageEl);
  },

  /** Dispatch rendering to the correct method based on page ID */
  renderPage(id, container) {
    const renderMap = {
      'dashboard':      () => this.renderDashboard(container),
      'marks':          () => this.renderMarks(container, this.user),
      'attendance':     () => this.renderAttendance(container, this.user),
      'notices':        () => this.renderNotices(container),
      'news':           () => this.renderNews(container),
      'p-overview':     () => this.renderParentOverview(container),
      'p-marks':        () => this.renderMarks(container, this.user),
      'p-attendance':   () => this.renderAttendance(container, this.user),
      'p-teachers':     () => this.renderTeacherContacts(container),
      't-students':     () => this.renderTeacherStudents(container),
      't-performance':  () => this.renderTeacherPerformance(container),
      't-parents':      () => this.renderParentContacts(container),
      't-notices':      () => this.renderAddNotice(container),
    };

    const fn = renderMap[id];
    if (fn) fn();
    else container.innerHTML = '<div class="empty-state">Page not found</div>';
  },


  /* ═══════════════════════════════════════════════════════════════
     SECTION 4 — PAGE RENDERERS
  ═══════════════════════════════════════════════════════════════ */

  /* ─── STUDENT: DASHBOARD ──────────────────────── */
  renderDashboard(c) {
    const u          = this.user;
    const avgAtt     = avgAttendance(u.attendance.monthly);
    const overallPct = calcOverallPct(u.marks);
    const { g }      = getGrade(overallPct);
    const subCount   = Object.keys(u.marks).length;

    c.innerHTML = `
      <div class="page-header">
        <h1>Dashboard</h1>
        <p>Welcome back, ${u.name} — ${u.branch}, Year ${u.year}</p>
      </div>

      <div class="welcome-banner">
        <h2>Hello, ${u.name.split(' ')[0]}! 👋</h2>
        <p>Roll No: <strong>${u.roll}</strong> &nbsp;·&nbsp; Branch: <strong>${u.branch}</strong> &nbsp;·&nbsp; Year <strong>${u.year}</strong></p>
      </div>

      <div class="stats-grid">
        <div class="stat-card purple">
          <div class="stat-label">Overall Score</div>
          <div class="stat-value">${overallPct}%</div>
          <div class="stat-sub">Grade: <strong>${g}</strong></div>
        </div>
        <div class="stat-card ${avgAtt >= 85 ? 'green' : avgAtt >= 75 ? 'gold' : 'red'}">
          <div class="stat-label">Attendance</div>
          <div class="stat-value">${avgAtt}%</div>
          <div class="stat-sub">${avgAtt >= 85 ? '✔ Good standing' : avgAtt >= 75 ? '⚠ Borderline' : '✕ Below minimum'}</div>
        </div>
        <div class="stat-card purple">
          <div class="stat-label">Subjects</div>
          <div class="stat-value">${subCount}</div>
          <div class="stat-sub">This semester</div>
        </div>
        <div class="stat-card gold">
          <div class="stat-label">Notices</div>
          <div class="stat-value">${DB.notices.length}</div>
          <div class="stat-sub">Active announcements</div>
        </div>
      </div>

      <div style="display:grid;grid-template-columns:1fr 1fr;gap:1.5rem" id="dash-grid"></div>
    `;

    const grid = c.querySelector('#dash-grid');

    // Quick marks summary table
    let marksRows = '';
    Object.entries(u.marks).forEach(([subj, m]) => {
      const pct      = Math.round(m.total / m.max * 100);
      const { g, cls } = getGrade(pct);
      marksRows += `<tr>
        <td>${subj}</td>
        <td>${m.total}/${m.max}</td>
        <td><span class="grade ${cls}">${g}</span></td>
      </tr>`;
    });
    const marksCard = el('div', 'section-card');
    marksCard.innerHTML = `
      <div class="section-card-header"><h3>📊 Marks Summary</h3></div>
      <div class="section-card-body">
        <table>
          <thead><tr><th>Subject</th><th>Score</th><th>Grade</th></tr></thead>
          <tbody>${marksRows}</tbody>
        </table>
      </div>`;
    grid.appendChild(marksCard);

    // Recent notices preview
    let noticeHtml = '';
    DB.notices.slice(0, 3).forEach(n => {
      noticeHtml += `<div class="notice-item ${n.type}">
        <span class="notice-tag ${n.type}">${n.type}</span>
        <div class="notice-title">${n.title}</div>
        <div class="notice-date">${n.date}</div>
      </div>`;
    });
    const noticeCard = el('div', 'section-card');
    noticeCard.innerHTML = `
      <div class="section-card-header"><h3>📢 Recent Notices</h3></div>
      <div class="section-card-body">${noticeHtml}</div>`;
    grid.appendChild(noticeCard);
  },


  /* ─── MARKS ───────────────────────────────────── */
  renderMarks(c, stu) {
    const u          = stu || this.user;
    const overallPct = calcOverallPct(u.marks);
    const allPcts    = Object.values(u.marks).map(m => Math.round(m.total / m.max * 100));

    let rows = '';
    Object.entries(u.marks).forEach(([subj, m]) => {
      const pct        = Math.round(m.total / m.max * 100);
      const { g, cls } = getGrade(pct);
      rows += `<tr>
        <td>${subj}</td>
        <td>${m.mid}</td>
        <td>${m.end}</td>
        <td><strong>${m.total}</strong>/${m.max}</td>
        <td>${pct}%</td>
        <td><span class="grade ${cls}">${g}</span></td>
        <td>
          <div class="progress-bar">
            <div class="progress-fill ${attClass(pct)}" style="width:${pct}%"></div>
          </div>
        </td>
      </tr>`;
    });

    c.innerHTML = `
      <div class="page-header"><h1>Marks Report</h1><p>${u.name} — ${u.roll}</p></div>

      <div class="stats-grid">
        <div class="stat-card purple">
          <div class="stat-label">Overall</div>
          <div class="stat-value">${overallPct}%</div>
          <div class="stat-sub">Grade: ${getGrade(overallPct).g}</div>
        </div>
        <div class="stat-card green">
          <div class="stat-label">Highest</div>
          <div class="stat-value">${Math.max(...allPcts)}%</div>
        </div>
        <div class="stat-card red">
          <div class="stat-label">Lowest</div>
          <div class="stat-value">${Math.min(...allPcts)}%</div>
        </div>
      </div>

      <div class="section-card">
        <div class="section-card-header"><h3>Subject-wise Marks</h3></div>
        <div class="section-card-body" style="overflow-x:auto">
          <table>
            <thead>
              <tr>
                <th>Subject</th><th>Mid-Term</th><th>End-Term</th>
                <th>Total</th><th>Percent</th><th>Grade</th>
                <th style="min-width:100px">Performance</th>
              </tr>
            </thead>
            <tbody>${rows}</tbody>
          </table>
        </div>
      </div>

      <div class="section-card">
        <div class="section-card-header"><h3>Performance Chart</h3></div>
        <div class="section-card-body">
          <div class="chart-wrap" id="marks-chart"></div>
        </div>
      </div>
    `;

    // Draw SVG bar chart after DOM has painted
    setTimeout(() => {
      const chartEl = c.querySelector('#marks-chart');
      const labels  = Object.keys(u.marks).map(s => s.split(' ')[0]);
      const data    = Object.values(u.marks).map(m => Math.round(m.total / m.max * 100));
      barChart(chartEl, labels, data, '#6c63ff');
    }, 50);
  },


  /* ─── ATTENDANCE ──────────────────────────────── */
  renderAttendance(c, stu) {
    const u   = stu || this.user;
    const avg = avgAttendance(u.attendance.monthly);

    c.innerHTML = `
      <div class="page-header"><h1>Attendance</h1><p>${u.name} — ${u.roll}</p></div>

      <div class="stats-grid">
        <div class="stat-card ${avg >= 85 ? 'green' : avg >= 75 ? 'gold' : 'red'}">
          <div class="stat-label">Yearly Average</div>
          <div class="stat-value">${avg}%</div>
          <div class="stat-sub">${attBadge(avg)}</div>
        </div>
      </div>

      <div class="att-toggle">
        <button class="att-btn active" id="att-daily"   onclick="App.showAtt('daily',   this)">Daily</button>
        <button class="att-btn"        id="att-monthly" onclick="App.showAtt('monthly', this)">Monthly</button>
        <button class="att-btn"        id="att-yearly"  onclick="App.showAtt('yearly',  this)">Yearly Chart</button>
      </div>

      <div id="att-content"></div>
    `;

    // Store reference so showAtt() can access the right student
    this._currentAttStu = u;
    this.showAtt('daily', c.querySelector('#att-daily'));
  },

  /**
   * showAtt(type, btn)
   * Switches the attendance view between daily / monthly / yearly.
   */
  showAtt(type, btn) {
    // Toggle active button
    document.querySelectorAll('.att-btn').forEach(b => b.classList.remove('active'));
    btn.classList.add('active');

    const u    = this._currentAttStu || this.user;
    const cont = $('att-content');
    if (!cont) return;

    /* ── DAILY VIEW — mini calendar ── */
    if (type === 'daily') {
      const daily = u.attendance.daily;
      const days  = Object.keys(daily);
      const dow   = ['Su', 'Mo', 'Tu', 'We', 'Th', 'Fr', 'Sa'];

      // Day-of-week headers
      let calHtml = dow.map(d => `<div class="cal-day header">${d}</div>`).join('');

      // Empty cells before the 1st
      const firstDow = new Date(2024, 11, 1).getDay();
      for (let i = 0; i < firstDow; i++) calHtml += `<div class="cal-day empty"></div>`;

      // Day cells
      days.forEach(d => {
        const status = daily[d];
        const cls    = status === 'present'  ? 'present'
                     : status === 'absent'   ? 'absent'
                     : (status === 'saturday' || status === 'sunday') ? 'holiday'
                     : 'future';
        calHtml += `<div class="cal-day ${cls}" title="${status}">${d}</div>`;
      });

      const present = Object.values(daily).filter(v => v === 'present').length;
      const absent  = Object.values(daily).filter(v => v === 'absent').length;
      const total   = present + absent;

      cont.innerHTML = `
        <div class="section-card">
          <div class="section-card-header">
            <h3>December 2024 — Daily View</h3>
            <span>${present}P / ${absent}A / ${total} Working Days</span>
          </div>
          <div class="section-card-body">
            <div style="display:flex;gap:1rem;margin-bottom:1rem;font-size:.7rem">
              <span><span style="display:inline-block;width:10px;height:10px;background:rgba(67,233,123,.5);border-radius:2px"></span> Present</span>
              <span><span style="display:inline-block;width:10px;height:10px;background:rgba(255,107,107,.5);border-radius:2px"></span> Absent</span>
              <span><span style="display:inline-block;width:10px;height:10px;background:rgba(255,215,0,.3);border-radius:2px"></span> Holiday / Weekend</span>
            </div>
            <div class="mini-cal">${calHtml}</div>
            <div style="margin-top:1rem;font-size:.8rem">
              This month: <strong>${total > 0 ? Math.round(present / total * 100) : 0}%</strong> attendance
            </div>
          </div>
        </div>`;

    /* ── MONTHLY VIEW — table ── */
    } else if (type === 'monthly') {
      const m = u.attendance.monthly;
      let rows = '';
      Object.entries(m).forEach(([mon, pct]) => {
        rows += `<tr>
          <td>${mon}</td>
          <td>${pct}%</td>
          <td>${attBadge(pct)}</td>
          <td>
            <div class="progress-bar">
              <div class="progress-fill ${attClass(pct)}" style="width:${pct}%"></div>
            </div>
          </td>
        </tr>`;
      });
      cont.innerHTML = `
        <div class="section-card">
          <div class="section-card-header"><h3>Monthly Attendance</h3></div>
          <div class="section-card-body" style="overflow-x:auto">
            <table>
              <thead><tr><th>Month</th><th>Attendance</th><th>Status</th><th style="min-width:140px">Bar</th></tr></thead>
              <tbody>${rows}</tbody>
            </table>
          </div>
        </div>`;

    /* ── YEARLY VIEW — bar chart ── */
    } else {
      const m = u.attendance.monthly;
      cont.innerHTML = `
        <div class="section-card">
          <div class="section-card-header"><h3>Yearly Attendance Chart</h3></div>
          <div class="section-card-body">
            <div class="chart-wrap" id="att-chart"></div>
          </div>
        </div>`;
      setTimeout(() => {
        barChart($('att-chart'), Object.keys(m), Object.values(m), '#43e97b');
      }, 50);
    }
  },


  /* ─── NOTICES ─────────────────────────────────── */
  renderNotices(c) {
    let html = '';
    DB.notices.forEach(n => {
      html += `<div class="notice-item ${n.type}">
        <span class="notice-tag ${n.type}">${n.type}</span>
        <div class="notice-title">${n.title}</div>
        <div class="notice-date">📅 ${n.date}</div>
        <div class="notice-body">${n.body}</div>
      </div>`;
    });
    c.innerHTML = `
      <div class="page-header">
        <h1>Notices</h1>
        <p>Official announcements from the college administration</p>
      </div>
      ${html}`;
  },


  /* ─── NEWS & EVENTS ───────────────────────────── */
  renderNews(c) {
    const events = DB.notices.filter(n => n.type === 'event' || n.type === 'holiday');
    let html = '';
    events.forEach(n => {
      html += `<div class="notice-item ${n.type}">
        <span class="notice-tag ${n.type}">${n.type}</span>
        <div class="notice-title">${n.title}</div>
        <div class="notice-date">📅 ${n.date}</div>
        <div class="notice-body">${n.body}</div>
      </div>`;
    });
    c.innerHTML = `
      <div class="page-header">
        <h1>News & Events</h1>
        <p>Campus happenings and upcoming events</p>
      </div>
      ${html || '<div class="empty-state">No events found</div>'}`;
  },


  /* ─── PARENT: OVERVIEW ────────────────────────── */
  renderParentOverview(c) {
    const u          = this.user;
    const avgAtt     = avgAttendance(u.attendance.monthly);
    const overallPct = calcOverallPct(u.marks);

    c.innerHTML = `
      <div class="page-header">
        <h1>Child Overview</h1>
        <p>Viewing information for ${u.name}</p>
      </div>

      <div class="section-card">
        <div class="section-card-header"><h3>Student Profile</h3></div>
        <div class="section-card-body">
          <div class="contact-card">
            <div class="avatar">🎓</div>
            <div class="contact-info">
              <div class="contact-name">${u.name}</div>
              <div class="contact-sub">Roll No: ${u.roll} &nbsp;·&nbsp; ${u.branch} &nbsp;·&nbsp; Year ${u.year}</div>
            </div>
          </div>
        </div>
      </div>

      <div class="stats-grid">
        <div class="stat-card purple">
          <div class="stat-label">Academic Score</div>
          <div class="stat-value">${overallPct}%</div>
          <div class="stat-sub">Grade: ${getGrade(overallPct).g}</div>
        </div>
        <div class="stat-card ${avgAtt >= 85 ? 'green' : avgAtt >= 75 ? 'gold' : 'red'}">
          <div class="stat-label">Attendance</div>
          <div class="stat-value">${avgAtt}%</div>
          <div class="stat-sub">${attBadge(avgAtt)}</div>
        </div>
      </div>

      ${avgAtt < 75
        ? `<div class="notice-item exam">
             <div class="notice-title">⚠ Attendance Alert</div>
             <div class="notice-body">Attendance is below the required 75%. Please discuss with ${u.name} to improve attendance and avoid detention.</div>
           </div>`
        : ''
      }`;
  },


  /* ─── PARENT: TEACHER CONTACTS ───────────────── */
  renderTeacherContacts(c) {
    let html = '';
    DB.teachers.forEach(t => {
      html += `<div class="contact-card">
        <div class="avatar">👨‍🏫</div>
        <div class="contact-info">
          <div class="contact-name">${t.name}</div>
          <div class="contact-sub">${t.subject} &nbsp;·&nbsp; ${t.dept}</div>
          <div class="contact-sub" style="margin-top:.3rem">📞 ${t.phone} &nbsp;·&nbsp; ✉ ${t.email}</div>
        </div>
      </div>`;
    });
    c.innerHTML = `
      <div class="page-header">
        <h1>Teacher Contacts</h1>
        <p>Reach out to faculty directly</p>
      </div>
      ${html}`;
  },


  /* ─── TEACHER: STUDENT LIST ───────────────────── */
  renderTeacherStudents(c) {
    const wrapper = el('div');
    wrapper.innerHTML = `
      <div class="page-header">
        <h1>Student List</h1>
        <p>All enrolled students — search by name or roll number</p>
      </div>
      <div class="search-bar">
        <input id="stu-search" placeholder="Search by name or roll number…" oninput="App.filterStudents()" />
        <button onclick="App.filterStudents()">Search</button>
      </div>
      <div class="section-card">
        <div class="section-card-header"><h3>Students (${DB.students.length})</h3></div>
        <div class="section-card-body" id="stu-list-body"></div>
      </div>`;
    c.appendChild(wrapper);
    this.filterStudents();
  },

  /**
   * filterStudents()
   * Live-filters the student list based on the search input value.
   */
  filterStudents() {
    const query   = ($('stu-search')?.value || '').toLowerCase();
    const listEl  = $('stu-list-body');
    if (!listEl) return;

    const filtered = DB.students.filter(s =>
      s.name.toLowerCase().includes(query) ||
      s.roll.toLowerCase().includes(query)
    );

    if (!filtered.length) {
      listEl.innerHTML = '<div class="empty-state">No students match your search</div>';
      return;
    }

    listEl.innerHTML = filtered.map(s => {
      const pct = calcOverallPct(s.marks);
      const att = avgAttendance(s.attendance.monthly);
      return `<div class="student-row">
        <div class="student-roll">${s.roll}</div>
        <div class="student-name-cell">
          ${s.name}
          <br><span style="font-size:.65rem;color:var(--text-muted)">${s.branch}, Year ${s.year}</span>
        </div>
        <div class="perf-wrap">
          <div style="font-size:.7rem;color:var(--text-muted)">Score ${pct}%</div>
          <div class="progress-bar">
            <div class="progress-fill ${attClass(pct)}" style="width:${pct}%"></div>
          </div>
        </div>
        <div style="margin-left:.5rem">${attBadge(att)} <span style="font-size:.7rem;color:var(--text-muted)">Att.</span></div>
      </div>`;
    }).join('');
  },


  /* ─── TEACHER: PERFORMANCE ────────────────────── */
  renderTeacherPerformance(c) {
    const rows = DB.students.map(s => {
      const pct        = calcOverallPct(s.marks);
      const att        = avgAttendance(s.attendance.monthly);
      const { g, cls } = getGrade(pct);
      return `<tr>
        <td>${s.name}</td>
        <td>${s.roll}</td>
        <td>${s.branch}</td>
        <td>
          ${pct}%
          <div class="progress-bar">
            <div class="progress-fill ${attClass(pct)}" style="width:${pct}%"></div>
          </div>
        </td>
        <td>${att}% ${attBadge(att)}</td>
        <td><span class="grade ${cls}">${g}</span></td>
      </tr>`;
    }).join('');

    c.innerHTML = `
      <div class="page-header">
        <h1>Student Performance</h1>
        <p>Academic overview of all students</p>
      </div>

      <div class="section-card">
        <div class="section-card-header"><h3>Performance Overview</h3></div>
        <div class="section-card-body" style="overflow-x:auto">
          <table>
            <thead>
              <tr><th>Student</th><th>Roll</th><th>Branch</th><th>Avg Score</th><th>Attendance</th><th>Grade</th></tr>
            </thead>
            <tbody>${rows}</tbody>
          </table>
        </div>
      </div>

      <div class="section-card">
        <div class="section-card-header"><h3>Class Score Distribution</h3></div>
        <div class="section-card-body">
          <div class="chart-wrap" id="perf-chart"></div>
        </div>
      </div>
    `;

    setTimeout(() => {
      const labels = DB.students.map(s => s.name.split(' ')[0]);
      const data   = DB.students.map(s => calcOverallPct(s.marks));
      barChart($('perf-chart'), labels, data, '#6c63ff');
    }, 50);
  },


  /* ─── TEACHER: PARENT CONTACTS ───────────────── */
  renderParentContacts(c) {
    let html = '';
    DB.students.forEach(s => {
      html += `<div class="contact-card">
        <div class="avatar">👨‍👩‍👦</div>
        <div class="contact-info">
          <div class="contact-name">${s.parentName}</div>
          <div class="contact-sub">Parent of <strong>${s.name}</strong> (${s.roll})</div>
          <div class="contact-sub" style="margin-top:.3rem">📞 ${s.parentPhone} &nbsp;·&nbsp; ✉ ${s.parentEmail}</div>
        </div>
      </div>`;
    });
    c.innerHTML = `
      <div class="page-header">
        <h1>Parent Contacts</h1>
        <p>Guardian details for all students</p>
      </div>
      ${html}`;
  },


  /* ─── TEACHER: ADD NOTICE ─────────────────────── */
  renderAddNotice(c) {
    c.innerHTML = `
      <div class="page-header">
        <h1>Add Notice</h1>
        <p>Post announcements visible to all students and parents</p>
      </div>

      <div class="section-card">
        <div class="section-card-header"><h3>New Announcement</h3></div>
        <div class="section-card-body">
          <div class="notice-form">
            <input  id="n-title" placeholder="Notice title…" />
            <select id="n-type">
              <option value="general">General</option>
              <option value="exam">Exam</option>
              <option value="event">Event</option>
              <option value="holiday">Holiday</option>
            </select>
            <textarea id="n-body" rows="4" placeholder="Notice details…"></textarea>
            <button onclick="App.addNotice()">Post Notice</button>
          </div>
        </div>
      </div>

      <div class="section-card">
        <div class="section-card-header">
          <h3>All Notices</h3>
          <span id="notice-count" style="font-size:.75rem;color:var(--text-muted)">${DB.notices.length} total</span>
        </div>
        <div class="section-card-body" id="all-notices-list"></div>
      </div>
    `;
    this.refreshNoticeList();
  },

  /**
   * addNotice()
   * Reads the form, adds a new notice to DB.notices, and refreshes the list.
   */
  addNotice() {
    const title = ($('n-title')?.value || '').trim();
    const type  = $('n-type')?.value || 'general';
    const body  = ($('n-body')?.value  || '').trim();

    if (!title || !body) {
      alert('Please fill in both the title and details before posting.');
      return;
    }

    const today = new Date().toISOString().split('T')[0];
    DB.notices.unshift({ id: Date.now(), type, title, date: today, body });

    // Reset form fields
    $('n-title').value = '';
    $('n-body').value  = '';

    this.refreshNoticeList();
  },

  /** Re-render the full notice list in the teacher's Add Notice page */
  refreshNoticeList() {
    const listEl  = $('all-notices-list');
    const countEl = $('notice-count');
    if (!listEl) return;

    if (countEl) countEl.textContent = `${DB.notices.length} total`;

    listEl.innerHTML = DB.notices.map(n => `
      <div class="notice-item ${n.type}">
        <span class="notice-tag ${n.type}">${n.type}</span>
        <div class="notice-title">${n.title}</div>
        <div class="notice-date">${n.date}</div>
        <div class="notice-body">${n.body}</div>
      </div>`).join('');
  }

}; // end App


/* ═══════════════════════════════════════════════════════════════
   BOOT — initialise login form on page load
═══════════════════════════════════════════════════════════════ */
App.setRole('student');
