document.addEventListener('DOMContentLoaded', function () {
  const registerButton = document.getElementById('register-button');
  const registrationForm = document.getElementById('registration-form');
  const registrationSection = document.getElementById('registration');
  const dashboardSection = document.getElementById('dashboard');
  const calendarButton = document.getElementById('calendarButton');
  const createEventButton = document.getElementById('createEventButton');
  const deleteEventButton = document.getElementById('deleteEventButton');
  const calendarContainer = document.getElementById('calendarContainer');
  const adminButton = document.getElementById('admin-button');
  const adminLoginForm = document.getElementById('admin-login-form');
  const adminLoginSection = document.getElementById('admin-login');
  const adminPanel = document.getElementById('adminPanel');
  const createMemberButton = document.getElementById('createMemberButton');
  const createMemberForm = document.getElementById('createMemberForm');
  const newMemberForm = document.getElementById('newMemberForm');
  const loggedInUserSpan = document.getElementById('loggedInUser');
  const logoutButton = document.getElementById('logout-button');
  const activeMemberList = document.getElementById('activeMemberList');
  const deletedMemberList = document.getElementById('deletedMemberList');
  const adminList = document.getElementById('adminList');
  const contactButton = document.getElementById('contact-button');

  let selectedEvent = null;

  // Members list
  let members = [
    { username: "Elias", password: "Mutter" },
    { username: "Leon", password: "Schumacher" },
    { username: "Tobias", password: "Huber" },
    { username: "Carina", password: "Schume" },
    { username: "Florian", password: "Fuerst" },
    { username: "Marcel", password: "Eder" },
    { username: "Alina", password: "eder" } // Alina Eder Added
  ];

  let deletedMembers = [];
  let events = JSON.parse(localStorage.getItem('events')) || [];

  const adminUsers = [
    { username: "Florian", password: "FuerstAdmin" },
    { username: "Marcel", password: "EderAdmin" }
  ];

  function showRegistration() {
    registrationSection.style.display = 'block';
    dashboardSection.style.display = 'none';
    adminLoginSection.style.display = 'none';
  }

  function showAdminLogin() {
    adminLoginSection.style.display = 'block';
    registrationSection.style.display = 'none';
    dashboardSection.style.display = 'none';
  }

  registerButton.addEventListener('click', showRegistration);
  adminButton.addEventListener('click', showAdminLogin);

  registrationForm.addEventListener('submit', function(event) {
    event.preventDefault();

    const username = document.getElementById('username').value;
    const password = document.getElementById('password').value;

    const existingMember = members.find(member => member.username === username && member.password === password);

    if (existingMember) {
      registrationSection.style.display = 'none';
      dashboardSection.style.display = 'block';
      loggedInUserSpan.textContent = username;
      initializeCalendar();
      logoutButton.style.display = 'block';
      updateFinancialInfo();
    } else {
      alert('Falscher Nutzername oder Passwort');
    }
  });

  adminLoginForm.addEventListener('submit', function(event) {
    event.preventDefault();

    const adminUsername = document.getElementById('adminUsername').value;
    const adminPassword = document.getElementById('adminPassword').value;

    const validAdmin = adminUsers.find(admin => admin.username === adminUsername && admin.password === adminPassword);

    if (validAdmin) {
      adminLoginSection.style.display = 'none';
      dashboardSection.style.display = 'block';
      loggedInUserSpan.textContent = adminUsername;
      initializeCalendar();
      adminPanel.style.display = 'block';
      updateMemberCount();
      displayMemberList();
      createEventButton.style.display = 'block';
      deleteEventButton.style.display = 'block';
      logoutButton.style.display = 'block';
      updateFinancialInfo();
    } else {
      alert('Falscher Admin-Nutzername oder Passwort');
    }
  });

  logoutButton.addEventListener('click', function() {
    loggedInUserSpan.textContent = '';
    registrationSection.style.display = 'none';
    dashboardSection.style.display = 'none';
    adminLoginSection.style.display = 'none';
    adminPanel.style.display = 'none';
    logoutButton.style.display = 'none';
    calendarContainer.style.display = 'none';
  });

  function initializeCalendar() {
    const calendarEl = document.getElementById('calendar');
    const calendar = new FullCalendar.Calendar(calendarEl, {
      initialView: 'dayGridMonth',
      locale: 'de',
      events: events,
      eventClick: function(info) {
        alert(`Detailansicht:\n\nTitel: ${info.event.title}\nDatum: ${info.event.start.toLocaleDateString()}\nGrund: ${info.event.extendedProps.reason}`);
        selectedEvent = info.event;
      }
    });
    calendar.render();

    calendarButton.addEventListener('click', function() {
      calendarContainer.style.display = 'block';
    });

    deleteEventButton.addEventListener('click', function() {
      if (selectedEvent) {
        const eventId = selectedEvent.id;
        calendar.getEventById(eventId).remove();
        selectedEvent = null;
        const eventIndex = events.findIndex(event => event.id === eventId);
        if (eventIndex !== -1) {
          events.splice(eventIndex, 1);
          localStorage.setItem('events', JSON.stringify(events)); // Save events to local storage
        }
      }
    });

    createEventButton.addEventListener('click', function() {
      const eventFormHTML = `
        <form id="newEventForm">
          <label for="eventTitle">Titel:</label>
          <input type="text" id="eventTitle" name="eventTitle" required>

          <label for="eventDate">Datum:</label>
          <input type="date" id="eventDate" name="eventDate" required>

          <label for="eventReason">Grund:</label>
          <input type="text" id="eventReason" name="eventReason" required>

          <button type="submit" class="btn">Termin speichern</button>
        </form>
      `;
      calendarContainer.innerHTML = eventFormHTML;
      const newEventForm = document.getElementById('newEventForm');
      newEventForm.addEventListener('submit', function(event) {
        event.preventDefault();
        const title = document.getElementById('eventTitle').value;
        const date = document.getElementById('eventDate').value;
        const reason = document.getElementById('eventReason').value;
        const newEvent = {
          id: Math.random().toString(36).substring(2, 15) + Math.random().toString(36).substring(2, 15),
          title: title,
          start: date,
          extendedProps: {
            reason: reason
          }
        };
        calendar.addEvent(newEvent);
        events.push(newEvent);
        localStorage.setItem('events', JSON.stringify(events)); // Save events to local storage
        newEventForm.reset();
        calendarContainer.innerHTML = '';
        calendarContainer.appendChild(calendarEl);
        calendar.render();
      });
    });
  }

  function updateMemberCount() {
    const memberCountSpan = document.getElementById('memberCount');
    memberCountSpan.textContent = members.length;
  }

  function displayMemberList() {
    activeMemberList.innerHTML = '';
    deletedMemberList.innerHTML = '';
    adminList.innerHTML = '';

    adminUsers.forEach(admin => {
      const adminItem = document.createElement('p');
      adminItem.textContent = admin.username;
      adminList.appendChild(adminItem);
    });

    members.forEach(member => {
      const memberItem = document.createElement('div');
      memberItem.innerHTML = `
        <p>${member.username}</p>
        <button class="delete-member-button btn-small" data-username="${member.username}">Mitglied löschen</button>
      `;
      activeMemberList.appendChild(memberItem);
    });

    deletedMembers.forEach(member => {
      const memberItem = document.createElement('div');
      memberItem.innerHTML = `
        <p>${member.username}</p>
        <button class="forgive-member-button btn-small" data-username="${member.username}">Mitglied verzeihen</button>
      `;
      deletedMemberList.appendChild(memberItem);
    });

    document.querySelectorAll('.delete-member-button').forEach(button => {
      button.addEventListener('click', function() {
        deleteMember(this.dataset.username);
      });
    });

    document.querySelectorAll('.forgive-member-button').forEach(button => {
      button.addEventListener('click', function() {
        forgiveMember(this.dataset.username);
      });
    });
  }

  createMemberButton.addEventListener('click', function() {
    createMemberForm.style.display = 'block';
  });

  function deleteMember(username) {
    const memberToDelete = members.find(member => member.username === username);
    if (memberToDelete) {
      members = members.filter(member => member.username !== username);
      deletedMembers.push(memberToDelete);
      updateMemberCount();
      displayMemberList();
      updateFinancialInfo();
    }
  }

  function forgiveMember(username) {
    const memberToForgive = deletedMembers.find(member => member.username === username);
    if (memberToForgive) {
      deletedMembers = deletedMembers.filter(member => member.username !== username);
      members.push(memberToForgive);
      updateMemberCount();
      displayMemberList();
      updateFinancialInfo();
    }
  }

  newMemberForm.addEventListener('submit', function(event) {
    event.preventDefault();
    const memberUsername = document.getElementById('memberUsername').value;
    const memberPassword = document.getElementById('memberPassword').value;
    const newMember = {
      username: memberUsername,
      password: memberPassword
    };
    members.push(newMember);
    updateMemberCount();
    displayMemberList();
    newMemberForm.reset();
    createMemberForm.style.display = 'none';
    updateFinancialInfo();
  });

  contactButton.addEventListener('click', function() {
    alert('Email: fedabar.official@gmail.com');
  });

  const membershipFeeSpan = document.getElementById('membershipFee');
  const totalIncomeSpan = document.getElementById('totalIncome');

  const membershipFee = 15;

  function updateFinancialInfo() {
    const numMembers = members.length;
    const totalIncome = membershipFee * numMembers;
    totalIncomeSpan.textContent = totalIncome + '€';
  }

  updateFinancialInfo();
});