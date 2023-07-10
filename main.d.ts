/// <reference types="jquery" />
declare class Main {
    tasks: Task[];
    container: JQuery;
    list: JQuery;
    constructor();
    createTask(): void;
}
declare class Task {
    constructor(text: string, container: JQuery);
}
declare class Category {
}
declare namespace Components {
    class Overlay {
        protected opened: boolean;
        protected container: JQuery | null;
        protected onClick: () => boolean;
        protected onClose: () => void;
        constructor(parent: JQuery, style?: string);
        get(): JQuery;
        open(onClick: () => boolean, onClose: () => void): void;
        close(): void;
    }
    export class OverlayEngine {
        protected current: Overlay;
        protected overlays: Overlay[];
        protected container: JQuery | null;
        constructor();
        getOverlays(): Overlay[];
        init(selector: string): void;
        overlay(style?: string): JQuery;
        open(onClick: () => boolean, onClose: () => void): void;
        close(): void;
        closeAll(): void;
    }
    export {};
}
declare var ccOverlay: Components.OverlayEngine;
