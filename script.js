// Three.js Scene Setup
let scene, camera, renderer, geometry, material, mesh;
let mouseX = 0,
  mouseY = 0;
let windowHalfX = window.innerWidth / 2;
let windowHalfY = window.innerHeight / 2;

// Initialize Three.js Scene
function initThreeJS() {
  const container = document.getElementById("hero-3d");

  // Scene
  scene = new THREE.Scene();

  // Camera
  camera = new THREE.PerspectiveCamera(
    75,
    window.innerWidth / window.innerHeight,
    0.1,
    1000
  );
  camera.position.z = 5;

  // Renderer
  renderer = new THREE.WebGLRenderer({ alpha: true, antialias: true });
  renderer.setSize(window.innerWidth, window.innerHeight);
  renderer.setPixelRatio(window.devicePixelRatio);
  container.appendChild(renderer.domElement);

  // Create multiple geometric shapes for visual interest
  createGeometricShapes();

  // Add lighting
  const ambientLight = new THREE.AmbientLight(0xffffff, 0.8);
  scene.add(ambientLight);

  const directionalLight = new THREE.DirectionalLight(0xffffff, 1.0);
  directionalLight.position.set(10, 10, 5);
  scene.add(directionalLight);

  // Start animation loop
  animate();
}

// Create educational-themed geometric shapes
function createGeometricShapes() {
  const shapes = [];

  // Main central shape - Book/Knowledge representation (Box geometry)
  const mainGeometry = new THREE.BoxGeometry(1.2, 0.3, 0.8);
  const mainMaterial = new THREE.MeshPhongMaterial({
    color: 0xffffff,
    transparent: true,
    opacity: 0.9,
    shininess: 120,
  });
  const mainMesh = new THREE.Mesh(mainGeometry, mainMaterial);
  mainMesh.position.set(0, 0, 0);
  mainMesh.rotation.x = Math.PI / 6; // Slight tilt like an open book
  scene.add(mainMesh);
  shapes.push(mainMesh);

  // Educational shapes around the main book
  const educationalShapes = [
    // Graduation Cap (Cone)
    {
      geometry: new THREE.ConeGeometry(0.25, 0.4, 8),
      color: 0x3b82f6,
      position: { x: 2, y: 0.5, z: 0 },
      rotation: { x: 0, y: 0, z: 0 },
    },
    // Atom/Molecule (Sphere with rings)
    {
      geometry: new THREE.SphereGeometry(0.2, 16, 16),
      color: 0x8b5cf6,
      position: { x: -2, y: 0, z: 1 },
      rotation: { x: 0, y: 0, z: 0 },
    },
    // Calculator (Box)
    {
      geometry: new THREE.BoxGeometry(0.3, 0.2, 0.4),
      color: 0xef4444,
      position: { x: 1.5, y: -0.3, z: -1.5 },
      rotation: { x: 0, y: Math.PI / 4, z: 0 },
    },
    // Microscope (Cylinder)
    {
      geometry: new THREE.CylinderGeometry(0.1, 0.15, 0.5, 8),
      color: 0x10b981,
      position: { x: -1.5, y: 0.2, z: -1 },
      rotation: { x: Math.PI / 6, y: 0, z: 0 },
    },
    // Globe (Sphere)
    {
      geometry: new THREE.SphereGeometry(0.25, 16, 16),
      color: 0xf59e0b,
      position: { x: 0, y: 1, z: 2 },
      rotation: { x: 0, y: 0, z: 0 },
    },
    // Pencil (Cylinder)
    {
      geometry: new THREE.CylinderGeometry(0.05, 0.08, 0.6, 6),
      color: 0xec4899,
      position: { x: 2.5, y: 0, z: 1.5 },
      rotation: { x: Math.PI / 3, y: Math.PI / 4, z: 0 },
    },
    // Mathematical Torus (Donut shape)
    {
      geometry: new THREE.TorusGeometry(0.2, 0.08, 8, 16),
      color: 0x06b6d4,
      position: { x: -2.5, y: 0.3, z: -0.5 },
      rotation: { x: Math.PI / 4, y: 0, z: 0 },
    },
    // Test Tube (Cylinder)
    {
      geometry: new THREE.CylinderGeometry(0.08, 0.1, 0.4, 8),
      color: 0x84cc16,
      position: { x: 1, y: -0.2, z: 2 },
      rotation: { x: 0, y: Math.PI / 6, z: 0 },
    },
  ];

  educationalShapes.forEach((shapeData, index) => {
    const material = new THREE.MeshPhongMaterial({
      color: shapeData.color,
      transparent: true,
      opacity: 0.8,
      shininess: 100,
    });
    const mesh = new THREE.Mesh(shapeData.geometry, material);

    mesh.position.set(
      shapeData.position.x,
      shapeData.position.y,
      shapeData.position.z
    );

    mesh.rotation.set(
      shapeData.rotation.x,
      shapeData.rotation.y,
      shapeData.rotation.z
    );

    scene.add(mesh);
    shapes.push(mesh);
  });

  // Add some floating particles for magical learning effect
  for (let i = 0; i < 20; i++) {
    const particleGeometry = new THREE.SphereGeometry(0.02, 8, 8);
    const particleMaterial = new THREE.MeshPhongMaterial({
      color: 0xffffff,
      transparent: true,
      opacity: 0.6,
    });
    const particle = new THREE.Mesh(particleGeometry, particleMaterial);

    particle.position.set(
      (Math.random() - 0.5) * 8,
      (Math.random() - 0.5) * 4,
      (Math.random() - 0.5) * 8
    );

    scene.add(particle);
    shapes.push(particle);
  }

  // Store shapes for animation
  window.shapes = shapes;

  // Create 3D Text "Education"
  createEducationText();
}

