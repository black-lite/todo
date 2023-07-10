"use strict";
class Main {
    constructor() {
        this.tasks = [];
        this.container = $('div.tasks');
        const btn = $('<div/>', { class: 'create', text: 'Новая задача' }).on('click', () => this.createTask());
        this.list = $('<div/>', { class: 'list', html: `<span class="empty">Создайте свою первую задачу</span>` }).appendTo(this.container);
        this.container.append(btn);
    }
    createTask() {
        const container = ccOverlay.overlay();
        ccOverlay.open(() => true, null);
        container.append(`<div class="container">
			<div class="add_task">
				<input type="text" placeholder="НАЗВАНИЕ ЗАДАЧИ">
				<div class="button">Создать</div>
			</div>
		</div>`);
        container.find('div.add_task').on('click', () => false);
        container.find('div.button').on('click', () => {
            new Task(container.find('input').val().toString(), this.list);
            this.list.find('span.empty').addClass('hide');
        });
        // const task = new Task(container.find('input').val().toString(), this.list)
    }
}
class Task {
    constructor(text, container) {
        container.append(`<label>
			<span>
				<input type="checkbox">
				<span>${text}</span>
			</span>
			<span></span>
		</label>`);
        ccOverlay.close();
    }
}
class Category {
}
var Components;
(function (Components) {
    class Overlay {
        constructor(parent, style = 'def') {
            this.container = null;
            this.opened = false;
            this.onClick = null;
            this.onClose = null;
            this.container = $('<div/>', { class: style, click: () => {
                    if (this.onClick) {
                        if (this.onClick())
                            ccOverlay.close();
                    }
                    else
                        ccOverlay.close();
                }
            }).appendTo(parent);
        }
        get() { return this.container; }
        open(onClick, onClose) {
            if (this.opened)
                return;
            this.opened = true;
            this.onClick = onClick;
            this.onClose = onClose;
        }
        close() {
            if (!this.opened)
                return;
            if (this.onClose)
                this.onClose();
            this.container.remove();
            this.container = null;
            this.onClick = null;
            this.onClose = null;
            this.opened = false;
        }
    }
    class OverlayEngine {
        constructor() {
            this.container = null;
            this.overlays = [];
            this.current = null;
            this.container = null;
        }
        getOverlays() { return this.overlays; }
        init(selector) { this.container = $(selector); }
        overlay(style = 'def') {
            this.current = new Overlay(this.container, style);
            this.overlays.push(this.current);
            return this.current.get();
        }
        open(onClick, onClose) {
            this.current.open(onClick, onClose);
            if (this.overlays.length > 0 && !this.container.hasClass('opened'))
                this.container.addClass('opened');
        }
        close() {
            this.overlays.pop()?.close();
            if (this.overlays.length == 0 && this.container.hasClass('opened'))
                this.container.removeClass('opened');
        }
        closeAll() {
            for (const overlay of this.overlays)
                overlay.close();
            this.overlays = [];
            this.container.removeClass('opened');
            this.container.html('');
        }
    }
    Components.OverlayEngine = OverlayEngine;
})(Components || (Components = {}));
var ccOverlay = new Components.OverlayEngine();
//# sourceMappingURL=main.js.map