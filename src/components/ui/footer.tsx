import {
  IconApplePay,
  IconFacebook,
  IconGithub,
  IconGooglePay,
  IconInstagram,
  IconMasterCard,
  IconPayPal,
  IconTwitter,
  IconVisa,
} from "./app-svgs";
import { RowDivident } from "./row-divident";

export function Footer() {
  return (
    <div className=" px-18 bg-zinc-200 mt-20 py-20">
      <div className="grid grid-cols-2 gap-5 pb-10 lg:grid-cols-6">
        {/* col 1 */}
        <div className="grid grid-cols-1 grid-rows-5 gap-5 col-span-2">
          <span className="uppercase text-4xl font-bold col-start-1">
            Shop.co
          </span>
          <span className="text-lg text-zinc-400 row-span-3 col-start-1">
            Lorem ipsum dolor sit amet consectetur adipisicing elit. Accusantium
            consectetur perspiciatis numquam nihil ipsum error est natus fugiat
            officiis aliquid atque, deserunt sapiente reiciendis ab quo
            necessitatibus veniam asperiores tempora!
          </span>
          <span className="col-start-1 flex items-center gap-3">
            <div className="w-7 h-7 rounded-3xl outline outline-zinc-500 flex justify-center items-center cursor-pointer">
              <IconTwitter width={20} height={20} />
            </div>
            <div className="w-7 h-7 rounded-3xl outline outline-zinc-500 flex justify-center items-center cursor-pointer">
              <IconFacebook width={20} height={20} />
            </div>
            <div className="w-7 h-7 rounded-3xl outline outline-zinc-500 flex justify-center items-center cursor-pointer">
              <IconInstagram width={20} height={20} />
            </div>
            <div className="w-7 h-7 rounded-3xl outline outline-zinc-500 flex justify-center items-center cursor-pointer">
              <IconGithub width={20} height={20} />
            </div>
          </span>
        </div>

        {/* col 2 */}
        <div className="grid grid-cols-1 grid-rows-5 gap-5">
          <span className="uppercase text-2x1">Company</span>
          <span className="text-lg text-zinc-400 ">About</span>
          <span className="text-lg text-zinc-400 ">Features</span>
          <span className="text-lg text-zinc-400 ">Works</span>
          <span className="text-lg text-zinc-400 ">Career</span>
        </div>

        {/* col 3 */}
        <div className="grid grid-cols-1 grid-rows-5 gap-5">
          <span className="uppercase text-2xl ">Help</span>
          <span className="text-lg text-zinc-400 ">Customer Support</span>
          <span className="text-lg text-zinc-400 ">Delivery Details</span>
          <span className="text-lg text-zinc-400 ">Term & Conditions</span>
          <span className="text-lg text-zinc-400 ">Privacy Policy</span>
        </div>

        {/* col 4 */}
        <div className="grid grid-cols-1 grid-rows-5 gap-5">
          <span className="uppercase text-2xl ">FAQ</span>
          <span className="text-lg text-zinc-400 ">Account</span>
          <span className="text-lg text-zinc-400 ">Manage Deliveries</span>
          <span className="text-lg text-zinc-400 ">Orders</span>
          <span className="text-lg text-zinc-400 ">Payments</span>
        </div>

        {/* col 5 */}
        <div className="grid grid-cols-1 grid-rows-5 gap-5">
          <span className="uppercase text-2xl ">Resources</span>
          <span className="text-lg text-zinc-400 ">Free eBooks</span>
          <span className="text-lg text-zinc-400 ">Development Tutorial</span>
          <span className="text-lg text-zinc-400 ">How to - Blog</span>
          <span className="text-lg text-zinc-400 ">Youtube Playlist</span>
        </div>
      </div>

      <RowDivident />
      <div className="flex justify-between mt-5">
        <span className="text-zinc-400 text-sm">Shop.co</span>
        <span className="col-start-1 flex items-center gap-3">
          <IconVisa />
          <IconMasterCard />
          <IconPayPal />
          <IconApplePay />
          <IconGooglePay />
        </span>
      </div>
    </div>
  );
}
