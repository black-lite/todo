"use strict";
var Components;
(function (Components) {
    class Overlay {
        constructor(parent, style = 'def') {
            this.container = null;
            this.opened = false;
            this.onClick = null;
            this.onClose = null;
            this.container = $('<div/>', {
                class: style,
                click: () => {
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
class Main {
    constructor() {
        $('a.add_category').on('click', () => new Category().create());
    }
}
class Task {
    constructor() { }
    static create() {
        return (Templates.createElement("div", { class: "task" },
            Templates.createElement("label", null,
                Templates.createElement("span", null,
                    Templates.createElement("input", { type: "text", placeholder: "\u041D\u0430\u0437\u0432\u0430\u043D\u0438\u0435 \u0437\u0430\u0434\u0430\u0447\u0438" }))),
            Templates.createElement("span", { class: "delete" })));
    }
}
class Category {
    constructor() {
        this.tasks = [];
        this.container = null;
        this.category = null;
        this.container = $('body > div > div.content');
    }
    create() {
        this.category = $('<div/>', { class: 'category' });
        let add;
        this.category.append(Templates.createElement("div", null,
            Templates.createElement("div", { class: "title" },
                Templates.createElement("input", { type: "text", placeholder: "\u041D\u0430\u0437\u0432\u0430\u043D\u0438\u0435 \u043A\u0430\u0442\u0435\u0433\u043E\u0440\u0438\u0438" })),
            Templates.createElement("div", { class: "tasks" }),
            add = Templates.createElement("div", { class: "add" }, "\u041D\u043E\u0432\u0430\u044F \u0437\u0430\u0434\u0430\u0447\u0430")));
        add.on('click', () => {
            const task = Task.create();
            console.log(this.category);
            this.category.find('div.tasks').append(task);
            this.tasks.push(task);
        });
        this.container.append(this.category);
        return this;
    }
}
let TDCategories = new Category();
//# sourceMappingURL=main.js.map