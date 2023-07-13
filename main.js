"use strict";
// class Main
// {
// 	public tasks : Task[];
// 	public container : JQuery;
// 	public list : JQuery;
//
// 	constructor()
// 	{
// 		this.tasks = [];
// 		this.container = $('div.tasks');
// 		const btn = $('<div/>', { class: 'button create', text: 'Новая задача' }).on('click', () => this.createTask());
// 		this.list = $('<div/>', { class: 'list' }).appendTo(this.container);
// 		this.container.append(btn);
// 	}
//
// 	public createTask()
// 	{
// 		const container = ccOverlay.overlay();
// 		ccOverlay.open(() => true, null);
//
// 		container.append(`<div class="container">
// 			<div class="add_task">
// 				<input type="text" placeholder="НАЗВАНИЕ ЗАДАЧИ">
// 				<div class="button">Создать</div>
// 			</div>
// 		</div>`);
//
// 		const input = container.find('input');
// 		const button = container.find('div.button').addClass('disabled');
//
// 		input.on('input', () => {
// 			if (input.val().toString().trim() == '') button.off('click').addClass('disabled');
// 			else
// 			{
// 				button.removeClass('disabled');
// 				button.off('click').on('click', () => new Task(container.find('input').val().toString(), this.list));
// 			}
// 		});
//
// 		container.find('div.add_task').on('click', () => false);
//
// 		// const task = new Task(container.find('input').val().toString(), this.list)
// 	}
// }
class Task {
    constructor() { }
    static create() {
        return $(`<div class="task">
			<label><span><input type="text" placeholder="Название задачи"/></span></label>
			<span class="delete"></span>
		</div>`);
    }
}
class Categories {
    constructor() {
        this.items = [];
        this.container = null;
        // this.container = $('body > div > div.content');
        // this.container.append(``)
    }
    add(item) { this.items.push(item); }
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
        this.category.append(`
			<div class="title"><input type="text" placeholder="Название категории"/></div>
			<div class="tasks"><div><div class="button">Новая задача</div></div></div>
		`);
        this.category.find('.button').on('click', () => {
            const task = Task.create();
            this.category.find('div.tasks').append(task);
            this.tasks.push(task);
        });
        this.container.append(this.category);
    }
}
let TDCategories = new Category();
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