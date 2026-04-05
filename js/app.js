// AI Gravity — Cinematic Animation Engine (GSAP + ScrollTrigger)
document.addEventListener("DOMContentLoaded", () => {
    if (typeof gsap === 'undefined') return;
    gsap.registerPlugin(ScrollTrigger);

    // 1. HERO entrance
    const heroTl = gsap.timeline({ defaults: { ease: "power4.out" } });
    heroTl
        .from("#navbar", { y: -60, opacity: 0, duration: 0.8 })
        .from(".hero-badge", { y: 16, opacity: 0, duration: 0.6 }, "-=0.3")
        .from(".hero-headline", { y: 40, opacity: 0, duration: 1 }, "-=0.4")
        .from(".hero-sub", { y: 24, opacity: 0, duration: 0.8 }, "-=0.6")
        .from("#hero .btn-primary", { scale: 0.88, opacity: 0, duration: 0.7, ease: "back.out(2)", immediateRender: false }, "-=0.5")
        .from(".hero-obs", { y: 10, opacity: 0, duration: 0.5 }, "-=0.2")
        .from(".hero-visual-placeholder", { scale: 0.7, opacity: 0, duration: 1.2, ease: "power3.out" }, "-=1");

    // 2. Scroll Reveal for .reveal elements
    gsap.utils.toArray(".reveal").forEach(el => {
        gsap.to(el, {
            scrollTrigger: { trigger: el, start: "top 88%", toggleActions: "play none none reverse" },
            opacity: 1,
            y: 0,
            duration: 0.75,
            ease: "power3.out"
        });
    });

    // Staggered delays for who-cards
    const delays = { ".reveal-delay-1": 0, ".reveal-delay-2": 0.1, ".reveal-delay-3": 0.2, ".reveal-delay-4": 0.3 };
    Object.entries(delays).forEach(([sel, delay]) => {
        document.querySelectorAll(sel).forEach(el => {
            gsap.to(el, {
                scrollTrigger: { trigger: "#who", start: "top 80%", toggleActions: "play none none reverse" },
                opacity: 1, y: 0, duration: 0.7, delay, ease: "power3.out"
            });
        });
    });

    // 3. Navbar shrink on scroll
    ScrollTrigger.create({
        start: 80,
        onEnter: () => document.getElementById("navbar").classList.add("scrolled"),
        onLeaveBack: () => document.getElementById("navbar").classList.remove("scrolled")
    });

    // 4. FAQ accordion
    document.querySelectorAll(".faq-question").forEach(btn => {
        btn.addEventListener("click", () => {
            const item = btn.closest(".faq-item");
            const isOpen = item.classList.contains("open");
            document.querySelectorAll(".faq-item.open").forEach(i => i.classList.remove("open"));
            if (!isOpen) item.classList.add("open");
        });
    });

    // 5. Smooth parallax for glows
    gsap.to(".hero-glow", {
        scrollTrigger: { trigger: "#hero", start: "top top", end: "bottom top", scrub: true },
        y: -80, opacity: 0.3
    });
});
