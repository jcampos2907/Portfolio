"use client";
import {
    FaGithub,

    FaLink
} from "react-icons/fa";
import { Badge } from "../ui/badge";
import { Button } from "../ui/button";


export default function ProjectSection({ index, id, title, description, git_link, url, labels }: { index: number, id: string, title: string, description: string, git_link: string, url: string, labels: string[] }) {

    const baseClasses =
        "p-6  border border-black ";
    const style =
        index % 2 === 0
            ? "bg-transparent "
            : "bg-gray-800 ";
    return (
        <div id={id} className={`${baseClasses} ${style}`}>
            <h3 className={`font-medium text-xl ${index % 2 === 0 ? "text-black" : "text-white"}`}>{title}</h3>
            <p className={`text-sm mt-1 ${index % 2 === 0 ? "text-black" : "text-white"}`}>{description}</p>
            <div className="mt-2 flex gap-2 flex-wrap">
                {labels.map((label, indexlabel) => (
                    <Badge className={index % 2 === 0 ? " text-white" : "bg-white text-black"} key={indexlabel}>{label}</Badge>
                ))}
            </div>
            <div className="mt-2 flex gap-4">
                {git_link && (
                    <Button asChild variant={index % 2 === 0 ? "default" : "outline"}>
                        <a href={git_link}><FaGithub />Github</a>
                    </Button>
                )}
                {url && (
                    <Button asChild variant={index % 2 === 0 ? "default" : "outline"}>
                        <a href={url}><FaLink /> Live demo</a>
                    </Button>
                )}
            </div>
        </div>
    )
}