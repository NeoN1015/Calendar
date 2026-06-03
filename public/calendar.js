document.addEventListener("DOMContentLoaded", function () {
    
    const API_BASE = window.location.hostname === 'localhost' 
        ? 'http://localhost:3000' 
        : 'https://calendar-8mgz.onrender.com';

    const calendarEl = document.getElementById("calendar");
    const eventTable = document.getElementById("eventTable");
    const eventForm = document.getElementById("eventForm");
    const modalTitle = document.getElementById("modalTitle");
    const submitBtn = document.getElementById("submitBtn");
    const cancelBtn = document.getElementById("cancelBtn");
    let isEditMode = false;
    let currentEditId = null;

    // ---------- TOAST MESSAGE ----------
    function showMessage(msg, isError = false) {
        const toast = document.createElement('div');
        toast.className = 'toast';
        toast.style.background = isError ? '#d32f2f' : '#388e3c';
        toast.textContent = msg;
        document.body.appendChild(toast);
        setTimeout(() => toast.remove(), 3000);
    }

    // ---------- FULLCALENDAR ----------
    const calendar = new FullCalendar.Calendar(calendarEl, {
        editable: true,
        droppable: true,
        initialView: "dayGridMonth",
        height: "100%",
        headerToolbar: {
            left: "prev,next today",
            center: "title",
            right: "dayGridMonth,timeGridWeek,timeGridDay"
        },
        events: [],
        eventDisplay: 'block',
        eventColor: '#4a6fa5',
        timeZone: 'local',
        eventTimeFormat: {
            hour: '2-digit',
            minute: '2-digit',
            hour12: true
        },
        eventClick: function(info) {
            openEditModalFromCalendar(info.event);
        },
        eventDrop: function(info) {
            updateEventTimeFromDrag(info.event);
        },
        eventResize: function(info) {
            updateEventTimeFromDrag(info.event);
        }
    });
    calendar.render();

    // ---------- FETCH EVENTS ----------
    function fetchEvents() {
        fetch(API_BASE + "/events")
            .then((res) => res.json())
            .then((events) => {
                eventTable.innerHTML = "";
                calendar.removeAllEvents();

                events.forEach((event) => {
                    addEventToTable(event);
                    
                    const calendarEvent = {
                        id: event.id,
                        title: event.name,
                        extendedProps: {
                            description: event.description || ""
                        },
                        allDay: false
                    };

                    if (event.time) {
                        calendarEvent.start = new Date(`${event.date}T${event.time}`);
                    } else {
                        calendarEvent.start = new Date(event.date);
                        calendarEvent.allDay = true;
                    }
                    
                    if (event.endTime) {
                        calendarEvent.end = new Date(`${event.date}T${event.endTime}`);
                    }
                    
                    calendar.addEvent(calendarEvent);
                });
            })
            .catch((error) => {
                console.error("Error fetching events:", error);
                showMessage("Failed to load events", true);
            });
    }

    // Add event to HTML table
    function addEventToTable(event) {
        let row = eventTable.insertRow();
        row.className = "event-row";
        row.setAttribute('data-id', event.id);
        
        const formattedDate = formatDate(event.date);
        let timeDisplay = event.time ? formatTime(event.time) : "All Day";
        
        if (event.endTime) {
            timeDisplay += ` - ${formatTime(event.endTime)}`;
        }

        row.insertCell(0).textContent = event.name;
        row.insertCell(1).textContent = formattedDate;
        row.insertCell(2).textContent = timeDisplay;
        
        const descCell = row.insertCell(3);
        descCell.className = "description-cell";
        descCell.textContent = event.description || "—";

        const actionCell = row.insertCell(4);
        
        const editButton = document.createElement("button");
        editButton.className = "action-btn edit-btn";
        editButton.textContent = "Edit";
        editButton.addEventListener("click", () => openEditModal(event));
        
        const deleteButton = document.createElement("button");
        deleteButton.className = "action-btn delete-btn";
        deleteButton.textContent = "Delete";
        deleteButton.addEventListener("click", () => deleteEvent(event.id, row));
        
        actionCell.appendChild(editButton);
        actionCell.appendChild(deleteButton);
    }

    // Helpers
    function formatDate(dateString) {
        const eventDate = new Date(dateString);
        return eventDate.toLocaleDateString('en-US', {
            year: 'numeric',
            month: 'short',
            day: 'numeric'
        });
    }

    function formatTime(timeString) {
        if (!timeString) return "";
        const [hours, minutes] = timeString.split(':');
        const hourNum = parseInt(hours);
        const ampm = hourNum >= 12 ? 'PM' : 'AM';
        const displayHours = hourNum % 12 || 12;
        return `${displayHours}:${minutes.padStart(2, '0')} ${ampm}`;
    }

    // Edit modal
    function openEditModal(event) {
        isEditMode = true;
        currentEditId = event.id;
        
        modalTitle.textContent = "Edit Event";
        submitBtn.textContent = "Update Event";
        cancelBtn.style.display = "inline-block";
        
        document.getElementById("eventId").value = event.id;
        document.getElementById("eventName").value = event.name;
        document.getElementById("eventDate").value = event.date;
        document.getElementById("startTime").value = event.time || "";
        document.getElementById("endTime").value = event.endTime || "";
        document.getElementById("eventDescription").value = event.description || "";
        
        document.getElementById("eventModal").style.display = "block";
    }

    function openEditModalFromCalendar(calendarEvent) {
        const event = {
            id: calendarEvent.id,
            name: calendarEvent.title,
            description: calendarEvent.extendedProps.description || "",
        };

        if (calendarEvent.allDay) {
            event.date = calendarEvent.startStr.split('T')[0];
            event.time = "";
            event.endTime = "";
        } else {
            event.date = calendarEvent.startStr.split('T')[0];
            const startTime = new Date(calendarEvent.start);
            event.time = `${String(startTime.getHours()).padStart(2, '0')}:${String(startTime.getMinutes()).padStart(2, '0')}`;
            if (calendarEvent.end) {
                const endTime = new Date(calendarEvent.end);
                event.endTime = `${String(endTime.getHours()).padStart(2, '0')}:${String(endTime.getMinutes()).padStart(2, '0')}`;
            } else {
                event.endTime = "";
            }
        }
        openEditModal(event);
    }

    // Drag & drop update (fixed to use API_BASE)
    function updateEventTimeFromDrag(calendarEvent) {
        const eventId = calendarEvent.id;
        
        let date, time = "", endTime = "";
        const start = calendarEvent.start;
        const end = calendarEvent.end;
        
        date = start.toISOString().split('T')[0];
        const startHours = String(start.getHours()).padStart(2, '0');
        const startMins = String(start.getMinutes()).padStart(2, '0');
        time = `${startHours}:${startMins}`;
        
        if (end) {
            const endHours = String(end.getHours()).padStart(2, '0');
            const endMins = String(end.getMinutes()).padStart(2, '0');
            endTime = `${endHours}:${endMins}`;
        }
        
        const eventData = {
            name: calendarEvent.title,
            date: date,
            time: time,
            endTime: endTime,
            description: calendarEvent.extendedProps.description || ""
        };
        
        // ✅ FIXED: use API_BASE
        fetch(API_BASE + "/events/" + eventId, {
            method: "PUT",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify(eventData)
        })
        .then(response => {
            if (!response.ok) throw new Error("Update failed");
            showMessage("Event time updated");
            fetchEvents();
        })
        .catch(error => {
            console.error("Drag update error:", error);
            showMessage("Failed to update event time", true);
            fetchEvents();
        });
    }

    function resetForm() {
        isEditMode = false;
        currentEditId = null;
        eventForm.reset();
        modalTitle.textContent = "Add New Event";
        submitBtn.textContent = "Add Event";
        cancelBtn.style.display = "none";
    }

    // Form submit (fixed to use API_BASE)
    eventForm.addEventListener("submit", function (e) {
        e.preventDefault();

        const eventData = {
            name: document.getElementById("eventName").value.trim(),
            date: document.getElementById("eventDate").value,
            time: document.getElementById("startTime").value,
            endTime: document.getElementById("endTime").value,
            description: document.getElementById("eventDescription").value.trim()
        };

        if (!eventData.name || !eventData.date) {
            showMessage("Event name and date are required", true);
            return;
        }

        const url = isEditMode 
            ? API_BASE + "/events/" + currentEditId
            : API_BASE + "/events";
        const method = isEditMode ? "PUT" : "POST";

        fetch(url, {
            method: method,
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify(eventData)
        })
        .then(response => {
            if (!response.ok) throw new Error("Server error");
            return response.json();
        })
        .then(() => {
            fetchEvents();
            resetForm();
            document.getElementById("eventModal").style.display = "none";
            showMessage(isEditMode ? "Event updated successfully" : "Event added successfully");
        })
        .catch((error) => {
            console.error("Error:", error);
            showMessage(`Error ${isEditMode ? 'updating' : 'adding'} event`, true);
        });
    });

    // Delete event (fixed to use API_BASE)
    function deleteEvent(eventId, row) {
        if (confirm("Are you sure you want to delete this event?")) {
            fetch(API_BASE + "/events/" + eventId, {
                method: "DELETE"
            })
            .then(response => {
                if (!response.ok) throw new Error("Delete failed");
                showMessage("Event deleted successfully");
                fetchEvents();
            })
            .catch((error) => {
                console.error("Error:", error);
                showMessage("Failed to delete event", true);
            });
        }
    }

    // Modal handling
    const modal = document.getElementById("eventModal");
    document.getElementById("openModalBtn").addEventListener("click", () => {
        resetForm();
        modal.style.display = "block";
    });
    document.querySelector(".close-modal").addEventListener("click", () => {
        modal.style.display = "none";
        resetForm();
    });
    window.addEventListener("click", (e) => {
        if (e.target === modal) {
            modal.style.display = "none";
            resetForm();
        }
    });

    // Help and Members (you've removed these buttons from HTML, so these listeners won't find them – that's fine)
    const helpBtn = document.getElementById('helpBtn');
    const helpPopup = document.getElementById('helpPopup');
    const closeHelp = document.querySelector('.close-help');

    if (helpBtn && helpPopup && closeHelp) {
        helpBtn.addEventListener('click', () => {
            helpPopup.style.display = 'block';
        });
        closeHelp.addEventListener('click', () => {
            helpPopup.style.display = 'none';
        });
        window.addEventListener('click', (e) => {
            if (e.target === helpPopup) {
                helpPopup.style.display = 'none';
            }
        });
    }

    const showMembersBtn = document.getElementById('showMembersBtn');
    const membersList = document.getElementById('membersList');

    if (showMembersBtn && membersList) {
        showMembersBtn.addEventListener('click', () => {
            const isHidden = membersList.style.display === 'none';
            membersList.style.display = isHidden ? 'block' : 'none';
            showMembersBtn.textContent = isHidden ? 'Hide Members' : 'Show Members';
        });
    }

    // Start
    fetchEvents();
});