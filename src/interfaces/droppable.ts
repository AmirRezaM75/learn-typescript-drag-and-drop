export interface Droppable {
  dropHandler(event: DragEvent): void;
  dragOverHandler(event: DragEvent): void;
  dragLeaveHandler(event: DragEvent): void;
}
