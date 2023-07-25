namespace Components
{
	class Overlay
	{
		protected opened		: boolean;
		protected container		: JQuery | null = null;
		protected onClick		: () => boolean;
		protected onClose		: () => void;

		public constructor(parent: JQuery, style: string = 'def')
		{
			this.opened = false;
			this.onClick = null;
			this.onClose = null;
			this.container = $('<div/>', {
				class: style,
				click: () =>
				{
					if (this.onClick) { if (this.onClick()) ccOverlay.close(); }
					else ccOverlay.close();
				}
			}).appendTo(parent);
		}

		public get() : JQuery { return this.container; }

		public open(onClick: () => boolean, onClose: () => void)
		{
			if (this.opened) return;
			this.opened = true;

			this.onClick = onClick;
			this.onClose = onClose;
		}

		public close()
		{
			if (!this.opened) return;
			if (this.onClose) this.onClose();

			this.container.remove();
			this.container = null;
			this.onClick = null;
			this.onClose = null;
			this.opened = false;
		}
	}

	export class OverlayEngine
	{
		protected current		: Overlay;
		protected overlays		: Overlay[];
		protected container		: JQuery | null = null;

		public constructor()
		{
			this.overlays = [];
			this.current = null;
			this.container = null;
		}

		public getOverlays() : Overlay[] { return this.overlays; }

		public init(selector: string) { this.container = $(selector); }

		public overlay(style: string = 'def') : JQuery
		{
			this.current = new Overlay(this.container, style);
			this.overlays.push(this.current);
			return this.current.get();
		}

		public open(onClick: () => boolean, onClose: () => void)
		{
			this.current.open(onClick, onClose);
			if (this.overlays.length > 0 && !this.container.hasClass('opened')) this.container.addClass('opened');
		}

		public close()
		{
			this.overlays.pop()?.close();
			if (this.overlays.length == 0 && this.container.hasClass('opened')) this.container.removeClass('opened');
		}

		public closeAll()
		{
			for (const overlay of this.overlays) overlay.close();
			this.overlays = [];
			this.container.removeClass('opened');
			this.container.html('');
		}
	}
}

	var ccOverlay	= new Components.OverlayEngine();