// Create 3D Text "Education"
function createEducationText() {
  const textMeshes = [];

  // Create letters using basic shapes
  const letters = [
    { char: "E", position: { x: -2.5, y: 1.5, z: 0 } },
    { char: "D", position: { x: -1.5, y: 1.5, z: 0 } },
    { char: "U", position: { x: -0.5, y: 1.5, z: 0 } },
    { char: "C", position: { x: 0.5, y: 1.5, z: 0 } },
    { char: "A", position: { x: 1.5, y: 1.5, z: 0 } },
    { char: "T", position: { x: 2.5, y: 1.5, z: 0 } },
    { char: "I", position: { x: 3.2, y: 1.5, z: 0 } },
    { char: "O", position: { x: 3.8, y: 1.5, z: 0 } },
    { char: "N", position: { x: 4.8, y: 1.5, z: 0 } },
  ];

  letters.forEach((letterData, index) => {
    // Create letter geometry based on character
    let geometry;

    switch (letterData.char) {
      case "E":
        geometry = new THREE.BoxGeometry(0.3, 0.8, 0.1);
        break;
      case "D":
        geometry = new THREE.CylinderGeometry(0.4, 0.4, 0.1, 8);
        break;
      case "U":
        geometry = new THREE.BoxGeometry(0.3, 0.6, 0.1);
        break;
      case "C":
        geometry = new THREE.TorusGeometry(0.3, 0.1, 8, 16, Math.PI);
        break;
      case "A":
        geometry = new THREE.ConeGeometry(0.3, 0.8, 4);
        break;
      case "T":
        geometry = new THREE.BoxGeometry(0.3, 0.8, 0.1);
        break;
      case "I":
        geometry = new THREE.CylinderGeometry(0.1, 0.1, 0.8, 8);
        break;
      case "O":
        geometry = new THREE.TorusGeometry(0.3, 0.1, 8, 16);
        break;
      case "N":
        geometry = new THREE.BoxGeometry(0.3, 0.8, 0.1);
        break;
      default:
        geometry = new THREE.BoxGeometry(0.2, 0.6, 0.1);
    }

    const material = new THREE.MeshPhongMaterial({
      color: 0x60a5fa,
      transparent: true,
      opacity: 0.9,
      shininess: 100,
    });

    const letterMesh = new THREE.Mesh(geometry, material);
    letterMesh.position.set(
      letterData.position.x,
      letterData.position.y,
      letterData.position.z
    );

    // Add some rotation for visual interest
    letterMesh.rotation.x = Math.PI / 12;
    letterMesh.rotation.y = Math.PI / 8;

    scene.add(letterMesh);
    textMeshes.push(letterMesh);
  });

  // Store text meshes for animation
  window.educationText = textMeshes;
}

