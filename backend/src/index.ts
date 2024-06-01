import { $ } from "bun";
import { Hono } from "hono";
import { isIP } from "net";
import isValidDomain from "is-valid-domain";
import { cors } from "hono/cors";
import { logger } from "hono/logger";

const app = new Hono();
const config = await Bun.file("config.json").json();

app.use("*", logger());
app.use(
  "/*",
  cors({
    origin: "*",
  })
);

const validateSubnet = (subnet: string) => {
  const ip = subnet.split("/")[0];
  const ipVersion = isIP(ip);
  const cidr = subnet.split("/")[1] as unknown as number;
  if (isNaN(cidr)) {
    return false;
  }
  if (subnet.split("/").length !== 2) {
    return false;
  }
  if (ipVersion === 4) {
    if (cidr < 0 || cidr > 32) {
      return false;
    }
    return true;
  }
  if (ipVersion === 6) {
    if (cidr < 0 || cidr > 128) {
      return false;
    }
    return true;
  }
  return false;
};

app.get("/", async (c) => {
  return c.json({ info: "https://lumen.olekaleksander.dev/lg" });
});

app.get("/lg/ping", async (c) => {
  const ip = c.req.query("ip")!;

  if (!isIP(ip) && !isValidDomain(ip)) {
    return c.text("Invalid IP address or domain.", 400);
  }

  const ping = await $`ping -i 0.2 -c 5 ${ip}`.text();

  return c.text(ping);
});

app.get("/lg/traceroute", async (c) => {
  const ip = c.req.query("ip")!;

  if (!isIP(ip) && !isValidDomain(ip)) {
    return c.text("Invalid IP address or domain.", 400);
  }

  const traceroute = await $`traceroute -w 1 -q 1 ${ip}`.text();

  return c.text(traceroute);
});

app.get("/lg/mtr", async (c) => {
  const ip = c.req.query("ip")!;

  if (!isIP(ip) && !isValidDomain(ip)) {
    return c.text("Invalid IP address or domain.", 400);
  }

  const mtr = await $`mtr -rwbc 5 ${ip}`.text();

  return c.text(mtr);
});

app.get("/lg/bgp", async (c) => {
  const target = c.req.query("ip")!;

  if (!isIP(target) && !validateSubnet(target)) {
    return c.text("Invalid IP address or subnet.", 400);
  }

  const mtr = await $`birdc -r sh ro all for ${target}`.text();

  return c.text(mtr);
});

export default {
  port: config.port,
  fetch: app.fetch,
};
