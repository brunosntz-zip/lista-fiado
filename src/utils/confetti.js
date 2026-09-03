import confetti from 'canvas-confetti';

/**
 * Dispara confetes coloridos em tons pastel / românticos
 */
export function launchConfetti() {
  const count = 70;
  const defaults = {
    origin: { y: 0.7 },
    colors: ['#FF9BB5', '#C9A0DC', '#FFB88C', '#FFD6E0', '#E8D5F5', '#FF6B8A', '#A855C7']
  };

  function fire(particleRatio, opts) {
    confetti({
      ...defaults,
      ...opts,
      particleCount: Math.floor(count * particleRatio)
    });
  }

  fire(0.25, {
    spread: 26,
    startVelocity: 55,
  });
  fire(0.2, {
    spread: 60,
  });
  fire(0.35, {
    spread: 100,
    decay: 0.91,
    scalar: 0.8
  });
  fire(0.1, {
    spread: 120,
    startVelocity: 25,
    decay: 0.92,
    scalar: 1.2
  });
  fire(0.1, {
    spread: 120,
    startVelocity: 45,
  });
}

/**
 * Dispara chuva de corações
 */
export function launchHearts() {
  const duration = 2.5 * 1000;
  const animationEnd = Date.now() + duration;

  // Shapes de corações usando canvas-confetti
  const heartShape = confetti.shapeFromText({ text: '💖', scalar: 2 });
  const heartShape2 = confetti.shapeFromText({ text: '💕', scalar: 1.8 });
  const kissShape = confetti.shapeFromText({ text: '💋', scalar: 1.8 });

  const interval = setInterval(() => {
    const timeLeft = animationEnd - Date.now();

    if (timeLeft <= 0) {
      return clearInterval(interval);
    }

    confetti({
      shapes: [heartShape, heartShape2, kissShape],
      particleCount: 8,
      spread: 80,
      startVelocity: 30,
      origin: {
        x: Math.random(),
        y: Math.random() * 0.4 + 0.1
      },
      ticks: 120,
      gravity: 0.7,
      scalar: 2
    });
  }, 200);
}
