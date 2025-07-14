const canvas = document.getElementById("balloonCanvas");
if (!canvas) {
  console.error("Canvas element with ID 'balloonCanvas' not found.");
  return;
}
const ctx = canvas.getContext("2d");

canvas.width = window.innerWidth;
canvas.height = window.innerHeight;

  // Handle resize
  window.addEventListener("resize", () => {
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;
  });

  const balloons = Array.from({ length: 10 }, () => ({
    x: Math.random() * canvas.width,
    baseX: 0, // Will be set after initialization
    y: canvas.height + Math.random() * 300,
    radiusX: 30 + Math.random() * 10,
    radiusY: 30 + Math.random() * 20,
    speed: 2 + Math.random() * 1.5,
    color: `hsl(${Math.random() * 360}, 70%, 60%)`,
    waveOffset: Math.random() * 100,       
    waveAmplitude: 20 + Math.random() * 10, // How far it sways left/right
    waveFrequency: 0.01 + Math.random() * 0.01,
    done: false
  }));

  // Set baseX after creation
  balloons.forEach(b => b.baseX = b.x);

  let animationId;
  let frame = 0;

  function drawBalloon(balloon) {
    const { x, y, radiusX, radiusY, color } = balloon;

    // Balloon body
    ctx.beginPath();
    ctx.ellipse(x, y, radiusX, radiusY, 0, 0, Math.PI * 2);
    ctx.fillStyle = color;
    ctx.fill();

    // Knot
    ctx.beginPath();
    ctx.moveTo(x, y + radiusY);
    ctx.lineTo(x - 5, y + radiusY + 10);
    ctx.lineTo(x + 5, y + radiusY + 10);
    ctx.closePath();
    ctx.fill();

    // String
    ctx.beginPath();
    ctx.moveTo(x, y + radiusY + 10);
    ctx.lineTo(x, y + radiusY + 40);
    ctx.strokeStyle = "#333";
    ctx.stroke();
  }

  function animate() {
    ctx.clearRect(0, 0, canvas.width, canvas.height);

    let allGone = true;

    for (const balloon of balloons) {
      if (!balloon.done) {
        // Move up
        balloon.y -= balloon.speed;

        // Wavy horizontal motion using sine wave
        balloon.x = balloon.baseX + Math.sin(frame * balloon.waveFrequency + balloon.waveOffset) * balloon.waveAmplitude;

        // Mark as done when off-screen
        if (balloon.y + balloon.radiusY < 0) {
          balloon.done = true;
        } else {
          allGone = false;
        }

        drawBalloon(balloon);
      }
    }

    frame++;

    if (allGone) {
      cancelAnimationFrame(animationId);
      ctx.clearRect(0, 0, canvas.width, canvas.height);
      canvas.remove(); // optional
    } else {
      animationId = requestAnimationFrame(animate);
    }
  }

  animate();