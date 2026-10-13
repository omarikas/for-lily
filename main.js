const motionQuery = window.matchMedia("(prefers-reduced-motion: reduce)");

const nav = document.querySelector(".nav");
const onScroll = () => {
  nav.classList.toggle("scrolled", window.scrollY > 12);
};
onScroll();
document.addEventListener("scroll", onScroll, { passive: true });

const reveals = document.querySelectorAll(".reveal");

if (motionQuery.matches || !("IntersectionObserver" in window)) {
  reveals.forEach((el) => el.classList.add("in"));
} else {
  const observer = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        if (!entry.isIntersecting) return;
        entry.target.classList.add("in");
        observer.unobserve(entry.target);
      });
    },
    { threshold: 0.18, rootMargin: "0px 0px -8% 0px" }
  );
  reveals.forEach((el) => observer.observe(el));
}

const seal = document.querySelector("#seal");
const sealNote = document.querySelector("#seal-note");
const imprint = document.querySelector("#imprint");
const waxWords = seal.querySelector(".wax-words");

seal.addEventListener("click", () => {
  if (seal.classList.contains("is-sealed")) return;
  seal.classList.add("is-sealed");
  seal.setAttribute("aria-pressed", "true");
  waxWords.textContent = "I mean it";
  imprint.hidden = false;
  sealNote.textContent =
    "Sealed. I mean it — and you still don’t owe me anything back.";
});
