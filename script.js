const { createApp } = Vue;

createApp({
	data() {
		return {
			diamonds: [
				{ x: 60, y: 140, s: 1 },
				{ x: 320, y: 80, s: 0.7 },
				{ x: 330, y: 150, s: 0.5 },
				{ x: 70, y: 230, s: 0.6 },
				{ x: 340, y: 220, s: 1.2 },
				{ x: 150, y: 370, s: 0.7 }
			],
			rings: [
				{ x: 160, y: 20 },
				{ x: 260, y: 360 },
				{ x: 100, y: 350 }
			],
			dots: [
				{ x: 230, y: 30 },
				{ x: 320, y: 130 },
				{ x: 315, y: 210 },
				{ x: 240, y: 370 },
				{ x: 125, y: 355 },
				{ x: 80, y: 210 },
				{ x: 70, y: 100 }
			]
		};
	},
	methods: {
		init() {
			// Skullcat
			gsap.set(".skull", { opacity: 0, y: 40 });
			gsap.set(".cat", { opacity: 0, y: 40 });

			// Crossbones
			gsap.set(".pumpkin", { opacity: 0, y: 40 });
			gsap.set(".bone", { opacity: 0, rotation: 0 });
			gsap.set(".date", { opacity: 0 });
			gsap.set(".month", { opacity: 0 });

			// Diamond, Rings, Dots
			gsap.set("#diamond", { opacity: 0, y: 50 });
			gsap.set("#ring", { opacity: 0, y: 50 });
			gsap.set("#dot", { opacity: 0, y: 50 });

			// Title
			gsap.set("#main-title", {
				clipPath: "polygon(0% 0%, 0% 0%, 0% 100%, 0% 100%)"
			});
			gsap.set("#sub-title", {
				clipPath: "polygon(100% 0%, 100% 0%, 100% 100%, 100% 100%)"
			});

			// Main Timeline
			const MAIN_TL = gsap.timeline();

			MAIN_TL.add(this.showDiamonds)
				.add(this.showRings, "< 0.3")
				.add(this.showDots, "< 0.5")
				.add(this.showSkullCat, 0.5)
				.add(this.showCrossbones, 1)
				.add(this.showTitle, 1.5)
				.add(this.skullEyes, 3)
				.add(this.catEyes, 3)
				.add(this.pumpkinFloat, 3);
		},
		showSkullCat() {
			gsap.to(".skull", 0.5, { opacity: 1, y: 0, delay: 0.2, ease: "back.out" });
			gsap.to(".cat", 0.5, { opacity: 1, y: 0, ease: "back.out" });
		},
		showDiamonds() {
			gsap.to("#diamond", 2, {
				opacity: 1,
				y: 0,
				ease: "back.out",
				stagger: { each: 0.5 }
			});
		},
		showRings() {
			gsap.to("#ring", 2, {
				opacity: 1,
				y: 0,
				ease: "back.out",
				stagger: { each: 0.5 }
			});
		},
		showDots() {
			gsap.to("#dot", 2, {
				opacity: 1,
				y: 0,
				ease: "back.out",
				stagger: { each: 0.5 }
			});
		},
		showCrossbones() {
			let tl = gsap.timeline();
			tl
				.to(".pumpkin", 0.5, { opacity: 1, y: 0, ease: "back.out" })
				.to("#bone1", 0.5, { opacity: 1, rotation: 30, ease: "back.out" })
				.to("#bone2", 0.5, { opacity: 1, rotation: -30, ease: "back.out" }, "<")
				.to(".date", 0.5, { opacity: 1 })
				.to(".month", 0.5, { opacity: 1 });
		},
		showTitle() {
			gsap.to("#main-title", 1, {
				clipPath: "polygon(0% 0%, 100% 0%, 100% 100%, 0% 100%)",
				ease: "pow4.in"
			});
			gsap.to("#sub-title", 1, {
				clipPath: "polygon(0% 0%, 100% 0%, 100% 100%, 0% 100%)",
				ease: "pow4.in",
				delay: 0.5
			});
		},
		skullEyes() {
			gsap.to("#eye1", 5, {
				keyframes: {
					rotation: [360, 180, 90, 45]
				},
				yoyo: true,
				repeat: -1,
				repeatDelay: 3
			});
			gsap.to("#eye2", 5, {
				keyframes: {
					rotation: [-360, -180, -90, -45]
				},
				yoyo: true,
				repeat: -1,
				repeatDelay: 3
			});
		},
		catEyes() {
			gsap.to("#cateye1", 1, {
				keyframes: {
					rotation: [360, 180, 360, 90, 0]
				},
				repeat: -1,
				repeatDelay: 5
			});
			gsap.to("#cateye2", 1, {
				keyframes: {
					rotation: [-360, -180, -360, -90, 0]
				},
				repeat: -1,
				repeatDelay: 5
			});
		},
		pumpkinFloat() {
			gsap.fromTo(".pumpkin", 2, { y: 0 }, { y: -5, repeat: -1, yoyo: true });
		}
	},
	mounted() {
		this.init();
	}
}).mount("#app");