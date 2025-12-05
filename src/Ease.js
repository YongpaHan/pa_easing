import { Vector } from "pa_vector";

export class Ease {
  constructor(from, to, duration, easing) {
    this.from = from;
    this.to = to;
    this.duration = duration;
    this.easing = easing;
    this.elapsed = 0;

    this.current = typeof from === "number" ? from : from.copy();
  }

  update(dt) {
    if (this.duration <= 0) {
      this.elapsed = this.duration = 0;
      this.current = this.#lerpRaw(1);
      return this.current;
    }

    this.elapsed = Math.min(this.elapsed + dt, this.duration);
    const t = this.easing(this.elapsed / this.duration);
    this.current = this.#lerpRaw(t);
    return this.current;
  }

  target(next) {
    if (typeof this.current === "number") {
      this.from = this.current;
    } else if (this.current instanceof Vector) {
      this.from = this.current.copy();
    } else {
      this.from = this.current;
    }

    this.to = next;
    this.elapsed = 0;
  }

  get finished() {
    return this.elapsed >= this.duration;
  }

  #lerpRaw(t) {
    if (typeof this.from === "number" && typeof this.to === "number") {
      return this.from + (this.to - this.from) * t;
    }
    if (this.from instanceof Vector && this.to instanceof Vector) {
      return Vector.lerp(this.from, this.to, t);
    }

    return this.to;
  }
}
