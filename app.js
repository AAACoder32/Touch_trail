// Setup canvas 
createCanvas(350,480);
// Mouse coordinate object
const mouse = {
  x: undefined,
  y: undefined
}

let hue = 0;

// Particles array 
const particleArray = [];

// Particles class
class Particle {
  constructor() {
    this.x = mouse.x;
    this.y = mouse.y;
    //this.x = Math.random() * canvas.width;
    //this.y = Math.random() * canvas.height;
    this.size = Math.random() * 10 + 1
    this.speedX = Math.random() * 3 - 1.5;
    this.speedY = Math.random() * 3 - 1.5;
    this.color = 'hsl(' + hue + ',100%,50%)';
  }

  update() {
    this.x += this.speedX;
    this.y += this.speedY;
    if (this.size > 0.2) {
      this.size -= 0.1;
    }
  }

  draw() {
    ctx.fillStyle = this.color;
    ctx.beginPath();
    ctx.arc(this.x, this.y, this.size, 0, Math.PI * 2);
    ctx.fill();
  }

}

// Touch trailing of particles
canvas.addEventListener('touchstart', (e) => {
  mouse.x = e.touches[0].clientX;
  mouse.y = e.touches[0].clientY;
  initParticles(10);
}, false);

// Touch trailing of particles
canvas.addEventListener('touchmove', (e) => {
  mouse.x = e.touches[0].clientX;
  mouse.y = e.touches[0].clientY;
  initParticles(1);
}, false);

// Initialise the particles 
function initParticles(n) {
  for (let i = 0; i < n; i++) {
    particleArray.push(new Particle());
  }
}

// Handle all particles' update and drawing 
/*function handleParticles() {
  particleArray.forEach((particle, index) => {
    particle.update();
    particle.draw();
    if (particle.size < 0.3) {
      particleArray.splice(index, 1);
    }
  });
}*/
function handleParticles() {
  for (let i = 0; i < particleArray.length; i++) {

    particleArray[i].update();
    particleArray[i].draw();

    for (let j = i; j < particleArray.length; j++) {
      const dx = particleArray[i].x - particleArray[j].x;
      const dy = particleArray[i].y - particleArray[j].y;
      const distance = Math.sqrt(dx * dx + dy * dy);

      if (distance < 100) {
        ctx.beginPath();
        ctx.strokeStyle = particleArray[i].color;
        ctx.lineWidth = 1;
        ctx.moveTo(particleArray[i].x, particleArray[i].y);
        ctx.lineTo(particleArray[j].x, particleArray[j].y);
        ctx.stroke();
        ctx.closePath();
      }
    }

    if (particleArray[i].size < 0.3) {
      particleArray.splice(i, 1);
    }
  }
}
//Animating the particles 
function animate() {
  ctx.clearRect(0, 0, canvas.width, canvas.height);
  /*ctx.fillStyle = 'rgba(0,0,0,0.1)';
  ctx.fillRect(0, 0, canvas.width, canvas.height);*/
  handleParticles();
  hue += 5;
  requestAnimationFrame(animate);
}

animate();
