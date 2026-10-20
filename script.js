/**
 * ==========================================================================
 * NARI RAKSHA - WOMEN SAFETY WEBSITE PROTOTYPE JAVASCRIPT
 * ==========================================================================
 * This file contains pure vanilla JavaScript (ES6+).
 * It manages:
 *   1. Mobile Navigation & Smooth Scrolling
 *   2. SOS Emergency Simulation & Safeguard Countdown
 *   3. Trusted Contacts Directory (Sample Data & State Management)
 *   4. Safety Resources Category Filtering
 *   5. Incident Reporting Form with Comprehensive Validation
 *   6. HTML5 Geolocation API Demo & Mock Fallback
 *   7. Interactive Feedback Toasts & Utility Helpers
 *
 * Beginner Note: Everything here runs strictly inside the user's browser.
 * No external servers, paid APIs, or databases are connected.
 * ==========================================================================
 */

// Wrap all logic in DOMContentLoaded to ensure HTML elements are fully parsed.
document.addEventListener("DOMContentLoaded", () => {
  "use strict";

  // ========================================================================
  // 1. MOBILE NAVIGATION & ACTIVE LINK HIGHLIGHTING
  // ========================================================================
  const navToggle = document.getElementById("nav-toggle");
  const primaryNav = document.getElementById("primary-nav");
  const navLinks = document.querySelectorAll(".nav-link");

  // Toggle mobile navigation menu open/close
  if (navToggle && primaryNav) {
    navToggle.addEventListener("click", () => {
      const isOpen = primaryNav.classList.toggle("is-open");
      navToggle.setAttribute("aria-expanded", isOpen ? "true" : "false");
    });

    // Close menu when clicking on any navigation link
    navLinks.forEach((link) => {
      link.addEventListener("click", () => {
        if (primaryNav.classList.contains("is-open")) {
          primaryNav.classList.remove("is-open");
          navToggle.setAttribute("aria-expanded", "false");
        }
      });
    });

    // Close menu when clicking outside of the navbar
    document.addEventListener("click", (event) => {
      if (
        primaryNav.classList.contains("is-open") &&
        !primaryNav.contains(event.target) &&
        !navToggle.contains(event.target)
      ) {
        primaryNav.classList.remove("is-open");
        navToggle.setAttribute("aria-expanded", "false");
      }
    });
  }

  // Update active navigation link based on scroll position
  const sections = document.querySelectorAll("section[id]");
  const handleScrollActiveNav = () => {
    const scrollPosition = window.pageYOffset + 120;

    sections.forEach((current) => {
      const sectionHeight = current.offsetHeight;
      const sectionTop = current.offsetTop;
      const sectionId = current.getAttribute("id");

      if (
        scrollPosition >= sectionTop &&
        scrollPosition < sectionTop + sectionHeight
      ) {
        navLinks.forEach((link) => {
          link.classList.remove("active");
          if (link.getAttribute("href") === `#${sectionId}`) {
            link.classList.add("active");
          }
        });
      }
    });
  };
  window.addEventListener("scroll", handleScrollActiveNav, { passive: true });

  // Update footer year dynamically
  const yearElement = document.getElementById("current-year");
  if (yearElement) {
    yearElement.textContent = new Date().getFullYear();
  }

  // ========================================================================
  // 2. SOS EMERGENCY DEMO WITH SAFEGUARD COUNTDOWN
  // ========================================================================
  const sosBtn = document.getElementById("sos-btn");
  const sosModal = document.getElementById("sos-modal");
  const cancelSosBtn = document.getElementById("cancel-sos-btn");
  const proceedSosBtn = document.getElementById("proceed-sos-btn");
  const countdownNumber = document.getElementById("countdown-number");
  const countdownText = document.getElementById("countdown-seconds-text");
  const simulationLogList = document.getElementById("simulation-log-list");
  const clearLogBtn = document.getElementById("clear-log-btn");

  let countdownInterval = null;
  let countdownSeconds = 3;

  /**
   * Helper function to add a timestamped entry to the Activity Log.
   * @param {string} message - Message to display
   * @param {string} cssClass - Optional CSS modifier class
   */
  const addLogEntry = (message, cssClass = "") => {
    if (!simulationLogList) return;

    // Remove the initial placeholder item if it exists
    const initialItem = simulationLogList.querySelector(".log-initial");
    if (initialItem) {
      initialItem.remove();
    }

    const now = new Date();
    const timeString = now.toLocaleTimeString([], {
      hour: "2-digit",
      minute: "2-digit",
      second: "2-digit",
    });

    const li = document.createElement("li");
    li.className = "log-item";

    const timeSpan = document.createElement("span");
    timeSpan.className = "log-time";
    timeSpan.textContent = timeString;

    const msgSpan = document.createElement("span");
    msgSpan.className = `log-msg ${cssClass}`.trim();
    msgSpan.textContent = message;

    li.appendChild(timeSpan);
    li.appendChild(msgSpan);

    // Prepend new entry so latest events appear at the top
    simulationLogList.insertBefore(li, simulationLogList.firstChild);
  };

  /**
   * Starts the 3-second simulation safeguard countdown.
   */
  const startSosCountdown = () => {
    countdownSeconds = 3;
    if (countdownNumber) countdownNumber.textContent = countdownSeconds;
    if (countdownText) countdownText.textContent = `${countdownSeconds} seconds`;

    // Clear any previous interval
    if (countdownInterval) clearInterval(countdownInterval);

    countdownInterval = setInterval(() => {
      countdownSeconds -= 1;
      if (countdownNumber) countdownNumber.textContent = countdownSeconds;
      if (countdownText) {
        countdownText.textContent = `${countdownSeconds} second${
          countdownSeconds === 1 ? "" : "s"
        }`;
      }

      if (countdownSeconds <= 0) {
        clearInterval(countdownInterval);
        closeSosModal();
        triggerSimulatedAlert("Completed automatic 3s countdown");
      }
    }, 1000);
  };

  /**
   * Closes the SOS Confirmation Modal and stops timers.
   */
  const closeSosModal = () => {
    if (countdownInterval) {
      clearInterval(countdownInterval);
      countdownInterval = null;
    }
    if (sosModal) {
      sosModal.style.display = "none";
    }
  };

  /**
   * Executes the simulated SOS alert routine with feedback.
   * Clearly reinforces to the user that this is 100% simulated.
   */
  const triggerSimulatedAlert = (triggerReason) => {
    addLogEntry(
      `[SIMULATION STARTED] Triggered via: ${triggerReason}.`,
      "sim-alert"
    );

    // Step 1: Simulated location resolution
    setTimeout(() => {
      addLogEntry(
        "[SIMULATION] Resolving approximate device coordinates for mock dispatch...",
        ""
      );
    }, 400);

    // Step 2: Simulated notification to trusted contacts
    setTimeout(() => {
      // Get current sample contact names
      const contactNames = sampleContacts.map((c) => c.name).join(", ");
      addLogEntry(
        `[SIMULATION ALERT SENT] Mock high-priority alert dispatched to sample contacts: ${contactNames}. (No actual network request made)`,
        "sim-success"
      );
    }, 1000);

    // Step 3: Simulated completion notification
    setTimeout(() => {
      addLogEntry(
        "[SIMULATION COMPLETE] Emergency broadcast test succeeded locally. System returned to standby.",
        ""
      );
    }, 1600);
  };

  // Open SOS Confirmation Modal on button click
  if (sosBtn && sosModal) {
    sosBtn.addEventListener("click", () => {
      sosModal.style.display = "flex";
      startSosCountdown();
      addLogEntry(
        "[PROMPT] User opened SOS emergency confirmation modal.",
        ""
      );
    });
  }

  // Cancel Simulation
  if (cancelSosBtn) {
    cancelSosBtn.addEventListener("click", () => {
      closeSosModal();
      addLogEntry(
        "[CANCELLED] Simulation was safely aborted by the user before dispatch.",
        ""
      );
    });
  }

  // Proceed Immediately
  if (proceedSosBtn) {
    proceedSosBtn.addEventListener("click", () => {
      closeSosModal();
      triggerSimulatedAlert("Manual 'Proceed Immediately' button click");
    });
  }

  // Close modal when clicking on overlay backdrop
  if (sosModal) {
    sosModal.addEventListener("click", (e) => {
      if (e.target === sosModal) {
        closeSosModal();
        addLogEntry("[CANCELLED] SOS dialog closed by backdrop click.", "");
      }
    });
  }

  // Clear Log Button
  if (clearLogBtn) {
    clearLogBtn.addEventListener("click", () => {
      if (simulationLogList) {
        simulationLogList.innerHTML = `
          <li class="log-item log-initial">
            <span class="log-time">System Ready</span>
            <span class="log-msg">Log cleared. Press the SOS button to run a new simulation.</span>
          </li>
        `;
      }
    });
  }

  // ========================================================================
  // 3. TRUSTED CONTACTS DIRECTORY (SAMPLE DATA & STATE)
  // ========================================================================
  // Pre-loaded realistic sample contacts for learning demonstration
  const DEFAULT_SAMPLE_CONTACTS = [
    {
      id: 1,
      name: "Anita Sharma",
      relation: "Mother",
      phone: "+91 98765 43210",
      avatarColor: "#EDE9FE",
    },
    {
      id: 2,
      name: "Rohan Sharma",
      relation: "Brother",
      phone: "+91 98111 22334",
      avatarColor: "#FCE7F3",
    },
    {
      id: 3,
      name: "Neha Patel",
      relation: "Best Friend",
      phone: "+91 97222 55667",
      avatarColor: "#E0F2FE",
    },
  ];

  // In-memory working copy of contacts
  let sampleContacts = [...DEFAULT_SAMPLE_CONTACTS];

  const contactsCardsGrid = document.getElementById("contacts-cards-grid");
  const contactCountNum = document.getElementById("contact-count-num");
  const addContactForm = document.getElementById("add-contact-form");
  const resetContactsBtn = document.getElementById("reset-contacts-btn");

  /**
   * Renders the trusted contacts list into the DOM.
   */
  const renderContacts = () => {
    if (!contactsCardsGrid) return;

    // Update count display
    if (contactCountNum) {
      contactCountNum.textContent = sampleContacts.length;
    }

    // Handle empty state
    if (sampleContacts.length === 0) {
      contactsCardsGrid.innerHTML = `
        <div style="grid-column: 1 / -1; padding: 2rem; text-align: center; background: #FFF; border: 1px dashed var(--border-light); border-radius: 12px;">
          <p style="color: var(--text-muted); font-size: 0.95rem; margin-bottom: 0.75rem;">
            No sample contacts currently listed.
          </p>
          <button id="quick-restore-btn" class="btn btn-secondary btn-sm">Restore Sample Contacts</button>
        </div>
      `;
      const quickRestore = document.getElementById("quick-restore-btn");
      if (quickRestore) {
        quickRestore.addEventListener("click", resetSampleContacts);
      }
      return;
    }

    // Build contacts markup
    contactsCardsGrid.innerHTML = sampleContacts
      .map((contact) => {
        // Extract initials for the avatar badge
        const initials = contact.name
          .split(" ")
          .map((n) => n[0])
          .join("")
          .toUpperCase()
          .slice(0, 2);

        return `
          <div class="contact-card" data-id="${contact.id}">
            <div class="contact-card-top">
              <div class="contact-avatar" style="background-color: ${contact.avatarColor || '#EDE9FE'}">
                ${initials}
              </div>
              <div class="contact-meta">
                <h4 class="contact-card-name">${escapeHTML(contact.name)}</h4>
                <span class="contact-relation-badge">${escapeHTML(contact.relation)}</span>
              </div>
            </div>

            <div class="contact-card-phone">
              <svg class="icon-inline" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                <path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6 19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72 12.84 12.84 0 0 0 .7 2.81 2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45 12.84 12.84 0 0 0 2.81.7A2 2 0 0 1 22 16.92z"/>
              </svg>
              <span>${escapeHTML(contact.phone)}</span>
            </div>

            <div class="contact-card-actions">
              <button class="btn btn-secondary btn-ping-sim" data-action="ping" data-id="${contact.id}">
                Simulate Ping
              </button>
              <button class="btn-remove-contact" data-action="delete" data-id="${contact.id}" title="Remove sample contact">
                Remove
              </button>
            </div>
          </div>
        `;
      })
      .join("");
  };

  /**
   * Resets contact directory back to the default sample list.
   */
  const resetSampleContacts = () => {
    sampleContacts = [...DEFAULT_SAMPLE_CONTACTS];
    renderContacts();
    addLogEntry("[CONTACTS] Restored default sample contacts list.", "");
  };

  if (resetContactsBtn) {
    resetContactsBtn.addEventListener("click", resetSampleContacts);
  }

  // Handle contact card actions (Simulate Ping & Delete) via event delegation
  if (contactsCardsGrid) {
    contactsCardsGrid.addEventListener("click", (e) => {
      const button = e.target.closest("button");
      if (!button) return;

      const action = button.getAttribute("data-action");
      const contactId = parseInt(button.getAttribute("data-id"), 10);
      const targetContact = sampleContacts.find((c) => c.id === contactId);

      if (action === "ping" && targetContact) {
        addLogEntry(
          `[SIMULATED PING] Mock alert sent to ${targetContact.name} (${targetContact.relation}) at ${targetContact.phone}.`,
          "sim-success"
        );
        button.textContent = "Pinged! ✓";
        setTimeout(() => {
          button.textContent = "Simulate Ping";
        }, 1500);
      }

      if (action === "delete" && targetContact) {
        sampleContacts = sampleContacts.filter((c) => c.id !== contactId);
        renderContacts();
        addLogEntry(
          `[CONTACT REMOVED] Removed sample contact: ${targetContact.name}.`,
          ""
        );
      }
    });
  }

  // Validate & Add New Sample Contact
  if (addContactForm) {
    addContactForm.addEventListener("submit", (e) => {
      e.preventDefault();

      const nameInput = document.getElementById("contact-name");
      const relationInput = document.getElementById("contact-relation");
      const phoneInput = document.getElementById("contact-phone");

      const nameError = document.getElementById("name-error");
      const relationError = document.getElementById("relation-error");
      const phoneError = document.getElementById("phone-error");

      let isValid = true;

      // Validate Name
      if (!nameInput.value.trim() || nameInput.value.trim().length < 2) {
        nameError.textContent = "Please provide a valid name (at least 2 characters).";
        nameInput.classList.add("input-error");
        isValid = false;
      } else {
        nameError.textContent = "";
        nameInput.classList.remove("input-error");
      }

      // Validate Relation
      if (!relationInput.value) {
        relationError.textContent = "Please select a relationship category.";
        relationInput.classList.add("input-error");
        isValid = false;
      } else {
        relationError.textContent = "";
        relationInput.classList.remove("input-error");
      }

      // Validate Phone (sample check)
      const phoneClean = phoneInput.value.replace(/[\s\-\(\)]/g, "");
      if (!phoneClean || phoneClean.length < 7) {
        phoneError.textContent = "Please enter a valid sample phone number (min 7 digits).";
        phoneInput.classList.add("input-error");
        isValid = false;
      } else {
        phoneError.textContent = "";
        phoneInput.classList.remove("input-error");
      }

      if (!isValid) return;

      // Add to sample list
      const newContact = {
        id: Date.now(),
        name: nameInput.value.trim(),
        relation: relationInput.value,
        phone: phoneInput.value.trim(),
        avatarColor: "#F5F3FF",
      };

      sampleContacts.push(newContact);
      renderContacts();
      addLogEntry(
        `[CONTACT ADDED] New sample contact added: ${newContact.name} (${newContact.relation}).`,
        ""
      );

      // Reset form fields
      addContactForm.reset();
    });
  }

  // Initial render of contacts
  renderContacts();

  // ========================================================================
  // 4. SAFETY RESOURCES TAB FILTERING
  // ========================================================================
  const tabButtons = document.querySelectorAll(".tab-btn");
  const resourceCards = document.querySelectorAll(".resource-card");

  tabButtons.forEach((tab) => {
    tab.addEventListener("click", () => {
      // Update active tab button style
      tabButtons.forEach((btn) => {
        btn.classList.remove("active");
        btn.setAttribute("aria-selected", "false");
      });
      tab.classList.add("active");
      tab.setAttribute("aria-selected", "true");

      const selectedCategory = tab.getAttribute("data-category");

      // Filter cards by category
      resourceCards.forEach((card) => {
        const cardCategory = card.getAttribute("data-category");
        if (selectedCategory === "all" || cardCategory === selectedCategory) {
          card.style.display = "flex";
        } else {
          card.style.display = "none";
        }
      });
    });
  });

  // ========================================================================
  // 5. INCIDENT REPORTING FORM WITH VALIDATION
  // ========================================================================
  const incidentForm = document.getElementById("incident-form");
  const reportModal = document.getElementById("report-modal");
  const closeReportModalBtn = document.getElementById("close-report-modal-btn");
  const descTextarea = document.getElementById("incident-description");
  const charCountDisplay = document.getElementById("char-count");

  // Character counter for the description textarea
  if (descTextarea && charCountDisplay) {
    descTextarea.addEventListener("input", () => {
      const currentLength = descTextarea.value.length;
      charCountDisplay.textContent = `${currentLength} / 20 min chars`;
      if (currentLength >= 20) {
        charCountDisplay.style.color = "var(--color-success)";
      } else {
        charCountDisplay.style.color = "var(--text-light)";
      }
    });
  }

  /**
   * Helper to set input error state.
   */
  const setFieldError = (inputEl, errorEl, message) => {
    if (errorEl) errorEl.textContent = message;
    if (inputEl) inputEl.classList.add("input-error");
  };

  /**
   * Helper to clear input error state.
   */
  const clearFieldError = (inputEl, errorEl) => {
    if (errorEl) errorEl.textContent = "";
    if (inputEl) inputEl.classList.remove("input-error");
  };

  if (incidentForm) {
    incidentForm.addEventListener("submit", (e) => {
      e.preventDefault();

      const typeInput = document.getElementById("incident-type");
      const dateInput = document.getElementById("incident-date");
      const locInput = document.getElementById("incident-location");
      const urgInput = document.getElementById("incident-urgency");
      const descInput = document.getElementById("incident-description");
      const consentInput = document.getElementById("incident-consent");

      const typeErr = document.getElementById("incidentType-error");
      const dateErr = document.getElementById("incidentDate-error");
      const locErr = document.getElementById("incidentLocation-error");
      const urgErr = document.getElementById("incidentUrgency-error");
      const descErr = document.getElementById("incidentDescription-error");
      const consentErr = document.getElementById("incidentConsent-error");

      let formIsValid = true;

      // 1. Validate Category
      if (!typeInput.value) {
        setFieldError(typeInput, typeErr, "Please select an incident category.");
        formIsValid = false;
      } else {
        clearFieldError(typeInput, typeErr);
      }

      // 2. Validate Date & Time (cannot be in the far future)
      if (!dateInput.value) {
        setFieldError(dateInput, dateErr, "Please specify the date and approximate time.");
        formIsValid = false;
      } else {
        const selectedDate = new Date(dateInput.value);
        const now = new Date();
        // Allow up to 10 minutes clock skew
        if (selectedDate.getTime() > now.getTime() + 10 * 60 * 1000) {
          setFieldError(dateInput, dateErr, "Incident date cannot be in the future.");
          formIsValid = false;
        } else {
          clearFieldError(dateInput, dateErr);
        }
      }

      // 3. Validate Location
      if (!locInput.value.trim() || locInput.value.trim().length < 3) {
        setFieldError(locInput, locErr, "Please describe the location or area (min 3 chars).");
        formIsValid = false;
      } else {
        clearFieldError(locInput, locErr);
      }

      // 4. Validate Severity
      if (!urgInput.value) {
        setFieldError(urgInput, urgErr, "Please specify the perceived severity level.");
        formIsValid = false;
      } else {
        clearFieldError(urgInput, urgErr);
      }

      // 5. Validate Description (minimum 20 characters)
      if (!descInput.value.trim() || descInput.value.trim().length < 20) {
        setFieldError(
          descInput,
          descErr,
          `Please provide more details (minimum 20 characters, currently ${descInput.value.trim().length}).`
        );
        formIsValid = false;
      } else {
        clearFieldError(descInput, descErr);
      }

      // 6. Validate Demonstration Consent Checkbox
      if (!consentInput.checked) {
        if (consentErr) {
          consentErr.textContent = "You must acknowledge this is a prototype learning demo.";
        }
        formIsValid = false;
      } else {
        if (consentErr) consentErr.textContent = "";
      }

      // Stop if any field failed validation
      if (!formIsValid) return;

      // Generate a mock simulation reference code (e.g., NR-DEMO-2026-8491)
      const randomCode = Math.floor(1000 + Math.random() * 9000);
      const generatedRefId = `NR-DEMO-${new Date().getFullYear()}-${randomCode}`;

      // Populate success modal fields
      const summaryRef = document.getElementById("summary-ref-id");
      const summaryCat = document.getElementById("summary-category");
      const summaryLoc = document.getElementById("summary-location");

      if (summaryRef) summaryRef.textContent = generatedRefId;
      if (summaryCat) summaryCat.textContent = typeInput.value;
      if (summaryLoc) summaryLoc.textContent = locInput.value.trim();

      // Show success modal
      if (reportModal) {
        reportModal.style.display = "flex";
      }

      // Log the event
      addLogEntry(
        `[REPORT SIMULATED] Mock report filed: ${typeInput.value} at ${locInput.value.trim()} (Ref: ${generatedRefId}). Zero data stored.`,
        "sim-success"
      );

      // Reset the form
      incidentForm.reset();
      if (charCountDisplay) {
        charCountDisplay.textContent = "0 / 20 min chars";
        charCountDisplay.style.color = "var(--text-light)";
      }
    });

    // Reset button handler clears errors
    const resetFormBtn = document.getElementById("reset-form-btn");
    if (resetFormBtn) {
      resetFormBtn.addEventListener("click", () => {
        document.querySelectorAll(".field-error").forEach((el) => (el.textContent = ""));
        document
          .querySelectorAll(".input-error")
          .forEach((el) => el.classList.remove("input-error"));
        if (charCountDisplay) {
          charCountDisplay.textContent = "0 / 20 min chars";
          charCountDisplay.style.color = "var(--text-light)";
        }
      });
    }
  }

  // Close report confirmation modal
  if (closeReportModalBtn && reportModal) {
    closeReportModalBtn.addEventListener("click", () => {
      reportModal.style.display = "none";
    });

    reportModal.addEventListener("click", (e) => {
      if (e.target === reportModal) {
        reportModal.style.display = "none";
      }
    });
  }

  // ========================================================================
  // 6. LOCATION-SHARING DEMO (HTML5 GEOLOCATION API & MOCK DATA)
  // ========================================================================
  const getLocationBtn = document.getElementById("get-location-btn");
  const mockLocationBtn = document.getElementById("mock-location-btn");
  const locationDot = document.getElementById("location-dot");
  const locationStatusText = document.getElementById("location-status-text");
  const coordLat = document.getElementById("coord-lat");
  const coordLng = document.getElementById("coord-lng");
  const coordAcc = document.getElementById("coord-acc");
  const coordTime = document.getElementById("coord-time");
  const locationPreviewActions = document.getElementById("location-preview-actions");
  const viewMapLink = document.getElementById("view-map-link");
  const copyLocationSosBtn = document.getElementById("copy-location-sos-btn");
  const copyFeedbackToast = document.getElementById("copy-feedback-toast");

  let currentCoordinates = null;

  /**
   * Updates the UI coordinate display elements.
   * @param {number} lat - Latitude
   * @param {number} lng - Longitude
   * @param {number} accuracy - Accuracy in meters
   * @param {boolean} isMock - Whether coordinates are sample mock data
   */
  const updateCoordinateDisplay = (lat, lng, accuracy, isMock = false) => {
    currentCoordinates = { lat, lng };

    if (coordLat) coordLat.textContent = lat.toFixed(5);
    if (coordLng) coordLng.textContent = lng.toFixed(5);
    if (coordAcc) coordAcc.textContent = `± ${Math.round(accuracy)} m`;
    if (coordTime) {
      coordTime.textContent = new Date().toLocaleTimeString();
    }

    if (locationDot) {
      locationDot.className = "status-indicator-dot active";
    }

    if (locationStatusText) {
      locationStatusText.textContent = isMock
        ? "Status: Loaded sample mock coordinates (India Gate, Delhi)"
        : "Status: Live browser coordinates obtained successfully!";
    }

    // Set safe free OpenStreetMap link
    if (viewMapLink) {
      viewMapLink.href = `https://www.openstreetmap.org/?mlat=${lat}&mlon=${lng}#map=16/${lat}/${lng}`;
    }

    // Reveal the action buttons
    if (locationPreviewActions) {
      locationPreviewActions.style.display = "flex";
    }

    addLogEntry(
      `[LOCATION] Coordinates updated (${lat.toFixed(4)}, ${lng.toFixed(4)}) - ${
        isMock ? "Mock Sample" : "Browser Geolocation"
      }.`,
      ""
    );
  };

  // 1. Real Browser Location Request
  if (getLocationBtn) {
    getLocationBtn.addEventListener("click", () => {
      // Check browser support for Geolocation API
      if (!("geolocation" in navigator)) {
        if (locationStatusText) {
          locationStatusText.textContent =
            "Status: Geolocation is not supported by your browser.";
        }
        if (locationDot) locationDot.className = "status-indicator-dot denied";
        return;
      }

      // Update loading status
      if (locationStatusText) {
        locationStatusText.textContent =
          "Status: Requesting browser permission...";
      }
      if (locationDot) locationDot.className = "status-indicator-dot loading";

      // HTML5 Geolocation API Call
      navigator.geolocation.getCurrentPosition(
        // Success Callback
        (position) => {
          const { latitude, longitude, accuracy } = position.coords;
          updateCoordinateDisplay(latitude, longitude, accuracy, false);
        },
        // Error Callback
        (error) => {
          let errorMsg = "Unable to retrieve location.";
          switch (error.code) {
            case error.PERMISSION_DENIED:
              errorMsg = "Permission denied. You can test with sample mock coordinates!";
              break;
            case error.POSITION_UNAVAILABLE:
              errorMsg = "Location information is unavailable on this device.";
              break;
            case error.TIMEOUT:
              errorMsg = "Location request timed out. Please try again.";
              break;
          }

          if (locationStatusText) {
            locationStatusText.textContent = `Status: ${errorMsg}`;
          }
          if (locationDot) locationDot.className = "status-indicator-dot denied";

          addLogEntry(
            `[LOCATION PERMISSION] Browser returned: ${errorMsg}`,
            ""
          );
        },
        // Options: high accuracy, 10s timeout
        {
          enableHighAccuracy: true,
          timeout: 10000,
          maximumAge: 0,
        }
      );
    });
  }

  // 2. Mock Sample Coordinates (No Permission Required)
  if (mockLocationBtn) {
    mockLocationBtn.addEventListener("click", () => {
      // Coordinates for India Gate, Central New Delhi
      const sampleLat = 28.6129;
      const sampleLng = 77.2295;
      const sampleAcc = 15;

      updateCoordinateDisplay(sampleLat, sampleLng, sampleAcc, true);
    });
  }

  // 3. Copy Simulated Emergency SMS Text
  if (copyLocationSosBtn) {
    copyLocationSosBtn.addEventListener("click", () => {
      if (!currentCoordinates) return;

      const mapUrl = `https://www.openstreetmap.org/?mlat=${currentCoordinates.lat}&mlon=${currentCoordinates.lng}`;
      const simulatedSms = `EMERGENCY ALERT (SIMULATION): I need immediate assistance. My simulated location is: ${mapUrl} - Sent via Nari Raksha Prototype`;

      // Copy to clipboard with fallback
      if (navigator.clipboard && window.isSecureContext) {
        navigator.clipboard
          .writeText(simulatedSms)
          .then(() => showCopySuccess())
          .catch(() => fallbackCopyText(simulatedSms));
      } else {
        fallbackCopyText(simulatedSms);
      }
    });
  }

  const showCopySuccess = () => {
    if (!copyFeedbackToast) return;
    copyFeedbackToast.textContent = "✓ Copied simulated emergency SMS to clipboard!";
    setTimeout(() => {
      copyFeedbackToast.textContent = "";
    }, 3500);
  };

  const fallbackCopyText = (text) => {
    const textArea = document.createElement("textarea");
    textArea.value = text;
    textArea.style.position = "fixed";
    textArea.style.left = "-9999px";
    document.body.appendChild(textArea);
    textArea.focus();
    textArea.select();
    try {
      document.execCommand("copy");
      showCopySuccess();
    } catch (err) {
      if (copyFeedbackToast) {
        copyFeedbackToast.textContent = "Could not copy automatically. Please copy manually.";
      }
    }
    document.body.removeChild(textArea);
  };

  // ========================================================================
  // 7. UTILITY HELPERS
  // ========================================================================
  /**
   * Sanitizes strings to prevent XSS injection into the DOM.
   * @param {string} str - Raw input string
   * @returns {string} - Escaped string
   */
  function escapeHTML(str) {
    if (!str) return "";
    return String(str)
      .replace(/&/g, "&amp;")
      .replace(/</g, "&lt;")
      .replace(/>/g, "&gt;")
      .replace(/"/g, "&quot;")
      .replace(/'/g, "&#039;");
  }
});
