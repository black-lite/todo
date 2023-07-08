class Main
{
	public task : Task[];
	public container : JQuery;

	constructor()
	{
		this.container = $('div.tasks');
		const btn = $('<div/>', { class: 'create', text: 'Новая задача' }).on('click', () => this.createTask());
		this.container.append(btn);
	}

	public createTask()
	{

		const task = new Task()
	}
}

class Task
{
	constructor() { console.log('новая задача'); }
}

class Category
{

}