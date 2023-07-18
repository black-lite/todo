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

class Task
{
	public constructor() {}

	public static create() : JQuery
	{
		return $(`<div class="task">
			<label><span><input type="text" placeholder="Название задачи"/></span></label>
			<span class="delete"></span>
		</div>`)
	}
}

class Categories
{
	public items : JQuery[] = [];
	public container : JQuery = null;

	public constructor()
	{
		// this.container = $('body > div > div.content');
		// this.container.append(``)
	}

	public add(item: JQuery) { this.items.push(item); }
}

class Category
{
	public tasks : JQuery[] = [];
	public container : JQuery = null;
	public category : JQuery = null;

	public constructor()
	{
		this.container = $('body > div > div.content');
	}

	protected create() : Category
	{
		this.category = $('<div/>', { class: 'category' });

		let add
		this.category.append(<div>
			<div class="title"><input type="text" placeholder="Название категории"/></div>
			<div class="tasks">{add = <div class="add">Новая задача</div>}</div>
		</div>);

		add.on('click', () => {
			const task = Task.create();
			console.log(this.category);
			this.category.find('div.tasks').append(task);
			this.tasks.push(task);
		});
		this.container.append(this.category)

		return this;
	}
}

let TDCategories = new Category();