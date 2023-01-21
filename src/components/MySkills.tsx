import { onCleanup, createSignal, Component, JSX, For } from "solid-js";

const [activeText, setActiveText] = createSignal(0);

export const MySkills = () => {
	let sectionRef: HTMLElement | undefined;

	const numberOfSkills = 3;
	const skills = [
		"I know my tools inside out.",
		"I have contributed to many open source Projects, who are powering thousands of apps worldwide.",
		"I am maintaining some of the most popular open-source projects, with over 40 million downloads.",
	];

	const interval = setInterval(() => {
		if (!sectionRef) return;
		const { offsetTop, clientHeight } = sectionRef;
		const scrollYPositionOfSection =
			window.scrollY - offsetTop + clientHeight - 600;

		skills.forEach((_, i) => {
			const min = i === 0 ? -Infinity : (i / numberOfSkills) * clientHeight;
			const max =
				numberOfSkills - 1 === i
					? Infinity
					: ((i + 1.0) / numberOfSkills) * clientHeight;
			if (
				scrollYPositionOfSection > min &&
				scrollYPositionOfSection < max &&
				activeText() !== i
			)
				setActiveText(i);
		});
	}, 350);

	onCleanup(async () => {
		clearInterval(interval);
	});

	return (
		<section
			ref={(el) => (sectionRef = el)}
			class="bg-black h-[130vh] grid place-items-center"
		>
			<div class="h-full max-w-5xl grid items-center p-5">
				<For each={skills}>
					{(item, i) => <Skill index={i()}>{item}</Skill>}
				</For>
			</div>
		</section>
	);
};

type SkillsProps = {
	index: number;
	children: JSX.Element;
};

const Skill: Component<SkillsProps> = ({ index, children }) => {
	return (
		<p
			class="text-white  text-5xl font-bold max-md:text-3xl"
			style={{
				opacity: `${index === activeText() ? 1 : 0.2}`,
				transition: "all 0.5s linear",
			}}
		>
			{children}
		</p>
	);
};
