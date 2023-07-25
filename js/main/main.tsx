class Main
{
	constructor()
	{
		$('a.add_category').on('click', () => new Category().create());
	}
}

class Task
{
	public constructor() {}

	public static create() : JQuery
	{
		return (<div class="task">
			<label><span><input type="text" placeholder="Название задачи"/></span></label>
			<span class="delete"/>
		</div>);
	}
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

	public create() : Category
	{
		this.category = $('<div/>', { class: 'category' });

		let add;
		this.category.append(<div>
			<div class="title"><input type="text" placeholder="Название категории"/></div>
			<div class="tasks"></div>
			{add = <div class="add">Новая задача</div>}
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