// Animation loop
function animate() {
  requestAnimationFrame(animate);

  const time = Date.now() * 0.001;

  // Rotate main book shape gently
  if (window.shapes && window.shapes[0]) {
    window.shapes[0].rotation.y += 0.005;
    window.shapes[0].rotation.x = Math.PI / 6 + Math.sin(time * 0.5) * 0.1;
  }

  // Animate educational shapes with different behaviors
  window.shapes?.forEach((shape, index) => {
    if (index > 0 && index <= 8) {
      // Educational shapes (excluding particles)
      // Different rotation speeds for each shape
      shape.rotation.x += 0.01 * (index % 2 === 0 ? 1 : -1);
      shape.rotation.y += 0.005 * (index % 3 === 0 ? 1 : -1);

      // Floating animation with different frequencies
      shape.position.y += Math.sin(time + index) * 0.002;

      // Gentle orbit around the center
      const orbitRadius = 2.5 + index * 0.2;
      const orbitSpeed = 0.3 + index * 0.05;
      shape.position.x += Math.cos(time * orbitSpeed + index) * 0.001;
      shape.position.z += Math.sin(time * orbitSpeed + index) * 0.001;
    }

    // Animate particles (index > 8)
    if (index > 8) {
      shape.rotation.x += 0.02;
      shape.rotation.y += 0.01;

      // Floating particles
      shape.position.y += Math.sin(time * 2 + index) * 0.003;
      shape.position.x += Math.cos(time * 1.5 + index) * 0.002;
      shape.position.z += Math.sin(time * 1.8 + index) * 0.002;
    }
  });

  // Mouse interaction - educational shapes respond to cursor
  if (window.shapes) {
    window.shapes.forEach((shape, index) => {
      if (index <= 8) {
        // Only educational shapes respond to mouse
        const intensity = index === 0 ? 0.15 : 0.08; // Book responds more
        shape.position.x += (mouseX * intensity - shape.position.x) * 0.03;
        shape.position.y += (mouseY * intensity - shape.position.y) * 0.03;
      }
    });
  }

  // Education text shake effect with cursor movement
  if (window.educationText) {
    window.educationText.forEach((letterMesh, index) => {
      // Each letter shakes with different intensity based on cursor movement
      const shakeIntensity = 0.2 + index * 0.02; // Increasing intensity for each letter
      const shakeX = mouseX * shakeIntensity;
      const shakeY = mouseY * shakeIntensity;
      const shakeZ = (mouseX + mouseY) * 0.1;

      // Apply shake with some randomness for each letter
      letterMesh.position.x +=
        (shakeX + Math.sin(time * 2 + index) * 0.05 - letterMesh.position.x) *
        0.1;
      letterMesh.position.y +=
        (shakeY + Math.cos(time * 1.5 + index) * 0.05 - letterMesh.position.y) *
        0.1;
      letterMesh.position.z +=
        (shakeZ + Math.sin(time * 3 + index) * 0.03 - letterMesh.position.z) *
        0.1;

      // Add rotation shake
      letterMesh.rotation.x += Math.sin(time * 4 + index) * 0.01;
      letterMesh.rotation.y += Math.cos(time * 3 + index) * 0.01;
      letterMesh.rotation.z += Math.sin(time * 2 + index) * 0.005;
    });
  }

  // Camera movement based on mouse - more subtle for educational theme
  camera.position.x += (mouseX * 0.3 - camera.position.x) * 0.05;
  camera.position.y += (mouseY * 0.3 - camera.position.y) * 0.05;
  camera.lookAt(scene.position);

  renderer.render(scene, camera);
}

