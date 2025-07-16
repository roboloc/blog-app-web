import { auth } from "@/auth";
import WritePage from "@/features/write";
import { redirect } from "next/navigation";

const Write = async () => {
  const session = await auth();

  if (!session) {
    return redirect("/login");
  }

  return <WritePage />;
};

export default Write;
