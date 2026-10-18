(() => {
  "use strict";

  const icons = {
    home: '<path d="m3 10 9-7 9 7v10a1 1 0 0 1-1 1h-5v-7H9v7H4a1 1 0 0 1-1-1z"/>',
    calendar: '<rect x="3" y="5" width="18" height="16" rx="2"/><path d="M16 3v4M8 3v4M3 11h18"/>',
    users: '<path d="M16 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2"/><circle cx="10" cy="7" r="4"/><path d="M20 21v-2a4 4 0 0 0-3-3.87M16 3.13a4 4 0 0 1 0 7.75"/>',
    user: '<circle cx="12" cy="8" r="4"/><path d="M5 21v-2a7 7 0 0 1 14 0v2"/>',
    plus: '<path d="M12 5v14M5 12h14"/>',
    bell: '<path d="M18 8a6 6 0 0 0-12 0c0 7-3 7-3 9h18c0-2-3-2-3-9M10 21h4"/>',
    search: '<circle cx="11" cy="11" r="7"/><path d="m20 20-4-4"/>',
    arrow: '<path d="M5 12h14M12 5l7 7-7 7"/>',
    back: '<path d="m15 18-6-6 6-6"/>',
    check: '<path d="m5 12 4 4L19 6"/>',
    wallet: '<rect x="3" y="5" width="18" height="15" rx="2"/><path d="M3 9h18M16 14h.01"/>',
    trend: '<path d="m3 17 6-6 4 4 8-9"/><path d="M15 6h6v6"/>',
    clock: '<circle cx="12" cy="12" r="9"/><path d="M12 7v5l3 2"/>',
    settings: '<circle cx="12" cy="12" r="3"/><path d="m19.4 15 .1.1 1.4 1.1-1.4 2.4-1.7-.6a8 8 0 0 1-1.5.9l-.3 1.8h-2.8l-.3-1.8a8 8 0 0 1-1.5-.9l-1.7.6-1.4-2.4 1.4-1.1a7 7 0 0 1 0-1.8l-1.4-1.1 1.4-2.4 1.7.6a8 8 0 0 1 1.5-.9l.3-1.8h2.8l.3 1.8a8 8 0 0 1 1.5.9l1.7-.6 1.4 2.4-1.4 1.1a7 7 0 0 1 0 1.7z"/>',
    help: '<circle cx="12" cy="12" r="9"/><path d="M9.6 9a2.5 2.5 0 1 1 4.4 1.6c-1.2 1.2-2 1.4-2 3M12 17h.01"/>',
    close: '<path d="m18 6-12 12M6 6l12 12"/>',
    shield: '<path d="M12 22s8-4 8-11V5l-8-3-8 3v6c0 7 8 11 8 11"/><path d="m9 12 2 2 4-4"/>',
    logout: '<path d="M9 21H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h4M16 17l5-5-5-5M21 12H9"/>',
    sparkle: '<path d="m12 3 1.9 5.8L20 11l-6.1 2.2L12 19l-1.9-5.8L4 11l6.1-2.2L12 3zM19 14l1.2 2.8L23 18l-2.8 1.2L19 22l-1.2-2.8L15 18l2.8-1.2L19 14z"/>',
  };
  const icon = (name, extra = "") => `<svg class="icon ${extra}" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.7" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true">${icons[name] || icons.help}</svg>`;
  const money = (value) => `${Number(value).toLocaleString("fr-FR")} FCFA`;
  const today = new Date();
  const dateIn = (offset) => {
    const date = new Date(today);
    date.setDate(date.getDate() + offset);
    return date.toISOString().slice(0, 10);
  };
  const addFrequency = (value, frequency, count = 1) => {
    const date = new Date(`${value}T12:00:00`);
    if (frequency === "Chaque semaine" || frequency === "Toutes les 2 semaines") {
      date.setDate(date.getDate() + (frequency === "Chaque semaine" ? 7 : 14) * count);
    } else {
      const day = date.getDate();
      date.setDate(1);
      date.setMonth(date.getMonth() + count);
      const lastDay = new Date(date.getFullYear(), date.getMonth() + 1, 0).getDate();
      date.setDate(Math.min(day, lastDay));
    }
    return date.toISOString().slice(0, 10);
  };
  const initials = (name) => name.trim().split(/\s+/).slice(0, 2).map((part) => part[0]).join("").toUpperCase();
  const formatDate = (value, options = { day: "numeric", month: "short" }) =>
    new Intl.DateTimeFormat("fr-FR", options).format(new Date(`${value}T12:00:00`));
  const longToday = new Intl.DateTimeFormat("fr-FR", { weekday: "long", day: "numeric", month: "long" }).format(today);
  const defaultGroups = [
    {
      id: "famille",
      name: "Famille Nguemo",
      kind: "Familiale",
      contribution: 50000,
      members: ["Léonie Nguemo", "Marc Nguemo", "Sarah Nguemo", "Paul Nguemo", "Esther Nguemo", "Jean Nguemo"],
      nextDate: dateIn(2),
      nextMember: "Marc Nguemo",
      cycle: 3,
      paid: 4,
      totalCycles: 6,
      color: "",
      history: [
        { member: "Léonie Nguemo", amount: 50000, date: dateIn(-12), cycle: 3, note: "Cotisation du cycle 3" },
        { member: "Sarah Nguemo", amount: 50000, date: dateIn(-13), cycle: 3, note: "Cotisation du cycle 3" },
        { member: "Paul Nguemo", amount: 50000, date: dateIn(-14), cycle: 3, note: "Cotisation du cycle 3" },
        { member: "Esther Nguemo", amount: 50000, date: dateIn(-15), cycle: 3, note: "Cotisation du cycle 3" },
        { member: "Marc Nguemo", amount: 50000, date: dateIn(-18), cycle: 2, note: "Cotisation du cycle 2" },
        { member: "Jean Nguemo", amount: 50000, date: dateIn(-24), cycle: 2, note: "Cotisation du cycle 2" },
      ],
    },
    {
      id: "amis",
      name: "Les Bâtisseurs",
      kind: "Entre amis",
      contribution: 25000,
      members: ["Léonie Nguemo", "David T.", "Nadia M.", "Christian B.", "Amina F."],
      nextDate: dateIn(5),
      nextMember: "Nadia M.",
      cycle: 2,
      paid: 3,
      totalCycles: 5,
      color: "gold",
      history: [
        { member: "Léonie Nguemo", amount: 25000, date: dateIn(-8), cycle: 1, note: "Cotisation du cycle 1" },
        { member: "David T.", amount: 25000, date: dateIn(-14), cycle: 1, note: "Cotisation du cycle 1" },
        { member: "Nadia M.", amount: 25000, date: dateIn(-2), cycle: 2, note: "Cotisation du cycle 2" },
        { member: "Christian B.", amount: 25000, date: dateIn(-3), cycle: 2, note: "Cotisation du cycle 2" },
        { member: "Amina F.", amount: 25000, date: dateIn(-4), cycle: 2, note: "Cotisation du cycle 2" },
      ],
    },
    {
      id: "quartier",
      name: "Solidarité Bonapriso",
      kind: "Quartier",
      contribution: 100000,
      members: ["Léonie Nguemo", "M. Talla", "B. Foka", "J. Ebong", "S. Moukoko", "A. Ewane", "C. Njoya", "L. Mbappe"],
      nextDate: dateIn(9),
      nextMember: "M. Talla",
      cycle: 4,
      paid: 6,
      totalCycles: 8,
      color: "rose",
      history: [
        { member: "Léonie Nguemo", amount: 100000, date: dateIn(-5), cycle: 3, note: "Cotisation du cycle 3" },
        { member: "M. Talla", amount: 100000, date: dateIn(-11), cycle: 3, note: "Cotisation du cycle 3" },
        { member: "B. Foka", amount: 100000, date: dateIn(-2), cycle: 4, note: "Cotisation du cycle 4" },
        { member: "J. Ebong", amount: 100000, date: dateIn(-3), cycle: 4, note: "Cotisation du cycle 4" },
        { member: "S. Moukoko", amount: 100000, date: dateIn(-4), cycle: 4, note: "Cotisation du cycle 4" },
        { member: "A. Ewane", amount: 100000, date: dateIn(-5), cycle: 4, note: "Cotisation du cycle 4" },
        { member: "C. Njoya", amount: 100000, date: dateIn(-6), cycle: 4, note: "Cotisation du cycle 4" },
        { member: "L. Mbappe", amount: 100000, date: dateIn(-7), cycle: 4, note: "Cotisation du cycle 4" },
      ],
    },
  ];

  function loadGroups() {
    try {
      const saved = localStorage.getItem("tontinecm.groups");
      return saved ? JSON.parse(saved) : defaultGroups;
    } catch (error) {
      console.error("Impossible de lire les données locales des tontines.", error);
      return defaultGroups;
    }
  }
  function loadPreferences() {
    try {
      return { reminders: true, groupNotifications: true, ...JSON.parse(localStorage.getItem("tontinecm.preferences") || "{}") };
    } catch (error) {
      console.error("Impossible de lire les préférences locales.", error);
      return { reminders: true, groupNotifications: true };
    }
  }

  const state = {
    groups: loadGroups(),
    screen: sessionStorage.getItem("tontinecm.signedIn") === "true" ? "home" : "welcome",
    activeTab: "home",
    selectedId: null,
    wizardStep: 1,
    draft: {},
    authMode: "login",
    search: "",
    groupFilter: "all",
    analyticsGroup: "all",
    memberSearch: "",
    orderDraft: [],
    theme: loadTheme(),
    preferences: loadPreferences(),
    toastTimer: null,
  };
  const root = document.getElementById("app");
  function loadProfile() {
    try {
      const saved = localStorage.getItem("tontinecm.profile");
      return saved ? { ...{ name: "Léonie Nguemo", phone: "+237 6 90 12 34 56", city: "Douala, Cameroun" }, ...JSON.parse(saved) } : { name: "Léonie Nguemo", phone: "+237 6 90 12 34 56", city: "Douala, Cameroun" };
    } catch (error) {
      console.error("Impossible de lire le profil local.", error);
      return { name: "Léonie Nguemo", phone: "+237 6 90 12 34 56", city: "Douala, Cameroun" };
    }
  }
  let currentUser = loadProfile();
  const navItems = [
    ["home", "Accueil", "home"],
    ["deadlines", "Échéances", "calendar"],
    ["tontines", "Mes tontines", "users"],
    ["profile", "Profil", "user"],
  ];
  const mobileNavItems = navItems.filter(([target]) => target !== "tontines");
  function loadTheme() {
    try {
      return localStorage.getItem("tontinecm.theme") === "dark" ? "dark" : "light";
    } catch (error) {
      console.error("Impossible de lire la préférence de thème.", error);
      return "light";
    }
  }
  const selectedGroup = () => state.groups.find((group) => group.id === state.selectedId);
  const persistGroups = () => {
    try {
      localStorage.setItem("tontinecm.groups", JSON.stringify(state.groups));
    } catch (error) {
      console.error("Impossible d’enregistrer les données locales des tontines.", error);
      showToast("Enregistrement local indisponible.");
    }
  };
  const showToast = (message) => {
    document.querySelector(".toast")?.remove();
    const toast = document.createElement("div");
    toast.className = "toast";
    toast.innerHTML = `${icon("check")}<span>${escapeHtml(message)}</span>`;
    document.body.append(toast);
    window.clearTimeout(state.toastTimer);
    state.toastTimer = window.setTimeout(() => toast.remove(), 3200);
  };
  const escapeHtml = (value) => String(value).replace(/[&<>"']/g, (char) => ({
    "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;", "'": "&#39;",
  })[char]);
  const go = (screen) => {
    state.screen = screen;
    state.selectedId = null;
    state.search = "";
    if (["home", "deadlines", "tontines", "profile"].includes(screen)) state.activeTab = screen;
    render();
  };
  const persistLogin = (isSignedIn) => {
    if (isSignedIn) sessionStorage.setItem("tontinecm.signedIn", "true");
    else sessionStorage.removeItem("tontinecm.signedIn");
  };
  const persistProfile = () => {
    try {
      localStorage.setItem("tontinecm.profile", JSON.stringify(currentUser));
    } catch (error) {
      console.error("Impossible d’enregistrer le profil local.", error);
      showToast("Le profil a été modifié, mais ne peut pas être conservé sur cet appareil.");
    }
  };
  function updateMemberDisplayName(previousName, nextName) {
    if (previousName === nextName) return;
    state.groups.forEach((group) => {
      group.members = group.members.map((member) => member === previousName ? nextName : member);
      if (group.nextMember === previousName) group.nextMember = nextName;
      group.history.forEach((entry) => {
        if (entry.member === previousName) entry.member = nextName;
      });
    });
    persistGroups();
  }

  function navButton([target, label, symbol], mobile = false) {
    const active = state.activeTab === target || (mobile && target === "home" && state.activeTab === "tontines");
    return `<button class="${mobile ? "" : "nav-item"} ${active ? "active" : ""}" data-nav="${target}" ${active ? 'aria-current="page"' : ""}>${icon(symbol)}<span>${label}</span></button>`;
  }

  function appLayout(body, title) {
    return `<div class="app-shell">
      <aside class="sidebar">
        <div class="brand"><span class="brand-mark">T</span><span>Tontine<span>CM</span></span></div>
        <p class="workspace-label">Espace personnel</p>
        <nav class="nav-list" aria-label="Navigation principale">${navItems.map((item) => navButton(item)).join("")}</nav>
        <div class="sidebar-bottom">
          <div class="help-card"><strong>Besoin d’aide ?</strong><p>Retrouvez les réponses aux questions fréquentes sur votre tontine.</p><button data-action="help">Consulter le guide ${icon("arrow")}</button></div>
          <div class="user-mini"><div class="avatar">${initials(currentUser.name)}</div><div><strong>${currentUser.name}</strong><small>Administratrice</small></div></div>
        </div>
      </aside>
      <main class="main">
        <header class="topbar">
          <div class="breadcrumb">TontineCM <span> / </span> <b>${title}</b></div>
          <div class="top-actions">
            <button class="icon-button" aria-label="Notifications" data-action="notifications">${icon("bell")}<span class="notification-dot"></span></button>
            <div class="top-user"><div class="avatar">${initials(currentUser.name)}</div><span>${currentUser.name.split(" ")[0]}</span></div>
          </div>
        </header>
        <section class="content">${body}</section>
      </main>
      <nav class="mobile-nav" aria-label="Navigation principale">${mobileNavItems.map((item) => navButton(item, true)).join("")}</nav>
    </div>`;
  }

  function welcomePage() {
    return `<main class="welcome-screen">
      <div class="welcome-top"><div class="brand"><span class="brand-mark">T</span><span>Tontine<span>CM</span></span></div><button class="button button-quiet" data-action="open-login">Déjà membre ? Se connecter</button></div>
      <section class="welcome-hero">
        <div class="welcome-copy"><p class="eyebrow">L’épargne collective, en toute confiance</p><h1>Ensemble, on épargne mieux.</h1><p>Créez votre tontine, suivez les cotisations et sachez toujours à qui revient le prochain tour.</p><div class="welcome-actions"><button class="button button-primary" data-action="open-register">Créer mon compte ${icon("arrow")}</button><button class="button button-secondary" data-action="open-login">J’ai déjà un compte</button></div><div class="welcome-trust">${icon("shield")} Vos données restent sur cet appareil dans cette démo.</div></div>
        <div class="welcome-preview"><div class="preview-orb"></div><div class="preview-card preview-card-main"><div class="preview-card-head"><span class="preview-brand-mark">T</span><div><strong>Votre épargne</strong><small>Vue d’ensemble</small></div><span class="status">À jour</span></div><div class="preview-total">${money(state.groups.reduce((sum, group) => sum + group.history.reduce((total, item) => total + Number(item.amount), 0), 0))}</div><small class="preview-caption">Épargne suivie dans vos groupes</small><div class="preview-bars"><i></i><i></i><i></i><i></i><i></i><i></i><i></i><i></i><i></i><i></i><i></i><i></i></div><div class="preview-bottom"><span>Mes groupes</span><b>${state.groups.length.toString().padStart(2, "0")} actifs</b></div></div><div class="preview-card preview-card-float"><span class="stat-icon">${icon("check")}</span><div><strong>Cotisation enregistrée</strong><small>Votre groupe est à jour</small></div></div><div class="preview-sticker">${icon("sparkle")} Simple & transparent</div></div>
      </section><footer class="welcome-footer"><span>© 2026 TontineCM</span><span>Une gestion plus claire de vos tontines au Cameroun.</span><button data-action="open-help">Besoin d’aide ?</button></footer>
    </main>`;
  }

  function heading(eyebrow, title, subtitle, action = "") {
    return `<div class="page-heading"><div><p class="eyebrow">${eyebrow}</p><h1>${title}</h1><p class="page-subtitle">${subtitle}</p></div>${action}</div>`;
  }

  function groupIcon(group, extra = "") {
    return `<div class="group-icon ${group.color || ""} ${extra}">${escapeHtml(initials(group.name))}</div>`;
  }

  function progress(group) {
    return Math.min(100, Math.round((group.paid / group.members.length) * 100));
  }

  function isGroupComplete(group) {
    return group.cycle > group.totalCycles;
  }

  function getRotationOrder(group) {
    const members = group.members || [];
    const existing = Array.isArray(group.order) ? group.order.filter((member) => members.includes(member)) : [];
    const unique = [...new Set(existing)];
    const missing = members.filter((member) => !unique.includes(member));
    const order = [...unique, ...missing];
    const nextIndex = order.indexOf(group.nextMember);
    return nextIndex > 0 ? [...order.slice(nextIndex), ...order.slice(0, nextIndex)] : order;
  }

  function groupHistory(group) {
    return group.history || [];
  }

  function statusForDate(value) {
    const days = Math.ceil((new Date(`${value}T12:00:00`) - new Date(`${dateIn(0)}T12:00:00`)) / 86400000);
    return days < 0 ? ["En retard", "late"] : days < 3 ? ["À venir", "pending"] : ["Planifiée", ""];
  }

  function dashboard() {
    const collected = state.groups.reduce((sum, group) => sum + group.history.reduce((total, entry) => total + Number(entry.amount), 0), 0);
    const upcoming = [...state.groups].sort((a, b) => a.nextDate.localeCompare(b.nextDate));
    const next = upcoming.slice(0, 3);
    const due = next.map((group) => {
      const [label, stateClass] = statusForDate(group.nextDate);
      const date = new Date(`${group.nextDate}T12:00:00`);
      return `<div class="deadline"><div class="date-box"><b>${date.getDate()}</b><small>${new Intl.DateTimeFormat("fr-FR", { month: "short" }).format(date)}</small></div><div class="deadline-info"><strong>${escapeHtml(group.name)}</strong><small>Tour de ${escapeHtml(group.nextMember)}</small></div><div class="deadline-amount">${money(group.contribution)}<div style="margin-top:6px"><span class="status ${stateClass}">${label}</span></div></div></div>`;
    }).join("");
    return `${heading(longToday, `Bonjour ${escapeHtml(currentUser.name.split(" ")[0])} 👋`, "Voici ce qui se passe dans vos tontines aujourd’hui.", `<button class="button button-primary" data-action="create">${icon("plus")} Nouvelle tontine</button>`)}
      <div class="stats-grid">
        <article class="card stat-card"><div class="stat-top"><span>Mes tontines actives</span><span class="stat-icon">${icon("users")}</span></div><p class="stat-value">${state.groups.length.toString().padStart(2, "0")}</p><p class="stat-foot"><span class="positive">●</span> Tous vos groupes en un seul endroit</p></article>
        <article class="card stat-card"><div class="stat-top"><span>Épargne cumulée</span><span class="stat-icon">${icon("wallet")}</span></div><p class="stat-value">${money(collected)}</p><p class="stat-foot">Enregistrée dans vos groupes</p></article>
        <article class="card stat-card"><div class="stat-top"><span>Prochaine échéance</span><span class="stat-icon">${icon("calendar")}</span></div><p class="stat-value">${next.length ? formatDate(next[0].nextDate, { day: "numeric", month: "short" }) : "—"}</p><p class="stat-foot">${next.length ? escapeHtml(next[0].name) : "Aucune échéance à venir"}</p></article>
        <article class="card stat-card"><div class="stat-top"><span>Prochain tour reçu</span><span class="stat-icon">${icon("trend")}</span></div><p class="stat-value">${money(state.groups.reduce((sum, group) => sum + group.contribution * group.members.length, 0))}</p><p class="stat-foot">Montant estimé de la cagnotte</p></article>
      </div>
      <div class="dashboard-grid">
        <section class="card panel">
          <div class="panel-heading"><h2>Mes tontines</h2><button class="text-link" data-nav="tontines">Tout voir ${icon("arrow")}</button></div>
          <div class="tontine-list">${state.groups.slice(0, 3).map((group) => `<div class="tontine-row" data-open-group="${escapeHtml(group.id)}" role="button" tabindex="0"><div class="group-icon ${group.color || ""}">${escapeHtml(initials(group.name))}</div>          <div class="group-info"><strong>${escapeHtml(group.name)}</strong><small>${escapeHtml(group.kind)} · ${group.members.length} membres</small><div class="progress-line"><div class="progress"><span style="width:${progress(group)}%"></span></div><small>${group.paid}/${group.members.length} cotisations</small></div></div><div class="group-amount"><strong>${money(group.contribution)}</strong><small>par cotisation</small></div></div>`).join("") || `<div class="empty-state">Aucune tontine pour le moment.</div>`}</div>
          <div class="quick-action"><span class="stat-icon">${icon("plus")}</span><div><strong>Un nouveau projet en tête ?</strong><p>Créez un groupe et invitez vos proches à vous rejoindre.</p></div><button class="button button-secondary" style="margin-left:auto" data-action="create">Créer</button></div>
        </section>
        <section class="card panel">
          <div class="panel-heading"><h2>Prochaines échéances</h2><button class="text-link" data-nav="deadlines">Calendrier ${icon("arrow")}</button></div>
          <div class="deadline-list">${due || `<div class="empty-state">Aucune échéance prévue.</div>`}</div>
        </section>
      </div>`;
  }

  function tontinesPage() {
    const search = state.search.toLowerCase();
    const groups = state.groups.filter((group) => `${group.name} ${group.kind}`.toLowerCase().includes(search)
      && (state.groupFilter === "all" || (state.groupFilter === "active" ? !isGroupComplete(group) : isGroupComplete(group))));
    return `${heading("Votre épargne collective", "Mes tontines", "Gardez un œil sur les groupes auxquels vous participez.", `<button class="button button-primary" data-action="create">${icon("plus")} Créer une tontine</button>`)}
      <div class="toolbar"><label class="search">${icon("search")}<input type="search" placeholder="Rechercher une tontine..." value="${escapeHtml(state.search)}" data-search="groups" aria-label="Rechercher une tontine"></label><select class="filter-select" data-filter-groups aria-label="Filtrer les tontines"><option value="all" ${state.groupFilter === "all" ? "selected" : ""}>Toutes les tontines</option><option value="active" ${state.groupFilter === "active" ? "selected" : ""}>En cours</option><option value="complete" ${state.groupFilter === "complete" ? "selected" : ""}>Terminées</option></select></div>
      <div class="tontine-grid">${groups.map((group) => `<article class="card tontine-card" data-open-group="${escapeHtml(group.id)}" role="button" tabindex="0">
        <div class="tontine-card-top"><div class="tontine-card-title">${groupIcon(group)}<div><strong>${escapeHtml(group.name)}</strong><small>${escapeHtml(group.kind)} · depuis ${formatDate(group.nextDate, { month: "long", year: "numeric" })}</small></div></div><span class="status ${isGroupComplete(group) ? "pending" : ""}">${isGroupComplete(group) ? "Terminée" : "En cours"}</span></div>
        <div class="card-metrics"><div><small>Cotisation par tour</small><strong>${money(group.contribution)}</strong></div><div><small>Membres</small><strong>${group.members.length} personnes</strong></div></div>
        <div class="progress-line"><div class="progress"><span style="width:${progress(group)}%"></span></div><small>${group.paid} / ${group.members.length} cotisations reçues</small></div>
        <div class="card-footer"><div class="member-stack">${group.members.slice(0, 4).map((member) => `<span class="avatar">${escapeHtml(initials(member))}</span>`).join("")}</div><span>Prochaine échéance : ${formatDate(group.nextDate)}</span>${icon("arrow")}</div>
      </article>`).join("") || `<div class="card empty-state">Aucune tontine ne correspond à votre recherche.</div>`}</div>`;
  }

  function deadlinesPage() {
    const entries = state.groups.flatMap((group) => [
      { group, date: group.nextDate, member: group.nextMember },
      ...group.members.slice(0, 2).map((member, index) => ({ group, date: dateIn(11 + index * 7), member })),
    ]).sort((a, b) => a.date.localeCompare(b.date));
    return `${heading("Calendrier de cotisations", "Mes échéances", "Anticipez les prochains tours et gardez vos cotisations à jour.")}
      <section class="card panel">
        <div class="panel-heading"><div><h2>À venir</h2><p class="page-subtitle" style="margin-top:5px">Vos prochains rendez-vous de cotisation</p></div><span class="status pending">${entries.length} échéances</span></div>
        <div class="deadline-list">${entries.map(({ group, date, member }) => {
          const [label, stateClass] = statusForDate(date);
          const d = new Date(`${date}T12:00:00`);
          return `<div class="deadline"><div class="date-box"><b>${d.getDate()}</b><small>${new Intl.DateTimeFormat("fr-FR", { month: "short" }).format(d)}</small></div><div class="deadline-info"><strong>${escapeHtml(group.name)}</strong><small>Tour de ${escapeHtml(member)} · ${group.kind}</small></div><div class="deadline-amount">${money(group.contribution)}<div style="margin-top:6px"><span class="status ${stateClass}">${label}</span></div></div></div>`;
        }).join("")}</div>
      </section>`;
  }

  function historyPage() {
    const group = selectedGroup();
    const groups = group ? [group] : state.groups;
    const entries = groups.flatMap((item) => item.history.map((record) => ({ ...record, group: item })))
      .filter((entry) => `${entry.member} ${entry.group.name} ${entry.note || ""}`.toLowerCase().includes(state.search.toLowerCase()))
      .sort((a, b) => b.date.localeCompare(a.date));
    return `${heading(group ? `Historique · ${escapeHtml(group.name)}` : "Suivi de vos versements", group ? "Historique des cotisations" : "Historique complet", group ? "Retrouvez tous les versements enregistrés pour cette tontine." : "Consultez les cotisations enregistrées dans tous vos groupes.", `<button class="button button-secondary" data-action="${group ? "history-back" : "export-history"}">${group ? `${icon("back")} Retour au groupe` : "Exporter l’historique"}</button>`)}
      ${!group ? `<div class="toolbar"><label class="search">${icon("search")}<input type="search" placeholder="Rechercher par membre ou groupe..." value="${escapeHtml(state.search)}" data-search="history" aria-label="Rechercher dans l’historique"></label><span class="status">${entries.length} versements</span></div>` : ""}
      <section class="card panel"><div class="panel-heading"><div><h2>${group ? escapeHtml(group.name) : "Tous les versements"}</h2><p class="page-subtitle" style="margin-top:5px">Les opérations enregistrées sur cet appareil</p></div><span class="status">${entries.length} cotisations</span></div>
      ${entries.length ? `<div class="table-wrap"><table><thead><tr><th>MEMBRE</th>${group ? "" : "<th>GROUPE</th>"}<th>DESCRIPTION</th><th>DATE</th><th>MONTANT</th><th>ÉTAT</th></tr></thead><tbody>${entries.map((entry) => `<tr><td><div class="member-cell"><div class="avatar">${escapeHtml(initials(entry.member))}</div><strong>${escapeHtml(entry.member)}</strong></div></td>${group ? "" : `<td>${escapeHtml(entry.group.name)}</td>`}<td>${escapeHtml(entry.note || "Cotisation")}</td><td>${formatDate(entry.date, { day: "numeric", month: "short", year: "numeric" })}</td><td><strong>${money(entry.amount)}</strong></td><td><span class="status">Confirmée</span></td></tr>`).join("")}</tbody></table></div>` : `<div class="empty-state">Aucun versement enregistré pour le moment.</div>`}</section>`;
  }

  function notificationsPage() {
    const activities = state.groups.flatMap((group) => [
      ...group.history.slice(0, 2).map((item) => ({ date: item.date, title: "Cotisation enregistrée", detail: `${item.member} · ${group.name}`, amount: item.amount, kind: "payment" })),
      { date: group.nextDate, title: "Prochaine échéance", detail: `Tour de ${group.nextMember} · ${group.name}`, amount: group.contribution, kind: "upcoming" },
    ]).sort((a, b) => b.date.localeCompare(a.date));
    return `${heading("Restez informée", "Notifications", "Les dernières nouvelles et prochaines échéances de vos groupes.")}<section class="card panel"><div class="panel-heading"><h2>Activité récente</h2><span class="status">${activities.length} mises à jour</span></div><div class="notification-list">${activities.map((item) => `<article class="notification-item"><span class="notification-icon ${item.kind}">${icon(item.kind === "payment" ? "check" : "calendar")}</span><div><strong>${item.title}</strong><p>${escapeHtml(item.detail)}</p><small>${formatDate(item.date, { day: "numeric", month: "long" })}</small></div><b>${money(item.amount)}</b></article>`).join("") || `<div class="empty-state">Vous n’avez pas encore de notifications.</div>`}</div></section>`;
  }

  function helpPage() {
    const questions = [
      ["Comment créer une tontine ?", "Depuis le tableau de bord, choisissez « Nouvelle tontine ». Définissez le nom du groupe, le montant et le nombre de membres, puis ajoutez les participants."],
      ["Comment enregistrer une cotisation ?", "Ouvrez la tontine concernée, puis « Enregistrer une cotisation ». Sélectionnez le membre, saisissez le montant et la date du versement."],
      ["Qui peut consulter les données ?", "Dans cette maquette, les données de démonstration sont enregistrées uniquement dans le stockage local de votre navigateur. Aucun service serveur n’est connecté."],
      ["Comment modifier mon profil ?", "Ouvrez Profil puis « Modifier mes informations ». Les changements restent sur cet appareil dans cette version frontend."],
      ["Puis-je installer cette application sur mon téléphone ?", "Cette version est une interface web adaptative. Elle n’est pas encore une application native ni une PWA installable."],
    ];
    return `${heading("Centre d’assistance", "Comment pouvons-nous vous aider ?", "Les réponses aux questions fréquentes sur la gestion de vos tontines.")}<div class="help-layout"><section class="card panel"><div class="panel-heading"><h2>Questions fréquentes</h2></div><div class="faq-list">${questions.map(([question, answer], index) => `<details class="faq-item" ${index === 0 ? "open" : ""}><summary>${question}<span>+</span></summary><p>${answer}</p></details>`).join("")}</div></section><aside class="card help-contact"><span class="stat-icon">${icon("help")}</span><h2>Encore une question ?</h2><p>Le prototype ne dispose pas encore d’assistance en ligne. Cette page rassemble les informations disponibles.</p><button class="button button-secondary" data-action="help-email">Contacter l’assistance</button></aside></div>`;
  }

  function editProfilePage() {
    return `${heading("Votre espace", "Modifier mon profil", "Mettez à jour les informations affichées dans votre espace.", `<button class="button button-secondary" data-nav="profile">${icon("back")} Retour au profil</button>`)}<div class="card form-card"><form id="profile-form" novalidate><div class="form-heading"><h2>Informations personnelles</h2><p>Ces informations sont conservées localement sur cet appareil.</p></div><div class="form-grid"><div class="field full"><label for="profile-name">Nom complet</label><input id="profile-name" name="name" required maxlength="80" value="${escapeHtml(currentUser.name)}"></div><div class="field"><label for="profile-phone">Téléphone</label><input id="profile-phone" name="phone" required inputmode="tel" value="${escapeHtml(currentUser.phone)}"></div><div class="field"><label for="profile-city">Ville</label><input id="profile-city" name="city" required maxlength="80" value="${escapeHtml(currentUser.city)}"></div></div><p class="form-error" id="form-error" role="alert"></p><div class="form-actions"><button class="button button-secondary" type="button" data-nav="profile">Annuler</button><button class="button button-primary" type="submit">${icon("check")} Enregistrer les changements</button></div></form></div>`;
  }

  function detailPage() {
    const group = selectedGroup();
    if (!group) return tontinesPage();
    const members = group.members.map((member, index) => {
      const paid = group.history.some((entry) => entry.member === member && entry.cycle === group.cycle);
      const isNext = member === group.nextMember;
      const payment = group.history.find((entry) => entry.member === member && entry.cycle === group.cycle);
      return `<tr><td><div class="member-cell"><div class="avatar">${escapeHtml(initials(member))}</div><strong>${escapeHtml(member)}</strong>${member === currentUser.name ? `<span class="status" style="padding:3px 6px;font-size:8px">Vous</span>` : ""}</div></td><td>${isNext ? `<span class="status pending">Prochain bénéficiaire</span>` : `<span class="status">${paid ? "Cotisation reçue" : "En attente"}</span>`}</td><td>${payment ? formatDate(payment.date) : "—"}</td><td>${money(group.contribution)}</td></tr>`;
    }).join("");
    const history = group.history.slice(0, 6).map((item) => `<div class="history-item"><span class="history-mark">${icon("check")}</span><div><strong>${escapeHtml(item.member)}</strong><small>${escapeHtml(item.note || "Cotisation")} · ${formatDate(item.date, { day: "numeric", month: "long" })}</small></div><div class="history-value">+ ${money(item.amount)}<small style="display:block">Confirmée</small></div></div>`).join("");
    return `<button class="back-button" data-nav="tontines">${icon("back")} Retour à mes tontines</button>
      <div class="detail-header">${groupIcon(group)}<div><h1>${escapeHtml(group.name)}</h1><p>${escapeHtml(group.kind)} · ${group.members.length} membres · Créée le ${formatDate(dateIn(-70))}</p></div><div class="detail-actions"><button class="button button-secondary" data-action="copy-invite">Inviter</button><button class="button button-primary" data-action="contribute">${icon("plus")} Enregistrer une cotisation</button></div></div>
      <div class="detail-shortcuts" aria-label="Outils du groupe">
        <button class="shortcut-card" data-action="open-members">${icon("users")}<span><strong>Membres</strong><small>Gérer et inviter</small></span>${icon("arrow")}</button>
        <button class="shortcut-card" data-action="open-cycles">${icon("calendar")}<span><strong>Tours</strong><small>Ordre de passage</small></span>${icon("arrow")}</button>
        <button class="shortcut-card" data-action="open-analytics">${icon("trend")}<span><strong>Statistiques</strong><small>Suivi des cotisations</small></span>${icon("arrow")}</button>
      </div>
      <div class="stats-grid">
        <article class="card stat-card"><div class="stat-top"><span>Cotisation par membre</span><span class="stat-icon">${icon("wallet")}</span></div><p class="stat-value">${money(group.contribution)}</p><p class="stat-foot">À chaque tour</p></article>
        <article class="card stat-card"><div class="stat-top"><span>Cagnotte du tour</span><span class="stat-icon">${icon("trend")}</span></div><p class="stat-value">${money(group.contribution * group.members.length)}</p><p class="stat-foot">${group.members.length} contributions réunies</p></article>
        <article class="card stat-card"><div class="stat-top"><span>Tour en cours</span><span class="stat-icon">${icon("clock")}</span></div><p class="stat-value">${group.cycle} / ${group.totalCycles}</p><p class="stat-foot">${group.paid} membres ont cotisé</p></article>
        <article class="card stat-card"><div class="stat-top"><span>Prochain bénéficiaire</span><span class="stat-icon">${icon("user")}</span></div><p class="stat-value" style="font-size:17px">${escapeHtml(group.nextMember.split(" ")[0])}</p><p class="stat-foot">Prévu le ${formatDate(group.nextDate)}</p></article>
      </div>
      <div class="detail-grid">
        <section class="card panel"><div class="panel-heading"><div><h2>Membres du groupe</h2><p class="page-subtitle" style="margin-top:5px">État des cotisations du tour en cours</p></div><span class="status">${group.members.length} membres</span></div><div class="table-wrap"><table><thead><tr><th>MEMBRE</th><th>STATUT</th><th>DERNIÈRE COTISATION</th><th>MONTANT</th></tr></thead><tbody>${members}</tbody></table></div></section>
        <div><section class="card panel"><div class="panel-heading"><h2>Avancement du tour</h2><span class="status">${progress(group)} %</span></div><div class="cycle-callout"><span class="stat-icon">${icon("calendar")}</span><div><strong>Tour ${group.cycle} sur ${group.totalCycles}</strong><small>Prochain tour : ${formatDate(group.nextDate, { day: "numeric", month: "long" })}</small></div></div><div class="progress"><span style="width:${progress(group)}%"></span></div><div class="card-footer"><span>${group.paid} cotisations reçues</span><strong>${money(group.contribution * group.paid)} / ${money(group.contribution * group.members.length)}</strong></div></section>
        <section class="card panel section-gap"><div class="panel-heading"><h2>Activité récente</h2><button class="text-link" data-action="show-history">Tout voir ${icon("arrow")}</button></div><div class="history-list">${history || `<div class="empty-state">Aucune cotisation enregistrée.</div>`}</div></section></div>
      </div>`;
  }

  function membersPage() {
    const group = selectedGroup();
    if (!group) return tontinesPage();
    const search = state.memberSearch.toLowerCase();
    const members = group.members.map((name, index) => ({ name, index })).filter((member) => member.name.toLowerCase().includes(search));
    const paidNames = new Set(groupHistory(group).filter((entry) => entry.cycle === group.cycle).map((entry) => entry.member));
    const order = getRotationOrder(group);
    return `${heading(`Groupe · ${escapeHtml(group.name)}`, "Membres et invitations", "Ajoutez des participants et suivez leur activité dans le groupe.", `<button class="button button-secondary" data-action="back-to-group">${icon("back")} Retour au groupe</button>`)}
      <div class="member-summary">
        <article class="card stat-card"><div class="stat-top"><span>Membres inscrits</span><span class="stat-icon">${icon("users")}</span></div><p class="stat-value">${group.members.length}</p><p class="stat-foot">maximum : 50 membres</p></article>
        <article class="card stat-card"><div class="stat-top"><span>Cotisations reçues</span><span class="stat-icon">${icon("check")}</span></div><p class="stat-value">${paidNames.size} / ${group.members.length}</p><p class="stat-foot">Tour ${group.cycle}</p></article>
        <article class="card stat-card"><div class="stat-top"><span>Prochain bénéficiaire</span><span class="stat-icon">${icon("calendar")}</span></div><p class="stat-value member-next">${escapeHtml(group.nextMember)}</p><p class="stat-foot">Le ${formatDate(group.nextDate, { day: "numeric", month: "long" })}</p></article>
      </div>
      <div class="members-layout">
        <section class="card panel"><div class="panel-heading"><div><h2>Liste des membres</h2><p class="page-subtitle" style="margin-top:5px">Administratrice : ${escapeHtml(currentUser.name)}</p></div><span class="status">${group.members.length} inscrits</span></div>
          <label class="search member-search">${icon("search")}<input type="search" data-search-members placeholder="Rechercher un membre..." aria-label="Rechercher un membre" value="${escapeHtml(state.memberSearch)}"></label>
          <div class="member-list">${members.map(({ name, index }) => {
            const paid = paidNames.has(name);
            const canRemove = name !== currentUser.name && !groupHistory(group).some((entry) => entry.member === name) && name !== group.nextMember;
            return `<div class="managed-member"><div class="avatar">${escapeHtml(initials(name))}</div><div class="managed-member-name"><strong>${escapeHtml(name)}</strong><small>${name === currentUser.name ? "Administratrice" : group.memberContacts?.[name] ? escapeHtml(group.memberContacts[name]) : order.indexOf(name) >= 0 ? `Tour ${((group.cycle - 1 + order.indexOf(name)) % Math.max(1, group.totalCycles)) + 1}` : "Membre"}</small></div><span class="status ${paid ? "" : "pending"}">${paid ? "Cotisation reçue" : "En attente"}</span>${canRemove ? `<button class="icon-button remove-member" data-remove-member="${index}" aria-label="Retirer ${escapeHtml(name)}" title="Retirer du groupe">${icon("close")}</button>` : `<span class="member-protected" title="Membre déjà engagé">${icon("shield")}</span>`}</div>`;
          }).join("") || `<div class="empty-state">Aucun membre ne correspond à votre recherche.</div>`}</div>
        </section>
        <section class="card panel invite-panel"><span class="stat-icon">${icon("plus")}</span><h2>Ajouter un membre</h2><p>Ajoutez un participant à la liste et à l’ordre des tours de cette tontine.</p><form id="member-form" novalidate><div class="field"><label for="new-member-name">Nom du membre</label><input id="new-member-name" name="name" required maxlength="80" placeholder="Ex. Amina Foko"></div><div class="field"><label for="new-member-phone">Téléphone <span>(facultatif)</span></label><input id="new-member-phone" name="phone" inputmode="tel" placeholder="+237 6XX XX XX XX"></div><p class="form-error" id="form-error" role="alert"></p><button class="button button-primary" type="submit">${icon("plus")} Ajouter au groupe</button></form>
          <div class="invite-note">${icon("help")} Cette démo ajoute directement le membre. L’envoi d’invitations par SMS n’est pas connecté.</div>
        </section>
      </div>`;
  }

  function cyclesPage() {
    const group = selectedGroup();
    if (!group) return tontinesPage();
    const order = state.orderDraft.length ? state.orderDraft : getRotationOrder(group);
    const cyclesRemaining = Math.max(0, group.totalCycles - group.cycle + 1);
    const cycleRows = order.slice(0, cyclesRemaining).map((member, index) => {
      const date = addFrequency(group.nextDate, group.frequency || "Chaque mois", index);
      const cycle = group.cycle + index;
      const [label, statusClass] = statusForDate(date);
      return `<div class="cycle-row"><div class="cycle-number">${cycle.toString().padStart(2, "0")}</div><div class="cycle-member"><div class="avatar">${escapeHtml(initials(member))}</div><div><strong>${escapeHtml(member)}</strong><small>${index === 0 ? "Prochain bénéficiaire" : `Bénéficiaire · tour ${cycle}`}</small></div></div><div class="cycle-date">${formatDate(date, { day: "numeric", month: "short", year: "numeric" })}</div><span class="status ${index === 0 ? "pending" : statusClass}">${index === 0 ? "Prochain tour" : label}</span></div>`;
    }).join("");
    const editableOrder = order.map((member, index) => `<div class="order-row"><span class="order-position">${index + 1}</span><div class="avatar">${escapeHtml(initials(member))}</div><strong>${escapeHtml(member)}</strong>${index === 0 ? `<span class="status pending">Prochain tour</span>` : ""}<div class="order-controls"><button class="icon-button" data-order-move="${index}" data-direction="-1" aria-label="Monter ${escapeHtml(member)}" ${index === 0 ? "disabled" : ""}>${icon("arrow", "rotate-up")}</button><button class="icon-button" data-order-move="${index}" data-direction="1" aria-label="Descendre ${escapeHtml(member)}" ${index === order.length - 1 ? "disabled" : ""}>${icon("arrow", "rotate-down")}</button></div></div>`).join("");
    return `${heading(`Groupe · ${escapeHtml(group.name)}`, "Tours et ordre de passage", "Visualisez les bénéficiaires à venir et ajustez leur ordre.", `<button class="button button-secondary" data-action="back-to-group">${icon("back")} Retour au groupe</button>`)}
      <div class="cycle-overview"><div class="card cycle-current"><span class="stat-icon">${icon("clock")}</span><div><small>Tour en cours</small><strong>${Math.min(group.cycle, group.totalCycles)} <span>/ ${group.totalCycles}</span></strong></div><span class="status pending">${group.paid} / ${group.members.length} cotisations</span></div><div class="card cycle-current"><span class="stat-icon">${icon("calendar")}</span><div><small>Prochaine date</small><strong>${formatDate(group.nextDate, { day: "numeric", month: "long" })}</strong></div><span class="page-subtitle">${escapeHtml(group.frequency || "Chaque mois")}</span></div></div>
      <div class="cycles-layout"><section class="card panel"><div class="panel-heading"><div><h2>Prochains bénéficiaires</h2><p class="page-subtitle" style="margin-top:5px">L’ordre actuel, à partir du prochain tour</p></div><span class="status">${cyclesRemaining} tours restants</span></div><div class="cycle-list">${cycleRows || `<div class="empty-state">Tous les tours de cette tontine sont terminés.</div>`}</div></section>
      <section class="card panel"><div class="panel-heading"><div><h2>Ordre de passage</h2><p class="page-subtitle" style="margin-top:5px">Utilisez les flèches pour réorganiser la liste.</p></div></div><div class="order-list">${editableOrder}</div><p class="form-error" id="order-error" role="alert"></p><button class="button button-primary order-save" data-action="save-order">${icon("check")} Enregistrer l’ordre</button></section></div>`;
  }

  function analyticsPage() {
    const groups = state.analyticsGroup === "all" ? state.groups : state.groups.filter((group) => group.id === state.analyticsGroup);
    const entries = groups.flatMap((group) => groupHistory(group).map((entry) => ({ ...entry, group })));
    const total = entries.reduce((sum, entry) => sum + Number(entry.amount), 0);
    const memberCount = groups.reduce((sum, group) => sum + group.members.length, 0);
    const groupTotals = groups.map((group) => ({ group, total: groupHistory(group).reduce((sum, entry) => sum + Number(entry.amount), 0) }))
      .sort((a, b) => b.total - a.total);
    const weeks = Array.from({ length: 6 }, (_, index) => {
      const end = new Date(today);
      end.setDate(end.getDate() - (5 - index) * 7);
      const start = new Date(end);
      start.setDate(start.getDate() - 6);
      const amount = entries.filter((entry) => {
        const date = new Date(`${entry.date}T12:00:00`);
        return date >= start && date <= end;
      }).reduce((sum, entry) => sum + Number(entry.amount), 0);
      return { start, amount };
    });
    const maxWeek = Math.max(1, ...weeks.map((week) => week.amount));
    const distribution = groupTotals.map(({ group, total: amount }) => `<div class="analytics-group"><div class="analytics-group-top"><span class="group-label">${groupIcon(group)}<strong>${escapeHtml(group.name)}</strong></span><b>${money(amount)}</b></div><div class="progress"><span style="width:${total ? Math.round(amount / total * 100) : 0}%"></span></div><small>${total ? Math.round(amount / total * 100) : 0}% de l’épargne enregistrée</small></div>`).join("");
    return `${heading("Vue d’ensemble de l’épargne", "Statistiques et rapports", "Mesurez les cotisations enregistrées dans vos tontines.", `<button class="button button-secondary" data-action="export-history">Exporter le rapport CSV</button>`)}
      <div class="toolbar"><span class="page-subtitle">Périmètre du rapport</span><select class="filter-select" data-analytics-group aria-label="Filtrer les statistiques"><option value="all" ${state.analyticsGroup === "all" ? "selected" : ""}>Toutes les tontines</option>${state.groups.map((group) => `<option value="${escapeHtml(group.id)}" ${state.analyticsGroup === group.id ? "selected" : ""}>${escapeHtml(group.name)}</option>`).join("")}</select></div>
      <div class="stats-grid analytics-stats"><article class="card stat-card"><div class="stat-top"><span>Total des cotisations</span><span class="stat-icon">${icon("wallet")}</span></div><p class="stat-value">${money(total)}</p><p class="stat-foot">${entries.length} versements enregistrés</p></article><article class="card stat-card"><div class="stat-top"><span>Groupes suivis</span><span class="stat-icon">${icon("users")}</span></div><p class="stat-value">${groups.length}</p><p class="stat-foot">sur ${state.groups.length} tontines</p></article><article class="card stat-card"><div class="stat-top"><span>Membres cumulés</span><span class="stat-icon">${icon("user")}</span></div><p class="stat-value">${memberCount}</p><p class="stat-foot">dans les groupes sélectionnés</p></article><article class="card stat-card"><div class="stat-top"><span>Cotisation moyenne</span><span class="stat-icon">${icon("trend")}</span></div><p class="stat-value">${money(entries.length ? Math.round(total / entries.length) : 0)}</p><p class="stat-foot">par versement enregistré</p></article></div>
      <div class="analytics-layout"><section class="card panel"><div class="panel-heading"><div><h2>Activité des 6 dernières semaines</h2><p class="page-subtitle" style="margin-top:5px">Montant des versements confirmés</p></div></div><div class="weekly-chart" role="img" aria-label="Graphique des cotisations enregistrées par semaine">${weeks.map((week) => `<div class="week-column"><span class="week-amount">${week.amount ? money(week.amount) : "—"}</span><div class="week-bar-wrap"><div class="week-bar" style="height:${week.amount ? Math.max(5, Math.round(week.amount / maxWeek * 100)) : 2}%"></div></div><small>${new Intl.DateTimeFormat("fr-FR", { day: "numeric", month: "short" }).format(week.start)}</small></div>`).join("")}</div></section>
      <section class="card panel"><div class="panel-heading"><div><h2>Répartition par tontine</h2><p class="page-subtitle" style="margin-top:5px">Cumul des versements connus</p></div></div><div class="analytics-groups">${distribution || `<div class="empty-state">Aucune donnée disponible.</div>`}</div></section></div>
      <section class="card panel section-gap"><div class="panel-heading"><div><h2>Résumé des groupes</h2><p class="page-subtitle" style="margin-top:5px">Progression et contributions enregistrées</p></div></div><div class="table-wrap"><table><thead><tr><th>TONTINE</th><th>MEMBRES</th><th>TOUR EN COURS</th><th>COTISATIONS</th><th>TOTAL ENREGISTRÉ</th></tr></thead><tbody>${groups.map((group) => `<tr><td><strong>${escapeHtml(group.name)}</strong></td><td>${group.members.length}</td><td>${Math.min(group.cycle, group.totalCycles)} / ${group.totalCycles}</td><td>${groupHistory(group).length}</td><td><strong>${money(groupHistory(group).reduce((sum, entry) => sum + Number(entry.amount), 0))}</strong></td></tr>`).join("") || `<tr><td colspan="5">Aucune tontine à afficher.</td></tr>`}</tbody></table></div></section>`;
  }

  function wizardPage() {
    const step = state.wizardStep;
    const stepLabels = ["Le groupe", "Les cotisations", "Les membres"];
    const steps = stepLabels.map((label, index) => `<div class="step ${step === index + 1 ? "active" : step > index + 1 ? "done" : ""}"><span class="step-number">${step > index + 1 ? icon("check") : index + 1}</span><span>${label}</span></div>`).join("");
    const content = step === 1
      ? `<div class="form-heading"><h2>Parlez-nous de votre groupe</h2><p>Un nom reconnaissable aidera les membres à retrouver facilement leur tontine.</p></div><div class="form-grid"><div class="field full"><label for="group-name">Nom de la tontine</label><input id="group-name" name="name" required maxlength="48" placeholder="Ex. Famille Nguemo" value="${escapeHtml(state.draft.name || "")}"></div><div class="field"><label for="group-kind">Type de groupe</label><select id="group-kind" name="kind"><option value="Familiale" ${state.draft.kind === "Familiale" ? "selected" : ""}>Familiale</option><option value="Entre amis" ${state.draft.kind === "Entre amis" ? "selected" : ""}>Entre amis</option><option value="Professionnelle" ${state.draft.kind === "Professionnelle" ? "selected" : ""}>Professionnelle</option><option value="Quartier" ${state.draft.kind === "Quartier" ? "selected" : ""}>Quartier</option></select></div><div class="field"><label for="group-start">Date de démarrage</label><input id="group-start" type="date" name="startDate" value="${escapeHtml(state.draft.startDate || dateIn(7))}"></div><div class="field full"><label for="group-description">Description <span>(facultatif)</span></label><textarea id="group-description" name="description" maxlength="180" placeholder="Ajoutez quelques mots pour présenter votre projet">${escapeHtml(state.draft.description || "")}</textarea></div></div>`
      : step === 2
        ? `<div class="form-heading"><h2>Définissez les règles de la tontine</h2><p>Précisez le montant et la fréquence des cotisations. Vous pourrez les partager avec le groupe.</p></div><div class="form-grid"><div class="field"><label for="amount">Cotisation par membre (FCFA)</label><input id="amount" name="amount" type="number" min="500" step="500" required placeholder="Ex. 25 000" value="${escapeHtml(state.draft.amount || "")}"><small class="field-hint">Minimum : 500 FCFA</small></div><div class="field"><label for="frequency">Fréquence des cotisations</label><select id="frequency" name="frequency"><option value="Chaque semaine">Chaque semaine</option><option value="Toutes les 2 semaines">Toutes les 2 semaines</option><option value="Chaque mois" selected>Chaque mois</option></select></div><div class="field"><label for="members-count">Nombre total de membres</label><input id="members-count" name="totalMembers" type="number" min="2" max="50" required placeholder="Ex. 8" value="${escapeHtml(state.draft.totalMembers || "6")}"><small class="field-hint">Entre 2 et 50 membres</small></div><div class="field"><label for="beneficiary">Ordre de passage</label><select id="beneficiary" name="order"><option value="Tirage au sort">Tirage au sort</option><option value="Ordre défini par l’administrateur">Ordre défini par l’administrateur</option></select></div></div>`
        : `<div class="form-heading"><h2>Invitez les membres de votre groupe</h2><p>Ajoutez les premiers participants. Vous pourrez aussi partager un lien d’invitation plus tard.</p></div><div class="field full"><label for="members-list">Noms des membres <span>(séparés par une virgule)</span></label><textarea id="members-list" name="members" placeholder="Ex. Marc Nguemo, Sarah Nguemo, Paul Nguemo">${escapeHtml(state.draft.members || "")}</textarea><small class="field-hint">Vous serez ajouté automatiquement comme administrateur et premier membre.</small></div><div class="summary-box section-gap"><div class="summary-row"><span>Votre cotisation</span><strong>${state.draft.amount ? money(state.draft.amount) : "À définir"}</strong></div><div class="summary-row"><span>Fréquence</span><strong>${escapeHtml(state.draft.frequency || "Chaque mois")}</strong></div><div class="summary-row"><span>Membres prévus</span><strong>${escapeHtml(state.draft.totalMembers || "6")}</strong></div></div>`;
    return `${heading("Configuration", "Créer une tontine", "Quelques étapes suffisent pour mettre votre groupe en place.")}<div class="card form-card"><div class="stepper">${steps}</div><form id="wizard-form" novalidate>${content}<p class="form-error" id="form-error" role="alert"></p><div class="form-actions">${step > 1 ? `<button class="button button-secondary" type="button" data-action="wizard-back">${icon("back")} Précédent</button>` : `<button class="button button-secondary" type="button" data-nav="tontines">Annuler</button>`}<button class="button button-primary" type="submit">${step < 3 ? "Continuer" : "Créer ma tontine"} ${icon("arrow")}</button></div></form></div>`;
  }

  function contributionPage() {
    const group = selectedGroup();
    if (!group) return tontinesPage();
    return `${heading("Suivi des cotisations", "Enregistrer une cotisation", `Ajoutez un versement au groupe « ${escapeHtml(group.name)} ».`)}<div class="card form-card"><div class="form-heading"><h2>Détails du versement</h2><p>Cette information sera ajoutée à l’historique local de la tontine.</p></div><form id="contribution-form" novalidate><div class="form-grid"><div class="field full"><label for="member">Membre concerné</label><select id="member" name="member">${group.members.map((member) => `<option value="${escapeHtml(member)}" ${member === currentUser.name ? "selected" : ""}>${escapeHtml(member)}</option>`).join("")}</select></div><div class="field"><label for="contribution-amount">Montant versé (FCFA)</label><input id="contribution-amount" type="number" name="amount" min="1" required value="${group.contribution}"></div><div class="field"><label for="contribution-date">Date du versement</label><input id="contribution-date" type="date" name="date" required value="${dateIn(0)}"></div><div class="field full"><label for="contribution-note">Note <span>(facultatif)</span></label><input id="contribution-note" name="note" maxlength="100" placeholder="Ex. Cotisation du tour 3"></div></div><p class="form-error" id="form-error" role="alert"></p><div class="form-actions"><button class="button button-secondary" type="button" data-action="detail-back">${icon("back")} Annuler</button><button class="button button-primary" type="submit">${icon("check")} Enregistrer le versement</button></div></form></div>`;
  }

  function profilePage() {
    return `${heading("Votre espace", "Mon profil", "Gérez vos informations et vos préférences de compte.")}
      <div class="profile-grid"><section class="card profile-card"><h2>Informations personnelles</h2><div class="profile-info"><div><small>Nom complet</small><strong>${escapeHtml(currentUser.name)}</strong></div><div><small>Téléphone</small><strong>${escapeHtml(currentUser.phone)}</strong></div><div><small>Ville</small><strong>${escapeHtml(currentUser.city)}</strong></div><div><small>Rôle</small><strong>Administratrice</strong></div></div><button class="button button-secondary section-gap" data-action="edit-profile">Modifier mes informations</button></section>
      <section class="card profile-card"><h2>Préférences</h2><div class="setting-row"><div><strong>Mode sombre</strong><small>Réduire la luminosité de l’écran</small></div><button class="toggle ${state.theme === "dark" ? "on" : ""}" aria-label="Activer le mode sombre" aria-pressed="${state.theme === "dark"}" data-action="toggle-theme"></button></div><div class="setting-row"><div><strong>Rappels d’échéance</strong><small>Recevoir un rappel avant chaque cotisation</small></div><button class="toggle ${state.preferences.reminders ? "on" : ""}" aria-label="Activer les rappels" aria-pressed="${state.preferences.reminders}" data-action="toggle-preference" data-preference="reminders"></button></div><div class="setting-row"><div><strong>Notifications de groupe</strong><small>Être informée des versements et des tours</small></div><button class="toggle ${state.preferences.groupNotifications ? "on" : ""}" aria-label="Activer les notifications" aria-pressed="${state.preferences.groupNotifications}" data-action="toggle-preference" data-preference="groupNotifications"></button></div><div class="setting-row"><div><strong>Confidentialité</strong><small>Vos données restent sur cet appareil</small></div>${icon("help")}</div></section>
      <section class="card profile-card"><h2>À propos de TontineCM</h2><p class="page-subtitle">Une gestion plus claire et plus sereine de vos tontines, pensée pour vos groupes au Cameroun.</p><p class="page-subtitle section-gap">Version prototype frontend · Mode hors ligne</p></section>
      <section class="card profile-card"><h2>Session</h2><p class="page-subtitle">Vous utilisez une session de démonstration sur cet appareil.</p><button class="button button-danger section-gap" data-action="logout">Se déconnecter</button></section></div>`;
  }

  function authPage() {
    const mode = state.authMode;
    const titles = { login: "Ravi de vous revoir", register: "Créer votre compte", forgot: "Mot de passe oublié ?" };
    const subtitles = {
      login: "Connectez-vous pour retrouver vos groupes et vos échéances.",
      register: "Rejoignez TontineCM et gérez vos tontines en toute simplicité.",
      forgot: "Indiquez votre numéro de téléphone pour réinitialiser votre accès.",
    };
    return `<main class="auth-screen"><aside class="auth-aside"><div class="brand"><span class="brand-mark">T</span><span>Tontine<span>CM</span></span></div><div class="auth-message"><h1>Ensemble, on épargne mieux.</h1><p>Le suivi simple et transparent de vos tontines. Chaque contribution compte, chaque tour est clair.</p></div><div class="auth-foot">© 2026 TontineCM · Conçu pour le Cameroun</div></aside><section class="auth-main"><div class="auth-form"><div class="brand mobile-brand"><span class="brand-mark">T</span><span>Tontine<span>CM</span></span></div><h2>${titles[mode]}</h2><p>${subtitles[mode]}</p><form id="auth-form" novalidate>${mode === "register" ? `<div class="field"><label for="auth-name">Nom complet</label><input id="auth-name" name="name" autocomplete="name" required placeholder="Ex. Léonie Nguemo"></div>` : ""}
      <div class="field"><label for="auth-phone">Numéro de téléphone</label><input id="auth-phone" name="phone" autocomplete="tel" inputmode="tel" required placeholder="+237 6XX XX XX XX"></div>
      ${mode !== "forgot" ? `<div class="field"><label for="auth-password">Mot de passe</label><input id="auth-password" name="password" type="password" autocomplete="${mode === "login" ? "current-password" : "new-password"}" minlength="8" required placeholder="8 caractères minimum"></div>` : ""}
      <p class="form-error" id="form-error" role="alert"></p><button class="button button-primary" type="submit">${mode === "login" ? "Se connecter" : mode === "register" ? "Créer mon compte" : "Envoyer les instructions"} ${icon("arrow")}</button></form>
      ${mode === "login" ? `<p class="auth-switch"><button data-auth-mode="forgot">Mot de passe oublié ?</button></p><p class="auth-switch">Pas encore de compte ? <button data-auth-mode="register">Créer un compte</button></p>` : `<p class="auth-switch"><button data-auth-mode="login">${icon("back")} Retour à la connexion</button></p>`}
      <div class="auth-note">Prototype frontend : aucune authentification réelle ni transmission de données. Utilisez le mode démo pour découvrir les écrans.</div></div></section></main>`;
  }

  function passwordResetSentPage() {
    return `<main class="auth-screen"><aside class="auth-aside"><div class="brand"><span class="brand-mark">T</span><span>Tontine<span>CM</span></span></div><div class="auth-message"><h1>Un accès serein à vos tontines.</h1><p>Votre épargne collective, organisée et transparente.</p></div><div class="auth-foot">© 2026 TontineCM · Conçu pour le Cameroun</div></aside><section class="auth-main"><div class="auth-form"><div class="auth-success-mark">${icon("check")}</div><p class="eyebrow">Demande prise en compte</p><h2>Vérifiez votre téléphone</h2><p>Si ce numéro est associé à un compte, vous recevrez les instructions pour réinitialiser votre mot de passe.</p><div class="auth-note">Mode démonstration : aucun SMS réel n’est envoyé.</div><button class="button button-primary" data-action="open-login">Retour à la connexion ${icon("arrow")}</button></div></section></main>`;
  }

  function render() {
    document.documentElement.classList.toggle("dark-mode", state.theme === "dark");
    if (state.screen === "welcome") root.innerHTML = welcomePage();
    else if (state.screen === "login") root.innerHTML = authPage();
    else if (state.screen === "forgotSent") root.innerHTML = passwordResetSentPage();
    else {
      const titles = { home: "Accueil", tontines: "Mes tontines", deadlines: "Échéances", profile: "Profil", create: "Créer une tontine", detail: "Détails de la tontine", contribute: "Enregistrer une cotisation", history: "Historique", notifications: "Notifications", help: "Aide", editProfile: "Modifier le profil", members: "Membres", cycles: "Tours", analytics: "Statistiques" };
      const body = {
        home: dashboard,
        tontines: tontinesPage,
        deadlines: deadlinesPage,
        profile: profilePage,
        create: wizardPage,
        detail: detailPage,
        contribute: contributionPage,
        history: historyPage,
        notifications: notificationsPage,
        help: helpPage,
        editProfile: editProfilePage,
        members: membersPage,
        cycles: cyclesPage,
        analytics: analyticsPage,
      }[state.screen]?.() || dashboard();
      root.innerHTML = appLayout(body, titles[state.screen] || "Accueil");
    }
    bindEvents();
    const frequency = root.querySelector("#frequency");
    if (frequency && state.draft.frequency) frequency.value = state.draft.frequency;
    const order = root.querySelector("#beneficiary");
    if (order && state.draft.order) order.value = state.draft.order;
  }

  function bindEvents() {
    root.querySelectorAll("[data-nav]").forEach((button) => button.addEventListener("click", () => go(button.dataset.nav)));
    root.querySelectorAll("[data-open-group]").forEach((element) => {
      const open = () => { state.selectedId = element.dataset.openGroup; state.screen = "detail"; render(); };
      element.addEventListener("click", open);
      element.addEventListener("keydown", (event) => {
        if (event.key === "Enter" || event.key === " ") { event.preventDefault(); open(); }
      });
    });
    root.querySelectorAll("[data-action]").forEach((button) => button.addEventListener("click", () => handleAction(button.dataset.action, button)));
    root.querySelectorAll("[data-auth-mode]").forEach((button) => button.addEventListener("click", () => {
      state.authMode = button.dataset.authMode;
      render();
    }));
    root.querySelector("[data-search]")?.addEventListener("input", (event) => {
      const position = event.target.selectionStart;
      state.search = event.target.value;
      render();
      const input = root.querySelector("[data-search]");
      input.focus();
      input.setSelectionRange(position, position);
    });
    root.querySelector("[data-filter-groups]")?.addEventListener("change", (event) => {
      state.groupFilter = event.target.value;
      render();
    });
    root.querySelector("[data-search-members]")?.addEventListener("input", (event) => {
      const position = event.target.selectionStart;
      state.memberSearch = event.target.value;
      render();
      const input = root.querySelector("[data-search-members]");
      input.focus();
      input.setSelectionRange(position, position);
    });
    root.querySelector("[data-analytics-group]")?.addEventListener("change", (event) => {
      state.analyticsGroup = event.target.value;
      render();
    });
    root.querySelectorAll("[data-order-move]").forEach((button) => button.addEventListener("click", () => moveOrderMember(button)));
    root.querySelectorAll("[data-remove-member]").forEach((button) => button.addEventListener("click", () => removeGroupMember(button)));
    root.querySelector("#wizard-form")?.addEventListener("submit", handleWizardSubmit);
    root.querySelector("#contribution-form")?.addEventListener("submit", handleContributionSubmit);
    root.querySelector("#auth-form")?.addEventListener("submit", handleAuthSubmit);
    root.querySelector("#profile-form")?.addEventListener("submit", handleProfileSubmit);
    root.querySelector("#member-form")?.addEventListener("submit", handleMemberSubmit);
  }

  function handleAction(action, button) {
    if (action === "create") { state.screen = "create"; state.wizardStep = 1; state.draft = {}; render(); }
    if (action === "contribute") { state.screen = "contribute"; render(); }
    if (action === "detail-back") { state.screen = "detail"; render(); }
    if (action === "history-back") { state.screen = "detail"; render(); }
    if (action === "back-to-group") { state.screen = "detail"; state.memberSearch = ""; state.orderDraft = []; render(); }
    if (action === "open-members") { state.screen = "members"; state.memberSearch = ""; render(); }
    if (action === "open-cycles") { state.orderDraft = getRotationOrder(selectedGroup() || { members: [], nextMember: "" }); state.screen = "cycles"; render(); }
    if (action === "open-analytics") { state.analyticsGroup = selectedGroup()?.id || "all"; state.screen = "analytics"; render(); }
    if (action === "save-order") saveRotationOrder();
    if (action === "wizard-back") { collectWizardDraft(); state.wizardStep = Math.max(1, state.wizardStep - 1); render(); }
    if (action === "logout") { persistLogin(false); go("welcome"); }
    if (action === "notifications") { go("notifications"); }
    if (action === "copy-invite") { state.screen = "members"; state.memberSearch = ""; render(); }
    if (action === "show-history") { state.screen = "history"; render(); }
    if (action === "export-history") exportHistory();
    if (action === "help" || action === "open-help") go("help");
    if (action === "help-email") showToast("L’assistance en ligne n’est pas activée dans cette démo.");
    if (action === "edit-profile") { state.screen = "editProfile"; render(); }
    if (action === "open-login") { state.authMode = "login"; state.screen = "login"; render(); }
    if (action === "open-register") { state.authMode = "register"; state.screen = "login"; render(); }
    if (action === "toggle-preference") {
      const key = button.dataset.preference;
      if (Object.hasOwn(state.preferences, key)) {
        state.preferences[key] = !state.preferences[key];
        try {
          localStorage.setItem("tontinecm.preferences", JSON.stringify(state.preferences));
        } catch (error) {
          console.error("Impossible d’enregistrer les préférences locales.", error);
          showToast("Préférence modifiée, mais elle ne peut pas être enregistrée.");
        }
        render();
        showToast(state.preferences[key] ? "Préférence activée." : "Préférence désactivée.");
      }
    }
    if (action === "toggle-theme") {
      state.theme = state.theme === "dark" ? "light" : "dark";
      try {
        localStorage.setItem("tontinecm.theme", state.theme);
      } catch (error) {
        console.error("Impossible d’enregistrer la préférence de thème.", error);
        showToast("Thème appliqué, mais la préférence ne peut pas être enregistrée.");
      }
      render();
      if (state.theme === "dark") showToast("Mode sombre activé.");
    }
  }

  function showError(message) {
    const error = root.querySelector("#form-error");
    if (!error) return;
    error.textContent = message;
    error.classList.add("visible");
  }

  function handleMemberSubmit(event) {
    event.preventDefault();
    const group = selectedGroup();
    if (!group) return showError("Tontine introuvable. Revenez à vos groupes et réessayez.");
    const data = Object.fromEntries(new FormData(event.currentTarget).entries());
    const name = String(data.name || "").trim();
    if (!name) return showError("Saisissez le nom du nouveau membre.");
    if (group.members.length >= 50) return showError("Une tontine ne peut pas dépasser 50 membres.");
    if (group.members.some((member) => member.toLocaleLowerCase() === name.toLocaleLowerCase())) return showError("Ce membre figure déjà dans la tontine.");
    group.members.push(name);
    group.memberContacts = { ...(group.memberContacts || {}), ...(String(data.phone || "").trim() ? { [name]: String(data.phone).trim() } : {}) };
    group.order = getRotationOrder(group);
    group.totalCycles = Math.max(group.totalCycles, group.members.length);
    state.orderDraft = [];
    persistGroups();
    render();
    showToast(`${name} a été ajouté à la tontine.`);
  }

  function removeGroupMember(button) {
    const group = selectedGroup();
    if (!group) return;
    const index = Number(button.dataset.removeMember);
    const name = group.members[index];
    if (!name || name === currentUser.name) return showToast("L’administratrice ne peut pas être retirée du groupe.");
    if (name === group.nextMember || groupHistory(group).some((entry) => entry.member === name)) {
      return showToast("Ce membre a déjà un engagement dans la tontine et ne peut pas être retiré.");
    }
    group.members.splice(index, 1);
    group.order = getRotationOrder(group).filter((member) => member !== name);
    group.totalCycles = Math.max(group.cycle, group.members.length);
    group.paid = new Set(groupHistory(group).filter((entry) => entry.cycle === group.cycle).map((entry) => entry.member)).size;
    persistGroups();
    render();
    showToast(`${name} a été retiré de la tontine.`);
  }

  function moveOrderMember(button) {
    const index = Number(button.dataset.orderMove);
    const target = index + Number(button.dataset.direction);
    if (target < 0 || target >= state.orderDraft.length) return;
    [state.orderDraft[index], state.orderDraft[target]] = [state.orderDraft[target], state.orderDraft[index]];
    render();
  }

  function saveRotationOrder() {
    const group = selectedGroup();
    const error = root.querySelector("#order-error");
    if (!group || state.orderDraft.length !== group.members.length || new Set(state.orderDraft).size !== group.members.length) {
      if (error) {
        error.textContent = "L’ordre doit inclure chaque membre une seule fois.";
        error.classList.add("visible");
      }
      return;
    }
    group.order = [...state.orderDraft];
    group.nextMember = group.order[0];
    persistGroups();
    state.orderDraft = [];
    render();
    showToast("L’ordre de passage a été enregistré.");
  }

  function collectWizardDraft() {
    const form = root.querySelector("#wizard-form");
    if (!form) return;
    for (const [key, value] of new FormData(form).entries()) state.draft[key] = value;
  }

  function handleWizardSubmit(event) {
    event.preventDefault();
    const data = Object.fromEntries(new FormData(event.currentTarget).entries());
    if (state.wizardStep === 1 && !String(data.name || "").trim()) return showError("Donnez un nom à votre tontine pour continuer.");
    if (state.wizardStep === 2 && (Number(data.amount) < 500 || !Number.isInteger(Number(data.totalMembers)) || Number(data.totalMembers) < 2 || Number(data.totalMembers) > 50)) {
      return showError("Vérifiez le montant (minimum 500 FCFA) et le nombre de membres (2 à 50).");
    }
    Object.assign(state.draft, data);
    if (state.wizardStep < 3) {
      state.wizardStep += 1;
      render();
      return;
    }
    const invited = String(data.members || "").split(",").map((member) => member.trim()).filter(Boolean);
    const members = [currentUser.name, ...invited].slice(0, Number(state.draft.totalMembers) || 6);
    const group = {
      id: `g-${Date.now()}`,
      name: String(state.draft.name).trim(),
      kind: state.draft.kind || "Entre amis",
      contribution: Number(state.draft.amount),
      members,
      order: [...members.slice(1), members[0]],
      nextDate: state.draft.startDate || dateIn(7),
      nextMember: members[1] || currentUser.name,
      cycle: 1,
      paid: 0,
      totalCycles: members.length,
      plannedMembers: Number(state.draft.totalMembers) || members.length,
      frequency: state.draft.frequency || "Chaque mois",
      description: String(state.draft.description || "").trim(),
      color: ["", "gold", "rose"][state.groups.length % 3],
      history: [],
    };
    state.groups.unshift(group);
    persistGroups();
    state.selectedId = group.id;
    state.screen = "detail";
    state.activeTab = "tontines";
    state.wizardStep = 1;
    state.draft = {};
    render();
    showToast("Votre tontine a été créée.");
  }

  function handleContributionSubmit(event) {
    event.preventDefault();
    const group = selectedGroup();
    if (!group) return showError("Tontine introuvable. Revenez à vos groupes et réessayez.");
    const data = Object.fromEntries(new FormData(event.currentTarget).entries());
    const amount = Number(data.amount);
    if (!Number.isFinite(amount) || amount <= 0) return showError("Saisissez un montant valide supérieur à zéro.");
    if (!group.members.includes(data.member)) return showError("Sélectionnez un membre de cette tontine.");
    if (!data.date || data.date > dateIn(0)) return showError("La date du versement ne peut pas être dans le futur.");
    if (groupHistory(group).some((entry) => entry.member === data.member && entry.cycle === group.cycle)) return showError("Une cotisation est déjà enregistrée pour ce membre et ce tour.");
    group.history.unshift({ member: data.member, amount, date: data.date, cycle: group.cycle, note: String(data.note || "").trim() || `Cotisation du cycle ${group.cycle}` });
    group.paid = new Set(group.history.filter((entry) => entry.cycle === group.cycle).map((entry) => entry.member)).size;
    const completedCycle = group.paid === group.members.length;
    if (completedCycle && group.cycle < group.totalCycles) {
      const nextOrder = getRotationOrder(group);
      group.order = [...nextOrder.slice(1), nextOrder[0]];
      group.cycle += 1;
      group.paid = 0;
      group.nextMember = group.order[0];
      group.nextDate = addFrequency(group.nextDate, group.frequency || "Chaque mois");
    } else if (completedCycle) {
      group.cycle = group.totalCycles + 1;
    }
    persistGroups();
    state.screen = "detail";
    render();
    showToast(completedCycle ? (isGroupComplete(group) ? "Dernier tour terminé : tontine achevée." : "Tour terminé. Le bénéficiaire suivant a été planifié.") : "Cotisation ajoutée à l’historique.");
  }

  function handleProfileSubmit(event) {
    event.preventDefault();
    const data = Object.fromEntries(new FormData(event.currentTarget).entries());
    const name = String(data.name || "").trim();
    const phone = String(data.phone || "").trim();
    const city = String(data.city || "").trim();
    if (!name || !phone || !city) return showError("Renseignez votre nom, votre téléphone et votre ville.");
    const previousName = currentUser.name;
    currentUser = { name, phone, city };
    updateMemberDisplayName(previousName, name);
    persistProfile();
    state.screen = "profile";
    render();
    showToast("Votre profil a été mis à jour.");
  }

  function exportHistory() {
    const groups = state.screen === "analytics" && state.analyticsGroup !== "all"
      ? state.groups.filter((group) => group.id === state.analyticsGroup)
      : state.groups;
    const rows = [["Groupe", "Membre", "Date", "Description", "Montant FCFA"], ...groups.flatMap((group) => groupHistory(group).map((entry) => [group.name, entry.member, entry.date, entry.note || "Cotisation", entry.amount]))];
    const csv = `\uFEFF${rows.map((row) => row.map((value) => `"${String(value).replace(/"/g, '""')}"`).join(";")).join("\r\n")}`;
    const link = document.createElement("a");
    link.href = URL.createObjectURL(new Blob([csv], { type: "text/csv;charset=utf-8" }));
    link.download = "tontinecm-historique.csv";
    link.click();
    const downloadUrl = link.href;
    window.setTimeout(() => URL.revokeObjectURL(downloadUrl), 1000);
    showToast("L’historique CSV a été préparé.");
  }

  function handleAuthSubmit(event) {
    event.preventDefault();
    const data = Object.fromEntries(new FormData(event.currentTarget).entries());
    if (!String(data.phone || "").trim()) return showError("Saisissez votre numéro de téléphone pour continuer.");
    if (state.authMode === "forgot") {
      state.screen = "forgotSent";
      render();
      return;
    }
    if (state.authMode === "register" && !String(data.name || "").trim()) return showError("Indiquez votre nom complet.");
    if (String(data.password || "").length < 8) return showError("Le mot de passe doit contenir au moins 8 caractères.");
    if (state.authMode === "register") {
      updateMemberDisplayName(currentUser.name, String(data.name).trim());
      currentUser = { ...currentUser, name: String(data.name).trim(), phone: String(data.phone).trim() };
      persistProfile();
    }
    persistLogin(true);
    state.screen = "home";
    state.activeTab = "home";
    render();
    showToast(state.authMode === "register" ? "Votre espace de démonstration est prêt." : "Bienvenue dans votre espace de démonstration.");
  }

  render();
})();