// Mouse move handler
function onMouseMove(event) {
  mouseX = (event.clientX - windowHalfX) * 0.01;
  mouseY = (event.clientY - windowHalfY) * 0.01;
}

// Window resize handler
function onWindowResize() {
  windowHalfX = window.innerWidth / 2;
  windowHalfY = window.innerHeight / 2;

  camera.aspect = window.innerWidth / window.innerHeight;
  camera.updateProjectionMatrix();

  renderer.setSize(window.innerWidth, window.innerHeight);
}

// GSAP Animations Setup
function initGSAPAnimations() {
  // Register ScrollTrigger plugin
  gsap.registerPlugin(ScrollTrigger);

  // Hero section animations
  gsap
    .timeline()
    .to(".title-line", {
      opacity: 1,
      y: 0,
      duration: 1,
      stagger: 0.2,
      ease: "power3.out",
    })
    .to(
      ".hero-subtitle",
      {
        opacity: 1,
        y: 0,
        duration: 0.8,
        ease: "power3.out",
      },
      "-=0.5"
    )
    .to(
      ".hero-buttons",
      {
        opacity: 1,
        y: 0,
        duration: 0.8,
        ease: "power3.out",
      },
      "-=0.3"
    );

  // Scroll-triggered animations
  gsap.utils.toArray(".fade-in").forEach((element) => {
    gsap.fromTo(
      element,
      {
        opacity: 0,
        y: 50,
      },
      {
        opacity: 1,
        y: 0,
        duration: 0.8,
        ease: "power3.out",
        scrollTrigger: {
          trigger: element,
          start: "top 95%",
          end: "bottom 5%",
          toggleActions: "play none none reverse",
        },
      }
    );
  });

  gsap.utils.toArray(".slide-in-left").forEach((element) => {
    gsap.fromTo(
      element,
      {
        opacity: 0,
        x: -50,
      },
      {
        opacity: 1,
        x: 0,
        duration: 0.8,
        ease: "power3.out",
        scrollTrigger: {
          trigger: element,
          start: "top 90%",
          end: "bottom 10%",
          toggleActions: "play none none reverse",
        },
      }
    );
  });

  gsap.utils.toArray(".slide-in-right").forEach((element) => {
    gsap.fromTo(
      element,
      {
        opacity: 0,
        x: 50,
      },
      {
        opacity: 1,
        x: 0,
        duration: 0.8,
        ease: "power3.out",
        scrollTrigger: {
          trigger: element,
          start: "top 90%",
          end: "bottom 10%",
          toggleActions: "play none none reverse",
        },
      }
    );
  });

  gsap.utils.toArray(".scale-in").forEach((element) => {
    gsap.fromTo(
      element,
      {
        opacity: 0,
        scale: 0.8,
      },
      {
        opacity: 1,
        scale: 1,
        duration: 0.8,
        ease: "power3.out",
        scrollTrigger: {
          trigger: element,
          start: "top 80%",
          end: "bottom 20%",
          toggleActions: "play none none reverse",
        },
      }
    );
  });

  // Program cards animation
  gsap.fromTo(
    ".program-card",
    {
      opacity: 0,
      y: 100,
      scale: 0.8,
    },
    {
      opacity: 1,
      y: 0,
      scale: 1,
      duration: 0.8,
      stagger: 0.2,
      ease: "power3.out",
      scrollTrigger: {
        trigger: ".programs-grid",
        start: "top 70%",
        end: "bottom 30%",
        toggleActions: "play none none reverse",
      },
    }
  );

  // Facility cards animation
  gsap.fromTo(
    ".facility-card",
    {
      opacity: 0,
      y: 50,
      rotation: 5,
    },
    {
      opacity: 1,
      y: 0,
      rotation: 0,
      duration: 0.6,
      stagger: 0.1,
      ease: "power3.out",
      scrollTrigger: {
        trigger: ".facilities-grid",
        start: "top 70%",
        end: "bottom 30%",
        toggleActions: "play none none reverse",
      },
    }
  );

  // Stats counter animation
  gsap.utils.toArray(".stat h4").forEach((stat) => {
    const endValue = parseInt(stat.textContent);
    gsap.fromTo(
      stat,
      {
        textContent: 0,
      },
      {
        textContent: endValue,
        duration: 2,
        ease: "power2.out",
        snap: { textContent: 1 },
        scrollTrigger: {
          trigger: stat,
          start: "top 80%",
          toggleActions: "play none none reverse",
        },
      }
    );
  });
}

