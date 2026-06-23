import Phaser from "phaser";

const GRID_SIZE = 64;
const ROOM_TILES = 25;
const ROOM_SIZE = GRID_SIZE * ROOM_TILES;
const ROOM_WIDTH = ROOM_SIZE;
const ROOM_HEIGHT = ROOM_SIZE;
const PLAYER_RADIUS = 16;
const PLAYER_SPEED = 260;

export class MainScene extends Phaser.Scene {
  private player!: Phaser.GameObjects.Arc;
  private cursors!: Phaser.Types.Input.Keyboard.CursorKeys;
  private keys!: Record<"W" | "A" | "S" | "D", Phaser.Input.Keyboard.Key>;

  constructor() {
    super("main");
  }

  create() {
    this.cameras.main.setBackgroundColor("#111827");
    this.drawRoom();

    this.player = this.add.circle(
      ROOM_WIDTH / 2,
      ROOM_HEIGHT / 2,
      PLAYER_RADIUS,
      0xffffff,
    );

    this.cameras.main.setBounds(0, 0, ROOM_WIDTH, ROOM_HEIGHT);
    this.cameras.main.startFollow(this.player, true, 1, 1);

    this.cursors = this.input.keyboard!.createCursorKeys();
    this.keys = this.input.keyboard!.addKeys("W,A,S,D") as Record<
      "W" | "A" | "S" | "D",
      Phaser.Input.Keyboard.Key
    >;
  }

  update(_time: number, delta: number) {
    let moveX = 0;
    let moveY = 0;

    if (this.cursors.left.isDown || this.keys.A.isDown) moveX -= 1;
    if (this.cursors.right.isDown || this.keys.D.isDown) moveX += 1;
    if (this.cursors.up.isDown || this.keys.W.isDown) moveY -= 1;
    if (this.cursors.down.isDown || this.keys.S.isDown) moveY += 1;

    if (moveX !== 0 || moveY !== 0) {
      const length = Math.hypot(moveX, moveY);
      moveX /= length;
      moveY /= length;
    }

    const distance = (PLAYER_SPEED * delta) / 1000;

    this.player.x = Phaser.Math.Clamp(
      this.player.x + moveX * distance,
      PLAYER_RADIUS,
      ROOM_WIDTH - PLAYER_RADIUS,
    );

    this.player.y = Phaser.Math.Clamp(
      this.player.y + moveY * distance,
      PLAYER_RADIUS,
      ROOM_HEIGHT - PLAYER_RADIUS,
    );
  }

  private drawRoom() {
    const graphics = this.add.graphics();
    const maxX = ROOM_WIDTH - 0.5;
    const maxY = ROOM_HEIGHT - 0.5;

    graphics.lineStyle(1, 0x1f2937, 1);

    for (let x = 0; x <= ROOM_WIDTH; x += GRID_SIZE) {
      const drawX = Math.min(x + 0.5, maxX);
      graphics.lineBetween(drawX, 0.5, drawX, maxY);
    }

    for (let y = 0; y <= ROOM_HEIGHT; y += GRID_SIZE) {
      const drawY = Math.min(y + 0.5, maxY);
      graphics.lineBetween(0.5, drawY, maxX, drawY);
    }

    graphics.lineStyle(1, 0x334155, 1);
    graphics.strokeRect(0.5, 0.5, ROOM_WIDTH - 1, ROOM_HEIGHT - 1);
  }
}
