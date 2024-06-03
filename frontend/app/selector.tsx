import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectTrigger,
  SelectValue,
  SelectLabel,
} from "@/components/ui/select";

export default function BackendSelector({
  config,
  selectedBackend,
  onBackendChange,
}: any) {
  return (
    <Select
      onValueChange={(value) => onBackendChange(value)}
      value={selectedBackend.name}
    >
      <SelectTrigger className="max-w-36 sm:max-w-48 h-8 -mt-2">
        <SelectValue placeholder="Node" />
      </SelectTrigger>
      <SelectContent>
        {config.locations.map((location: any, locationIndex: any) => (
          <SelectGroup key={locationIndex}>
            <SelectLabel>{location.name}</SelectLabel>
            {location.backends.map((backend: any, backendIndex: any) => (
              <SelectItem key={backendIndex} value={backend.name}>
                {backend.name}
              </SelectItem>
            ))}
          </SelectGroup>
        ))}
      </SelectContent>
    </Select>
  );
}
