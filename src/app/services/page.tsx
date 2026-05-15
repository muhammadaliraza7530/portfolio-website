import { getContent } from "@/lib/data";
import ServicesClient from "./ServicesClient";

export default async function Services() {
  const content = await getContent();
  const services = content.services || [];

  return <ServicesClient initialServices={services} />;
}