// Navigation functionality
function initNavigation() {
  const mobileMenu = document.getElementById("mobile-menu");
  const navMenu = document.querySelector(".nav-menu");
  const navLinks = document.querySelectorAll(".nav-link");

  // Mobile menu toggle
  mobileMenu.addEventListener("click", () => {
    mobileMenu.classList.toggle("active");
    navMenu.classList.toggle("active");
  });

  // Close mobile menu when clicking on a link
  navLinks.forEach((link) => {
    link.addEventListener("click", () => {
      mobileMenu.classList.remove("active");
      navMenu.classList.remove("active");
    });
  });

  // Smooth scrolling for navigation links
  navLinks.forEach((link) => {
    link.addEventListener("click", (e) => {
      e.preventDefault();
      const targetId = link.getAttribute("href");
      const targetSection = document.querySelector(targetId);

      if (targetSection) {
        targetSection.scrollIntoView({
          behavior: "smooth",
          block: "start",
        });
      }
    });
  });

  // Navbar background on scroll
  window.addEventListener("scroll", () => {
    const navbar = document.querySelector(".navbar");
    if (window.scrollY > 50) {
      navbar.style.background = "rgba(17, 24, 39, 0.98)";
      navbar.style.boxShadow = "0 2px 20px rgba(0, 0, 0, 0.3)";
    } else {
      navbar.style.background = "rgba(17, 24, 39, 0.95)";
      navbar.style.boxShadow = "none";
    }
  });
}

// Form handling
function initFormHandling() {
  const contactForm = document.querySelector(".contact-form");

  contactForm.addEventListener("submit", (e) => {
    e.preventDefault();

    // Get form data
    const formData = new FormData(contactForm);
    const name = contactForm.querySelector('input[type="text"]').value;
    const email = contactForm.querySelector('input[type="email"]').value;
    const message = contactForm.querySelector("textarea").value;

    // Simple validation
    if (!name || !email || !message) {
      alert("Please fill in all fields.");
      return;
    }

    // Simulate form submission
    const submitBtn = contactForm.querySelector(".btn-primary");
    const originalText = submitBtn.textContent;

    submitBtn.textContent = "Sending...";
    submitBtn.disabled = true;

    setTimeout(() => {
      alert("Thank you for your message! We will get back to you soon.");
      contactForm.reset();
      submitBtn.textContent = originalText;
      submitBtn.disabled = false;
    }, 2000);
  });
}

// Enhanced hover effects for cards
function initCardHoverEffects() {
  // Program cards hover effects
  const programCards = document.querySelectorAll(".program-card");
  programCards.forEach((card) => {
    card.addEventListener("mouseenter", () => {
      gsap.to(card.querySelector(".program-icon"), {
        scale: 1.1,
        rotation: 5,
        duration: 0.3,
        ease: "power2.out",
      });

      gsap.to(card.querySelector("h3"), {
        color: "#60a5fa",
        duration: 0.3,
        ease: "power2.out",
      });
    });

    card.addEventListener("mouseleave", () => {
      gsap.to(card.querySelector(".program-icon"), {
        scale: 1,
        rotation: 0,
        duration: 0.3,
        ease: "power2.out",
      });

      gsap.to(card.querySelector("h3"), {
        color: "#f9fafb",
        duration: 0.3,
        ease: "power2.out",
      });
    });
  });

  // Facility cards hover effects
  const facilityCards = document.querySelectorAll(".facility-card");
  facilityCards.forEach((card) => {
    card.addEventListener("mouseenter", () => {
      gsap.to(card.querySelector(".facility-image"), {
        scale: 1.2,
        rotation: -5,
        duration: 0.3,
        ease: "power2.out",
      });

      gsap.to(card.querySelector("h3"), {
        color: "#60a5fa",
        duration: 0.3,
        ease: "power2.out",
      });
    });

    card.addEventListener("mouseleave", () => {
      gsap.to(card.querySelector(".facility-image"), {
        scale: 1,
        rotation: 0,
        duration: 0.3,
        ease: "power2.out",
      });

      gsap.to(card.querySelector("h3"), {
        color: "#f9fafb",
        duration: 0.3,
        ease: "power2.out",
      });
    });
  });
}

