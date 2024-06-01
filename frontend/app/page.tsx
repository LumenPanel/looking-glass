import { ThemeToggle } from "@/components/theme-toggle";
import { Separator } from "@/components/ui/separator";
import { promises as fs } from "fs";
import Image from "next/image";
import LookingGlassForm from "./form";

export default async function LookingGlass() {
  const config = JSON.parse(
    await fs.readFile(process.cwd() + "/config.json", "utf8")
  );

  return (
    <main className="mt-12">
      <div className="mx-2 flex">
        <div className="inline-flex gap-6 mr-auto">
          <Image
            src={config.brand.logo}
            className={config.brand.invertLogo ? "invert dark:invert-0" : ""}
            width={48}
            height={48}
            alt="Logo"
          />
          <Separator orientation="vertical" />
          <span className="my-auto text-lg font-medium">
            {config.brand.name}
          </span>
        </div>
        <ThemeToggle />
      </div>
      <LookingGlassForm config={config} />
    </main>
  );
}
