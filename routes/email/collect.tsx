import { RouteConfig } from "$fresh/src/server/types.ts";
import { EmailCollectionForm } from "../../components/modals/emailCollectionForm.tsx";

export const config: RouteConfig = {
  skipInheritedLayouts: true,
};

export default function Login() {
  return <EmailCollectionForm />;
}
