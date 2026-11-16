import Image from "next/image";
import EditSection from "./review/EditSection";
import SectionHeader from "./sections/SectionHeader";
import SectionButton from "./sections/SectionButtons";

type OrderData = {
  name: string;
  email: string;
  phone: string;
  quantity: number;
  halfFrame: boolean;
  negatives: boolean;
  service: string;
  printSize?: string;
  printFinish?: string;
  filmType: string;
  price: number;
};
type reviewProps = {
  changeSection: (section: number) => void;
  order: OrderData;
  currentSection: number;
};

export default function Review({
  changeSection,
  order,
  currentSection,
}: reviewProps) {
  return (
    <div className="min-h-screen mt-2 max-w-lg mx-auto p-5 space-y-3">
      <SectionHeader
        heading="4. Review"
        subHeading="Please check and verify your order details"
      />
      <div className="border rounded-md p-3 space-y-2 border-ffblue dark:border-ffgreen">
        <div>
          <EditSection
            title="Your Details"
            goToSection={() => changeSection(1)}
          />
          <p className="ml-5">
            Name & Surname: <span className="font-bold">{order.name}</span>
            <br />
            Email address: <span className="font-bold">{order.email}</span>{" "}
            <br />
            Phone number: <span className="font-bold">{order.phone}</span>
          </p>
        </div>
        <hr className="border-ffblue dark:border-ffgreen" />
        <div>
          <EditSection title="Film" goToSection={() => changeSection(2)} />
          <div className="flex flex-row gap-3 items-center">
            <Image
              alt="film canister"
              //will make image update to the type of film later on
              src={"/images/colourplus.webp"}
              width={80}
              height={80}
            />
            <p>
              Type: <span className="font-bold">{order.filmType}</span> <br />
              Quantity: <span className="font-bold">{order.quantity}</span>
              <br />
              Negative:{" "}
              <span className="font-bold">
                {order.negatives ? "Keep" : "Discard/Throw Away"}{" "}
              </span>{" "}
              <br />
              Half-frame:
              <span className="font-bold">
                {order.halfFrame ? "Yes" : "No"}
              </span>
            </p>
          </div>
        </div>
        <hr className="border-ffblue dark:border-ffgreen" />
        <div>
          <EditSection title="Services" goToSection={() => changeSection(3)} />
          <p className="ml-5">
            Service: <span className="font-bold">{order.service}</span> <br />
            Print Size: <span className="font-bold">
              {order.printSize}
            </span>{" "}
            <br />
            Finish: <span className="font-bold">{order.printFinish}</span>{" "}
            <br />
          </p>
        </div>
      </div>
      <div className="rounded-md bg-ffblue/50 dark:bg-ffgreen/50 p-3">
        <p className="text-3xl">
          Total Price: <span className="font-bold">R{order.price}</span>
        </p>
      </div>
      <SectionButton
        changeSection={changeSection}
        currentSection={currentSection}
      />
    </div>
  );
}
