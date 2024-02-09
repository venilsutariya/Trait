import DisplayQuality from "@/components/customUi/display-quality";
import { Button } from "@/components/ui/button";
import { currentUser } from "@clerk/nextjs";
import Link from "next/link";

export default async function Home() {

  const user = await currentUser();

  if (!user) throw new Error("Unauthorized");

  const userEmail = user.emailAddresses[0].emailAddress;

  return (
    <>
      <div className="px-3 py-2 flex justify-end">
        <Link href={"/addquality/noid"}>
          <Button className="" size={"sm"}>
            Add quality
          </Button>
        </Link>
      </div>
      <div>
        <DisplayQuality email={userEmail} />
      </div>
    </>
  );
}
