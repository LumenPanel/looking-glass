"use client";

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { useState } from "react";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Button } from "@/components/ui/button";
import BackendSelector from "./selector";
import { Spinner } from "@/components/ui/spinner";
import { cn } from "@/lib/utils";
import { toast } from "sonner";

export default function LookingGlassForm({ config }: any) {
  const [selectedBackend, setSelectedBackend] = useState(
    config.locations[0].backends[0]
  );

  const [ip, setIp] = useState("");
  const [type, setType] = useState("ping");

  const [time, setTime] = useState(0);
  const [result, setResult] = useState("");
  const [loading, setLoading] = useState(false);

  const handleBackendChange = (value: string) => {
    const backend = config.locations
      .flatMap((location: any) => location.backends)
      .find((backend: any) => backend.name === value);
    setSelectedBackend(backend);
    setResult("");
  };

  const handleRequest = async (e: any) => {
    e.preventDefault();

    setLoading(true);
    setResult("");

    try {
      const start = new Date().getTime();

      const response = await fetch(
        `${selectedBackend.url}/lg/${type}?ip=${ip}`,
        {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
          },
        }
      );

      const text = await response.text();

      setTime(new Date().getTime() - start);
      setResult(text);
      setLoading(false);
    } catch (e: any) {
      toast.error(e);
      setLoading(false);
    }
  };

  return (
    <div className="space-y-12">
      <Card className="mt-12 relative">
        <CardHeader>
          <div className="flex">
            <CardTitle className="mr-auto">Looking Glass</CardTitle>
            <BackendSelector
              config={config}
              selectedBackend={selectedBackend}
              onBackendChange={handleBackendChange}
            />
          </div>
        </CardHeader>
        <CardContent>
          <div>
            {selectedBackend.info && (
              <div className="flex flex-row mb-12 mt-64font-medium justify-between text-lg">
                <div className="flex flex-col mx-2">
                  <span className="text-sm font-normal text-foreground/80">
                    IPv4
                  </span>
                  {selectedBackend.info.ipv4 || "Not set"}
                </div>
                <div className="flex flex-col">
                  <span className="text-sm font-normal text-foreground/80">
                    IPv6
                  </span>
                  {selectedBackend.info.ipv6 || "Not set"}
                </div>
                <div className="flex flex-col">
                  <span className="text-sm font-normal text-foreground/80">
                    Datacenter
                  </span>
                  {selectedBackend.info.datacenter || "Not set"}
                </div>
                <div className="flex flex-col">
                  <span className="text-sm font-normal text-foreground/80">
                    Location
                  </span>
                  {selectedBackend.info.location || "Not set"}
                </div>
              </div>
            )}
          </div>
          <form
            onSubmit={handleRequest}
            className="flex flex-col md:flex-row gap-4"
          >
            <Input
              disabled={loading}
              value={ip}
              onChange={(e) => setIp(e.target.value)}
              placeholder="IP address or domain"
              className="w-full"
            />
            <div className="w-full md:max-w-[200px] h-full flex items-center">
              <Select
                disabled={loading}
                onValueChange={(value) => setType(value)}
                value={type}
              >
                <SelectTrigger>
                  <SelectValue placeholder="Type" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="ping">Ping</SelectItem>
                  <SelectItem value="traceroute">Traceroute</SelectItem>
                  <SelectItem value="mtr">MTR</SelectItem>
                  <SelectItem value="bgp">BGP</SelectItem>
                </SelectContent>
              </Select>
            </div>
            <Button disabled={loading} type={"submit"} className=" w-32">
              {loading ? <Spinner /> : "Run"}
            </Button>
          </form>
        </CardContent>
      </Card>
      <Card
        className={cn(
          "duration-200 transition",
          result == "" ? "opacity-0" : "opacity-100"
        )}
      >
        <CardHeader>
          <div className="flex">
            <CardTitle className="mr-auto">Result</CardTitle>
            <span className="text-xs ml-auto my-auto">
              took <strong>{time}</strong>ms
            </span>
          </div>
        </CardHeader>
        <CardContent>
          <pre className="bg-secondary p-3 rounded-md">{result}</pre>
        </CardContent>
      </Card>
    </div>
  );
}
