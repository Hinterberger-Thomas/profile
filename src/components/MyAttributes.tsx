import { Component, JSX, onCleanup, onMount } from "solid-js";

const blur = "blur-sm";

const observer = new IntersectionObserver((entries) => {
	entries.forEach((v) => {
		if (!v.isIntersecting) return;
		observer.unobserve(v.target);
		v.target.classList.add("translate-x-[100%]");
		v.target.classList.remove(blur);
	});
});

export const MyAttributes = () => {
	onCleanup(() => {
		observer.disconnect();
	});
	return (
		<section class="100vh h-[100vh] grid place-items-center">
			<div class="grid max-w-5xl h-full p-10 overflow-hidden">
				<Attribute>
					<b>I will help you ship better apps</b>, faster. I have created the
					best user experiences in some of the most popular apps worldwide.
				</Attribute>
				<Attribute>
					<b>My services:</b> <br />
				</Attribute>
				<Attribute>
					<b> - From Idea to AppStore: </b> Full App Design and Development{" "}
					<br />
				</Attribute>
				<Attribute>
					<b> - Performance Optimization: </b> Startup-time, Animation and
					overall smoothness optimization for existing apps <br />
				</Attribute>
				<Attribute>
					<b> - Custom Module Development: </b> Development of specific UIs,
					animations, gestures or native modules for existing apps
				</Attribute>
				<Attribute>
					<b> - PConsulting: </b> One-on-one consulting with a React Native, iOS
					or Android expert and bug fixing
				</Attribute>
			</div>
		</section>
	);
};

type AttributeProps = {
	children: JSX.Element;
};

const Attribute: Component<AttributeProps> = ({ children}) => {
	let ref: HTMLParagraphElement | undefined;
	onMount(() => {
		if (!ref) return;
		observer.observe(ref);
	});
	return (
		<p
			style={{
				position: "relative",
				left: "-100%",
				transition: "transform 1s, filter 1s",
			}}
			ref={(el) => (ref = el)}
			class={`text-3xl max-lg:text-xl max-sm:text-base ${blur}`}
		>
			{children}
		</p>
	);
};
