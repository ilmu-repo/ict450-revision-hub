(function () {
    "use strict";

    const config = window.CHEN_EXERCISE;
    if (!config) {
        throw new Error("CHEN_EXERCISE configuration is missing.");
    }
    const instructorMode = window.INSTRUCTOR_ANSWER_VIEW === true;

    const typeLabels = {
        entity: "Entities",
        rel: "Relationships",
        assoc: "Associative entities",
        conn: "Connectivity",
        card: "Cardinality",
        role: "Role labels",
        pk: "Key attributes",
        attr: "Attributes"
    };

    const typePrompts = {
        entity: "ENTITY",
        rel: "RELATIONSHIP",
        assoc: "ASSOCIATIVE",
        conn: "1 / M",
        card: "(min,max)",
        role: "ROLE",
        pk: "KEY",
        attr: "ATTRIBUTE"
    };

    const state = {
        selected: null,
        activeSlotId: null,
        placements: {},
        history: [],
        checked: false
    };

    const storageKey = `ict450-chen-${config.id}-${config.version || "v1"}${instructorMode ? "-instructor" : ""}`;
    const slotsById = new Map(config.slots.map((slot) => [slot.id, slot]));

    const bankRoot = document.getElementById("bank-groups");
    const stage = document.getElementById("diagram-stage");
    const svg = document.getElementById("diagram-lines");
    const selectionStatus = document.getElementById("selection-status");
    const removeButton = document.getElementById("remove-button");
    const undoButton = document.getElementById("undo-button");
    const progressText = document.getElementById("progress-text");
    const progressBar = document.getElementById("progress-bar");
    const feedback = document.getElementById("feedback-panel");
    const liveRegion = document.getElementById("live-region");

    function announce(message) {
        liveRegion.textContent = "";
        window.setTimeout(() => {
            liveRegion.textContent = message;
        }, 20);
    }

    function clonePlacements() {
        return JSON.parse(JSON.stringify(state.placements));
    }

    function remember() {
        state.history.push(clonePlacements());
        if (state.history.length > 40) state.history.shift();
        undoButton.disabled = state.history.length === 0;
    }

    function save() {
        if (instructorMode) return;
        try {
            localStorage.setItem(storageKey, JSON.stringify(state.placements));
        } catch (error) {
            // The activity remains usable when local storage is unavailable.
        }
    }

    function restore() {
        if (instructorMode) {
            for (const slot of config.slots) {
                const value = Array.isArray(slot.expected) ? slot.expected[0] : slot.expected;
                state.placements[slot.id] = { type: slot.type, value };
            }
            return;
        }
        try {
            const saved = JSON.parse(localStorage.getItem(storageKey) || "{}");
            for (const [id, placement] of Object.entries(saved)) {
                const slot = slotsById.get(id);
                if (slot && placement && placement.type === slot.type) {
                    state.placements[id] = placement;
                }
            }
        } catch (error) {
            state.placements = {};
        }
    }

    function clearValidation() {
        state.checked = false;
        feedback.hidden = true;
        feedback.className = "feedback-panel";
        document.querySelectorAll(".slot").forEach((slot) => {
            slot.classList.remove("correct", "incorrect", "missing");
            const mark = slot.querySelector(".slot-result");
            if (mark) mark.textContent = "";
        });
    }

    function selectBankItem(type, value) {
        state.selected = { type, value };
        state.activeSlotId = null;
        removeButton.disabled = true;
        document.querySelectorAll(".bank-item").forEach((button) => {
            const pressed = button.dataset.type === type && button.dataset.value === value;
            button.setAttribute("aria-pressed", String(pressed));
        });
        document.querySelectorAll(".slot").forEach((slot) => {
            slot.classList.toggle("drop-ready", slot.dataset.type === type);
            slot.classList.remove("active-slot");
        });
        selectionStatus.innerHTML = `Selected: <strong>${escapeHtml(value)}</strong>. Choose a highlighted ${typeLabels[type].toLowerCase()} position.`;
        announce(`${value} selected. Choose a compatible position in the diagram.`);
    }

    function clearSelection() {
        state.selected = null;
        document.querySelectorAll(".bank-item").forEach((button) => button.setAttribute("aria-pressed", "false"));
        document.querySelectorAll(".slot").forEach((slot) => slot.classList.remove("drop-ready"));
        selectionStatus.textContent = "Choose an item, then choose a matching position in the diagram.";
    }

    function activateSlot(id) {
        state.activeSlotId = id;
        document.querySelectorAll(".slot").forEach((slot) => slot.classList.toggle("active-slot", slot.dataset.id === id));
        removeButton.disabled = !state.placements[id];
    }

    function place(id, item) {
        if (instructorMode) return;
        const slot = slotsById.get(id);
        if (!slot || slot.type !== item.type) {
            announce(`That position accepts ${typeLabels[slot ? slot.type : "entity"].toLowerCase()}, not ${typeLabels[item.type].toLowerCase()}.`);
            return;
        }
        remember();
        state.placements[id] = { type: item.type, value: item.value };
        clearValidation();
        save();
        renderSlots();
        updateProgress();
        activateSlot(id);
        announce(`${item.value} placed in ${slot.label}.`);
    }

    function removeActive() {
        if (instructorMode) return;
        const id = state.activeSlotId;
        if (!id || !state.placements[id]) return;
        const label = slotsById.get(id).label;
        remember();
        delete state.placements[id];
        clearValidation();
        save();
        renderSlots();
        updateProgress();
        state.activeSlotId = null;
        removeButton.disabled = true;
        announce(`Removed the item from ${label}.`);
    }

    function undo() {
        if (instructorMode) return;
        if (!state.history.length) return;
        state.placements = state.history.pop();
        clearValidation();
        save();
        renderSlots();
        updateProgress();
        undoButton.disabled = state.history.length === 0;
        announce("The last diagram change was undone.");
    }

    function reset() {
        if (instructorMode) return;
        if (Object.keys(state.placements).length && !window.confirm("Clear every item from this diagram?")) return;
        remember();
        state.placements = {};
        state.activeSlotId = null;
        clearSelection();
        clearValidation();
        save();
        renderSlots();
        updateProgress();
        removeButton.disabled = true;
        announce("The diagram has been cleared.");
    }

    function isExpected(slot, value) {
        return Array.isArray(slot.expected) ? slot.expected.includes(value) : slot.expected === value;
    }

    function checkAnswers() {
        clearSelection();
        state.checked = true;
        const missing = [];
        const incorrect = [];

        for (const slot of config.slots) {
            const element = document.querySelector(`.slot[data-id="${cssEscape(slot.id)}"]`);
            const placement = state.placements[slot.id];
            const mark = element.querySelector(".slot-result");
            element.classList.remove("correct", "incorrect", "missing");
            if (!placement) {
                element.classList.add("missing");
                mark.textContent = "!";
                missing.push(slot.label);
            } else if (isExpected(slot, placement.value)) {
                element.classList.add("correct");
                mark.textContent = "✓";
            } else {
                element.classList.add("incorrect");
                mark.textContent = "!";
                incorrect.push(slot.label);
            }
        }

        feedback.hidden = false;
        feedback.innerHTML = "";
        const title = document.createElement("h3");
        const text = document.createElement("p");

        if (!missing.length && !incorrect.length) {
            feedback.className = "feedback-panel success";
            title.textContent = "Diagram complete";
            text.textContent = config.successMessage || "Every placement follows the stated business rules.";
            feedback.append(title, text);
            announce("Diagram complete. Every placement is correct.");
            return;
        }

        feedback.className = `feedback-panel ${incorrect.length ? "error" : "warning"}`;
        title.textContent = incorrect.length ? "Review the marked positions" : "Complete the marked positions";
        text.textContent = "The expected answers remain hidden. Re-read the relevant business rules and revise these parts:";
        const list = document.createElement("ul");
        [...incorrect, ...missing].slice(0, 12).forEach((label) => {
            const item = document.createElement("li");
            item.textContent = label;
            list.appendChild(item);
        });
        if (missing.length + incorrect.length > 12) {
            const item = document.createElement("li");
            item.textContent = `And ${missing.length + incorrect.length - 12} more marked positions.`;
            list.appendChild(item);
        }
        feedback.append(title, text, list);
        announce(`${incorrect.length} incorrect and ${missing.length} incomplete positions are marked in the diagram.`);
    }

    function updateProgress() {
        const completed = Object.keys(state.placements).length;
        const total = config.slots.length;
        const percent = total ? Math.round((completed / total) * 100) : 0;
        progressText.textContent = `${completed} of ${total} positions filled`;
        progressBar.style.width = `${percent}%`;
        progressBar.parentElement.setAttribute("aria-valuenow", String(completed));
        progressBar.parentElement.setAttribute("aria-valuemax", String(total));
    }

    function renderBank() {
        bankRoot.innerHTML = "";
        for (const type of ["entity", "rel", "assoc", "conn", "card", "role", "pk", "attr"]) {
            const values = config.bank[type] || [];
            if (!values.length) continue;
            const group = document.createElement("details");
            group.className = "bank-group";
            group.open = ["entity", "rel", "assoc"].includes(type);
            const summary = document.createElement("summary");
            summary.textContent = `${typeLabels[type]} (${values.length})`;
            const items = document.createElement("div");
            items.className = "bank-items";

            for (const value of values) {
                const button = document.createElement("button");
                button.type = "button";
                button.className = "bank-item";
                button.dataset.type = type;
                button.dataset.value = value;
                button.setAttribute("aria-pressed", "false");
                button.setAttribute("draggable", "true");
                button.textContent = value;
                button.addEventListener("click", () => selectBankItem(type, value));
                button.addEventListener("dragstart", (event) => {
                    event.dataTransfer.effectAllowed = "copy";
                    event.dataTransfer.setData("application/json", JSON.stringify({ type, value }));
                    selectBankItem(type, value);
                });
                items.appendChild(button);
            }
            group.append(summary, items);
            bankRoot.appendChild(group);
        }
    }

    function renderLines() {
        svg.innerHTML = "";
        for (const line of config.lines || []) {
            const element = document.createElementNS("http://www.w3.org/2000/svg", line.points ? "polyline" : "line");
            if (line.points) {
                element.setAttribute("points", line.points.map((point) => point.join(",")).join(" "));
            } else {
                element.setAttribute("x1", line[0]);
                element.setAttribute("y1", line[1]);
                element.setAttribute("x2", line[2]);
                element.setAttribute("y2", line[3]);
            }
            svg.appendChild(element);
        }
    }

    function renderSlots() {
        stage.querySelectorAll(".slot, .diagram-annotation").forEach((slot) => slot.remove());
        for (const slot of config.slots) {
            const button = document.createElement("button");
            const placement = state.placements[slot.id];
            button.type = "button";
            button.className = `slot${placement ? " has-value" : ""}`;
            button.dataset.id = slot.id;
            button.dataset.type = slot.type;
            button.style.left = `${slot.x}%`;
            button.style.top = `${slot.y}%`;
            button.style.width = `${slot.w || 10}%`;
            button.style.height = `${slot.h || 6}%`;
            button.setAttribute("aria-label", placement ? `${slot.label}: ${placement.value}` : `${slot.label}: empty ${typeLabels[slot.type].toLowerCase()} position`);
            button.title = slot.label;

            const value = document.createElement("span");
            value.className = "slot-value";
            value.textContent = placement ? placement.value : typePrompts[slot.type];
            const result = document.createElement("span");
            result.className = "slot-result";
            result.setAttribute("aria-hidden", "true");
            button.append(value, result);

            button.addEventListener("click", () => {
                if (instructorMode) {
                    announce(`${slot.label}: ${placement.value}.`);
                    return;
                }
                if (state.selected) place(slot.id, state.selected);
                else {
                    activateSlot(slot.id);
                    announce(placement ? `${slot.label} contains ${placement.value}. Use Remove item to clear it.` : `${slot.label} is empty. Choose a ${typeLabels[slot.type].toLowerCase()} item first.`);
                }
            });
            button.addEventListener("keydown", (event) => {
                if (instructorMode) return;
                if ((event.key === "Delete" || event.key === "Backspace") && state.placements[slot.id]) {
                    event.preventDefault();
                    activateSlot(slot.id);
                    removeActive();
                }
            });
            button.addEventListener("dragover", (event) => {
                event.preventDefault();
                button.classList.add("drop-ready");
            });
            button.addEventListener("dragleave", () => button.classList.remove("drop-ready"));
            button.addEventListener("drop", (event) => {
                event.preventDefault();
                button.classList.remove("drop-ready");
                try {
                    const item = JSON.parse(event.dataTransfer.getData("application/json"));
                    place(slot.id, item);
                } catch (error) {
                    announce("That item could not be placed.");
                }
            });
            stage.appendChild(button);
        }
        for (const annotation of config.annotations || []) {
            const note = document.createElement("div");
            note.className = "diagram-annotation";
            note.style.left = `${annotation.x}%`;
            note.style.top = `${annotation.y}%`;
            note.style.width = `${annotation.w || 18}%`;
            note.textContent = annotation.text;
            stage.appendChild(note);
        }
        if (state.activeSlotId) activateSlot(state.activeSlotId);
    }

    function applyInstructorMode() {
        if (!instructorMode) return;
        document.body.classList.add("instructor-answer-view");
        const studioGrid = document.querySelector(".studio-grid");
        if (studioGrid) studioGrid.classList.add("instructor-mode");
        ["clear-selection-button", "remove-button", "undo-button", "reset-button", "check-button"].forEach((id) => {
            const control = document.getElementById(id);
            if (control) control.hidden = true;
        });
        feedback.hidden = false;
        feedback.className = "feedback-panel success";
        feedback.innerHTML = `<h3>Instructor answer diagram</h3><p>All ${config.slots.length} positions are completed using the reviewed model.</p>`;
    }

    function escapeHtml(value) {
        return String(value).replace(/[&<>'"]/g, (character) => ({
            "&": "&amp;",
            "<": "&lt;",
            ">": "&gt;",
            "'": "&#39;",
            '"': "&quot;"
        })[character]);
    }

    function cssEscape(value) {
        return window.CSS && CSS.escape ? CSS.escape(value) : value.replace(/[^a-zA-Z0-9_-]/g, "\\$&");
    }

    document.getElementById("clear-selection-button").addEventListener("click", clearSelection);
    document.getElementById("remove-button").addEventListener("click", removeActive);
    document.getElementById("undo-button").addEventListener("click", undo);
    document.getElementById("reset-button").addEventListener("click", reset);
    document.getElementById("check-button").addEventListener("click", checkAnswers);

    restore();
    renderBank();
    renderLines();
    renderSlots();
    updateProgress();
    clearSelection();
    applyInstructorMode();
    undoButton.disabled = true;
    removeButton.disabled = true;
})();
