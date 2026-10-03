(function () {
    "use strict";

    const config = window.CROW_EXERCISE;
    if (!config) throw new Error("CROW_EXERCISE configuration is missing.");
    const instructorMode = window.INSTRUCTOR_ANSWER_VIEW === true;

    const typeLabels = {
        entity: "Entities",
        pk: "Primary keys",
        fk: "Foreign keys",
        attr: "Attributes",
        rel: "Relationship names",
        card: "Crow's Foot endpoints"
    };
    const prompts = { entity: "ENTITY", pk: "PRIMARY KEY", fk: "FOREIGN KEY", attr: "ATTRIBUTE", rel: "REL", card: "?" };
    const allSlots = [];
    config.tables.forEach((table) => table.slots.forEach((slot) => allSlots.push(slot)));
    config.relationships.forEach((relationship) => relationship.slots.forEach((slot) => allSlots.push(slot)));
    const slotsById = new Map(allSlots.map((slot) => [slot.id, slot]));
    const state = { selected: null, activeSlotId: null, placements: {}, history: [] };
    const storageKey = `ict450-crow-${config.id}-${config.version || "v1"}${instructorMode ? "-instructor" : ""}`;

    const bankRoot = document.getElementById("bank-groups");
    const stage = document.getElementById("diagram-stage");
    const svg = document.getElementById("diagram-lines");
    const canvas = document.querySelector(".canvas-scroll");
    const zoomExtent = document.getElementById("diagram-extent");
    const zoomLevel = document.getElementById("zoom-level");
    let viewScale = 1;
    let fitView = Boolean(zoomExtent);
    const rulesRoot = document.getElementById("relationship-rules");
    const studioGrid = document.querySelector(".studio-grid");
    const bankToggle = document.getElementById("bank-toggle-button");
    const selectionStatus = document.getElementById("selection-status");
    const removeButton = document.getElementById("remove-button");
    const undoButton = document.getElementById("undo-button");
    const progressText = document.getElementById("progress-text");
    const progressBar = document.getElementById("progress-bar");
    const feedback = document.getElementById("feedback-panel");
    const liveRegion = document.getElementById("live-region");

    const endpointSvgMarkup = {
        "Exactly one (||)": `<svg viewBox="0 0 48 40" class="cardinality-svg" aria-hidden="true"><line x1="0" y1="20" x2="48" y2="20"/><line x1="13" y1="7" x2="13" y2="33"/><line x1="29" y1="7" x2="29" y2="33"/></svg>`,
        "Zero or one (O|)": `<svg viewBox="0 0 48 40" class="cardinality-svg" aria-hidden="true"><line x1="0" y1="20" x2="48" y2="20"/><line x1="13" y1="7" x2="13" y2="33"/><circle cx="29" cy="20" r="7"/></svg>`,
        "One or many (|<)": `<svg viewBox="0 0 48 40" class="cardinality-svg" aria-hidden="true"><line x1="0" y1="20" x2="48" y2="20"/><path d="M1 4 L20 20 L1 36"/><line x1="29" y1="7" x2="29" y2="33"/></svg>`,
        "Zero or many (O<)": `<svg viewBox="0 0 48 40" class="cardinality-svg" aria-hidden="true"><line x1="0" y1="20" x2="48" y2="20"/><path d="M1 4 L20 20 L1 36"/><circle cx="30" cy="20" r="7"/></svg>`
    };

    function createEndpointGraphic(value) {
        const graphic = document.createElement("span");
        graphic.className = "cardinality-symbol";
        graphic.innerHTML = endpointSvgMarkup[value] || "";
        return graphic;
    }

    function announce(message) {
        liveRegion.textContent = "";
        window.setTimeout(() => { liveRegion.textContent = message; }, 20);
    }
    function clonePlacements() { return JSON.parse(JSON.stringify(state.placements)); }
    function remember() {
        state.history.push(clonePlacements());
        if (state.history.length > 50) state.history.shift();
        undoButton.disabled = false;
    }
    function save() {
        if (instructorMode) return;
        try { localStorage.setItem(storageKey, JSON.stringify(state.placements)); } catch (error) { /* Continue without persistence. */ }
    }
    function restore() {
        if (instructorMode) {
            allSlots.forEach((slot) => {
                const value = Array.isArray(slot.expected) ? slot.expected[0] : slot.expected;
                state.placements[slot.id] = { type: slot.type, value };
            });
            return;
        }
        try {
            const saved = JSON.parse(localStorage.getItem(storageKey) || "{}");
            Object.entries(saved).forEach(([id, placement]) => {
                const slot = slotsById.get(id);
                if (slot && placement && slot.type === placement.type) state.placements[id] = placement;
            });
        } catch (error) { state.placements = {}; }
    }
    function escapeHtml(value) {
        return String(value).replace(/[&<>'"]/g, (character) => ({ "&": "&amp;", "<": "&lt;", ">": "&gt;", "'": "&#39;", '"': "&quot;" })[character]);
    }
    function cssEscape(value) { return window.CSS && CSS.escape ? CSS.escape(value) : value.replace(/[^a-zA-Z0-9_-]/g, "\\$&"); }
    function clearValidation() {
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
            button.setAttribute("aria-pressed", String(button.dataset.type === type && button.dataset.value === value));
        });
        document.querySelectorAll(".slot").forEach((slot) => {
            slot.classList.toggle("drop-ready", slot.dataset.type === type);
            slot.classList.remove("active-slot");
        });
        selectionStatus.innerHTML = `Selected: <strong>${escapeHtml(value)}</strong>. Choose a highlighted ${typeLabels[type].toLowerCase()} position.`;
        announce(`${value} selected. Choose a compatible position.`);
    }
    function clearSelection() {
        state.selected = null;
        document.querySelectorAll(".bank-item").forEach((button) => button.setAttribute("aria-pressed", "false"));
        document.querySelectorAll(".slot").forEach((slot) => slot.classList.remove("drop-ready"));
        selectionStatus.textContent = "Choose an item, then choose a matching position in the model.";
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
            announce(`That position accepts ${slot ? typeLabels[slot.type].toLowerCase() : "another item type"}.`);
            return;
        }
        remember();
        state.placements[id] = { type: item.type, value: item.value };
        clearValidation();
        save();
        renderWorkspace();
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
        renderWorkspace();
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
        renderWorkspace();
        updateProgress();
        undoButton.disabled = state.history.length === 0;
        announce("The last model change was undone.");
    }
    function reset() {
        if (instructorMode) return;
        if (Object.keys(state.placements).length && !window.confirm("Clear every item from this model?")) return;
        remember();
        state.placements = {};
        state.activeSlotId = null;
        clearSelection();
        clearValidation();
        save();
        renderWorkspace();
        updateProgress();
        removeButton.disabled = true;
        announce("The model has been cleared.");
    }
    function isExpected(slot, value) { return Array.isArray(slot.expected) ? slot.expected.includes(value) : slot.expected === value; }
    function checkAnswers() {
        clearSelection();
        const missing = [];
        const incorrect = [];
        allSlots.forEach((slot) => {
            const element = document.querySelector(`.slot[data-id="${cssEscape(slot.id)}"]`);
            const placement = state.placements[slot.id];
            const mark = element.querySelector(".slot-result");
            element.classList.remove("correct", "incorrect", "missing");
            if (!placement) {
                element.classList.add("missing");
                mark.textContent = "!";
                missing.push(slot);
            } else if (isExpected(slot, placement.value)) {
                element.classList.add("correct");
                mark.textContent = "✓";
            } else {
                element.classList.add("incorrect");
                mark.textContent = "!";
                incorrect.push(slot);
            }
        });
        feedback.hidden = false;
        feedback.innerHTML = "";
        const title = document.createElement("h3");
        const text = document.createElement("p");
        if (!missing.length && !incorrect.length) {
            feedback.className = "feedback-panel success";
            title.textContent = "Model complete";
            text.textContent = config.successMessage || "Every placement follows the stated business rules.";
            feedback.append(title, text);
            announce("Model complete. Every placement is correct.");
            return;
        }
        feedback.className = `feedback-panel ${incorrect.length ? "error" : "warning"}`;
        title.textContent = incorrect.length ? "Review the marked positions" : "Complete the marked positions";
        text.textContent = "The model answer remains hidden. Use the business rules to revise these parts:";
        const list = document.createElement("ul");
        [...incorrect, ...missing].slice(0, 14).forEach((slot) => {
            const item = document.createElement("li");
            item.textContent = slot.feedback ? `${slot.label}: ${slot.feedback}` : slot.label;
            list.appendChild(item);
        });
        if (missing.length + incorrect.length > 14) {
            const item = document.createElement("li");
            item.textContent = `And ${missing.length + incorrect.length - 14} more marked positions.`;
            list.appendChild(item);
        }
        feedback.append(title, text, list);
        announce(`${incorrect.length} incorrect and ${missing.length} incomplete positions are marked.`);
    }
    function updateProgress() {
        const completed = Object.keys(state.placements).length;
        const total = allSlots.length;
        progressText.textContent = `${completed} of ${total} positions filled`;
        progressBar.style.width = `${total ? Math.round((completed / total) * 100) : 0}%`;
        progressBar.parentElement.setAttribute("aria-valuenow", String(completed));
        progressBar.parentElement.setAttribute("aria-valuemax", String(total));
    }
    function renderBank() {
        bankRoot.innerHTML = "";
        ["entity", "pk", "fk", "attr", "rel", "card"].forEach((type) => {
            const values = config.bank[type] || [];
            if (!values.length) return;
            const group = document.createElement("details");
            group.className = "bank-group";
            group.open = ["entity", "card"].includes(type);
            const summary = document.createElement("summary");
            summary.textContent = `${typeLabels[type]} (${values.length})`;
            const items = document.createElement("div");
            items.className = "bank-items";
            values.forEach((value) => {
                const button = document.createElement("button");
                button.type = "button";
                button.className = `bank-item${type === "card" ? " cardinality-bank-item" : ""}`;
                button.dataset.type = type;
                button.dataset.value = value;
                button.setAttribute("aria-pressed", "false");
                button.setAttribute("draggable", "true");
                if (type === "card") {
                    const label = document.createElement("span");
                    label.textContent = value;
                    button.append(createEndpointGraphic(value), label);
                } else {
                    button.textContent = value;
                }
                button.addEventListener("click", () => selectBankItem(type, value));
                button.addEventListener("dragstart", (event) => {
                    event.dataTransfer.effectAllowed = "copy";
                    event.dataTransfer.setData("application/json", JSON.stringify({ type, value }));
                    selectBankItem(type, value);
                });
                items.appendChild(button);
            });
            group.append(summary, items);
            bankRoot.appendChild(group);
        });
    }
    function createSlot(slot) {
        const button = document.createElement("button");
        const placement = state.placements[slot.id];
        button.type = "button";
        button.className = `slot${placement ? " has-value" : ""}`;
        button.dataset.id = slot.id;
        button.dataset.type = slot.type;
        button.setAttribute("aria-label", placement ? `${slot.label}: ${placement.value}` : `${slot.label}: empty ${typeLabels[slot.type].toLowerCase()} position`);
        const value = document.createElement("span");
        value.className = placement ? "slot-value" : "slot-prompt";
        if (placement && slot.type === "card") {
            value.appendChild(createEndpointGraphic(placement.value));
        } else {
            value.textContent = placement ? placement.value : prompts[slot.type];
        }
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
                announce(placement ? `${slot.label} contains ${placement.value}. Use Remove item to clear it.` : `${slot.label} is empty. Choose an item first.`);
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
        button.addEventListener("dragover", (event) => { event.preventDefault(); button.classList.add("drop-ready"); });
        button.addEventListener("dragleave", () => button.classList.remove("drop-ready"));
        button.addEventListener("drop", (event) => {
            event.preventDefault();
            button.classList.remove("drop-ready");
            try { place(slot.id, JSON.parse(event.dataTransfer.getData("application/json"))); }
            catch (error) { announce("That item could not be placed."); }
        });
        return button;
    }

    function applyInstructorMode() {
        if (!instructorMode) return;
        document.body.classList.add("instructor-answer-view");
        studioGrid.classList.add("bank-hidden");
        bankToggle.hidden = true;
        ["clear-selection-button", "remove-button", "undo-button", "reset-button", "check-button"].forEach((id) => {
            const control = document.getElementById(id);
            if (control) control.hidden = true;
        });
        feedback.hidden = false;
        feedback.className = "feedback-panel success";
        feedback.innerHTML = `<h3>Instructor answer model</h3><p>All ${allSlots.length} positions are completed using the reviewed model.</p>`;
        window.requestAnimationFrame(renderConnections);
    }
    function tableGeometry(table) {
        const card = stage.querySelector(`[data-table-id="${cssEscape(table.id)}"]`);
        if (zoomExtent) {
            return {
                left: card.offsetLeft,
                right: card.offsetLeft + card.offsetWidth,
                top: card.offsetTop,
                bottom: card.offsetTop + card.offsetHeight,
                cx: card.offsetLeft + card.offsetWidth / 2,
                cy: card.offsetTop + card.offsetHeight / 2
            };
        }
        const stageBox = stage.getBoundingClientRect();
        const cardBox = card.getBoundingClientRect();
        return {
            left: cardBox.left - stageBox.left,
            right: cardBox.right - stageBox.left,
            top: cardBox.top - stageBox.top,
            bottom: cardBox.bottom - stageBox.top,
            cx: cardBox.left - stageBox.left + cardBox.width / 2,
            cy: cardBox.top - stageBox.top + cardBox.height / 2
        };
    }

    function connectorGeometry(relationship) {
        if (relationship.loop) {
            const box = tableGeometry(config.tables.find((table) => table.id === relationship.from));
            const loop = relationship.loop;
            const start = [box.right, box.top + (box.bottom - box.top) * loop.fromFraction];
            const end = [box.left + (box.right - box.left) * loop.toFraction, box.bottom];
            const outerX = box.right + loop.rightPadding;
            const lowerY = box.bottom + loop.bottomPadding;
            return {
                points: [start, [outerX, start[1]], [outerX, lowerY], [end[0], lowerY], end],
                slots: [start, [box.right + loop.labelDx, box.bottom + loop.labelDy], end]
            };
        }
        if (relationship.geometry) {
            const width = stage.clientWidth;
            const height = stage.clientHeight;
            return {
                points: relationship.geometry.points.map(([x, y]) => [width * x / 100, height * y / 100]),
                slots: relationship.geometry.slots.map(([x, y]) => [width * x / 100, height * y / 100])
            };
        }
        const from = tableGeometry(config.tables.find((table) => table.id === relationship.from));
        const to = tableGeometry(config.tables.find((table) => table.id === relationship.to));
        if (relationship.route) {
            const route = relationship.route;
            const port = (box, side, fraction) => {
                if (side === "left") return [box.left, box.top + (box.bottom - box.top) * fraction];
                if (side === "right") return [box.right, box.top + (box.bottom - box.top) * fraction];
                if (side === "top") return [box.left + (box.right - box.left) * fraction, box.top];
                return [box.left + (box.right - box.left) * fraction, box.bottom];
            };
            const start = port(from, route.fromSide, route.fromFraction);
            const end = port(to, route.toSide, route.toFraction);
            const horizontal = route.fromSide === "left" || route.fromSide === "right";
            if (horizontal) {
                const middleX = (start[0] + end[0]) / 2;
                const points = Math.abs(start[1] - end[1]) < 1 ? [start, end] :
                    [start, [middleX, start[1]], [middleX, end[1]], end];
                return { points, slots: [start, [middleX, Math.min(start[1], end[1]) - 48], end] };
            }
            const middleY = (start[1] + end[1]) / 2;
            const points = Math.abs(start[0] - end[0]) < 1 ? [start, end] :
                [start, [start[0], middleY], [end[0], middleY], end];
            return { points, slots: [start, [Math.max(start[0], end[0]) + 68, middleY], end] };
        }
        let start;
        let end;
        let points;
        if (Math.abs(to.cx - from.cx) >= Math.abs(to.cy - from.cy)) {
            const leftToRight = to.cx >= from.cx;
            start = [leftToRight ? from.right : from.left, from.cy];
            end = [leftToRight ? to.left : to.right, to.cy];
            if (Math.abs(start[1] - end[1]) < 1) {
                points = [start, end];
            } else {
                const middleX = (start[0] + end[0]) / 2;
                points = [start, [middleX, start[1]], [middleX, end[1]], end];
            }
        } else {
            const topToBottom = to.cy >= from.cy;
            start = [from.cx, topToBottom ? from.bottom : from.top];
            end = [to.cx, topToBottom ? to.top : to.bottom];
            if (Math.abs(start[0] - end[0]) < 1) {
                points = [start, end];
            } else {
                const middleY = (start[1] + end[1]) / 2;
                points = [start, [start[0], middleY], [end[0], middleY], end];
            }
        }
        const segments = points.slice(0, -1).map((point, index) => {
            const next = points[index + 1];
            return { start: point, end: next, length: Math.hypot(next[0] - point[0], next[1] - point[1]) };
        });
        const labelSegment = segments.reduce((longest, segment) => segment.length > longest.length ? segment : longest, segments[0]);
        const labelPoint = [
            (labelSegment.start[0] + labelSegment.end[0]) / 2,
            (labelSegment.start[1] + labelSegment.end[1]) / 2
        ];
        if (Math.abs(labelSegment.end[0] - labelSegment.start[0]) >= Math.abs(labelSegment.end[1] - labelSegment.start[1])) {
            labelPoint[1] -= 32;
        } else {
            labelPoint[0] += 42;
        }
        return { points, slots: [start, labelPoint, end] };
    }

    function renderConnections() {
        svg.innerHTML = "";
        stage.querySelectorAll(".relation-slot").forEach((element) => element.remove());
        config.relationships.forEach((relationship) => {
            const geometry = connectorGeometry(relationship);
            if (relationship.label) {
                const start = geometry.points[0];
                const end = geometry.points[geometry.points.length - 1];
                geometry.slots[1] = [
                    (start[0] + end[0]) / 2 + relationship.label.dx,
                    (start[1] + end[1]) / 2 + relationship.label.dy
                ];
            }
            const endpointPoint = (atStart) => {
                const points = geometry.points;
                const origin = atStart ? points[0] : points[points.length - 1];
                const neighbour = atStart ? points[1] : points[points.length - 2];
                const dx = neighbour[0] - origin[0];
                const dy = neighbour[1] - origin[1];
                const length = Math.hypot(dx, dy) || 1;
                const inset = Math.min(25, length * .32);
                return [origin[0] + dx / length * inset, origin[1] + dy / length * inset];
            };
            const line = document.createElementNS("http://www.w3.org/2000/svg", geometry.points.length > 2 ? "polyline" : "line");
            if (geometry.points.length > 2) {
                line.setAttribute("points", geometry.points.map((point) => point.join(",")).join(" "));
            } else {
                line.setAttribute("x1", geometry.points[0][0]);
                line.setAttribute("y1", geometry.points[0][1]);
                line.setAttribute("x2", geometry.points[1][0]);
                line.setAttribute("y2", geometry.points[1][1]);
            }
            line.classList.add("connector-line");
            svg.appendChild(line);

            relationship.slots.forEach((slot, index) => {
                const holder = document.createElement("div");
                holder.className = `relation-slot ${slot.type === "card" ? "endpoint-slot" : "relationship-slot"}`;
                let [slotX, slotY] = geometry.slots[index];
                if (slot.type === "card") {
                    [slotX, slotY] = endpointPoint(index === 0);
                }
                holder.style.left = `${slotX}px`;
                holder.style.top = `${slotY}px`;
                if (slot.type === "card") {
                    const pointCount = geometry.points.length;
                    const fromPoint = index === 0 ? geometry.points[0] : geometry.points[pointCount - 1];
                    const towardPoint = index === 0 ? geometry.points[1] : geometry.points[pointCount - 2];
                    const angle = Math.atan2(towardPoint[1] - fromPoint[1], towardPoint[0] - fromPoint[0]) * 180 / Math.PI;
                    holder.style.setProperty("--endpoint-angle", `${angle}deg`);
                }
                holder.appendChild(createSlot(slot));
                stage.appendChild(holder);
            });
        });
    }

    function renderWorkspace() {
        stage.querySelectorAll(".diagram-table, .diagram-note, .relation-slot").forEach((element) => element.remove());
        stage.style.height = `${config.stageHeight || 980}px`;
        config.tables.forEach((table) => {
            const card = document.createElement("article");
            card.className = "table-card diagram-table";
            card.dataset.tableId = table.id;
            card.style.left = `${table.layout.x}%`;
            card.style.top = `${table.layout.y}%`;
            card.style.width = `${table.layout.w || 15}%`;
            const entity = document.createElement("div");
            entity.className = "table-entity";
            entity.appendChild(createSlot(table.slots[0]));
            const fields = document.createElement("div");
            fields.className = "field-list";
            table.slots.slice(1).forEach((slot) => {
                const row = document.createElement("div");
                row.className = "field-row";
                row.dataset.kind = slot.type;
                const kind = document.createElement("span");
                kind.className = "field-kind";
                kind.textContent = slot.kindLabel || (slot.type === "attr" ? "Field" : slot.type.toUpperCase());
                row.append(kind, createSlot(slot));
                fields.appendChild(row);
            });
            card.append(entity, fields);
            stage.appendChild(card);
            if (table.note) {
                const note = document.createElement("div");
                const noteLayout = table.noteLayout || {
                    x: table.layout.x,
                    y: table.layout.y,
                    w: table.layout.w || 15,
                    offsetY: -42
                };
                note.className = "diagram-note";
                note.style.left = `${noteLayout.x}%`;
                note.style.top = noteLayout.offsetY
                    ? `calc(${noteLayout.y}% + ${noteLayout.offsetY}px)`
                    : `${noteLayout.y}%`;
                note.style.width = `${noteLayout.w}%`;
                note.textContent = table.note;
                stage.appendChild(note);
            }
        });

        rulesRoot.innerHTML = "";
        config.relationships.forEach((relationship) => {
            const reminder = document.createElement("details");
            reminder.className = "relationship-rule";
            const summary = document.createElement("summary");
            summary.textContent = `${relationship.left} — ${relationship.right}`;
            const paragraph = document.createElement("p");
            paragraph.textContent = relationship.rule;
            reminder.append(summary, paragraph);
            rulesRoot.appendChild(reminder);
        });
        window.requestAnimationFrame(renderConnections);
        if (state.activeSlotId) activateSlot(state.activeSlotId);
    }

    function setViewScale(nextScale, isFit = false) {
        if (!zoomExtent) return;
        const oldWidth = stage.offsetWidth * viewScale;
        const oldHeight = stage.offsetHeight * viewScale;
        const centerX = oldWidth ? (canvas.scrollLeft + canvas.clientWidth / 2) / oldWidth : .5;
        const centerY = oldHeight ? (canvas.scrollTop + canvas.clientHeight / 2) / oldHeight : .5;
        viewScale = Math.max(.25, Math.min(1.6, nextScale));
        fitView = isFit;
        stage.style.transform = `scale(${viewScale})`;
        zoomExtent.style.width = `${stage.offsetWidth * viewScale}px`;
        zoomExtent.style.height = `${stage.offsetHeight * viewScale}px`;
        zoomLevel.textContent = `${Math.round(viewScale * 100)}%`;
        document.getElementById("zoom-out").disabled = viewScale <= .25;
        document.getElementById("zoom-in").disabled = viewScale >= 1.6;
        document.getElementById("zoom-fit").setAttribute("aria-pressed", String(isFit));
        canvas.scrollLeft = centerX * stage.offsetWidth * viewScale - canvas.clientWidth / 2;
        canvas.scrollTop = centerY * stage.offsetHeight * viewScale - canvas.clientHeight / 2;
    }

    function fitDiagram() {
        if (!zoomExtent) return;
        setViewScale(Math.min(1, (canvas.clientWidth - 4) / stage.offsetWidth), true);
    }

    if (zoomExtent) {
        document.getElementById("zoom-out").addEventListener("click", () => setViewScale(Math.round((viewScale - .1) * 100) / 100));
        document.getElementById("zoom-in").addEventListener("click", () => setViewScale(Math.round((viewScale + .1) * 100) / 100));
        document.getElementById("zoom-fit").addEventListener("click", fitDiagram);
        document.getElementById("zoom-reset").addEventListener("click", () => setViewScale(1));
    }

    document.getElementById("clear-selection-button").addEventListener("click", clearSelection);
    document.getElementById("remove-button").addEventListener("click", removeActive);
    document.getElementById("undo-button").addEventListener("click", undo);
    document.getElementById("reset-button").addEventListener("click", reset);
    document.getElementById("check-button").addEventListener("click", checkAnswers);
    bankToggle.addEventListener("click", () => {
        const hidden = studioGrid.classList.toggle("bank-hidden");
        bankToggle.textContent = hidden ? "Show model bank" : "Hide model bank";
        bankToggle.setAttribute("aria-expanded", String(!hidden));
        window.requestAnimationFrame(() => {
            if (fitView) fitDiagram();
            renderConnections();
        });
    });

    restore();
    renderBank();
    renderWorkspace();
    updateProgress();
    clearSelection();
    applyInstructorMode();
    window.requestAnimationFrame(fitDiagram);
    undoButton.disabled = true;
    removeButton.disabled = true;
    window.addEventListener("resize", () => window.requestAnimationFrame(() => {
        if (fitView) fitDiagram();
        renderConnections();
    }));
})();
