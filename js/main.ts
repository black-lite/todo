class Main
{
	public tasks : Task[];
	public container : JQuery;
	public list : JQuery;

	constructor()
	{
		this.tasks = [];
		this.container = $('div.tasks');
		const btn = $('<div/>', { class: 'create', text: 'Новая задача' }).on('click', () => this.createTask());
		this.list = $('<div/>', { class: 'list', html: `<span class="empty">Создайте свою первую задачу</span>` }).appendTo(this.container);
		this.container.append(btn);
	}

	public createTask()
	{
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

class Task
{
	constructor(text: string, container: JQuery)
	{
		container.append(`<label>
			<span>
				<input type="checkbox">
				<span>${text}</span>
			</span>
			<span></span>
		</label>`);

		ccOverlay.close()
	}
}

class Category
{

}