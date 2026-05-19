import formalImage from "@/assets/images/formal.png";
import casualImage from "@/assets/images/casual.png";
import partyImage from "@/assets/images/party.png";
import gymImage from "@/assets/images/gym.png";

function HomeCategorySection() {
  return (
    <div className="bg-zinc-200 py-10 px-20 rounded-3xl mb-6">
      <h2 className="text-center text-5xl mb-10 font-bold">
        Browse By Dress Style
      </h2>
      <div className="grid lg:grid-cols-3 grid-cols-1 gap-4 rounded-3xl">
        <div
          className="col-span-1 h-70 w-full bg-white rounded-3xl relative bg-no-repeat  bg-right cursor-pointer relative"
          style={{ backgroundImage: `url(${casualImage})` }}
        >
          <span className="left-10 top-10 absolute text-3xl font-bold select-none">
            Casual
          </span>
          <div className="w-full h-full absolute inset-0 bg-black opacity-0 hover:opacity-20 rounded-3xl"></div>
        </div>
        <div
          className="col-span-2 h-70 w-full bg-bg-image rounded-3xl relative bg-no-repeat  bg-right cursor-pointer"
          style={{ backgroundImage: `url(${formalImage})` }}
        >
          <span className="left-10 top-10 absolute text-3xl font-bold  select-none">
            Formal
          </span>
          <div className="w-full h-full absolute inset-0 bg-black opacity-0 hover:opacity-20 rounded-3xl"></div>
        </div>
        <div
          className="col-span-2 h-70 w-full bg-white rounded-3xl relative bg-no-repeat  bg-right cursor-pointer"
          style={{ backgroundImage: `url(${partyImage})` }}
        >
          <span className="left-10 top-10 absolute text-3xl font-bold select-none">
            Party
          </span>
          <div className="w-full h-full absolute inset-0 bg-black opacity-0 hover:opacity-20 rounded-3xl"></div>
        </div>
        <div
          className="col-span-1 h-70 w-full bg-white rounded-3xl relative bg-no-repeat  bg-right cursor-pointer"
          style={{ backgroundImage: `url(${gymImage})` }}
        >
          <span className="left-10 top-10 absolute text-3xl font-bold select-none">
            Gym
          </span>
          <div className="w-full h-full absolute inset-0 bg-black opacity-0 hover:opacity-20 rounded-3xl"></div>
        </div>
      </div>
    </div>
  );
}

export default HomeCategorySection;
