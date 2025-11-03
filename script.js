document.addEventListener("DOMContentLoaded", () => {
  // Get CSS variables as strings
  const root = document.documentElement;
  const style = getComputedStyle(root);
  const gold = style.getPropertyValue('--gold').trim();
  const pastelPink = style.getPropertyValue('--pastel-pink').trim();
  const violet = style.getPropertyValue('--violet').trim();
  const sapphire = style.getPropertyValue('--sapphire').trim();
  const starWhite = style.getPropertyValue('--star-white').trim();

  // Elements
  const startBtn = document.getElementById("startBtn"); // NEW: Start button
  const intro = document.getElementById("intro");
  const preview = document.getElementById("preview");
  const previewName = document.getElementById("previewName");
  const previewDob = document.getElementById("previewDob");
  const portalBtn = document.getElementById("portalBtn");
  const teleportPhase = document.getElementById("teleportPhase");
  const flowerPhase = document.getElementById("flowerPhase");
  const giftPhase = document.getElementById("giftPhase");
  const rarePortalPhase = document.getElementById("rarePortalPhase");
  const letterPhase = document.getElementById("letterPhase");
  const giftBox = document.getElementById("giftBox");
  const letterCard = document.querySelector(".letter-card");
  const bgCanvas = document.getElementById("bgCanvas");
  const teleportCanvas = document.getElementById("teleportCanvas");
  const flowerCanvas = document.getElementById("flowerCanvas");
  const rarePortalCanvas = document.getElementById("rarePortalCanvas");
  const ctxBg = bgCanvas.getContext("2d");
  const ctxTeleport = teleportCanvas.getContext("2d");
  const ctxFlower = flowerCanvas.getContext("2d");
  const ctxRare = rarePortalCanvas.getContext("2d");
  const nameEl = document.getElementById("letterName");
  const dobEl = document.getElementById("letterDob");
  const wishEl = document.getElementById("letterWish");
  const muteBtn = document.getElementById("muteBtn");

  // Audio
  const ambientIntro = document.getElementById("ambientIntro");
  const previewChime = document.getElementById("previewChime");
  const portalSound = document.getElementById("portalSound");
  const teleportWhoosh = document.getElementById("teleportWhoosh");
  const bloomSound = document.getElementById("bloomSound");
  const bloomReverb = document.getElementById("bloomReverb");
  const hoverCreak = document.getElementById("hoverCreak");
  const ribbonSnap = document.getElementById("ribbonSnap");
  const openSound = document.getElementById("openSound");
  const treasureSound = document.getElementById("treasureSound");
  const goldenChime = document.getElementById("goldenChime");
  const etherealWhoosh = document.getElementById("etherealWhoosh");
  const fanfareSound = document.getElementById("fanfareSound");
  const confettiPop = document.getElementById("confettiPop");
  const wishVoice = document.getElementById("wishVoice");

  let W, H;
  let mouseX = 0, mouseY = 0;
  let isMuted = false;

  // NEW: Hardcoded Values (Edit Here)
  const HARDCODED_NAME = "Mak Leak my lovely girl💖";
  const HARDCODED_DOB = "03/November/2004"; // YYYY-MM-DD format
  const HARDCODED_WISH = `🎉 Happy Birthday, Mak
        You’re like Wi-Fi — when you’re around, everything just feels better.
        I hope your day’s filled with laughter, good food, and the kind of happiness that sticks around for days.
        You deserve all the good things today — just relax, enjoy, and let the world treat you kindly. 🎂💫`;

  // Audio Helpers
  function playAudio(audio, volume = 0.6, fadeIn = false) {
    if (isMuted) return;
    audio.volume = volume;
    audio.currentTime = 0;
    audio.play().catch(() => {});
    if (fadeIn) gsap.fromTo(audio, { volume: 0 }, { volume, duration: 1 });
  }
  function stopAudio(audio, fadeOut = false) {
    if (fadeOut) gsap.to(audio, { volume: 0, duration: 1, onComplete: () => audio.pause() });
    else { audio.pause(); audio.currentTime = 0; }
  }

  // Mute Toggle
  muteBtn.addEventListener("click", () => {
    isMuted = !isMuted;
    muteBtn.textContent = isMuted ? "🔇" : "🔊";
    muteBtn.classList.toggle("muted", isMuted);
  });

  // Background Particles (unchanged)
  function createParticles(ctx, count, opts = {}) {
    const particles = [];
    for (let i = 0; i < count; i++) {
      particles.push({
        x: Math.random() * W,
        y: Math.random() * H,
        vx: (Math.random() - 0.5) * 0.3,
        vy: (Math.random() - 0.5) * 0.3,
        size: Math.random() * 2 + 1,
        opacity: Math.random() * 0.4 + 0.3,
        color: opts.color || `hsl(${Math.random() * 60 + 270}, 70%, 80%)`,
        ...opts
      });
    }
    function animate() {
      ctx.clearRect(0, 0, W, H);
      particles.forEach(p => {
        p.x += p.vx + (mouseX - W/2) * 0.00005;
        p.y += p.vy + (mouseY - H/2) * 0.00005;
        if (p.x < 0 || p.x > W) p.vx *= -1;
        if (p.y < 0 || p.y > H) p.vy *= -1;
        ctx.beginPath();
        ctx.arc(p.x, p.y, p.size, 0, Math.PI * 2);
        ctx.fillStyle = p.color;
        ctx.globalAlpha = p.opacity;
        ctx.fill();
      });
      ctx.globalAlpha = 1;
      requestAnimationFrame(animate);
    }
    animate();
  }

  // Resize (simplified, no nebula for lightness)
  function resize() {
    W = bgCanvas.width = teleportCanvas.width = flowerCanvas.width = rarePortalCanvas.width = window.innerWidth;
    H = bgCanvas.height = teleportCanvas.height = flowerCanvas.height = rarePortalCanvas.height = window.innerHeight;
    createParticles(ctxBg, 80, { color: `hsl(${Math.random() * 60 + 270}, 70%, 80%)` });
  }
  window.addEventListener("resize", resize);
  document.addEventListener('mousemove', (e) => {
    mouseX = e.clientX;
    mouseY = e.clientY;
  });
  resize();

  // Start Ambient
  playAudio(ambientIntro, 0.4, true);

  // NEW: Start Button Click → Show Preview with Hardcoded Data
  startBtn.addEventListener("click", () => {
    stopAudio(ambientIntro, true);
    const dateText = new Date(HARDCODED_DOB).toLocaleDateString('en-US', { month: 'long', day: 'numeric', year: 'numeric' });
    previewName.textContent = HARDCODED_NAME;
    previewDob.textContent = `Born on ${dateText}`;
    gsap.to(intro, { opacity: 0, duration: 1, onComplete: () => {
      intro.style.display = "none";
      preview.style.display = "flex";
      gsap.fromTo(".preview-card", { opacity: 0, scale: 0.8 }, { opacity: 1, scale: 1, duration: 1.5, ease: "back.out(1.7)", onComplete: () => playAudio(previewChime, 0.7) });
    }});
  });

  // Portal Button → Teleport (unchanged)
  portalBtn.addEventListener("click", () => {
    playAudio(portalSound, 0.8);
    setTimeout(() => playAudio(teleportWhoosh, 0.6), 1000);
    preview.style.display = "none";
    teleportPhase.style.display = "flex";
    teleportAnimation(() => {
      teleportPhase.style.display = "none";
      flowerPhase.style.display = "flex";
      playAudio(bloomSound, 0.5, true);
      setTimeout(() => playAudio(bloomReverb, 0.3), 1500);
      flowerAnimation(() => {
        stopAudio(bloomSound);
        stopAudio(bloomReverb);
        flowerPhase.style.display = "none";
        giftPhase.style.display = "flex";
        gsap.fromTo("#giftBox", { opacity: 0, scale: 0, rotationY: -180 }, { opacity: 1, scale: 1, rotationY: 0, duration: 1.5, ease: "bounce.out" });
      });
    });
  });

  // Teleport Animation (unchanged)
  function teleportAnimation(onComplete) {
    let vortexParticles = [];
    for (let i = 0; i < 400; i++) {
      vortexParticles.push({
        x: Math.random() * W,
        y: Math.random() * H,
        vx: (Math.random() - 0.5) * 10,
        vy: (Math.random() - 0.5) * 10,
        size: Math.random() * 4 + 1,
        color: `hsl(180, 100%, ${50 + Math.random() * 50}%)`,
        angle: Math.random() * Math.PI * 2,
        spiralSpeed: Math.random() * 0.05 + 0.02
      });
    }

    anime({
      targets: vortexParticles,
      duration: 4000,
      easing: "easeOutExpo",
      update: () => {
        ctxTeleport.clearRect(0, 0, W, H);
        if (Math.random() > 0.7) {
          ctxTeleport.fillStyle = `rgba(0, 255, 255, ${Math.random() * 0.1})`;
          ctxTeleport.fillRect(0, 0, W, H);
        }
        vortexParticles.forEach((p) => {
          const dx = W/2 - p.x;
          const dy = H/2 - p.y;
          const dist = Math.sqrt(dx*dx + dy*dy);
          p.angle += p.spiralSpeed;
          p.x += Math.cos(p.angle) * dist * 0.01 + p.vx;
          p.y += Math.sin(p.angle) * dist * 0.01 + p.vy;
          p.vx *= 0.98;
          p.vy *= 0.98;
          ctxTeleport.beginPath();
          ctxTeleport.arc(p.x, p.y, p.size, 0, Math.PI * 2);
          ctxTeleport.fillStyle = p.color;
          ctxTeleport.shadowColor = p.color;
          ctxTeleport.shadowBlur = 10;
          ctxTeleport.fill();
        });
      },
      complete: () => {
        gsap.to(teleportCanvas, { opacity: 0, duration: 1, onComplete });
      }
    });
  }

  // Flower Animation (unchanged)
  function flowerAnimation(onComplete) {
    let flowers = [];
    const centerX = W / 2;
    const centerY = H / 2;
    for (let i = 0; i < 150; i++) {
      const angle = (i / 150) * Math.PI * 2;
      flowers.push({
        x: centerX,
        y: centerY,
        petals: 8,
        radius: 0,
        targetRadius: 80 + Math.random() * 120,
        color: `hsl(${300 + Math.random() * 60}, 80%, 70%)`,
        delay: Math.random() * 1500
      });
    }

    anime({
      targets: flowers,
      radius: flower => flower.targetRadius,
      duration: 3000,
      delay: flower => flower.delay,
      easing: "easeOutQuad",
      update: () => {
        ctxFlower.clearRect(0, 0, W, H);
        flowers.forEach(f => {
          ctxFlower.save();
          ctxFlower.translate(f.x, f.y);
          for (let j = 0; j < f.petals; j++) {
            const petalAngle = (j / f.petals) * Math.PI * 2;
            const petalX = Math.cos(petalAngle) * f.radius * 0.7;
            const petalY = Math.sin(petalAngle) * f.radius * 0.7;
            ctxFlower.beginPath();
            ctxFlower.ellipse(petalX, petalY, 8, 4, petalAngle, 0, Math.PI * 2);
            ctxFlower.fillStyle = f.color;
            ctxFlower.shadowColor = f.color;
            ctxFlower.shadowBlur = 5;
            ctxFlower.fill();
          }
          ctxFlower.beginPath();
          ctxFlower.arc(0, 0, 5, 0, Math.PI * 2);
          ctxFlower.fillStyle = "#ffd700";
          ctxFlower.fill();
          ctxFlower.restore();
        });
      },
      complete: () => {
        setTimeout(onComplete, 3000);
      }
    });
  }

  // Gift Box Interactions (unchanged)
  giftBox.addEventListener("mouseenter", () => hoverCreak.play().catch(() => {}));
  giftBox.addEventListener("click", () => {
    ribbonSnap.play().catch(() => {});
    openSound.play().catch(() => {});
    setTimeout(() => treasureSound.play().catch(() => {}), 200);
    giftBox.classList.add("open");
    setTimeout(() => {
      giftPhase.style.display = "none";
      rarePortalPhase.style.display = "flex";
      goldenChime.play().catch(() => {});
      setTimeout(() => etherealWhoosh.play().catch(() => {}), 1500);
      rarePortalAnimation(() => {
        goldenChime.pause();
        etherealWhoosh.pause();
        rarePortalPhase.style.display = "none";
        letterPhase.style.display = "flex";
        const birthDate = new Date(HARDCODED_DOB);
        const today = new Date("2025-11-02"); // Current date
        let age = today.getFullYear() - birthDate.getFullYear();
        const mDiff = today.getMonth() - birthDate.getMonth();
        if (mDiff < 0 || (mDiff === 0 && today.getDate() < birthDate.getDate())) age--;
        const dateText = birthDate.toLocaleDateString('en-US', { month: 'long', day: 'numeric', year: 'numeric' });
        nameEl.textContent = `${HARDCODED_NAME}! 🎂`;
        dobEl.textContent = `Born on ${dateText} – Shining at ${age} ✨`;
        wishEl.textContent = HARDCODED_WISH;
        const tl = gsap.timeline();
        tl.to(letterCard, { opacity: 1, scale: 1, rotationY: 0, duration: 1.5, ease: "back.out(1.7)" })
          .to(nameEl, { opacity: 1, y: 0, duration: 1, ease: "power3.out" }, "-=1")
          .to(dobEl, { opacity: 1, y: 0, duration: 1 }, "-=0.5")
          .to(wishEl, { opacity: 1, y: 0, duration: 1 }, "-=0.5")
          .call(() => {
            fanfareSound.play().catch(() => {});
            setTimeout(() => confettiPop.play().catch(() => {}), 500);
            // TTS for wish
            const utterance = new SpeechSynthesisUtterance(wishEl.textContent);
            utterance.rate = 0.8;
            utterance.pitch = 1.2;
            utterance.volume = 0.7;
            speechSynthesis.speak(utterance);
            if (wishVoice.src) wishVoice.play().catch(() => {});
            launchConfetti(ctxFireflies);
          });
        letterCard.classList.add("open");
      });
    }, 800);
  });

  // Rare Golden Portal (unchanged)
  function rarePortalAnimation(onComplete) {
    let goldenParticles = [];
    for (let i = 0; i < 200; i++) {
      goldenParticles.push({
        x: Math.random() * W,
        y: Math.random() * H,
        vx: (Math.random() - 0.5) * 5,
        vy: (Math.random() - 0.5) * 5,
        size: Math.random() * 8 + 3,
        color: `hsl(50, 100%, ${70 + Math.random() * 30}%)`,
        angle: Math.random() * Math.PI * 2,
        spiralSpeed: Math.random() * 0.03 + 0.01,
        glow: Math.random() * 20 + 10
      });
    }

    anime({
      targets: goldenParticles,
      duration: 5000,
      easing: "easeOutQuint",
      update: () => {
        ctxRare.clearRect(0, 0, W, H);
        goldenParticles.forEach((p) => {
          const dx = W/2 - p.x;
          const dy = H/2 - p.y;
          const dist = Math.sqrt(dx*dx + dy*dy);
          p.angle += p.spiralSpeed;
          p.x += Math.cos(p.angle) * dist * 0.005 + p.vx;
          p.y += Math.sin(p.angle) * dist * 0.005 + p.vy;
          p.vx *= 0.99;
          p.vy *= 0.99;
          ctxRare.beginPath();
          ctxRare.arc(p.x, p.y, p.size, 0, Math.PI * 2);
          ctxRare.fillStyle = p.color;
          ctxRare.shadowColor = p.color;
          ctxRare.shadowBlur = p.glow;
          ctxRare.fill();
          ctxRare.beginPath();
          ctxRare.arc(p.x + p.vx * 2, p.y + p.vy * 2, p.size * 0.5, 0, Math.PI * 2);
          ctxRare.fillStyle = p.color + "40";
          ctxRare.fill();
        });
      },
      complete: () => {
        gsap.to(rarePortalCanvas, { opacity: 0, duration: 1.5, onComplete });
      }
    });
  }

  // Confetti (unchanged)
  function launchConfetti(ctx) {
    let confetti = [];
    for (let i = 0; i < 100; i++) {
      confetti.push({
        x: Math.random() * W,
        y: -10,
        vx: (Math.random() - 0.5) * 15,
        vy: Math.random() * 8 + 3,
        size: Math.random() * 4 + 2,
        color: ['#ff6b6b', '#4ecdc4', '#45b7d1', '#96ceb4', '#feca57'][Math.floor(Math.random() * 5)]
      });
    }
    function animate() {
      ctx.clearRect(0, 0, W, H);
      confetti.forEach((c, i) => {
        c.x += c.vx;
        c.y += c.vy;
        c.vy += 0.15;
        c.vx *= 0.995;
        if (c.y > H) confetti.splice(i, 1);
        ctx.fillStyle = c.color;
        ctx.fillRect(c.x, c.y, c.size, c.size);
      });
      if (confetti.length > 0) requestAnimationFrame(animate);
    }
    animate();
  }
});