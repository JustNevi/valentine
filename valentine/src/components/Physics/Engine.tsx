import { Particle } from "./Matter/Particle";
import { ChargedParticle } from "./Matter/ChargedParticle";
import { Body } from "./Matter/Body";
import Electric from "./Force/Electric";
import Gravity from "./Force/Gravity";
import Magnetic from "./Force/Magnetic";

export interface Engine {
  start: () => void;
  run: () => void;
  onClickHandler: (event: MouseEvent) => void;
}

interface Props {
  endCalculate: (particles: Particle[], help_particles?: Particle[]) => void;
}

function Engine({ endCalculate }: Props): Engine {
  let static_particles: Particle[] = [];
  let particles: Particle[] = [];

  const getRandomInt = (max: number) => {
    return Math.floor(Math.random() * max);
  };
  const particleToChargedParticle = (
    particle: Particle,
    q: number = 2
  ): ChargedParticle => {
    return { q: q, ...particle };
  };
  const particleToBody = (particle: Particle, m: number = 2): Body => {
    return { m: m, ...particle };
  };

  const moveParticles = () => {
    particles = particles.map((p) => ({
      x: p.x + p.vel_x,
      y: p.y + p.vel_y,
      vel_x: p.vel_x + p.acc_x,
      vel_y: p.vel_y + p.acc_y,
      acc_x: p.acc_x,
      acc_y: p.acc_y,
    }));
  };

  const onClickHandler = (event: MouseEvent) => {
    static_particles[0].x = event.clientX;
    static_particles[0].y = event.clientY;
  };

  const start = () => {
    static_particles = [
      // { x: 200, y: 300, vel_x: 0, vel_y: 0, acc_x: 0, acc_y: 0 },
      // { x: 300, y: 200, vel_x: 0, vel_y: 0, acc_x: 0, acc_y: 0 },
      // { x: 1000, y: 400, vel_x: 0, vel_y: 0, acc_x: 0, acc_y: 0 },
      // { x: 500, y: 100, vel_x: 0, vel_y: 0, acc_x: 0, acc_y: 0 },
      // { x: 600, y: 300, vel_x: 0, vel_y: 0, acc_x: 0, acc_y: 0 },
      { x: 800, y: 400, vel_x: 0, vel_y: 0, acc_x: 0, acc_y: 0 },
    ];

    particles = [
      { x: 0, y: 0, vel_x: 0, vel_y: 0, acc_x: 0, acc_y: 0 },
      { x: 0, y: 0, vel_x: 0, vel_y: 0, acc_x: 0, acc_y: 0 },
      { x: 0, y: 0, vel_x: 0, vel_y: 0, acc_x: 0, acc_y: 0 },
      { x: 0, y: 0, vel_x: 0, vel_y: 0, acc_x: 0, acc_y: 0 },
      { x: 0, y: 0, vel_x: 0, vel_y: 0, acc_x: 0, acc_y: 0 },
      { x: 0, y: 0, vel_x: 0, vel_y: 0, acc_x: 0, acc_y: 0 },
      { x: 0, y: 0, vel_x: 0, vel_y: 0, acc_x: 0, acc_y: 0 },
      { x: 0, y: 0, vel_x: 0, vel_y: 0, acc_x: 0, acc_y: 0 },
      { x: 0, y: 0, vel_x: 0, vel_y: 0, acc_x: 0, acc_y: 0 },
      { x: 0, y: 0, vel_x: 0, vel_y: 0, acc_x: 0, acc_y: 0 },
      { x: 0, y: 0, vel_x: 0, vel_y: 0, acc_x: 0, acc_y: 0 },
      { x: 0, y: 0, vel_x: 0, vel_y: 0, acc_x: 0, acc_y: 0 },
      { x: 0, y: 0, vel_x: 0, vel_y: 0, acc_x: 0, acc_y: 0 },
      { x: 0, y: 0, vel_x: 0, vel_y: 0, acc_x: 0, acc_y: 0 },
      { x: 0, y: 0, vel_x: 0, vel_y: 0, acc_x: 0, acc_y: 0 },
      { x: 0, y: 0, vel_x: 0, vel_y: 0, acc_x: 0, acc_y: 0 },
      { x: 0, y: 0, vel_x: 0, vel_y: 0, acc_x: 0, acc_y: 0 },
    ];

    particles = particles.map((p) => ({
      x: getRandomInt(window.innerWidth),
      y: getRandomInt(window.innerHeight),
      vel_x: p.vel_x,
      vel_y: p.vel_y,
      acc_x: p.acc_x,
      acc_y: p.acc_y,
    }));

    particles.push({ x: 600, y: 400, vel_x: 0, vel_y: 0, acc_x: 0, acc_y: 0 });

    endCalculate(particles, static_particles);
  };

  const run = () => {
    // particles = Electric({
    //   static_particles: static_particles.map((p) =>
    //     particleToChargedParticle(p, -2)
    //   ),
    //   particles: particles.map((p) => particleToChargedParticle(p)),
    // });

    // particles = Gravity({
    //   static_bodies: static_particles.map((p) => particleToBody(p)),
    //   bodies: particles.map((p) => particleToBody(p)),
    // });

    particles = Magnetic({
      static_particle: particleToChargedParticle(static_particles[0], -2),
      particles: particles.map((p) => particleToChargedParticle(p)),
    });

    moveParticles();

    endCalculate(particles, static_particles);
  };

  return { start, run, onClickHandler };
}

export default Engine;