// Button interactions
function initButtonInteractions() {
  const buttons = document.querySelectorAll(".btn");

  buttons.forEach((button) => {
    button.addEventListener("mouseenter", () => {
      gsap.to(button, {
        scale: 1.05,
        duration: 0.3,
        ease: "power2.out",
      });
    });

    button.addEventListener("mouseleave", () => {
      gsap.to(button, {
        scale: 1,
        duration: 0.3,
        ease: "power2.out",
      });
    });

    button.addEventListener("click", () => {
      gsap.to(button, {
        scale: 0.95,
        duration: 0.1,
        ease: "power2.out",
        yoyo: true,
        repeat: 1,
      });
    });
  });
}

// Parallax effect for hero section
function initParallaxEffect() {
  window.addEventListener("scroll", () => {
    const scrolled = window.pageYOffset;
    const heroContent = document.querySelector(".hero-content");

    if (heroContent) {
      gsap.to(heroContent, {
        y: scrolled * 0.5,
        duration: 0.1,
        ease: "none",
      });
    }
  });
}

// Initialize everything when DOM is loaded
document.addEventListener("DOMContentLoaded", () => {
  // Initialize Three.js
  initThreeJS();

  // Initialize GSAP animations
  initGSAPAnimations();

  // Initialize navigation
  initNavigation();

  // Initialize form handling
  initFormHandling();

  // Initialize button interactions
  initButtonInteractions();

  // Initialize card hover effects
  initCardHoverEffects();

  // Initialize parallax effect
  initParallaxEffect();

  // Add event listeners
  window.addEventListener("mousemove", onMouseMove);
  window.addEventListener("resize", onWindowResize);

  // Add animation classes to elements
  document
    .querySelectorAll(".about-text")
    .forEach((el) => el.classList.add("slide-in-left"));
  document
    .querySelectorAll(".about-image")
    .forEach((el) => el.classList.add("slide-in-right"));
  document
    .querySelectorAll(".section-header")
    .forEach((el) => el.classList.add("fade-in"));
  document
    .querySelectorAll(".program-card")
    .forEach((el) => el.classList.add("scale-in"));
  document
    .querySelectorAll(".facility-card")
    .forEach((el) => el.classList.add("fade-in"));
  document
    .querySelectorAll(".contact-item")
    .forEach((el) => el.classList.add("slide-in-left"));
  document
    .querySelectorAll(".contact-form")
    .forEach((el) => el.classList.add("slide-in-right"));

  // Fallback: Make sure about section, contact form, and section headers are visible
  setTimeout(() => {
    document.querySelectorAll(".about-text").forEach((el) => {
      el.style.opacity = "1";
      el.style.transform = "translateX(0)";
    });
    document.querySelectorAll(".about-image").forEach((el) => {
      el.style.opacity = "1";
      el.style.transform = "translateX(0)";
    });
    document.querySelectorAll(".contact-form").forEach((el) => {
      el.style.opacity = "1";
      el.style.transform = "translateX(0)";
    });
    document.querySelectorAll(".contact-item").forEach((el) => {
      el.style.opacity = "1";
      el.style.transform = "translateX(0)";
    });
    document.querySelectorAll(".section-header").forEach((el) => {
      el.style.opacity = "1";
      el.style.transform = "translateY(0)";
    });
  }, 1000);
});

// Cleanup on page unload
window.addEventListener("beforeunload", () => {
  if (renderer) {
    renderer.dispose();
  }
  if (scene) {
    scene.clear();
  }
});
