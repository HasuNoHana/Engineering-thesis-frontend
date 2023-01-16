import {Room} from "../rooms/room.model";

export class Task {

  public id: number;
  public name: string;
  public initialPrice: number;
  public currentPrice: number;
  public room: Room;
  public done: boolean;
  public lastDoneDate: Date;
  public repetitionRateInDays: number;
}
export class TaskBuilder {
  private task: Task;
    constructor() {
        this.task = new Task();
    }

    setId(id: number): TaskBuilder {
      this.task.id = id;
      return this;
    }
    setName(name: string): TaskBuilder {
      this.task.name = name;
      return this;
    }
    setInitialPrice(initialPrice: number): TaskBuilder {
      this.task.initialPrice = initialPrice;
      return this;
    }
    setCurrentPrice(currentPrice: number): TaskBuilder {
      this.task.currentPrice = currentPrice;
      return this;
    }
    setRoom(room: Room): TaskBuilder {
      this.task.room = room;
      return this;
    }
    setDone(done: boolean): TaskBuilder {
      this.task.done = done;
      return this;
    }
    setLastDoneDate(lastDoneDate: Date): TaskBuilder {
      this.task.lastDoneDate = lastDoneDate;
      return this;
    }
    setRepetitionRateInDays(repetitionRateInDays: number): TaskBuilder {
      this.task.repetitionRateInDays = repetitionRateInDays;
      return this;
    }
    build(): Task {
      return this.task;
    }
}
