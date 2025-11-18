"use client";

export default function ProjectCard({
    title,
    description,
    id,
    index = 0,
}: {
    title?: string;
    description?: string;
    id?: string;
    index?: number;   // <-- NEW
}) {
    const scrollTo = (id: string) => {
        const el = document.getElementById(id);
        if (el) {
            el.scrollIntoView({ behavior: "smooth", block: "start" });
        }
    };
    // Alternate styles:
    // even index (0, 2, 4...) → white background, black text
    // odd index  (1, 3, 5...) → black background, white text
    const baseClasses =
        "p-4 border border-black  transition hover:cursor-pointer";
    const style =
        index % 2 === 0
            ? "bg-transparent text-black hover:bg-black hover:text-white"
            : "bg-gray-800 text-white hover:bg-black hover:text-white";
    return (
        <li className={`${baseClasses} ${style}`} onClick={() => scrollTo(id || "")}>
            <h3 className="font-medium text-xl">{title}</h3>
            <p className="text-sm mt-1">{description}</p>
        </li>
    );
}
