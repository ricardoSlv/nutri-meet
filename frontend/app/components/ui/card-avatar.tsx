export default function Avatar({ name, className }: { name: string; className?: string }) {
  return (
    <img
      src={
        name.split(" ")[0].split("").at(-1) === "a"
          ? "https://cdn-icons-png.flaticon.com/512/4140/4140047.png"
          : "https://cdn-icons-png.flaticon.com/512/4140/4140037.png"
      }
      alt={name + " avatar"}
      className={className}
    />
  );
}
