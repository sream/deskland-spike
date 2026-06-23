import Phaser from "phaser";

export class MainScene extends Phaser.Scene {
  constructor() {
    super("main");
  }

  create() {
    this.cameras.main.setBackgroundColor("#0f172a");
  }
}
